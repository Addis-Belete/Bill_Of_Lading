import Header from "./header";

export default function Layout({ children, connect, account }: any) {
  return (
    <>
      <Header connect={connect} account={account}/>
      <main>{children}</main>
    </>
  );
}
