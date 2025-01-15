<script lang="ts">
    import { fetchData, updateData } from '$lib/utils/api.ts';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Person } from '$lib/models/person';

    let persons: Person[] = [];
    let personToUpdate: Partial<Person> = {
        personId: '',
        name: '',
        surname: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
        username: '',
        password: '',
        role: undefined,
    };

    const loadPersons = async (): Promise<void> => {
        persons = await fetchData<Person[]>(`${BASE_URL}/persons`);
    };

    const updatePerson = async (): Promise<void> => {
        await updateData(`${BASE_URL}/persons`, personToUpdate);
        loadPersons();
        personToUpdate = {
            personId: '',
            name: '',
            surname: '',
            dateOfBirth: '',
            phoneNumber: '',
            address: '',
            username: '',
            password: '',
            role: undefined,
        };
    };

    loadPersons();
</script>

<!-- Admin Dashboard -->
<h1>Admin Dashboard</h1>

<!-- Persons Section -->
<h2>Persons</h2>

<!-- Persons List Sub-section -->
<h3>Persons List</h3>
<ul>
    {#each persons as person (person.personId)}
        <li>
            <strong>ID:</strong> {person.personId}<br />
            <strong>Name:</strong> {person.name}<br />
            <strong>Surname:</strong> {person.surname}<br />
            <strong>Date of Birth:</strong> {person.dateOfBirth}<br />
            <strong>Phone Number:</strong> {person.phoneNumber}<br />
            <strong>Address:</strong> {person.address}<br />
            <strong>Username:</strong> {person.username}<br />
            <strong>Password (Hashed):</strong> {person.password}<br />
            <strong>Role:</strong> {person.role}<br />
            <button on:click={() => { personToUpdate = person }}>Edit</button>
        </li>
    {/each}
</ul>

<!-- Update Person Sub-section -->
<h3>Update Person</h3>
<form on:submit|preventDefault={updatePerson}>
    <input bind:value={personToUpdate.personId} placeholder="Person ID" disabled />
    <input bind:value={personToUpdate.name} placeholder="Name" />
    <input bind:value={personToUpdate.surname} placeholder="Surname" />
    <input bind:value={personToUpdate.dateOfBirth} type="date" placeholder="Date of Birth" />
    <input bind:value={personToUpdate.phoneNumber} placeholder="Phone Number" />
    <input bind:value={personToUpdate.address} placeholder="Address" />
    <input bind:value={personToUpdate.username} placeholder="Username" />
    <input bind:value={personToUpdate.password} type="password" placeholder="Password" />
    <select bind:value={personToUpdate.role}>
        <option value="">Select Role</option>
        <option value="PATIENT">Patient</option>
        <option value="DOCTOR">Doctor</option>
        <option value="DIRECTOR">Director</option>
        <option value="ADMIN">Admin</option>
    </select>
    <button type="submit">Update Person</button>
</form>
