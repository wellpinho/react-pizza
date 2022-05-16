import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { IOrderItemProps } from "../../pages/dashboard";
import styles from "./index.module.scss";

interface IModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: IOrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

export default function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: IModalOrderProps) {
  // este css é da lib react-modal
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#ea1d2c" />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => {
          <section key={item.id}>
            <span>
              {item.amount} - {item.product.name}
            </span>
            <span>{item.product.description}</span>
          </section>;
        })}

        <button
          onClick={() => {
            handleFinishOrder(order[0].order_id);
          }}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
