<script lang="ts">
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores/user';
    import { fetchData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';

    let username = '';
    let password = '';
    let error = '';

    const handleLogin = async () => {
        try {
            const response = await fetchData(`${BASE_URL}/login`, 'POST', { username, password });
            user.set(response.user);
            if (response.user.role === 'ADMIN') {
                goto(`${BASE_URL}/admin`);
            } else if (response.user.role === 'DOCTOR') {
                goto(`${BASE_URL}/doctor`);
            } else {
                goto(`${BASE_URL}/patient`);
            }
        } catch (e) {
            error = e.message || 'Invalid username or password';
        }
    };
</script>

<form on:submit|preventDefault={handleLogin}>
    <input type="text" bind:value={username} placeholder="Username" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Login</button>
    {#if error}
        <p class="error">{error}</p>
    {/if}
</form>

<style>
    .error {
        color: red;
    }
</style>
