<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Doctor } from '$lib/models/doctor';
    import type { Person } from '$lib/models/person';

    let doctors: Doctor[] = [];
    let newDoctor: Doctor = {
        doctorId: '',
        personId: '',
        specialization: '',
        room: '',
        workStart: '',
        workEnd: '',
        appointments: [],
        person: {
            name: '',
            surname: '',
            dateOfBirth: '',
            phoneNumber: '',
            address: '',
            username: '',
            password: ''
        } as Person
    };
    let doctorToUpdate: Doctor = {
        doctorId: '',
        personId: '',
        specialization: '',
        room: '',
        workStart: '',
        workEnd: '',
        appointments: [],
        person: {
            name: '',
            surname: '',
            dateOfBirth: '',
            phoneNumber: '',
            address: '',
            username: '',
            password: ''
        } as Person
    };

    const loadDoctors = async (): Promise<void> => {
        doctors = await fetchData<Doctor[]>(`${BASE_URL}/doctors`);
    };

    const addDoctor = async (): Promise<void> => {
        await createData(`${BASE_URL}/doctors`, newDoctor);
        loadDoctors();
        newDoctor = {
            ...newDoctor
        };
    };

    const updateDoctor = async (): Promise<void> => {
        await updateData(`${BASE_URL}/doctors`, doctorToUpdate);
        loadDoctors();
        doctorToUpdate = {
           ...doctorToUpdate
        };
    };

    const deleteDoctor = async (id: string): Promise<void> => {
        await deleteData(`${BASE_URL}/doctors/${id}`);
        loadDoctors();
    };

    loadDoctors();
</script>

<!-- Admin Dashboard -->
<h2>Doctors</h2>

<!-- Doctors List Sub-section -->
<h3>Doctors List</h3>
<ul>
    {#each doctors as doctor (doctor.doctorId)}
        <li>
            <strong>Doctor ID:</strong> {doctor.doctorId} <br />
            <strong>Name:</strong> {doctor.person.name} {doctor.person.surname} <br />
            <strong>Specialization:</strong> {doctor.specialization} <br />
            <strong>Room:</strong> {doctor.room} <br />
            <strong>Work Hours:</strong> {doctor.workStart} - {doctor.workEnd} <br />
            <button on:click={() => deleteDoctor(doctor.doctorId)}>Delete</button>
            <button on:click={() => { doctorToUpdate = { ...doctor }; }}>Edit</button>
        </li>
    {/each}
</ul>

<!-- Add Doctor Form -->
<h3>Add Doctor</h3>
<form on:submit|preventDefault={addDoctor}>
    <h4>Person Details</h4>
    <input bind:value={newDoctor.person.name} placeholder="Name" />
    <input bind:value={newDoctor.person.surname} placeholder="Surname" />
    <input bind:value={newDoctor.person.dateOfBirth} type="date" placeholder="Date of Birth" />
    <input bind:value={newDoctor.person.phoneNumber} placeholder="Phone Number" />
    <input bind:value={newDoctor.person.address} placeholder="Address" />
    <input bind:value={newDoctor.person.username} placeholder="Username" />
    <input bind:value={newDoctor.person.password} type="password" placeholder="Password" />

    <h4>Doctor Details</h4>
    <input bind:value={newDoctor.specialization} placeholder="Specialization" />
    <input bind:value={newDoctor.room} placeholder="Room" />
    <input bind:value={newDoctor.workStart} placeholder="Work Start (HH:mm)" />
    <input bind:value={newDoctor.workEnd} placeholder="Work End (HH:mm)" />
    <button type="submit">Add Doctor</button>
</form>

<!-- Update Doctor Form -->
<h3>Update Doctor</h3>
<form on:submit|preventDefault={updateDoctor}>
    <input bind:value={doctorToUpdate.specialization} placeholder="Specialization" />
    <input bind:value={doctorToUpdate.room} placeholder="Room" />
    <input bind:value={doctorToUpdate.workStart} placeholder="Work Start (HH:mm)" />
    <input bind:value={doctorToUpdate.workEnd} placeholder="Work End (HH:mm)" />
    <button type="submit">Update Doctor</button>
</form>
