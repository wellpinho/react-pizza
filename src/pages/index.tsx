import { FormEvent, useContext, useState } from "react";

import Head from "next/head";
import Image from "next/image";

import styles from "../../styles/home.module.scss";
import LogoImg from "../../public/logo.svg";
import Input from "../components/ui/input/input";
import Button from "../components/ui/button/button";

import { AuthContext } from "../contexts/AuthContext";
// usado para rotear nossos links
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    setLoading(true);

    // fake login
    let data = {
      // pega os dados digitado e envia para o AuthContext
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Love Sushi - Faça seu login</title>
      </Head>

      <div className={styles.container}>
        <Image src={LogoImg} alt="Love Sushi" />

        <div className={styles.login}>
          <h1>Faça login</h1>

          <form onSubmit={handleLogin}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.a}>Não possui conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
