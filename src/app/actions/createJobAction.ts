"use server"

export const getJobs = async (token: String, page: number, perPage = 10) => {

    try {

        const response = await fetch('http://aplikasi-remunerasi-pegawai.test/api/v1/job?limit=' + perPage + '&skip=' + (page - 1) * perPage, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '* | http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
            }
        });

        const data = await response.json();
        return {
            data: data['data'],
            total: data['total'],
            skip: (page - 1) * perPage,
            limit: perPage,
            error: ''
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

export const jobCreated = async (formData: FormData) => {
    try {
        const title = formData.get('title');
        const additionalCost = formData.get('additional_cost');
        const description = formData.get('description');
        const employees = formData.getAll('employee');
        const hours_worked = formData.getAll('hours_worked');
        const custom_Hourly_Rate = formData.getAll('custom_hourly_rate');
        const job_assignment = [];
        for (let i = 0; i < employees.length; i++) {
            const Employee = employees[i];
            const hoursWorked = hours_worked[i];
            const customHourlyRate = custom_Hourly_Rate[i];
            job_assignment.push({
                Employee,
                hoursWorked,
                customHourlyRate
            });
        }
        const res = await fetch('http://aplikasi-remunerasi-pegawai.test/api/v1/job', {
            method: 'POST',
            body: JSON.stringify({
                title: formData.get("title"),
                description: formData.get("description"),
                additional_cost: formData.get("additional_cost"),
                job_assignment: JSON.stringify(job_assignment),
                userId: formData.get("userId")

            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${formData.get("accessToken")}`,
                'Access-Control-Allow-Origin': '* | http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
            }
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return {
            responseCode: 500,
            responseMessage: (e as Error).message,
            responseStatus: false
        }
    }
}

export const jobView = async (slug: String) => {

}

export const jobEdit = async (slug: String) => {

}

export const jobDelete = async (slug: String) => {

}