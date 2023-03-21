// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
contract BillOfLading is ERC1155 {

	struct OrderData {
        address buyer;
        address seller;
        address carrier;
        uint256 referenceNumber;
        string goods;
        uint256 quantity;
        uint256 number;
        uint256 price;
		bool isSentToCarrier;
		bool isSentToBuyer;

    }
	struct Shipper{
		string physicalShipperAddress;
		address shipperWalletAddress;
	}

	struct Consignee {
		string physicalConsigneeAddress;
		address consigneeAddress;

	}

	struct Package {
		string description;
		uint256 grossWeight;
		uint256 measurments;
		
	}

	struct ReceiptData {
		Shipper shipper;
		Consignee consignee;
		string preCarriageBy;
		string vessel;
		string portOfDischarge;
		string placeOfReceiptByPreCarrier;
		string portOfLoading;
		string placeOfDeliveryByOnCarrier;
		string custeomReference;
		string shipperReference;
		string fAgentsReference;
		string billNumber;
		string referenceNumber;
		string preCarraigePayableAt;
		string onCarraigePayableAt;
		string[] discreption;
		uint256[] grossWeight;
		uint256[] measurments;
 		uint256 numberOfBill;
		uint256 issuedAt;
		string freightPayableAt;
		uint256 NumberOfOrginalBSL;
		string forCarrier;
		bool isSentToCarrier;
		bool isSentToBuyer;
	}

    mapping (uint256 => OrderData) internal orders;
	mapping (uint256 => ReceiptData) internal receiptData;
	mapping(address => uint256[]) internal sellerOrders;
	mapping(address => uint256[]) internal carreirOrders;
	mapping(address => uint256[]) internal buyerOrders;
	uint256 internal id;

	event NewBillGenerated(address by, uint256 id);
	event BillSentToCarreir(address seller, address carrier, uint256 id);
	event BillSentToBuyer(address seller, address buyer, uint256 id);
	constructor()ERC1155("www.billoflading.com"){}


	function generateBillOfLading(ReceiptData memory _orderData) external {
		//require(_orderData.s == msg.sender, "Only generated by seller");
		bytes memory data = abi.encode(_orderData);
		_orderData.issuedAt = block.timestamp;
		id++;
		receiptData[id] = _orderData;
		_mint(msg.sender, id, 3, data);
		sellerOrders[msg.sender].push(id);
		emit NewBillGenerated(msg.sender, id);
	}

	function sendBillOfLadingToCarreir(uint256 _id) external {
		ReceiptData storage _orderData = receiptData[_id];
		//require(_orderData.seller == msg.sender, "Only called by seller");
		require(!_orderData.isSentToCarrier, "already sent to carreir");
		_orderData.isSentToCarrier = true;
		carreirOrders[_orderData.shipper.shipperWalletAddress].push(_id);
		safeTransferFrom(msg.sender, _orderData.shipper.shipperWalletAddress, _id, 1, "data");
		emit BillSentToCarreir(msg.sender, _orderData.shipper.shipperWalletAddress, _id);

	}

	function sendBillOfLadingToBuyer(uint256 _id) external {
		ReceiptData storage _orderData = receiptData[_id];
		//require(_orderData.seller == msg.sender, "Only called by seller");
		require(!_orderData.isSentToBuyer, "already sent");

		_orderData.isSentToBuyer = true;
		buyerOrders[_orderData.consignee.consigneeAddress].push(_id);
		safeTransferFrom(msg.sender, _orderData.consignee.consigneeAddress, _id, 1, 'data');

		emit BillSentToBuyer(msg.sender, _orderData.consignee.consigneeAddress, _id);

	}

	function getOrderById(uint256 _id) external view returns(ReceiptData memory){
		return receiptData[_id];
	}
	function getSellerOrder(address _sellerAddress) external view returns(uint256[] memory){
		return sellerOrders[_sellerAddress];
	}

	function getCarreirOrder(address _carreirAddress) external view returns(uint256[] memory){
		return carreirOrders[_carreirAddress];
	}

	function getBuyerOrder(address _buyerAddress) external view returns(uint256[] memory){
		return buyerOrders[_buyerAddress];

	}
}