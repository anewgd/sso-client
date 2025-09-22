import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    
    console.log(request.body);

    let body = await request.json();
    return json({ staus: 200, message: 'Testing logout API', body: body, header: request.headers.get("Content-Type") });
}