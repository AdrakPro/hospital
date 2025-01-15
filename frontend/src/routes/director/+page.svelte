<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Department } from '$lib/models/department';
    import { writable } from 'svelte/store';
    import { get } from 'svelte/store';
    import { user } from '$lib/stores/user'; // Import user store for logged-in doctor info

    let directorDepartment = writable<Department | null>(null);
    let error = writable('');

    const loadDirectorDepartment = async (): Promise<void> => {
        const loggedInDoctor = get(user); // Get logged-in doctor info
        if (!loggedInDoctor) {
            error.set('User is not authenticated.');
            return;
        }

        const departments = await fetchData<Department[]>(`${BASE_URL}/departments`);
        const foundDepartment = departments.find(department => department.director.personId === loggedInDoctor.personId);
        if (foundDepartment) {
            directorDepartment.set(foundDepartment);
        } else {
            error.set('No department found for the logged-in director.');
        }
    };

    onMount(() => {
        loadDirectorDepartment(); // Load department info if the user is a director
    });
</script>

<h2>Director Information</h2>

<!-- Display Error Message -->
{#if $error}
    <p>{ $error }</p>
{/if}

<!-- Display Director's Department Information -->
{#if $directorDepartment}
    <h3>Department Information</h3>
    <ul>
        <li><strong>Department ID:</strong> {$directorDepartment.departmentId}</li>
        <li><strong>Name:</strong> {$directorDepartment.name}</li>
        <li><strong>Bed Count:</strong> {$directorDepartment.bedCount}</li>
        <li><strong>Patient Count:</strong> {$directorDepartment.patientCount}</li>
        <li><strong>Doctor Count:</strong> {$directorDepartment.doctorCount}</li>
        <li><strong>Doctors:</strong>
            <ul>
                {#each $directorDepartment.doctors as doctor}
                    <li>{doctor.person.name} {doctor.person.surname} - Specialization: {doctor.specialization}, Room: {doctor.room}</li>
                {/each}
            </ul>
        </li>
        <li><strong>Patients:</strong>
            <ul>
                {#each $directorDepartment.patients as patient}
                    <li>{patient.person.name} {patient.person.surname}</li>
                {/each}
            </ul>
        </li>
    </ul>
{/if}
