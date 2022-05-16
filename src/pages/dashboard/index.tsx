import Head from "next/head";
import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Header from "../../components/ui/header/header";
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";
import ReactModal from "react-modal";

import styles from "./dashboard.module.scss";
import ModalOrder from "../../components/modalOrder";

type IOrdersProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

type IOrdersPropsArray = {
  orders: IOrdersProps[];
};

export type IOrderItemProps = {
  id: string;
  amount: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
};

type IOrder = {
  id: string;
  table: string | number;
  status: boolean;
  name: string | null;
};

export default function Dashboard({ orders }: IOrdersPropsArray) {
  const [ordersList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<IOrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenTableModal(id: string) {
    const response = await api.get("/orders/details", {
      params: { order_id: id },
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  // sempre que for funções de click usamos por convenção o handleName
  async function handleFinishItem(id: string) {
    await api.put("/orders/finish", {
      order_id: id,
    });

    const response = await api.get("/orders");

    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrders() {
    const response = await api.get("/orders");

    setOrderList(response.data);
  }

  ReactModal.setAppElement("#__next");

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
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw color="#fff" size={25} />
            </button>
          </div>

          {ordersList.length === 0 && (
            <span>Nenhum pedido aberto encontrado</span>
          )}

          <article>
            {ordersList.map((table) => {
              return (
                <section key={table.id}>
                  <button onClick={() => handleOpenTableModal(table.id)}>
                    <div className={styles.tags}></div>
                    <span>{table.table}</span>
                  </button>
                </section>
              );
            })}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const response = await api.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
