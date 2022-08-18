import axios from "axios";

const base_url  = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token') ? 
        'Bearer ' + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (typeof error.response === 'undefined') {
            alert('Server error')
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest.url === base_url + 'token/refresh/'
        ){
            window.location.href  = '/login/';
            return Promise.reject(error);
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ){
            const refreshToken = localStorage.getItem('refresh_token');

            if(refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if(tokenParts.exp > now){
                    return axiosInstance
                    .post('/token/refresh/', {refresh: refreshToken})
                    .then((response) => {
                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);
                        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                        originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

                        return axiosInstance(originalRequest);

                    })
                    .catch((err) => console.log(err))
                }
                else{
                    console.log('Token is expired');
                    window.location.href = '/login/';
                }
            }
            else{
                console.log('Refresh token is not set')
                window.location.href = '/login/';
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance;