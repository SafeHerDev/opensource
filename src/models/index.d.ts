import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly timestamp?: string | null;
  readonly metadata?: string | null;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly timestamp?: string | null;
  readonly metadata?: string | null;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification

export declare const Notification: (new (init: ModelInit<Notification>) => Notification) & {
  copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

type EagerLocationReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LocationReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly coordinates?: string | null;
  readonly location?: string | null;
  readonly datetime?: string | null;
  readonly ratings?: (string | null)[] | null;
  readonly description?: string | null;
  readonly media?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLocationReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LocationReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly coordinates?: string | null;
  readonly location?: string | null;
  readonly datetime?: string | null;
  readonly ratings?: (string | null)[] | null;
  readonly description?: string | null;
  readonly media?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LocationReport = LazyLoading extends LazyLoadingDisabled ? EagerLocationReport : LazyLocationReport

export declare const LocationReport: (new (init: ModelInit<LocationReport>) => LocationReport) & {
  copyOf(source: LocationReport, mutator: (draft: MutableModel<LocationReport>) => MutableModel<LocationReport> | void): LocationReport;
}

type EagerIncidentReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IncidentReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly coordinates?: string | null;
  readonly location?: string | null;
  readonly datetime?: string | null;
  readonly category?: (string | null)[] | null;
  readonly description?: string | null;
  readonly media?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIncidentReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IncidentReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly coordinates?: string | null;
  readonly location?: string | null;
  readonly datetime?: string | null;
  readonly category?: (string | null)[] | null;
  readonly description?: string | null;
  readonly media?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type IncidentReport = LazyLoading extends LazyLoadingDisabled ? EagerIncidentReport : LazyIncidentReport

export declare const IncidentReport: (new (init: ModelInit<IncidentReport>) => IncidentReport) & {
  copyOf(source: IncidentReport, mutator: (draft: MutableModel<IncidentReport>) => MutableModel<IncidentReport> | void): IncidentReport;
}

type EagerMedicalRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MedicalRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date_of_birth?: string | null;
  readonly medical_condition?: string | null;
  readonly medical_notes?: string | null;
  readonly medications?: string | null;
  readonly blood_type?: string | null;
  readonly organ_donor?: string | null;
  readonly weight?: string | null;
  readonly height?: string | null;
  readonly skin_color?: string | null;
  readonly hair_color?: string | null;
  readonly tattoo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMedicalRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MedicalRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date_of_birth?: string | null;
  readonly medical_condition?: string | null;
  readonly medical_notes?: string | null;
  readonly medications?: string | null;
  readonly blood_type?: string | null;
  readonly organ_donor?: string | null;
  readonly weight?: string | null;
  readonly height?: string | null;
  readonly skin_color?: string | null;
  readonly hair_color?: string | null;
  readonly tattoo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MedicalRecord = LazyLoading extends LazyLoadingDisabled ? EagerMedicalRecord : LazyMedicalRecord

export declare const MedicalRecord: (new (init: ModelInit<MedicalRecord>) => MedicalRecord) & {
  copyOf(source: MedicalRecord, mutator: (draft: MutableModel<MedicalRecord>) => MutableModel<MedicalRecord> | void): MedicalRecord;
}

type EagerEmergencyContact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmergencyContact, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly phone_number?: string | null;
  readonly status?: number | null;
  readonly phone_number_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmergencyContact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmergencyContact, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly phone_number?: string | null;
  readonly status?: number | null;
  readonly phone_number_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmergencyContact = LazyLoading extends LazyLoadingDisabled ? EagerEmergencyContact : LazyEmergencyContact

export declare const EmergencyContact: (new (init: ModelInit<EmergencyContact>) => EmergencyContact) & {
  copyOf(source: EmergencyContact, mutator: (draft: MutableModel<EmergencyContact>) => MutableModel<EmergencyContact> | void): EmergencyContact;
}

type EagerUserVerification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserVerification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly id_name?: string | null;
  readonly id_mime_type?: string | null;
  readonly id_key?: string | null;
  readonly selfie_name?: string | null;
  readonly selfie_mime_type?: string | null;
  readonly selfie_key?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserVerification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserVerification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly id_name?: string | null;
  readonly id_mime_type?: string | null;
  readonly id_key?: string | null;
  readonly selfie_name?: string | null;
  readonly selfie_mime_type?: string | null;
  readonly selfie_key?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserVerification = LazyLoading extends LazyLoadingDisabled ? EagerUserVerification : LazyUserVerification

export declare const UserVerification: (new (init: ModelInit<UserVerification>) => UserVerification) & {
  copyOf(source: UserVerification, mutator: (draft: MutableModel<UserVerification>) => MutableModel<UserVerification> | void): UserVerification;
}