import styles from "@/styles/Bill.module.css";
import { listOrders } from "@/logic/logic";
import BillData from "./billData";
export default function Bill({orders}: any) {
	
  return (
    <div className={styles.div}>
      <table className={styles.bill}>
	<thead>
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
</thead>
<tbody>
{orders.map((order: any, index: number) => {
	return(

 <BillData order={order} index = {index}/>
)


})}
       
</tbody>
      </table>
    </div>
  );
}
