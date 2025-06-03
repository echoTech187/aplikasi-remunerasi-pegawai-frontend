'use client'
import { useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { redirect } from "next/navigation";

export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        setLoading(true);
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);

        async function checkSession() {

            const session = localStorage.getItem('localSession');
            if (!session) {
                redirect('/signin');
            } else {

                setSession(JSON.parse(session));
                setLoading(false);
            }
        }
        checkSession()
    }, []);

    return session ? (<>
        <div className="flex flex-row min-h-screen content-stretch">
            <Sidebar sidebarOpen={sidebarOpen} profile={session} />
            <div className="min-h-full flex-1 flex-col items-start justify-stretch align-middle z-0">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {children}
            </div>
        </div>
    </>) : <></>;
}

