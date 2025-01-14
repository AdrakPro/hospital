<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';
    import { goto } from '$app/navigation';

    let departments: any[] = [];

    const loadDashboard = async () => {
        departments = await fetchData(`${BASE_URL}/departments`);
    };

    loadDashboard();

    // wiecej przyciskow w ui dodac do podstron (i dorobic podstrony)
</script>

<h1>Admin Dashboard</h1>

<button on:click={() => goto('/admin/doctors')}>Doctors</button>
<button on:click={() => goto('/admin/departments')}>Departments</button>
<button on:click={() => goto('/admin/patients')}>Patients</button>

<section>
    <h2>Departments</h2>
    <ul>
        {#each departments as department}
            <li>{department.name} - {department.bedCount} beds</li>
        {/each}
    </ul>
</section>
