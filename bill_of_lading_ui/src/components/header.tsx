import styles from "@/styles/Header.module.css"
import { connect
 } from "@/logic/logic";
import { useEffect, useState } from "react";
export default function Header() {
	const [account, setAccount] = useState("")
	 const trunc = (addr: string) => {
		return(`${addr.substring(0, 4)}...${addr.substring(30, addr.length)}`)

	}
	useEffect(() => {
		 connect().then((res:string) => setAccount(res))

	})
  return (
    <nav className={styles.nav}>
      <p>Bill Of Lading</p>

      <ul>
        <li>create bill</li>
        <li>seller bills</li>
        <li>carreir bills</li>
		<li>buyers bills</li>
      </ul>
      <div>
        <button onClick={async() => await connect().then((res: any)=> setAccount(res))}>{account ?  "Connected" : "Connect"}</button>
        <p>{trunc(account)}</p>
      </div>
    </nav>
  );
}
