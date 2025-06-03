import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {

    const job = await fetch('http://aplikasi-remunerasi-pegawai.test/api/v1/user',
        {
            method: 'GET',
            mode: 'no-cors',
            headers: request.headers,

        }

    ).then(res => res.json());
    const data = {
        data: job['data'],
        total: job['total'],
        error: ''
    }
    return NextResponse.json(data);

}

export const POST = async (request: NextRequest, response: NextResponse) => {

    const data = await request.json();
    const job = await fetch('http://aplikasi-remunerasi-pegawai.test/api/v1/user', {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors',
        headers: request.headers,

    }).then(res => res.json());
    return NextResponse.json(job);
}
