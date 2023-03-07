import { ethers } from "ethers";
import BillABI from "../../../out/BillOfLading.sol/BillOfLading.json";
declare let window: any;
let provider: any;
let accounts: string;
let address: string = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export async function connect() {
	if (window.ethereum) {
		provider = new ethers.providers.Web3Provider(window.ethereum);
		accounts = await provider.send("eth_requestAccounts", []);
	} else {
		alert("Please Install Metamask Extension");
	}
	return accounts[0];
}
export async function _createBill(data: any) {

	if (provider) {
		try {

			const signer = provider.getSigner();
			console.log(signer)
			const billContract = new ethers.Contract(address, BillABI.abi, provider);
			console.log(billContract)
			

			let orderData = {
				buyer: data.buyer,
				seller: accounts[0],
				carrier: data.carreir,
				referenceNumber: data.reference,
				goods: data.goods,
				quantity: data.quantity,
				number: 2,
				price: data.price,
				isSentToCarrier: false,
				isSentToBuyer: false

			}
			console.log(orderData)
			let res = await billContract.connect(signer).generateBillOfLading(orderData)
			return res.hash;
		} catch (err: any) {
			console.log(err);
		}
	} else {
		console.log("connect to metamask");
	}
}
