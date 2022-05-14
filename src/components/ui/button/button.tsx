import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

import styles from "./button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode; // children é o valor passado pela props do component pai
}

export default function Button({ loading, children, ...rest }: IButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner color="#fff" size={16} />
      ) : (
        <a className={styles.a}>{children}</a>
      )}
    </button>
  );
}
