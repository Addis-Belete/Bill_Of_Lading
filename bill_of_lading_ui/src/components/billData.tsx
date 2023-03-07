
import { sendOrder } from "@/logic/logic";
import { useState, useEffect } from "react";
export default function BillData({order, index}: any) {

	const [hash, setHash] = useState({
		_hash: "",
		_type: ""
	})
	useEffect(() => {
    const timer = setTimeout(() => {
      if (hash._hash) {
        setHash({
		_hash: "",
		_type: ""
	});
        
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hash._hash]);
	const trunc = (addr: string) => {
		return(`${addr.substring(0, 4)}...${addr.substring(30, addr.length)}`)
	}
	return(
<>

		<tr key={index}>
          <td>{trunc(order.buyer)}</td>
          <td>{trunc(order.carrier)}</td>
          <td>{order.referenceNumber.toString()}</td>
          <td>{order.goods}</td>
          <td>{order.quantity.toString()}</td>
          <td>{order.price.toString()}</td>
          <td style={{color: "green"}}  onClick={async() => {
				let _hash = await sendOrder(order.orderId, 0)
				setHash({_hash:_hash, _type: "0"})
	  		}}>{order.isSentToCarrier ? "Sent" : "Send"}</td>
          <td style={{color: "green"}}  onClick={async() => {
				let _hash = await sendOrder(order.orderId, 1)
				setHash({_hash:_hash, _type: "1"})
				}}>{order.isSentToBuyer ? "Sent" : "Send"}</td>

        </tr>

{hash._hash &&  <p style= {{color: "green"}}>Receipt Successfully Sent</p>}
	
</>
)	

}