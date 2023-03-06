import styles from "@/styles/Header.module.css"
export default function Header({connect, account}:any) {
	console.log(account)
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
        <button onClick={connect}>{account ?  "Connected" : "Connect"}</button>
        <p>{account}</p>
      </div>
    </nav>
  );
}
