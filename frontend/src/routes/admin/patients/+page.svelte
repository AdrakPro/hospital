<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let patients: any[] = [];
    let newPatient: any = {};
    let patientToUpdate: any = {};

    const loadPatients = async () => {
        patients = await fetchData(`${BASE_URL}/patients`);
    };

    const addPatient = async () => {
        await createData(`${BASE_URL}/patients`, newPatient);
        loadPatients();
        newPatient = {};
    };

    const updatePatient = async () => {
        await updateData(`${BASE_URL}/patients`, patientToUpdate);
        loadPatients();
        patientToUpdate = {};
    };

    const deletePatient = async (id: string) => {
        await deleteData(`${BASE_URL}/patients/${id}`);
        loadPatients();
    };

    loadPatients();
</script>

<h1>Admin Dashboard</h1>

<section>
    <h2>Patients</h2>

    <h3>Patients List</h3>
    <ul>
        {#each patients as patient (patient.patientId)}
            <li>
                {patient.person.name} {patient.person.surname} - Conditions: {patient.conditions.join(', ')} - Admitted: {patient.dateOfAdmission}
                {#if patient.dateOfDischarge}
                    - Discharged: {patient.dateOfDischarge}
                {/if}
                <button on:click={() => deletePatient(patient.patientId)}>Delete</button>
                <button on:click={() => { patientToUpdate = patient }}>Edit</button>
            </li>
        {/each}
    </ul>

    <h3>Add Patient</h3>
    <form on:submit|preventDefault={addPatient}>
        <input bind:value={newPatient.person.name} placeholder="Name" />
        <input bind:value={newPatient.person.surname} placeholder="Surname" />
        <input bind:value={newPatient.conditions} placeholder="Conditions" />
        <input bind:value={newPatient.dateOfAdmission} type="date" placeholder="Date of Admission" />
        <input bind:value={newPatient.dateOfDischarge} type="date" placeholder="Date of Discharge (Optional)" />
        <input bind:value={newPatient.policyNumber} placeholder="Policy Number" />
        <textarea bind:value={newPatient.notes} placeholder="Notes"></textarea>
        <button type="submit">Add Patient</button>
    </form>

    <h3>Update Patient</h3>
    <form on:submit|preventDefault={updatePatient}>
        <input bind:value={patientToUpdate.person.name} placeholder="Name" />
        <input bind:value={patientToUpdate.person.surname} placeholder="Surname" />
        <input bind:value={patientToUpdate.conditions} placeholder="Conditions" />
        <input bind:value={patientToUpdate.dateOfAdmission} type="date" placeholder="Date of Admission" />
        <input bind:value={patientToUpdate.dateOfDischarge} type="date" placeholder="Date of Discharge (Optional)" />
        <input bind:value={patientToUpdate.policyNumber} placeholder="Policy Number" />
        <textarea bind:value={patientToUpdate.notes} placeholder="Notes"></textarea>
        <button type="submit">Update Patient</button>
    </form>
</section>

