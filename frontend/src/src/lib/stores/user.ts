import { writable } from 'svelte/store';

type User = {
    personId: string;
    role: 'ADMIN' | 'DOCTOR' | 'PATIENT';
    token: string;
};

export const user = writable<User | null>(null); // Store can be null if no user is logged in
