import axios, { AxiosRequestConfig } from 'axios';

const apiCall = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    params?: Record<string, any>
): Promise<T> => {
    try {
        const config: AxiosRequestConfig = {
            url,
            method,
            data,
            params,
            baseURL: 'https://reqres.in/api', // Replace with your API base URL
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await axios(config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'API call failed');
    }
};

export default apiCall;
