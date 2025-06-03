'use client';
import { useEffect, useState } from 'react';
import {
    NextDataTable,
    useGetNextTableState,
} from '@lifespikes/next-datatable';

import { ColumnDef } from '@tanstack/react-table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@lifespikes/ui';






const NextDatatable = ({ columns, data, title, description }: { columns: ColumnDef<any>[], data: any, title: String, description: String }) => {
    console.log(data);
    const [isLoading, setIsLoading] = useState(false);

    const { pagination, filter, sort } = useGetNextTableState();
    console.log(pagination, filter, sort);
    useEffect(() => {
        (async () => {
            setIsLoading(true);

            setIsLoading(false);
        })();
    }, [pagination, filter, sort]);

    const totalPages = Math.ceil(
        (data?.total ?? 0) / (pagination?.pageSize ?? 10)
    );

    return (
        <Card>
            <CardHeader className='flex-row justify-between'>
                <div className="flex-col items-center space-x-2">
                    <CardTitle className='text-lg font-bold text-slate-800'>{title}</CardTitle>
                    <CardDescription className='text-slate-500'>{description}</CardDescription>
                </div>
                <div className="ml-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                        <div className="relative">
                            <input
                                className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                placeholder="Search for invoice..."
                            />
                            <button
                                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='overflow-x-auto'>
                <NextDataTable variantClassName='datatable'
                    defaultValues={{
                        pagination: {
                            pageSize: data?.limit ?? 10,
                            pageIndex: (data?.skip ?? 1) - 1,
                        },
                        sorting: [],
                        filter: []
                    }}
                    pageCount={totalPages}
                    data={data?.data ?? []}
                    columns={columns}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default NextDatatable;