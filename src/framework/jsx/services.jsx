import axios from "axios";

function _Services() {
    const instance = axios.create({
        timeout: 10000,
    });

    instance.interceptors.response.use((response) => {
        const parsedResponse = {...response};

        delete parsedResponse.config;
        return parsedResponse;
    }, (error) => {
        return Promise.reject(error);
    });

    const fetchResource = (url) => {
        return instance.get(url);
    }

    const postResource = (url) => {
        return instance.post(url);
    }

    const putResource = (url) => {
        return instance.put(url);
    }

    const patchResource = (url) => {
        return instance.patch(url);
    }

    const deleteResource = (url) => {
        return instance.delete(url);
    }

    return {fetchResource, postResource, putResource, patchResource, deleteResource}
}

const Services = _Services();

export default Services;