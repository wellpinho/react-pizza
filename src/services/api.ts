import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies'
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './AuthTokenError';

export function setUpApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Athorization: `Bearer ${cookies['@nextAuth.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      // qualquer error não autorizado devemos deslogar o usuário
      if (typeof window !== undefined) {
        // chamar a função para desloga ro user
        signOut();
      } else {
        return Promise.reject( new AuthTokenError())
      }
    }

    // if error is bad request
    return Promise.reject(error)
  })

  return api;
}