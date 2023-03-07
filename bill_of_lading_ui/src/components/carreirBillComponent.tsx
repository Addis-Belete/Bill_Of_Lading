import styles from "@/styles/Bill.module.css";
export default function Data({ carr, orders }: any) {
  const trunc = (addr: string) => {
    return `${addr.substring(0, 4)}...${addr.substring(30, addr.length)}`;
  };
  return (
    <div className={styles.div}>
      <table className={styles.bill}>
        <thead>
          <tr>
            <th>Seller</th>
            <th>{carr ? "Carreir" : "Buyer"}</th>
            <th>Reference Number</th>
            <th>Goods</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any, index: any) => {
            return (
              <tr key={index}>
                <td>{trunc(order.seller)}</td>
                <td>{trunc(order.buyer)}</td>
                <td>{order.referenceNumber.toString()}</td>
                <td>{order.goods}</td>
                <td>{order.quantity.toString()}</td>
                <td>{order.price.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
