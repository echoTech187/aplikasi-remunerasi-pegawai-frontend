'use client'
import Head from "next/head";
import { AuthError } from "next-auth";
import { login } from "../actions/authAction";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";


export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any | null>(null);

    useEffect(() => {
        setLoading(true);
        const session = localStorage.getItem('localSession');
        if (session) {
            setSession(JSON.parse(session));
            redirect('/');
        }
        setLoading(false);
    }, [])
    const handleLogin = async (formData: FormData) => {
        setLoading(true);
        try {
            const res = await login(formData);
            const userSession = {
                id: res['data']['id'],
                name: res['data']['name'],
                email: res['data']['email'],
                role: res['data']['role_id'],
                access: res['data']['role'],
                status: res['data']['status'],
                accessToken: res['token'],
                expires: strtotime(new Date(), { days: 30 }).toISOString(),
            };
            setSession(userSession);
            localStorage.setItem('localSession', JSON.stringify(userSession));

            setTimeout(() => {
                redirect('/');
            }, 1000)


        } catch (error) {
            setLoading(false);
            alert("Error logging in: " + (error as AuthError).message);
        }
    };
    if (loading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between">
                <h1>Loading...</h1>
            </main>
        )
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex h-screen justify-center items-center ">
                <Head>
                    <title>Login Page</title>
                </Head>
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <header className="flex justify-between mb-4">
                        <nav>
                            {/* Navigation menu items */}
                        </nav>
                    </header>
                    <section className="hero mb-4">
                        <h1 className="text-3xl font-bold mb-2">Welcome to ARP Pegawai</h1>
                        <p className="text-lg text-gray-600">Login to access your account</p>
                    </section>
                    <form className="login-form" action={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex items-center justify-end mb-4">
                            <a className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer hidden" href="#">
                                Forgot password?
                            </a>
                            <button
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <footer className="text-gray-600 text-sm">
                        <p>&copy; 2025 ARP Pegawai by Eko Susanto | All rights reserved</p>
                        {/* Social media links */}
                    </footer>
                </div>
            </div>
        </main>
    );
}
function strtotime(date: Date, addTime: any) {
    let generatedTime = date.getTime();
    if (addTime.seconds) generatedTime += 1000 * addTime.seconds; //check for additional seconds 
    if (addTime.minutes) generatedTime += 1000 * 60 * addTime.minutes;//check for additional minutes 
    if (addTime.hours) generatedTime += 1000 * 60 * 60 * addTime.hours;//check for additional hours 
    return new Date(generatedTime);
}