import Head from "next/head";
import Image from "next/image";

import styles from "../../../styles/home.module.scss";
import LogoImg from "../../../public/logo.svg";

import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";

import Link from "next/link";

export default function Signup() {
  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <div className={styles.container}>
        <Image src={LogoImg} alt="Love Sushi" />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>

          <form>
            <div className={styles.inputInline}>
              <Input type="text" placeholder="nome" />
              <Input type="text" placeholder="sobrenome" />
            </div>
            <Input type="email" placeholder="email" />
            <Input type="password" placeholder="senha" />

            <Button type="submit" loading={false}>
              Criar conta
            </Button>
          </form>

          <Link href="/">
            <a className={styles.a}>Já possui conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  );
}
