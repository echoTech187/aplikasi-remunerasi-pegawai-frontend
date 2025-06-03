import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { logout } from "../actions/authAction";

export default function Header({ sidebarOpen, setSidebarOpen }: Readonly<{ sidebarOpen: boolean, setSidebarOpen: Dispatch<SetStateAction<boolean>> }>) {

    function sidebarHandler() {
        setSidebarOpen(!sidebarOpen);
    }

    const signout = async () => {
        localStorage.removeItem('localSession');
        await logout();
        redirect('/signin');
    }

    return (
        <>
            <header className="fixed z-50 md:relative top-0 flex h-20 items-center justify-between md:justify-end-safe p-4 shadow-lg bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 w-full">
                <button onClick={() => { sidebarHandler() }} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <div className="flex items-center button-group">
                    <button onClick={signout} className="flex items-center p-2 text-sm font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Logout</button>
                </div>

            </header>

        </>
    );
}