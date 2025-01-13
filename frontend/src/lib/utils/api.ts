
export const fetchData = async (url: string, method = 'GET', body?: any) => {
    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.json();
};
