import Bill from "@/components/bill";
import { listOrders, accounts, connect } from "@/logic/logic";
import { useEffect, useState } from "react";
export default function SellerBill() {
  const [orders, setOrders] = useState([]);

  const _listOrder = async () => {
    let order: any = await listOrders();
    setOrders(order);
  };
	
  useEffect(() => {
    _listOrder();
  }, []);

  console.log(orders, "order");

  return (
    <div>
      {orders.length > 0 ? <Bill orders={orders} /> : <p style={{textAlign:"center", marginTop: "200px", color:"red" ,fontSize:"25px"}}>Your or not seller or Not created order yet!</p>}
    </div>
  );
}
