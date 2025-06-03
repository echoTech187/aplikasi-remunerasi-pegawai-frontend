import { PlusCircleIcon } from '@heroicons/react/20/solid';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import { useEffect, useState } from 'react';

const FormRepeater = () => {
    const [fields, setFields] = useState([{ value: '' }]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        async function getUserData() {
            const session = JSON.parse(localStorage.getItem('localSession') ?? '{}');
            const token = session.token;

            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '* | http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
                },
                method: 'GET',
                mode: 'no-cors',
            });
            const data = await response.json();
            setEmployees(data['data']);
        }
        getUserData();
    }, []);
    const addField = () => {
        setFields([...fields, { value: '' }]);
    };

    const removeField = () => {
        if (fields.length > 1) {
            setFields(fields.slice(0, -1));
        }
    };

    return (
        <div>
            {fields.map((field, index) => (
                <div key={index}>
                    <div className="card block w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="card-title flex items-center justify-between">
                            <p className="text-md font-medium text-gray-400 dark:text-white mb-4">Change job employee assignment </p>
                            {index > 0 ? <TrashIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-red-600 cursor-pointer" onClick={removeField} /> : null}
                        </div>
                        <div className="card-body">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-first-name">
                                        Employee*
                                    </label>
                                    <select
                                        id={`employee${index + 1}`}
                                        name="employee"
                                        required
                                        aria-placeholder='Select employee'
                                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                                        <option value=''>Select employee</option>
                                        {employees.map((employee, index) => (
                                            <option key={index} value={employee['id']}>{employee['name']}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name">
                                        Hours worked*
                                    </label>
                                    <input required
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id={`hours_worked${index + 1}`}
                                        name="hours_worked"
                                        type="number"
                                        placeholder="Hours worked" />
                                </div>
                                <div className="w-full md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name">
                                        Custom hourly rate
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id={`custom_hourly_rate${index + 1}`} name="custom_hourly_rate" type="number" placeholder="Custom hourly rate" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="items-center justify-center flex w-full">
                <button type='button' onClick={addField} className="flex items-center uppercase cursor-pointer tracking-wide text-gray-700 text-xs font-bold mb-6 max-w-fit bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 px-4 py-2">
                    <PlusCircleIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-8 text-indigo-600" /><span>Add Employee Assignment</span>
                </button>
            </div>

            {/* <button onClick={onSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                Submit
            </button> */}
        </div>
    );
};

export default FormRepeater;