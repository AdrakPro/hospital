import type { Handle } from '@sveltejs/kit';
import { user } from  '$lib/stores/user'; // Importing user from the store
import { get } from 'svelte/store'; // Importing the get function to read the store value

export const handle: Handle = async ({ event, resolve }) => {
    const currentUser = get(user); // Reading the user from the store

    const protectedRoutes = {
        '/admin': 'ADMIN',
        '/doctor': 'DOCTOR',
        '/patient': 'PATIENT',
        '/director': 'DIRECTOR',
    };

    const requiredRole = protectedRoutes[event.url.pathname as '/admin' | '/doctor' | '/patient' | '/director'];


    if (requiredRole && (!currentUser || currentUser.role !== requiredRole)) {
        return new Response('Unauthorized', { status: 403 });
    }

    return resolve(event);
};
