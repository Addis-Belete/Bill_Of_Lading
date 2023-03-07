import styles from "@/styles/Bill.module.css";
import { listOrders } from "@/logic/logic";
export default function Bill({order}: any) {
  return (
    <div className={styles.div}>
      <table className={styles.bill}>
        <tr>
          <th>Buyer</th>
          <th>Carreir</th>
          <th>Reference Number</th>
          <th>Goods</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Send To Carreir </th>
          <th>Send To Buyer</th>
        </tr>
        <tr>
          <td>0xd9...112bb1bbf558</td>
          <td>0xd9...112bb1bbf558</td>
          <td>100200</td>
          <td>Sehan</td>
          <td>2000</td>
          <td>200000</td>
          <td ><button onClick={async() => await listOrders()}>send</button></td>
          <td>Send</td>
        </tr>
      </table>
    </div>
  );
}
