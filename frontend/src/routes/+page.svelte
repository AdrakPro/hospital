<script lang="ts">
  import { user } from '$lib/stores/user'; // Import the store
  import type { PageData } from './$types';
  import { goto } from "$app/navigation"; // Import goto for navigation

  // Props from the page
  let { data }: { data: PageData } = $props();

  // Log the data for debugging
  console.log(data);
  const { user: userData } = data;

  // Log the extracted user for debugging
  console.log(userData);

  // Save the extracted user in the store
  user.set(userData);

  // Function to navigate to the login page
  function goToLogin() {
    goto('/login');
  }
</script>

<h1>Data from API:</h1>
<ul>
  <li>Token: {data.user.token}</li>
  <li>Role: {data.user.role}</li>
  <li>PersonId: {data.user.personId}</li>
</ul>

<!-- Add a button for navigating to the login page -->
<button on:click={goToLogin}>Go to Login</button>
