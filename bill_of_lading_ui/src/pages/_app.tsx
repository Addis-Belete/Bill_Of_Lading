import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare let  window:any;
export default function App({ Component, pageProps }: AppProps) {
	const [account, setAccount] = useState("")
const connect = async() => {
	if(window.ethereum) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const accounts = await provider.send("eth_requestAccounts", []);
	 	setAccount(accounts[0]);
	}
	else {
		alert("Please Install Metamask Extension");

	}
	
}
	useEffect(() => {
		connect()
	})
  return (
    <Layout connect={connect} account={account}>
      <Component {...pageProps} />
    </Layout>
  );
}
