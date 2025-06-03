'use client'
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export default function Home({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);


  useEffect(() => {
    setLoading(true);

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




  if (loading || !session) {
    return (
      <main className=" min-h-screen flex  items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  return session ? (<>
    <div className="flex flex-row min-h-screen content-stretch">
      <Sidebar sidebarOpen={sidebarOpen} profile={session} />
      <div className="min-h-full flex-1 flex-col items-start justify-stretch align-middle z-0">

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {children}

      </div>
    </div>
  </>
  ) : (
    <></>
  );
}
