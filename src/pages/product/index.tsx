import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import Header from "../../components/ui/header/header";
import Image from "next/image";

import { FiUpload } from "react-icons/fi";

// just user logged in can access this page
import { canSSRAuth } from "../../utils/canSSRAuth";

import styles from "./styles.module.scss";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";

type ICategoryProps = {
  id: string;
  name: string;
};
type ICategoryArrayProps = {
  categoryList: ICategoryProps[];
};
// esta props vem do serverSideRenderProsps ali no fim da página
export default function Product({ categoryList }: ICategoryArrayProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [productImgUrl, setProductImgUrl] = useState("");
  const [img, setImg] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/png" || image.type === "image/jpg") {
      setImg(image);
      setProductImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  // quando seleciona uma nova categoria no select
  function handleChangeCategory(event) {
    // console.log('posição da categoria selecionada no array', event.target.value);
    // console.log('categoria selecionada no array', categories[event.target.value]);
    setCategorySelected(event.target.value);
  }

  async function handleCreateProduct(event: FormEvent) {
    event.preventDefault();
    let finishedInputs = false;
    try {
      const data = new FormData();

      if (!name || !price || !description || img) {
        toast.error("Preencha toddos os campos");
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", img);

      await api.post("/products", data);

      toast.success("Produto criado com sucesso!");
      finishedInputs = !finishedInputs;
    } catch (error) {
      console.log(error);

      toast.error("Erro ao criar produto");
    }

    if (finishedInputs) {
      setName("");
      setPrice("");
      setDescription("");
      setImg("");
      setProductImgUrl("");
    }
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Love Sushi</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>Novo produto</h1>

        <form onSubmit={handleCreateProduct}>
          <label htmlFor="">
            <span>
              <FiUpload color="#fff" size={30} />
            </span>
            <input
              type="file"
              accept="image/png, image/jpg"
              onChange={handleFile}
            />

            {productImgUrl && (
              <Image
                className={styles.previewImg}
                src={productImgUrl}
                alt="foto do produto"
                width={250}
                height={250}
              />
            )}
          </label>

          <select onChange={handleChangeCategory} value={categorySelected}>
            {categories.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            placeholder="nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="preço do produto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="descrição..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </>
  );
}

// function for get user logged or dont get access this page
// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   const response = await api.get("/category");

//   return {
//     props: {
//       categoryList: response.data,
//     },
//   };
// });
