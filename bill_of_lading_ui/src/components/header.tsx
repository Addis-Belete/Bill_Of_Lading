import styles from "@/styles/Header.module.css"
import { connect
 } from "@/logic/logic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Header() {
	const router = useRouter();
	const [account, setAccount] = useState("")
	 const trunc = (addr: string) => {
		return(`${addr.substring(0, 4)}...${addr.substring(30, addr.length)}`)

	}
	const conn = async() => {
		let acc = await connect();
		setAccount(acc);

	}
	useEffect(() => {
		 conn()

	})
  return (
    <nav className={styles.nav}>
      <p>Bill Of Lading</p>

      <ul>
        <li><Link legacyBehavior href="/"><a style={{ color: router.pathname == "/" ? "#3c7d6a" : "" }}>create bills</a></Link></li>
        <li><Link legacyBehavior href="/sellerBill"><a style={{ color: router.pathname == "/sellerBill" ? "#3c7d6a" : "" }}>seller bills</a></Link></li>
        <li><Link legacyBehavior href="/carreirBill"><a style={{ color: router.pathname == "/carreirBill" ? "#3c7d6a" : "" }}>carreir bills</a></Link></li>
		<li><Link legacyBehavior href="/buyerBill"><a style={{ color: router.pathname == "/buyerBill" ? "#3c7d6a" : "" }}>buyers bills</a></Link></li>
      </ul>
      <div>
        <button onClick={async() => await connect().then((res: any)=> setAccount(res))}>{account ?  "Connected" : "Connect"}</button>
        <p>{trunc(account)}</p>
      </div>
    </nav>
  );
}
