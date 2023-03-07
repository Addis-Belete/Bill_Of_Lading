import Bill from "@/components/bill"
import { listOrders } from "@/logic/logic"
import { useEffect, useState } from "react"
export default function SellerBill(){
	const [orders, setOrders] = useState([]);


	useEffect(() => {
	(async () => {
		 await listOrders().then((res: any) => setOrders(res));
	})
	

	},[])
	console.log(orders, "order");
	
	return(
		<div>

{orders ? <Bill orders = {orders}/>: "Your or not seller or Not oble"}


		</div>

	)


}