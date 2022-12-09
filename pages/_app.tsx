import 'rsuite/dist/rsuite.min.css';
import 'styles/globals.css'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import Layout from 'components/Layout';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { CustomProvider } from 'rsuite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { logout } from 'store/slices/authSlice';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    setupAxiosInterceptors(router);
  }, [])

  return (
    <>
      <Head>
        <title>Interpadel App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''></link>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Saira&display=swap" rel="stylesheet"></link>
      </Head>
      <CustomProvider theme="dark">
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </CustomProvider>
    </>
    )

}

function setupAxiosInterceptors(router) {
  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    if (config.url.startsWith("/api")) {
      config.url = process.env.API_HOST + config.url.substring(4);

      const token = localStorage.getItem('access_token');
      if (token) {
        const headers: any = config.headers;
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axios.interceptors.response.use(
    res => res.data, 
    (error: AxiosError) => {
      if(error.response.status == 401) {
        const token = localStorage.getItem('access_token');
        if (token) {
          store.dispatch(logout());
        }
        router.push('/auth/login');
      }
      return Promise.reject(error);
    } 
  );
}