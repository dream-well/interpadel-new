import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import { Notification } from 'rsuite';
import { logout } from 'store/slices/authSlice';
import { store } from 'store/store';

export const post = async (data: { key: string; }, url: string) => {
  const response = await axios.post(url, data).catch((err) => err.response);

  return response.data;
};

export const fetcher = (url: string) => {
  return _fetcher(url, 'GET');
}

export const postFetcher = ({ url, body = {} }) => {
  return _fetcher(url, 'POST', body);
}

const _fetcher = async(url: string, method: string = 'GET', body: any = {}) => {
  const token = localStorage.getItem('access_token');
  const headers: any = {

  };
  if (url.startsWith("/api")) {
    url = process.env.API_HOST + url.substring(4);

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  if(method == 'POST')
    headers["Content-Type"] = "application/json";
  const res = await fetch(url, {
    method,
    headers: headers,
    body: method == 'POST' ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    if (res.status === 401) {
      if (token) {
        localStorage.removeItem("access_token");
        window.location.href = '/auth/login';
      }
    }
    const error: any = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export function is_valid_access_token(access_token) {
  const data = jwt.decode(access_token);
  console.log(data);
  return true;
}

export const notification = ({title, description, type}) => (
  <Notification type={type} header={title} closable>
      {description}
  </Notification>
)