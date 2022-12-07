import axios from 'axios';

export const fetcher = async url => {
    const token = localStorage.getItem('token');
    const headers = {
  
    };
    if(token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(url, {
      headers: headers
    })
  
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      if(res.status == 401) {
        window.location.href = '/login';
      }
      const error: any = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
  
    return res.json()
  }

axios.interceptors.request.use((config) => {
  if(config.url.startsWith('/api')) {
    config.url = process.env.API_SERVER + config.url.substr(4);
  }
  return config;
})

export {
  axios
};