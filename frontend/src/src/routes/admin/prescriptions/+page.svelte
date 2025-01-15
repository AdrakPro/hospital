<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api.ts';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Prescription } from '$lib/models/prescription';
    import type { Appointment } from '$lib/models/appointment';

    let prescriptions: Prescription[] = [];
    let newPrescription: Partial<Prescription> = {
        drugs: [],
        notes: '',
        appointmentId: '',
    };
    let prescriptionToUpdate: Partial<Prescription> = {
        drugs: [],
        notes: '',
        appointmentId: '',
    };

    const loadPrescriptions = async (): Promise<void> => {
        prescriptions = await fetchData<Prescription[]>(`${BASE_URL}/prescriptions`);
    };

    const addPrescription = async (): Promise<void> => {
        await createData(`${BASE_URL}/prescriptions`, newPrescription);
        loadPrescriptions();
        newPrescription = {
            drugs: [],
            notes: '',
            appointmentId: '',
        };
    };

    const updatePrescription = async (): Promise<void> => {
        await updateData(`${BASE_URL}/prescriptions`, prescriptionToUpdate);
        loadPrescriptions();
        prescriptionToUpdate = {
            drugs: [],
            notes: '',
            appointmentId: '',
        };
    };

    const deletePrescription = async (id: string): Promise<void> => {
        await deleteData(`${BASE_URL}/prescriptions/${id}`);
        loadPrescriptions();
    };

    loadPrescriptions();
</script>

<!-- Admin Dashboard -->
<h2>Prescriptions</h2>

<!-- Prescriptions List Sub-section -->
<h3>Prescriptions List</h3>
<ul>
    {#each prescriptions as prescription (prescription.prescriptionId)}
        <li>
            <strong>Prescription ID:</strong> {prescription.prescriptionId} <br />
            <strong>Drugs:</strong> {prescription.drugs.join(', ')} <br />
            <strong>Issue Date:</strong> {prescription.issue} <br />
            <strong>Expiration Date:</strong> {prescription.expiration} <br />
            <strong>Status:</strong> {prescription.status} <br />
            <strong>Appointment ID:</strong> {prescription.appointmentId} <br />
            <strong>Notes:</strong> {prescription.notes || 'None'} <br />
            <button on:click={() => deletePrescription(prescription.prescriptionId)}>Delete</button>
            <button on:click={() => { prescriptionToUpdate = { ...prescription }; }}>Edit</button>
        </li>
    {/each}
</ul>

<!-- Add Prescription Form -->
<h3>Add Prescription</h3>
<form on:submit|preventDefault={addPrescription}>
    <input bind:value={newPrescription.drugs} placeholder="Drugs (comma separated)" />
    <input bind:value={newPrescription.appointmentId} placeholder="Appointment ID" />
    <textarea bind:value={newPrescription.notes} placeholder="Notes"></textarea>
    <button type="submit">Add Prescription</button>
</form>

<!-- Update Prescription Form -->
<h3>Update Prescription</h3>
<form on:submit|preventDefault={updatePrescription}>
    <input bind:value={prescriptionToUpdate.drugs} placeholder="Drugs (comma separated)" />
    <input bind:value={prescriptionToUpdate.appointmentId} placeholder="Appointment ID" />
    <textarea bind:value={prescriptionToUpdate.notes} placeholder="Notes"></textarea>
    <button type="submit">Update Prescription</button>
</form>
