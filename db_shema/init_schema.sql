CREATE TYPE person_role AS ENUM ('PATIENT', 'DOCTOR', 'DIRECTOR')
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'CANCELED', 'COMPLETED', 'NO_SHOW');
CREATE TYPE audit_action AS ENUM ('INSERT', 'UPDATE', 'DELETE', 'GET');

CREATE TABLE "person" (
    "person_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "phone_number" CHAR(11) NOT NULL,
    "address" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password_hash" VARCHAR NOT NULL,
    "role" person_role NOT NULL,
    CONSTRAINT "pk_person" PRIMARY KEY ("person_id"),
    CONSTRAINT "uc_person_username" UNIQUE ("username")
);

CREATE TABLE "doctor" (
    "doctor_id" UUID NOT NULL,
    "person_id" UUID NOT NULL,
    "department_id" UUID NULL,
    "specialization" VARCHAR NOT NULL,
    "room" VARCHAR NULL,
    "work_start" TIME NOT NULL,
    "work_end" TIME NOT NULL,
    CONSTRAINT "pk_doctor" PRIMARY KEY ("doctor_id"),
    CONSTRAINT "uc_doctor_person_id" UNIQUE ("person_id")
);

CREATE TABLE "patient" (
    "patient_id" UUID NOT NULL,
    "person_id" UUID NOT NULL,
    "date_of_admission" DATE NOT NULL,
    "date_of_discharge" DATE NULL,
    "policy_number" VARCHAR NOT NULL,
    "conditions" VARCHAR NULL,
    "notes" TEXT NULL,
    "department_id" UUID NULL,
    CONSTRAINT "pk_patient" PRIMARY KEY ("patient_id"),
    CONSTRAINT "uc_patient_person_id" UNIQUE ("person_id")
);

CREATE TABLE "department" (
    "department_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "bed_count" INT NOT NULL,
    "patient_count" INT NOT NULL,
    "doctors_count" INT NOT NULL,
    "director_id" UUID NOT NULL,
    CONSTRAINT "pk_department" PRIMARY KEY ("department_id"),
    CONSTRAINT "uc_department_director_id" UNIQUE ("director_id")
);

CREATE TABLE "appointment" (
    "appointment_id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "status" appointment_status NOT NULL,
    "doctor_id" UUID NOT NULL,
    CONSTRAINT "pk_appointment" PRIMARY KEY ("appointment_id")
);

CREATE TABLE "prescription" (
    "prescription_id" UUID NOT NULL,
    "drugs" VARCHAR NOT NULL,
    "issue" DATE NOT NULL,
    "expiration" DATE NOT NULL,
    "notes" TEXT NULL,
    "appointment_id" UUID NOT NULL,
    CONSTRAINT "pk_prescription" PRIMARY KEY ("prescription_id")
);

CREATE TABLE "audit_log" (
    "log_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,
    "action" audit_action NOT NULL,
    "log" TEXT NOT NULL,
    CONSTRAINT "pk_audit_log" PRIMARY KEY ("log_id")
);

ALTER TABLE "doctor" ADD CONSTRAINT "fk_doctor_person_id" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id");
ALTER TABLE "doctor" ADD CONSTRAINT "fk_doctor_department_id" FOREIGN KEY ("department_id") REFERENCES "department" ("department_id");

ALTER TABLE "patient" ADD CONSTRAINT "fk_patient_person_id" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id");
ALTER TABLE "patient" ADD CONSTRAINT "fk_patient_department_id" FOREIGN KEY ("department_id") REFERENCES "department" ("department_id");

ALTER TABLE "department" ADD CONSTRAINT "fk_department_director_id" FOREIGN KEY ("director_id") REFERENCES "doctor" ("doctor_id");

ALTER TABLE "appointment" ADD CONSTRAINT "fk_appointment_patient_id" FOREIGN KEY ("patient_id") REFERENCES "patient" ("patient_id");
ALTER TABLE "appointment" ADD CONSTRAINT "fk_appointment_doctor_id" FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("doctor_id");

ALTER TABLE "prescription" ADD CONSTRAINT "fk_prescription_appointment_id" FOREIGN KEY ("appointment_id") REFERENCES "appointment" ("appointment_id");

ALTER TABLE "audit_log" ADD CONSTRAINT "fk_audit_log_user_id" FOREIGN KEY ("user_id") REFERENCES "person" ("person_id");
