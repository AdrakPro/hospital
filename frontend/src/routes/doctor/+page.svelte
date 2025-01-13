<script lang="ts">
    import { fetchData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let appointments: any[] = [];

    const loadAppointments = async () => {
        appointments = await fetchData(`${BASE_URL}/doctors/appointments`);
    };

    loadAppointments();
</script>

<h1>Doctor Dashboard</h1>
<ul>
    {#each appointments as appointment}
        <li>
            Patient: {appointment.patient.person.name} on {appointment.date} - Status: {appointment.status}
        </li>
    {/each}
</ul>
