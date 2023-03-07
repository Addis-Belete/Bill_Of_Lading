import { ethers } from "ethers";
import BillABI from "../../../out/BillOfLading.sol/BillOfLading.json";
declare let window: any;
let provider: any;
export let accounts: string;
let address: string = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
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

export async function listOrders() {

	if (!accounts) {
		await connect()
	}
	let sellerOrder = [];
	const signer = provider.getSigner();
	const billContract = new ethers.Contract(address, BillABI.abi, provider);
	let orders = await billContract.getSellerOrder(accounts[0]);

	for (let i = 0; i < orders.length; i++) {
		let ord = await billContract.getOrderById(orders[i].toString());
		let newObj = { ...ord, orderId: orders[i].toString() }
		sellerOrder.push(newObj);
	}
	console.log(sellerOrder)
	return sellerOrder;
}


export async function sendOrder(id: string, _type: number) {

	if (!accounts) {
		await connect()
	}
	try {
		const signer = provider.getSigner();
		const billContract = new ethers.Contract(address, BillABI.abi, provider);
		let res: any;
		if (_type == 0) {
			res = await billContract.connect(signer).sendBillOfLadingToCarreir(id)
		}
		if (_type == 1) {
			res = await billContract.connect(signer).sendBillOfLadingToBuyer(id)

		}
		return res.hash;
	} catch (err) {
		console.log(err);

	}

}

export async function listReceipts(_type: number) {

	if (!accounts) {
		await connect()
	}
	let receipt = [];
	const signer = provider.getSigner();
	const billContract = new ethers.Contract(address, BillABI.abi, provider);
	let orders: any
	if (_type == 0) {
		orders = await billContract.getCarreirOrder(accounts[0]);
	} else {
		orders = await billContract.getBuyerOrder(accounts[0]);
	}
	for (let i = 0; i < orders.length; i++) {
		let ord = await billContract.getOrderById(orders[i].toString());
		let newObj = { ...ord, orderId: orders[i].toString() }
		receipt.push(newObj);
	}
	console.log(receipt)
	return receipt;
}



