import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Header from "../../components/ui/header/header";
import { api } from "../../services/apiClient";

import styles from "./styles.module.scss";

// só pessoas logadas podem acessar a tela de criar categoria
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegisterCategory(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      return toast.error("Categoria sem nome");
    }

    await api.post("/categories", {
      name,
    });

    toast.success("Categoria criada com sucesso!");

    setName("");
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Love Sushi</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastra nova categoria</h1>

          <form onSubmit={handleRegisterCategory}>
            <input
              type="text"
              placeholder="nome da categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

// função que verifica se user esta logado caso não ele nãoa cessa esta página
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
