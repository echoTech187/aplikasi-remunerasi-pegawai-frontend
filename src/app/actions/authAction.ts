"use server"

export async function login(data: FormData) {
    const email = data.get('email')
    const password = data.get('password')
    const res = await fetch('http://aplikasi-remunerasi-pegawai.test/api/v1/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        mode: 'no-cors'
    }).then(res => res.json());
    return res;
}

export async function logout() {
    const res = await fetch('http://aplikasi-remunerasi-pegawai.test/api/v1/logout', {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors'
    }).then(res => res.json());
    return res;
}