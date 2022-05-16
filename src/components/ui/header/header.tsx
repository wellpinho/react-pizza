import { useContext } from "react";

import Image from "next/image";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import styles from "./header.module.scss";

// para chamar funcionalidade de logout
import { AuthContext } from "../../../contexts/AuthContext";

export default function Header() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          {/* a tag <img> do html precisa ser a do next como <Img> */}
          <Image src="/logo.svg" alt="" width={190} height={60} />
        </Link>

        {/* caso queira exibir boas vindas ao user logado chama o user no useContext
        <h1>Bem vindo {user?.name}</h1> */}

        <nav>
          <Link href="/category">
            <a>Categoria</a>
          </Link>
          <Link href="/menu">
            <a>Cardápio</a>
          </Link>

          {/* botão que chama a função signOut no userContext */}
          <button onClick={signOut}>
            <FiLogOut color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
