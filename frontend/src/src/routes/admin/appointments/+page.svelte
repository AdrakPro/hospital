<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api.ts';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Appointment, AppointmentStatus } from '$lib/models/appointment';

    let appointments: Appointment[] = [];
    let newAppointment: Partial<Appointment> = {
        date: '',
        patientId: '',
        doctorId: '',
    };
    let appointmentToUpdate: Partial<Appointment> = {
        appointmentId: '',
        date: '',
        status: 'SCHEDULED' as AppointmentStatus, // Corrected type assignment
    };

    const loadAppointments = async (): Promise<void> => {
        appointments = await fetchData<Appointment[]>(`${BASE_URL}/appointments`);
    };

    const addAppointment = async (): Promise<void> => {
        await createData(`${BASE_URL}/appointments`, newAppointment);
        loadAppointments();
        newAppointment = {
            date: '',
            patientId: '',
            doctorId: '',
        };
    };

    const updateAppointment = async (): Promise<void> => {
        await updateData(`${BASE_URL}/appointments`, appointmentToUpdate);
        loadAppointments();
        appointmentToUpdate = {
            appointmentId: '',
            date: '',
            status: 'SCHEDULED' as AppointmentStatus, // Corrected type assignment
        };
    };

    const deleteAppointment = async (id: string): Promise<void> => {
        await deleteData(`${BASE_URL}/appointments/${id}`);
        loadAppointments();
    };

    loadAppointments();
</script>

<!-- Admin Dashboard -->
<h2>Appointments</h2>

<!-- Appointments List Sub-section -->
<h3>Appointments List</h3>
<ul>
    {#each appointments as appointment (appointment.appointmentId)}
        <li>
            <strong>Appointment ID:</strong> {appointment.appointmentId} <br />
            <strong>Date:</strong> {appointment.date} <br />
            <strong>Doctor ID:</strong> {appointment.doctorId} <br />
            <strong>Patient ID:</strong> {appointment.patientId} <br />
            <strong>Status:</strong> {appointment.status} <br />
            <button on:click={() => deleteAppointment(appointment.appointmentId)}>Delete</button>
            <button on:click={() => { appointmentToUpdate = { ...appointment }; }}>Edit</button>
        </li>
    {/each}
</ul>

<!-- Add Appointment Form -->
<h3>Add Appointment</h3>
<form on:submit|preventDefault={addAppointment}>
    <input bind:value={newAppointment.date} type="date" placeholder="Date"/>
    <input bind:value={newAppointment.patientId} placeholder="Patient ID"/>
    <input bind:value={newAppointment.doctorId} placeholder="Doctor ID"/>
    <button type="submit">Add Appointment</button>
</form>

<!-- Update Appointment Form -->
<h3>Update Appointment</h3>
<form on:submit|preventDefault={updateAppointment}>
    <input bind:value={appointmentToUpdate.appointmentId} placeholder="Appointment ID" disabled/>
    <input bind:value={appointmentToUpdate.date} type="date" placeholder="Date"/>
    <select bind:value={appointmentToUpdate.status}>
        <option value="SCHEDULED">Scheduled</option>
        <option value="CANCELED">Canceled</option>
        <option value="COMPLETED">Completed</option>
        <option value="NO_SHOW">No Show</option>
    </select>
    <button type="submit">Update Appointment</button>
</form>
