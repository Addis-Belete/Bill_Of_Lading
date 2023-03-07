
import { sendOrder } from "@/logic/logic";
import { useState } from "react";
export default function BillData({order, index}: any) {

	const [hash, setHash] = useState("")
	const trunc = (addr: string) => {
		return(`${addr.substring(0, 4)}...${addr.substring(30, addr.length)}`)
	}
	return(
		<tr key={index}>
          <td>{trunc(order.buyer)}</td>
          <td>{trunc(order.carrier)}</td>
          <td>{order.referenceNumber.toString()}</td>
          <td>{order.goods}</td>
          <td>{order.quantity.toString()}</td>
          <td>{order.price.toString()}</td>
          <td style={{color: "green"}}  onClick={async() => {
				let _hash = await sendOrder(order.orderId, 0)
				setHash(_hash)
				}}>{order.isSentToCarrier ? "Sent" : "Send"}</td>
          <td style={{color: "green"}}  onClick={async() => {
				let _hash = await sendOrder(order.orderId, 1)
				setHash(_hash)
				}}>{order.isSentToBuyer ? "Sent" : "Send"}</td>
        </tr>
)	

}