import Geolocation from '@react-native-community/geolocation';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Platform, Share, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import Feather from 'react-native-vector-icons/Feather';
import { Button, Dialog, DialogProps, Image, Separator, Spinner, Stack, styled, Text, Unspaced, XStack, ZStack } from "tamagui";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import DrawerScreen from "./components/DrawerScreen";
import ContactListItem from "../../components/ContactListItem";
import { AppContext } from "../../contexts/AppContext";
import { ContactPersonType } from "../../types/contacts";
import { alertUser } from "../../utils/alert";
import { createShareMsg, shareLoc } from "../../utils/sms";
import { SafeAreaView } from 'react-navigation';
import { useFocusEffect } from '@react-navigation/native';
import useSafeWords from '../../hooks/useSafeWords';
import { isInitializedSafeWords } from '../../services/safeWords';
var RNFS = require('react-native-fs');

const DefaultButton = styled(Button, {
    height: 80,
    color: "white",
    pressStyle: { opacity: 0.75 },
});

const info = require("../../assets/img/info.png");

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function PeopleInYourArea() {

    const [counter, setCounter] = useState<number>(0);

    useFocusEffect(useCallback(() => {
        const interval = setInterval(() => {
            setCounter(x => {
                const operator = Math.random() > 0.8 ? -1 : 1;
                let c = x + (randomNumber(2, 6) * operator);
                if (c < 0) c = x + randomNumber(2, 6);
                return c;
            })
        }, 2000);

        return function () {
            clearInterval(interval);
        }
    }, []));

    return <ZStack style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
        <XStack style={{ position: "absolute", width: '100%', top: 24 }} px={16}>
            <Stack bg='$file' px={24} py={16} flex={1} borderRadius={50} alignItems="center" flexDirection="row">
                <Image source={info} />
                <Text flex={1} color='white' textAlign="center">There are {counter} women commuters within 10 meters.</Text>
            </Stack>
        </XStack>
    </ZStack>;
}

function useGeoCode(shareMode: boolean) {

    const [myLoc, setMyLoc] = useState<string>('');
    const [shareableLink, setShareableLink] = useState<string>('');
    const [searching, setSearch] = useState<boolean>(false);

    useEffect(() => {
        if (shareMode) {
            setSearch(true);
            const apikey = Platform.select({
                android: "AIzaSyDPHQCpHt-sLOC4yQbCgNOJdCG6HwUM0F8",
                ios: "AIzaSyCewTU6Aq_ro1SzmocbuHrdhqj_fK7Pq4E",
            });
            Geolocation.getCurrentPosition(async info => {
                const coor = info.coords;
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coor.latitude},${coor.longitude}&key=${apikey}`;
                setShareableLink(`https://www.google.com/maps/search/?api=1&query=${coor.latitude},${coor.longitude}`);
                return axios.get(url)
                    .then(response => {
                        const data = response.data;
                        const results = data.results;
                        const geoplus = data.plus_code;
                        setMyLoc(geoplus.compound_code);
                        setSearch(false);
                    });
            });
        }
    }, [shareMode]);

    return [myLoc, shareableLink, searching];

}

const sharePhases = ['initial', 'contact', 'link'] as const;
type SharePhaseType = typeof sharePhases[number];
function ShareDialog(props: PropsWithChildren & DialogProps & { onOpenChange: Function, link: string }): JSX.Element {

    const { onOpenChange, link } = props;

    const [phase, setPhase] = useState<SharePhaseType>('initial');

    const app_ctx = useContext(AppContext);
    const me = app_ctx?.cognito ?? null;
    const name = me?.name ?? '';

    const [model, setModel] = useState<{ [key: string]: ContactPersonType | null } | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        return function () {
            setPhase('initial');
            setModel(null);
            setLoading(false);
        }
    }, []);

    const toggleModel = (id: string, name: string, phone_number: string) => {

        let selected = Boolean(model) ? Object.values(model) : [];
        selected = selected.filter(item => Boolean(item));

        const in_selected = Boolean(model && model[id]);
        console.log('check in selected');
        if (in_selected) {
            setModel(model => ({ ...model, [id]: null }));
            // setSelected(ids => {
            //     return ids.filter(v => v != id);
            // });
        } else {
            if (selected.length < 5) {
                setModel(model => ({ ...model, [id]: { id, name, phone_number } }));
            }
        }
    };

    const handleOnShareToContacts = () => setPhase('contact');
    const handleOnShareLink = () => {
        onOpenChange(false);
        setPhase('initial');
        const content = createShareMsg(name, link);
        Share.share({
            message: content,
        });
        // share link
    }

    const handleOnShare = async () => {
        let selected = Boolean(model) ? Object.values(model) : [];
        selected = selected.filter(item => Boolean(item));

        if (selected.length == 0) {
            alertUser("Please select at least 1 emergency contact");
            return;
        }

        setLoading(true);

        try {
            for (let contact of selected) {
                if (contact?.phone_number) {
                    const response = await shareLoc(contact?.phone_number, link, name);
                }
            }
        } catch (err) {
            console.log('err@handleOnShare', err.message);
        }

        setLoading(false);

        onOpenChange(false);

    }

    const safeWordsEngine = useSafeWords();

    useFocusEffect(useCallback(() => {
        isInitializedSafeWords().then((resp) => {
            if (resp.initialized && resp.enableSafeWords) {
                safeWordsEngine.manualStart();
            }
        });
    }, []));

    return <Dialog modal open={props.open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
            <Dialog.Overlay
                key="overlay"
                animation="quick"
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content marginHorizontal={20}>
                <Dialog.Title height={32}>
                </Dialog.Title>
                {phase == 'initial' && <>
                    <Dialog.Description fontSize={18} fontWeight={'700'} flexWrap='wrap' textAlign="center" px={10} mb={40}>
                        How do you want to share your location?
                    </Dialog.Description>
                    <Stack gap={12}>
                        <PrimaryButton onPress={handleOnShareToContacts}>Share to my emergency contact</PrimaryButton>
                        <SecondaryButton onPress={handleOnShareLink}>Create a shareable link</SecondaryButton>
                    </Stack>
                </>}
                {phase == 'contact' && <>
                    <Dialog.Description fontSize={18} fontWeight={'700'} flexWrap='wrap' textAlign="center" px={10} mb={40}>
                        Share to my emergency contact
                    </Dialog.Description>
                    {app_ctx?.myContacts.map((item, index) => {
                        const checked = Boolean(model && model[item.id]);
                        return <React.Fragment key={`x${index}-${Boolean(model && model[item.id]) ? item.id : 'x'}`}>
                            <ContactListItem key={`${index}-${Boolean(model && model[item.id]) ? item.id : 'x'}`} {...item} updateModel={toggleModel} checked={checked} />
                            <Separator mb={10} />
                        </React.Fragment>
                    })}
                    <PrimaryButton
                        disabled={loading}
                        onPress={handleOnShare}
                    >
                        {!loading && `Share`}
                        {loading && <><Spinner color='white' mr={5} /><Text color='white'>Sharing...</Text></>}
                    </PrimaryButton>
                </>}
                <Unspaced>
                    <Dialog.Close asChild>
                        <Button
                            position="absolute"
                            top={5}
                            right={5}
                            circular
                            bg='transparent'
                            icon={<Feather name='x' size={24} />}
                        />
                    </Dialog.Close>
                </Unspaced>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog >
}

function DashboardScreen(props: PropsWithChildren & NativeStackScreenProps<any>): JSX.Element {

    const { navigation } = props;

    const gotoSOS = () => navigation.navigate("Main.SOS");

    const [initialCoor, setInitialCoor] = useState<Region>({ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 });
    const [init, setInit] = useState<boolean>(false);
    const [mapbox, setMapbox] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            const coor = info.coords;

            if (mapbox.width > 0) {
                setInitialCoor({
                    latitude: coor.latitude,
                    longitude: coor.longitude,
                    latitudeDelta: 0.004757,
                    longitudeDelta: 0.006866,
                });
                setInit(true);
            }

        });
    }, [mapbox]);

    const [shareMode, setShareMode] = useState<boolean>(false);

    const onPressShare = () => setShareMode(true);
    const onPressStopShare = () => setShareMode(false);

    const [myLoc, shareLink, searching] = useGeoCode(shareMode);

    useEffect(() => {
        navigation.setOptions({
            headerShown: !shareMode,
        });
    }, [shareMode]);

    useEffect(() => {
        return () => onPressStopShare();
    }, []);

    const mapRef = useRef<MapView>(null);

    const [showShare, setShowShare] = useState<boolean>(false);
    const onPressFileAReport = () => {
        Geolocation.getCurrentPosition(async info => {
            const coor = info.coords;
            console.log(coor);
            mapRef.current?.animateToRegion({
                latitude: coor.latitude,
                longitude: coor.longitude,
                latitudeDelta: 0.004757,
                longitudeDelta: 0.006866,
            }, 500);
            setTimeout(() => {
                mapRef.current?.takeSnapshot({
                    format: 'png',
                    quality: 0.8,
                    height: Dimensions.get('window').height * 0.50,
                    result: 'file'
                }).then(snapshot => {
                    console.log(snapshot);
                    navigation.navigate("Main.FileReport", {
                        location: coor,
                        image: snapshot,
                    });
                });
            }, 550);
        });
    };

    return <DrawerScreen
        active="home"
    >
        <ShareDialog open={showShare} onOpenChange={(open) => setShowShare(open)} link={shareLink} />
        <SafeAreaView style={{
            height: "100%",
            backgroundColor: "white"
        }}>
            <Stack style={{ width: '100%', height: '100%', flex: 1 }} onLayout={(event) => {
                var { width, height } = event.nativeEvent.layout;
                setMapbox({ width, height })
            }}>
                {init && <MapView
                    ref={mapRef}
                    initialRegion={initialCoor}
                    style={{ flex: 1 }}
                    provider='google'
                    showsUserLocation={true}
                    followsUserLocation={true}
                // loadingEnabled={true}
                />}
            </Stack>
            {!shareMode && <Stack backgroundColor={"white"} p={16} gap={16}>
                <DefaultButton bg="$emergency" onPress={gotoSOS}>Emergency SOS</DefaultButton>
                <XStack gap={16}>
                    <DefaultButton flex={1} bg="$file" onPress={onPressFileAReport}>File a report</DefaultButton>
                    <DefaultButton flex={1} bg="$loc" onPress={onPressShare}>Share location</DefaultButton>
                </XStack>
            </Stack>}
            {/* {!shareMode && <PeopleInYourArea />} */}
            {shareMode && <ZStack style={StyleSheet.absoluteFill}>
                <XStack style={{ position: "absolute", width: '100%', top: 24 }} px={16}>
                    <Stack bg='$file' px={24} py={16} flex={1} borderRadius={50} alignItems="center" flexDirection="row">
                        {searching && <><Spinner mr={4} color="white" /><Text color='white'>Getting my location</Text></>}
                        {!searching && <Text flex={1} color='white' textAlign="center">{myLoc}</Text>}
                    </Stack>
                </XStack>
                <XStack p={8} gap={4} style={{ position: "absolute", width: '100%', bottom: 24 }}>
                    <SecondaryButton bg={'white'} onPress={onPressStopShare} flex={0}>Cancel</SecondaryButton>
                    <PrimaryButton flex={1} onPress={() => {
                        setShowShare(true);
                    }}>
                        Share live location
                    </PrimaryButton>
                </XStack>
            </ZStack>
            }
        </SafeAreaView>
    </DrawerScreen>

}

export default DashboardScreen;