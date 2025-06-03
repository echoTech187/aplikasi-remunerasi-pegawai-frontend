'use client'
import PageHeading from "@/app/components/heading";
import FormRepeater from "@/app/components/repeateremployee";
import RichTextEditor from "@/app/components/richtexteditor";
import { QueueListIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { jobCreated } from "../../actions/createJobAction";
import { getToken, userSession } from "@/lib/utils";
import { use } from "react";


export default function CreateJob() {

    const backToList = () => {
        redirect('/job');
    }


    async function handleJobCreate(formData: FormData) {
        try {
            formData.append('userId', userSession().id);
            const response = await jobCreated(formData);
            if (response.responseStatus) {
                alert(response.responseMessage);
                setTimeout(() => {
                    redirect('/job');
                }, 1000)
            } else {
                alert(response.responseMessage);
            }
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <PageHeading {...{ title: "CREATE JOB" }}>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={backToList}
                >
                    <QueueListIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    Job
                </button>
            </PageHeading>
            <form action={handleJobCreate} className="md:col-span-8 p-10">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            Title*
                        </label>
                        <input
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="title" name="title" type="text" placeholder="Title" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Additional Cost
                        </label>
                        <input
                            className="appearance-none block w-full w bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="additional_cost" name="additional_cost" type="text" placeholder="Additional Cost" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password">
                            Description
                        </label>
                        <div className="pb-6">
                            <RichTextEditor />
                        </div>
                    </div>
                </div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 w-full">
                    Job Assignment
                </label>

                <FormRepeater />
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="flex justify-between w-full px-3">
                        <div className="md:flex md:items-center">
                            &nbsp;
                        </div>
                        <button
                            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-12 rounded cursor-pointer"
                            type="submit">
                            Saving Job
                        </button>

                    </div>

                </div>

            </form>
        </>
    );
}
