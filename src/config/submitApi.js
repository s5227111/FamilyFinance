const submitApi = (url, method, data) => {

    // configure the request
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: !data ? null : JSON.stringify(data),
    };

    // make the request
    return fetch(`http://192.168.0.108:8888/${url}`, options)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response?.error) throw new Error(response.error);

            return response.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export default submitApi;