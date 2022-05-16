import Head from "next/head";
import { FiRefreshCcw } from "react-icons/fi";
import Header from "../../components/ui/header/header";
import { canSSRAuth } from "../../utils/canSSRAuth";

import styles from "./dashboard.module.scss";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Love Sushi</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ultimos pedidos</h1>
            <button>
              <FiRefreshCcw color="#fff" size={25} />
            </button>
          </div>

          <article>
            <section>
              <button>
                <div className={styles.tags}></div>
                <span>Mesa 30</span>
              </button>
            </section>

            <section>
              <button>
                <div className={styles.tags}></div>
                <span>Mesa 05</span>
              </button>
            </section>

            <section>
              <button>
                <div className={styles.tags}></div>
                <span>Mesa 10</span>
              </button>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   return {
//     props: {},
//   };
// });
