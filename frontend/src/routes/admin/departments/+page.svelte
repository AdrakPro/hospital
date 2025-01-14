<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let departments: any[] = [];

    const loadDepartments = async () => {
        departments = await fetchData(`${BASE_URL}/departments`);
    };

    loadDepartments();

    // dodac funkcjonalnosci poza wyswietlaniem
</script>

<section>
    <h2>Departments</h2>
    <ul>
        {#each departments as department}
            <li>{department.name} - {department.bedCount} beds</li>
        {/each}
    </ul>
</section>