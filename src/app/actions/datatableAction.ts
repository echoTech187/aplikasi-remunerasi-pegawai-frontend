'use server'

export async function request(url: String, token: String, page: number, perPage: number): Promise<any> {
    'use server'
    try {
        const response = await fetch(`${url}?limit=${perPage}&skip=${(page - 1) * perPage}`,
            {
                method: 'GET',
                mode: 'no-cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },

            }
        ).then(res => res);
        if (response.ok) {
            return {
                data: await response.json(),
                total: 0,
                skip: (page - 1) * perPage,
                limit: perPage,
                error: ''
            };
        } else {
            return {
                data: [],
                total: 0,
                skip: 0,
                limit: 0,
                error: response.statusText
            };
        }
    } catch (error) {
        return {
            data: [],
            total: 0,
            skip: 0,
            limit: 0,
            error: (error as Error).message
        };
    }
}