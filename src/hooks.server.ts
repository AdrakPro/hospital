import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
    const user = event.locals.user; // Extracted from session/cookies

    const protectedRoutes = {
        '/admin': 'ADMIN',
        '/doctor': 'DOCTOR',
        '/patient': 'PATIENT',
    };

    const requiredRole = protectedRoutes[event.url.pathname];

    if (requiredRole && (!user || user.role !== requiredRole)) {
        return new Response('Unauthorized', { status: 403 });
    }

    return resolve(event);
};

// do poprawy