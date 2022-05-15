import Head from "next/head";
import Header from "../../components/ui/header/header";

// just user logged in can access this page
import { canSSRAuth } from "../../utils/canSSRAuth";

import styles from "./styles.module.scss";

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo Produto - Love Sushi</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>Novo produto</h1>

        <form>
          <select name="" id="">
            <option value="">Bebidas</option>
            <option value="">Pizzas</option>
          </select>

          <input type="text" placeholder="nome do produto" />
          <input type="text" placeholder="preço do produto" />
          <textarea placeholder="descrição..." />

          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </>
  );
}

// function for get user logged or dont get access this page
// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   return {
//     props: {},
//   };
// });
