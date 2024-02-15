export const commonRequest = async (method, url, body, headers) => {
    let config = {
        method: method,
        headers: headers ? {
            "Authorization": headers.token
        } : {},
    };

    if (body instanceof FormData) {
        // If body is FormData (for file upload), use it directly
        config.body = body;
    } else if (body) {
        // If body exists and not FormData, stringify it as JSON
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json"
        };
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
