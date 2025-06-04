'use client'
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeading from "../components/heading";
import NextDatatable from "../components/datatables";
import { NuqsAdapter } from 'nuqs/adapters/next'
import { ColumnDef } from "@tanstack/react-table";
import { CheckboxPrimitive } from "@lifespikes/ui";
import { useGetNextTableState } from "@lifespikes/next-datatable";
import { decode, decodeEntity, encode } from "html-entities";
import PlusCircleIcon from "@heroicons/react/20/solid/PlusCircleIcon";
import { getJobs, jobDelete, jobEdit, jobView } from "../actions/createJobAction";
import { userSession } from "@/lib/utils";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function Job() {
    const [authSession, setSession] = useState<any | null>(null);
    const [data, setData] = useState<any | null>(null);
    const { pagination } = useGetNextTableState();
    useEffect(() => {

        async function checkSession() {

            const session = userSession();
            if (session.accessToken == "") {
                redirect('/signin');
            } else {
                const datax = await getJobs(
                    session.accessToken,
                    (pagination?.pageIndex ?? 0) + 1,
                    pagination.pageSize ?? 10
                );

                setData(datax);
                setSession(session);
            }
        }
        checkSession()
    }, []);
    const columns: ColumnDef<any>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <CheckboxPrimitive
                    className="border-gray-600 data-[state=checked]:border-blue w-5 h-5"
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <CheckboxPrimitive
                    className="border-gray-600 data-[state=checked]:border-blue w-5 h-5"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'title',
            header: 'Title',
            enableColumnFilter: true,


        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => {
                return <div dangerouslySetInnerHTML={{ __html: decodeEntity(row.original.description) }}></div>
            },
            enableResizing: true

        },
        {
            accessorKey: 'created_at',
            header: 'Date',
            enableGlobalFilter: true,
            accessorFn: (row) => new Date(row.created_at).toDateString().toLocaleString()
        },
        {
            accessorKey: 'slug',
            header: 'Action',
            cell: ({ row }) => {
                return <>
                    <div className="flex gap-2">

                        <button
                            className="border border-yellow-600 hover:border-yellow-400 focus:shadow-outline focus:outline-none text-yellow-600 hover:text-yellow-400 text-xs font-bold text-center py-2 px-4 rounded cursor-pointer"
                            type="button" onClick={() => jobEdit(row.original.slug)}>
                            <PencilIcon aria-hidden="true" className="size-4" />
                        </button>
                        <button
                            className=" border border-gray-600 hover:border-gray-400 focus:shadow-outline focus:outline-none text-gray-600 text-xs hover:text-black font-bold text-center py-2 px-4 rounded cursor-pointer"
                            type="button" onClick={() => jobView(row.original.slug)}>
                            <EyeIcon aria-hidden="true" className="size-4" />
                        </button>
                        <button
                            className="border border-red-600 hover:border-red-400 focus:shadow-outline focus:outline-none text-red-600 hover:text-red-400 text-xs font-bold text-center py-2 px-4 rounded cursor-pointer"
                            type="button" onClick={() => jobDelete(row.original.slug)}>
                            <TrashIcon aria-hidden="true" className="size-4" />
                        </button>
                    </div>
                </>
                    ;
            }
        }
    ];

    return authSession?.accessToken != '' ? (
        <>
            <PageHeading {...{ title: "DAFTAR JOB" }}>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => { redirect('/job/create') }}
                >
                    <PlusCircleIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    Tambah Job
                </button>
            </PageHeading>
            <main className="md:flex min-h-1/2 mt-20 md:mt-0 flex-col items-start justify-stretch p-4 w-full">
                <NuqsAdapter>
                    <NextDatatable columns={columns} data={data} title="Jobs" description="List of jobs" />
                </NuqsAdapter>
            </main>
        </>
    ) : (<></>);
}

