import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <form>
      <label htmlFor="byeer">buyer</label>
      <input type="text" id ="buyer"/>
      <label htmlFor="carreir">carrier</label>
      <input type="text" id ="carreir" />
      <label htmlFor="reference">reference number</label>
      <input type="text" id= "reference" />
      <label htmlFor="goods">goods</label>
      <input type="text" id="goods"/>
      <label htmlFor="quantity">quantity</label>
      <input type="text" id="quantity"/>
      <label htmlFor="price">price</label>
      <input type="text" id="price"/>
      <button>create order</button>
    </form>
  );
}
