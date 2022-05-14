/*
  Páginas que só pessoa logadas podem acessar
*/

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from "../services/AuthTokenError";

// função para só user logado pode acessar a página de
export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['@nextAuth.token'];

    // se a pessoa tentar acessar a pagina porem tendo já feito o login salvo redireciona
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(context)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, '@nextAuth.token');

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}