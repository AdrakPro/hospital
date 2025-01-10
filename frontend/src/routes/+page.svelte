<script lang="ts">
    import type { PageData } from './$types';
    // export let data: JakisModel[];

    let { data }: { data: PageData } = $props();
    console.log(data)
    const { user } = data;
    console.log(user)
</script>
<!-- moze podswietlac na czerwono bo typow nie dodawalem -->
<!--usera bedziesz musial zapisac w aplikacji, uzyj np svelte store -->
<h1>Data from API:</h1>
<ul>
  <li>Token: {user.data.token}</li>
  <li>Role: {user.data.role}</li>
  <li>PersonId: {user.data.personId}</li>
</ul>
