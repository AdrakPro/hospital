import { BASE_URL } from '$lib/constants.ts';
import type { PageLoad } from './$types'; // czasami ts sie buguje i pokazuje na czerwono, ale dziala git. usun ten komentarz

export async function load(): PageLoad {
  // musisz dodac sobie manualnie uzytkownia do postegre bazy
  const username = "piotrek1234";
  const password = "piotrek1234";
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  // const data: JakisModel[] = await response.json();
  const user = await response.json();

  return { user };
}
