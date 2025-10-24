
import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 100000,
  headers: { 
    'X-Custom-Header': 'foobar' 
  }
});

http.interceptors.request.use( (config) => {
    console.log('Request sent at: ', new Date().toISOString(), config);
    return config;
  }, function (error) {
    return Promise.reject(error);
  },
  { synchronous: true}
);

http.interceptors.response.use((response) => {
    console.log('Response received at: ', new Date().toISOString(), response);
    return response;
  }, function onRejected(error) {
    return Promise.reject(error);
  });

