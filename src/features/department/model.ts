interface Department {
  departmentId: string;
  name: string;
  bedCount: number;
  patientCount: number;
  doctorsCount: number;
  directorId: string;
  director: Doctor;
  doctors: Doctor[];
  patients: Patient[];
}
