
/*=== global variables : =====================================================*/
let accessToken = null;

/* ************************************************************************** */
/*    * Http utils :                                                          */
/* ************************************************************************** */
export class Http
{
    /* === get : ============================================================ */
    static async get(url, headers = {})
    {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include',
        });
        const responseData = await response.json();
        if (response.ok && responseData["access"])
            accessToken = responseData["access"];
        return responseData;
    }

    /* === post : =========================================================== */
    static async post(url, headers = {}, data = {})
    {
        return await request('POST', url, headers, data);
    }
    /* === pathch: ========================================================== */
    static async patch(url, headers = {}, data = {})
    {
        return await request('PATCH', url, headers, data);
    }

    /* === getWithAuth : ==================================================== */
    static async getWithAuth(url, headers = {})
    {
    }

    /* === postWithAuth : =================================================== */
    static async postWithAuth(url, headers = {}, data = {})
    {
    }
}


/* ************************************************************************** */
/*    * private functions :                                                   */
/* ************************************************************************** */
async function request(method, url, headers = {}, data = {})
{
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: data,
        credentials: 'include',
    });


    const responseData = await response.json();
    if (response.ok && responseData["access"])
        accessToken = responseData["access"];
    return responseData;
}
