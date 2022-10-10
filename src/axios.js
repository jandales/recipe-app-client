import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:3001', 
    // baseURL: 'https://etto-recipe-app.herokuapp.com',  
    withCredentials: true,
});

instance.interceptors.request.use(request => {
    request.headers.common['Accept']       = 'application/json';
    request.headers.common['Content-Type'] = 'application/json'; 
    // request.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return request;
}) 

instance.interceptors.response.use(
    response => { return response },
    error => {  return Promise.reject(error)}
);

export default instance;