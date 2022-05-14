import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
{
  /*
  Para usar o placeholder no component input foi preciso
  importa funções do react e criar a iterface
 */
}

export default function Input({ ...rest }: InputProps) {
  return <input className={styles.input} type="text" {...rest} />;
}

export function Textarea({ ...rest }: TextareaProps) {
  return <textarea className={styles.textarea} {...rest}></textarea>;
}
