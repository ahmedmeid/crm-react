import axios from 'axios';

const apiURL = process.env.REACT_APP_BACKEND_BASEURL + '/api';

const instance = axios.create({
    withCredentials: true,
    baseURL: apiURL,
    timeout: 3000
  });


export { instance };
