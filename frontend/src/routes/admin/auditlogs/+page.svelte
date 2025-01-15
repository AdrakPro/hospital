<script lang="ts">
    import { fetchData, createData, deleteData } from '$lib/utils/api.ts';
    import { BASE_URL } from '$lib/constants.ts';
    import type { AuditLog, AuditAction } from '$lib/models/auditlog';
    import { writable } from 'svelte/store'; // Svelte store for reactive variables

    let auditLogs: AuditLog[] = [];
    let personAuditLogs: AuditLog[] = [];
    const personId = writable(''); // Store for handling personId input

    const newAuditLog: Partial<AuditLog> = {
        personId: '',
        action: 'GET' as AuditAction,
        log: '',
    };

    const loadAuditLogs = async (): Promise<void> => {
        auditLogs = await fetchData<AuditLog[]>(`${BASE_URL}/logs`);
    };

    const loadPersonAuditLogs = async (): Promise<void> => {
        personAuditLogs = await fetchData<AuditLog[]>(`${BASE_URL}/persons/${$personId}/logs`);
    };

    const addAuditLog = async (): Promise<void> => {
        await createData(`${BASE_URL}/logs`, newAuditLog);
        loadAuditLogs();
        newAuditLog.personId = '';
        newAuditLog.action = 'GET' as AuditAction;
        newAuditLog.log = '';
    };

    const deletePersonAuditLogs = async (id: string): Promise<void> => {
        await deleteData(`${BASE_URL}/persons/${id}/logs`);
        loadAuditLogs();
    };

    loadAuditLogs();
</script>

<!-- Admin Dashboard -->
<h2>Audit Logs</h2>

<!-- General Audit Logs List -->
<h3>All Audit Logs</h3>
<ul>
    {#each auditLogs as auditLog (auditLog.logId)}
        <li>
            <strong>Person ID:</strong> {auditLog.personId} <br />
            <strong>Action:</strong> {auditLog.action} <br />
            <strong>Log:</strong> {auditLog.log} <br />
            <strong>Created At:</strong> {auditLog.createdAt} <br />
        </li>
    {/each}
</ul>

<!-- Add Audit Log Form -->
<h3>Add Audit Log</h3>
<form on:submit|preventDefault={addAuditLog}>
    <input bind:value={newAuditLog.personId} placeholder="Person ID" />
    <select bind:value={newAuditLog.action}>
        <option value="CREATE">Create</option>
        <option value="UPDATE">Update</option>
        <option value="DELETE">Delete</option>
        <option value="GET">Get</option>
    </select>
    <textarea bind:value={newAuditLog.log} placeholder="Log"></textarea>
    <button type="submit">Add Audit Log</button>
</form>

<!-- Delete Person's Audit Logs -->
<h3>Delete Audit Logs for a Person</h3>
<form on:submit|preventDefault={() => deletePersonAuditLogs($personId)}>
    <input bind:value={$personId} placeholder="Person ID" />
    <button type="submit">Delete Logs</button>
</form>

<!-- List Person's Audit Logs -->
<h3>View Audit Logs for a Person</h3>
<form on:submit|preventDefault={loadPersonAuditLogs}>
    <input bind:value={$personId} placeholder="Person ID" />
    <button type="submit">Load Logs</button>
</form>
<ul>
    {#each personAuditLogs as auditLog (auditLog.logId)}
        <li>
            <strong>Action:</strong> {auditLog.action} <br />
            <strong>Log:</strong> {auditLog.log} <br />
            <strong>Created At:</strong> {auditLog.createdAt} <br />
        </li>
    {/each}
</ul>
