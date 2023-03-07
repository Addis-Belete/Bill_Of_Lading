import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { _createBill } from "@/logic/logic";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ provider }: any) {
  const [data, setData] = useState({
    buyer: "",
    carreir: "",
    reference: "",
    goods: "",
    quantity: "",
    price: "",
  });

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (success || err) {
        setSuccess("");
        setErr("");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [success, err]);
  return (
    <>
      {success ||
        (err && (
          <p className={styles.modal}>
            {success
              ? <span>Transaction Successfull <a href={`http://localhost:8584/${success}`}>view on expolerer</a></span>
              : "Transaction Failed"}
          </p>
        ))}
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
      </form>
      <button
        onClick={async () =>
          await _createBill(data)
            .then((res: any) => {
              setSuccess(res);
              setData({
                buyer: "",
                carreir: "",
                reference: "",
                goods: "",
                quantity: "",
                price: "",
              });
            })
            .catch((err: any) => {
              setErr("Creating order failed! Try again");
              console.log(err);
            })
        }
        className={styles.button}
      >
        create order
      </button>
    </>
  );
}
