<script lang="ts">
    import { fetchData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let departments: any[] = [];
    let doctors: any[] = [];

    const loadDashboard = async () => {
        departments = await fetchData(`${BASE_URL}/departments`);
        doctors = await fetchData(`${BASE_URL}/doctors`);
    };

    loadDashboard();
</script>

<h1>Admin Dashboard</h1>
<section>
    <h2>Departments</h2>
    <ul>
        {#each departments as department}
            <li>{department.name} - {department.bedCount} beds</li>
        {/each}
    </ul>
</section>

<section>
    <h2>Doctors</h2>
    <ul>
        {#each doctors as doctor}
            <li>{doctor.person.name} {doctor.person.surname} - {doctor.specialization}</li>
        {/each}
    </ul>
</section>
