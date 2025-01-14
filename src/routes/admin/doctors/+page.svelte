<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let doctors: any[] = [];
    let newDoctor: any = {};
    let doctorToUpdate: any = {};

    const loadDoctors = async () => {
        doctors = await fetchData(`${BASE_URL}/doctors`);
    };

    const addDoctor = async () => {
        await createData(`${BASE_URL}/doctors`, newDoctor);
        loadDoctors();
        newDoctor = {};
    };

    const updateDoctor = async () => {
        await updateData(`${BASE_URL}/doctors`, doctorToUpdate);
        loadDoctors();
        doctorToUpdate = {};
    };

    const deleteDoctor = async (id: string) => {
        await deleteData(`${BASE_URL}/doctors/${id}`);
        loadDoctors();
    };

    loadDoctors();

    // dodac doctorId do formularzy i wyswietlania (potencjalnie)

</script>

<h2>Doctors</h2>

<h3>Doctors List</h3>
<ul>
    {#each doctors as doctor (doctor.id)}
        <li>{doctor.person.name} {doctor.person.surname} - {doctor.specialization}, Room {doctor.room}, {doctor.workStart} - {doctor.workEnd}
            <button on:click={() => deleteDoctor(doctor.id)}>Delete</button>
            <button on:click={() => { doctorToUpdate = doctor }}>Edit</button>
        </li>
    {/each}
</ul>

<h3>Add Doctor</h3>
<form on:submit|preventDefault={addDoctor}>
    <input bind:value={newDoctor.name} placeholder="Name" />
    <input bind:value={newDoctor.surname} placeholder="Surname" />
    <input bind:value={newDoctor.specialization} placeholder="Specialization" />
    <input bind:value={newDoctor.room} placeholder="Room" />
    <input bind:value={newDoctor.workStart} placeholder="Work Start" />
    <input bind:value={newDoctor.workEnd} placeholder="Work End" />
    <button type="submit">Add Doctor</button>
</form>

<h3>Update Doctor</h3>
<form on:submit|preventDefault={updateDoctor}>
    <input bind:value={doctorToUpdate.name} placeholder="Name" />
    <input bind:value={doctorToUpdate.surname} placeholder="Surname" />
    <input bind:value={doctorToUpdate.specialization} placeholder="Specialization" />
    <input bind:value={doctorToUpdate.room} placeholder="Room" />
    <input bind:value={doctorToUpdate.workStart} placeholder="Work Start" />
    <input bind:value={doctorToUpdate.workEnd} placeholder="Work End" />
    <button type="submit">Update Doctor</button>
</form>
