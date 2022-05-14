import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "../../../styles/home.module.scss";
import LogoImg from "../../../public/logo.svg";

import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";

import { AuthContext } from "../../contexts/AuthContext";

import Link from "next/link";

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!name || !lastname || !email || !password) {
      return;
    }

    setLoading(true);

    const data = {
      name,
      lastname,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <div className={styles.container}>
        <Image src={LogoImg} alt="Love Sushi" />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>

          <form onSubmit={handleSignUp}>
            <div className={styles.inputInline}>
              <Input
                type="text"
                placeholder="nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="sobrenome"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
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
