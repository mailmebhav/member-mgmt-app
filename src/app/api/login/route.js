export const POST = async (request) => {
    const { username, password } = await request.json()
    console.log(username, password)
    try{
        if(username !== "admin")
        {
            return new Response(JSON.stringify({ status: false, message: 'invalid username'}), { status: 401})
        }
        if(password !== "password")
        {
            return new Response(JSON.stringify({ status: false, message: 'invalid password'}), { status: 401})
        }
        return new Response(JSON.stringify({ status: true, message: 'Verified'}), { status: 200})
    }catch(error)
    {
        return new Response(JSON.stringify({ status: false, message: 'server error'}), { status: 500})
    }
}