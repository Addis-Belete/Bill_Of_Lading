import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({
    buyer: "",
    carreir: "",
    reference: "",
    goods: "",
    quantity: "",
    price: "",
  });

  return (
    <form className={styles.form}>
      <label htmlFor="byeer">buyer</label>
      <input
        type="text"
        id="buyer"
        value={data.buyer}
        onChange={(e) => setData({ ...data, buyer: e.target.value })}
      />
      <br />
      <label htmlFor="carreir">carrier</label>
      <input
        type="text"
        id="carreir"
        value={data.carreir}
        onChange={(e) => setData({ ...data, carreir: e.target.value })}
      />
      <br />
      <label htmlFor="reference">reference number</label>
      <input
        type="text"
        id="reference"
        value={data.reference}
        onChange={(e) => setData({ ...data, reference: e.target.value })}
      />
      <br />
      <label htmlFor="goods">goods</label>
      <input
        type="text"
        id="goods"
        value={data.goods}
        onChange={(e) => setData({ ...data, goods: e.target.value })}
      />
      <br />
      <label htmlFor="quantity">quantity</label>
      <input
        type="text"
        id="quantity"
        value={data.quantity}
        onChange={(e) => setData({ ...data, quantity: e.target.value })}
      />
      <br />
      <label htmlFor="price">price</label>
      <input
        type="text"
        id="price"
        value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })}
      />
      <br />
      <button>create order</button>
    </form>
  );
}
