-- Create the enum type for appointment status
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'canceled', 'no_show');

-- Create the person table
CREATE TABLE person (
  person_id uuid PRIMARY KEY,
  name varchar NOT NULL,
  surname varchar NOT NULL,
  date_of_birth date NOT NULL,
  pesel char(11) NOT NULL,
  phone_number char(11) NOT NULL,
  address varchar NOT NULL
);

-- Create the patient table
CREATE TABLE patient (
  patient_id uuid PRIMARY KEY,
  person_id uuid UNIQUE,
  date_of_admission date NOT NULL,
  date_of_discharge date,
  policy_number varchar NOT NULL,
  department_id uuid
);

-- Create the doctor table
CREATE TABLE doctor (
  doctor_id uuid PRIMARY KEY,
  person_id uuid UNIQUE,
  specialization varchar NOT NULL,
  room varchar,
  work_start time NOT NULL,
  work_end time NOT NULL,
  department_id uuid
);

-- Pytania
-- Czy lepiej drugs jako jeden string i potem go updaowac, czy dodawac jako array []
-- Czy zostawic patient_count, czy liczyc go uzywajac query
-- czy char uzywac jako fixed-string
-- co poprawic?


-- Create the appointment table
CREATE TABLE appointment (
  appointment_id uuid PRIMARY KEY,
  doctor_id uuid,
  date timestamp NOT NULL,
  status appointment_status NOT NULL,
  patient_id uuid
);

-- Create the department table
CREATE TABLE department (
  department_id uuid PRIMARY KEY,
  name varchar NOT NULL,
  bed_count int NOT NULL,
  patients_count int NOT NULL,
  director_id uuid UNIQUE
);

-- Create the prescription table
CREATE TABLE prescription (
  prescription_id uuid PRIMARY KEY,
  drugs varchar NOT NULL,
  issue date NOT NULL,
  expiration date NOT NULL,
  notes text,
  appointment_id uuid
);

-- Create the medical history table
CREATE TABLE medical_history (
  history_id uuid PRIMARY KEY,
  patient_id uuid UNIQUE,
  conditions varchar,
  treatments varchar,
  allergies varchar,
  notes text
);

-- Add foreign key constraints
ALTER TABLE patient ADD FOREIGN KEY (person_id) REFERENCES person (person_id);
ALTER TABLE patient ADD FOREIGN KEY (department_id) REFERENCES department (department_id);

ALTER TABLE doctor ADD FOREIGN KEY (person_id) REFERENCES person (person_id);
ALTER TABLE doctor ADD FOREIGN KEY (department_id) REFERENCES department (department_id);

ALTER TABLE appointment ADD FOREIGN KEY (doctor_id) REFERENCES doctor (doctor_id);
ALTER TABLE appointment ADD FOREIGN KEY (patient_id) REFERENCES patient (patient_id);

ALTER TABLE department ADD FOREIGN KEY (director_id) REFERENCES doctor (doctor_id);

ALTER TABLE prescription ADD FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id);

ALTER TABLE medical_history ADD FOREIGN KEY (patient_id) REFERENCES patient (patient_id);
