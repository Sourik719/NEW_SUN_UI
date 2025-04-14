import { useState } from "react";

const domain = 'https://new-sun.onrender.com';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const httpRequest = async (url, method = 'GET', body = null, isFormData = false) => {
        const token = url === '/reset-password' ? localStorage.getItem('key') : localStorage.getItem('jwt-token');
        setIsLoading(true);
        const headers = {
            'authorization': `Bearer ${token}`
        };

        let processedBody = null;

        if (body) {
            if (isFormData) {
                processedBody = body;
            } else {
                headers['content-type'] = 'application/json';
                processedBody = JSON.stringify(body);
            }
        }

        const res = await fetch(`${domain}${url}`, {
            method,
            body: processedBody,
            headers,
        });

        let responseData;
        try {
            responseData = await res.json();
        } catch (error) {

            responseData = { success: res.ok, message: res.statusText, data: null };
        }

        setIsLoading(false);

        if (!responseData.success) {
            throw new Error(responseData.message || 'An error occurred');
        }

        return { data: responseData.data, message: responseData.message };
    };

    return [httpRequest, isLoading];
};