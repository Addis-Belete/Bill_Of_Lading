import Data from "@/components/carreirBillComponent";
import { listReceipts } from "@/logic/logic";
import { useEffect, useState } from "react";
export default function CarreirBill() {
  const [data, setData] = useState([]);

	const _listReceipt = async() => {
		let rec: any = await listReceipts(0);
		setData(rec);

	}
	useEffect(() => {
		_listReceipt()

	})
  return (
    <div>
      {data.length > 0 ? (
        <Data  orders = {data}/>
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "200px",
            color: "red",
            fontSize: "25px",
          }}
        >
          Not received any order yet!
        </p>
      )}
    </div>
  );
}
