export const fetchWithMethod = async (url: string, method: string, body?: any) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.json();
};

export const fetchData = async <T>(url: string): Promise<T> => {
    return fetchWithMethod(url, 'GET');
};

export const createData = async <T>(url: string, body: any): Promise<T> => {
    return fetchWithMethod(url, 'POST', body);
};

export const updateData = async <T>(url: string, body: any): Promise<T> => {
    return fetchWithMethod(url, 'PUT', body);
};

export const deleteData = async <T>(url: string): Promise<T> => {
    return fetchWithMethod(url, 'DELETE');
};

// leniwe naprawa dla panelu login
export const fetchDataLogin = async (url: string, method = 'GET', body?: any) => {
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