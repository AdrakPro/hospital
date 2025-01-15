<script lang="ts">
    import { fetchData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let prescriptions: any[] = [];

    const loadPrescriptions = async () => {
        prescriptions = await fetchData(`${BASE_URL}/patients/prescriptions`);
    };

    loadPrescriptions();
</script>

<h1>Patient Dashboard</h1>
<ul>
    {#each prescriptions as prescription}
        <li>
            Drugs: {prescription.drugs.join(', ')} - Notes: {prescription.notes}
        </li>
    {/each}
</ul>
