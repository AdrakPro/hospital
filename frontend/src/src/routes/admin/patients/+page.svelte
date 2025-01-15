<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Patient } from '$lib/models/patient';
    import type { Person } from '$lib/models/person';

    let patients: Patient[] = [];
    let newPatient: Patient = {
        patientId: '',
        personId: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
        policyNumber: '',
        conditions: [],
        notes: '',
        appointments: [],
        person: {
            personId: '',
            name: '',
            surname: '',
            dateOfBirth: '',
            phoneNumber: '',
            address: '',
            username: '',
            password: '',
            role: undefined,
            auditLogs: [],
        } as Person
    };

    let patientToUpdate: Patient = {
        ...newPatient // Initialize with the same structure as newPatient
    };

    const loadPatients = async (): Promise<void> => {
        patients = await fetchData<Patient[]>(`${BASE_URL}/patients`);
    };

    const addPatient = async (): Promise<void> => {
        await createData(`${BASE_URL}/patients`, newPatient);
        loadPatients();
        newPatient = {
            ...newPatient
        }; // Reset to default structure with empty values
    };

    const updatePatient = async (): Promise<void> => {
        await updateData(`${BASE_URL}/patients`, patientToUpdate);
        loadPatients();
        patientToUpdate = {
            ...newPatient
        }; // Reset to default structure with empty values
    };

    const deletePatient = async (id: string): Promise<void> => {
        await deleteData(`${BASE_URL}/patients/${id}`);
        loadPatients();
    };

    loadPatients();
</script>

<!-- Admin Dashboard -->
<h1>Admin Dashboard</h1>

<!-- Patients Section -->
<h2>Patients</h2>

<!-- Patients List Sub-section -->
<h3>Patients List</h3>
<ul>
    {#each patients as patient (patient.patientId)}
        <li>
            <strong>Patient ID:</strong> {patient.patientId} <br />
            <strong>Name:</strong> {patient.person.name} {patient.person.surname} <br />
            <strong>Conditions:</strong> {patient.conditions.join(', ')} <br />
            <strong>Admitted:</strong> {patient.dateOfAdmission} <br />
            {#if patient.dateOfDischarge}
                <strong>Discharged:</strong> {patient.dateOfDischarge} <br />
            {/if}
            <strong>Policy Number:</strong> {patient.policyNumber} <br />
            <strong>Notes:</strong> {patient.notes} <br />
            <button on:click={() => deletePatient(patient.patientId)}>Delete</button>
            <button on:click={() => { patientToUpdate = { ...patient }; }}>Edit</button>
        </li>
    {/each}
</ul>

<!-- Add Patient Form -->
<h3>Add Patient</h3>
<form on:submit|preventDefault={addPatient}>
    <h4>Person Details</h4>
    <input bind:value={newPatient.person.name} placeholder="Name" />
    <input bind:value={newPatient.person.surname} placeholder="Surname" />
    <input bind:value={newPatient.person.dateOfBirth} type="date" placeholder="Date of Birth" />
    <input bind:value={newPatient.person.phoneNumber} placeholder="Phone Number" />
    <input bind:value={newPatient.person.address} placeholder="Address" />
    <input bind:value={newPatient.person.username} placeholder="Username" />
    <input bind:value={newPatient.person.password} type="password" placeholder="Password" />

    <h4>Patient Details</h4>
    <input bind:value={newPatient.conditions} placeholder="Conditions" />
    <input bind:value={newPatient.dateOfAdmission} type="date" placeholder="Date of Admission" />
    <input bind:value={newPatient.policyNumber} placeholder="Policy Number" />
    <textarea bind:value={newPatient.notes} placeholder="Notes"></textarea>
    <button type="submit">Add Patient</button>
</form>


<!-- Update Patient Form -->
<h3>Update Patient</h3>
<form on:submit|preventDefault={updatePatient}>
    <input bind:value={patientToUpdate.person.personId} placeholder="Person ID" />
    <input bind:value={patientToUpdate.conditions} placeholder="Conditions" />
    <input bind:value={patientToUpdate.dateOfAdmission} type="date" placeholder="Date of Admission" />
    <input bind:value={patientToUpdate.policyNumber} placeholder="Policy Number" />
    <textarea bind:value={patientToUpdate.notes} placeholder="Notes"></textarea>
    <button type="submit">Update Patient</button>
</form>
