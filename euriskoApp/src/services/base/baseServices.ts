export let BASE_URL = '';

if (__DEV__) {
    BASE_URL = 'http://34.245.213.76:3000/';
} else {
    BASE_URL = 'http://34.245.213.76:3000/';
}

export function extractError(jsonResponse) {
    if (jsonResponse && typeof jsonResponse === 'string') {
        return jsonResponse
    } else {
        return undefined;
    }
}

/**
 * Fetch data from server
 * @param request -{uri, token, headers, method, body}
 */

export async function requestFromServer(request) {
    if (!request.headers) {
        request.headers = {
            'Content-Type': 'application/json',
            accept: 'application/json',
        };
    } else if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json';
    } else if (!request.headers['accept']) {
        request.headers['accept'] = 'application/json';
    }
    request.headers['Authorization'] = `Bearer ${request.token}`;
    console.log(request.headers, "headers")
    return await fetch(`${BASE_URL}${request.uri}`, {
        headers: request.headers,
        method: request.method,
        body: request.body
    });
}