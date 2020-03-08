Object.size = function(obj) {
    var size = 0, key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }

    return size;
};

export const httpRequest = (method, endpoint, data) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        // "withCredentials": false
        "X-Requested-With": "XMLHttpRequest"
    }

    return request(method, endpoint, headers, JSON.stringify(data));
}

export const httpRequestFomData = (method, endpoint, data) => {
    return request(method, endpoint, {}, data);
}

export const secureHttpRequest = (method, endpoint, data) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Requested-With": "XMLHttpRequest"
    }

    if (sessionStorage.getItem('wvph_sso')) {
        headers.Authorization = 'Bearer ' + sessionStorage.getItem('wvph_sso');
    }

    return request(method, endpoint, headers, data);
}

function request(method, endpoint, headers, data) {
    let url = window.apiUrl + endpoint;
    let queryString = "";

    let params = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: headers
    }

    if (method === "POST") {
        params.method = "POST";
        params.body = data
    }

    if (method === "GET") {
        const querySize = Object.size(data);

        if (querySize > 0) {
            for (const key in data) {
                queryString += key + "=" + data[key] + "&";
            }

            url = url + "?" + queryString;
        }
    }

    return fetch(url, params).then(handleResponse);
}


/**
 *
 */
const handleResponse = (response) => {
    // console.log('fetch', response);
    if (!response.ok) {
        // If there are errors
        const error = response;

        if (error.status === 422) {
            // ---------------------------------
            // VALIDATION ERRORS
            // ---------------------------------
            return error.json().then(err => { throw err });
        } else if (error.status === 500) {
            throw { message: 'server error' }
        } else {
            throw error;
        }
    } else {
        return response.json();
    }
}