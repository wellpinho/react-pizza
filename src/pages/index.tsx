import Head from "next/head";
import Image from "next/image";

import styles from "../../styles/home.module.scss";
import LogoImg from "../../public/logo.svg";
import Input from "../components/ui/input/input";
import Button from "../components/ui/button/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Love Sushi - Faça seu login</title>
      </Head>

      <div className={styles.container}>
        <Image src={LogoImg} alt="Love Sushi" />

        <div className={styles.login}>
          <form>
            <Input type="email" placeholder="Digite seu email" />
            <Input type="password" placeholder="Digite sua senha" />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <a className={styles.a}>Não possui conta? Cadastre-se</a>
        </div>
      </div>
    </>
  );
}