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
		address consigneeWalletAddress;

	}

	struct Carreir {
		string carreirPhysicalAddress;
		address carreirWalletAddress;

	}

	struct Package {
		string description;
		uint256 grossWeight;
		uint256 measurments;
		
	}

	struct ReceiptData {
		Shipper shipper;
		Consignee consignee;
		Carreir carreir;
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
	mapping(uint256 => Package[]) internal packageDetail;
	uint256 internal id;

	event NewBillGenerated(address by, uint256 id);
	event BillSentToCarreir(address seller, address carrier, uint256 id);
	event BillSentToBuyer(address seller, address buyer, uint256 id);
	constructor()ERC1155("www.billoflading.com"){}


	function generateBillOfLading(ReceiptData memory _orderData, Package[] memory _packages ) external {
		bytes memory data = abi.encode(_orderData);
		_orderData.issuedAt = block.timestamp;
		_orderData.isSentToBuyer = false;
		_orderData.isSentToCarrier = false;
		id++;
		receiptData[id] = _orderData;
		for(uint i; i < _packages.length; i++){
			packageDetail[id].push(_packages[i]);
		}
		_mint(msg.sender, id, 3, data);
		sellerOrders[msg.sender].push(id);
		emit NewBillGenerated(msg.sender, id);
	}

	function sendBillOfLadingToCarreir(uint256 _id) external {
		ReceiptData storage _orderData = receiptData[_id];
		//require(_orderData.seller == msg.sender, "Only called by seller");
		require(!_orderData.isSentToCarrier, "already sent to carreir");
		_orderData.isSentToCarrier = true;
		carreirOrders[_orderData.carreir.carreirWalletAddress].push(_id);
		safeTransferFrom(msg.sender, _orderData.shipper.shipperWalletAddress, _id, 1, "data");
		emit BillSentToCarreir(msg.sender, _orderData.shipper.shipperWalletAddress, _id);

	}

	function sendBillOfLadingToBuyer(uint256 _id) external {
		ReceiptData storage _orderData = receiptData[_id];
		//require(_orderData.seller == msg.sender, "Only called by seller");
		require(!_orderData.isSentToBuyer, "already sent");

		_orderData.isSentToBuyer = true;
		buyerOrders[_orderData.consignee.consigneeWalletAddress].push(_id);
		safeTransferFrom(msg.sender, _orderData.consignee.consigneeWalletAddress, _id, 1, 'data');

		emit BillSentToBuyer(msg.sender, _orderData.consignee.consigneeWalletAddress, _id);

	}

	function getOrderById(uint256 _id) external view returns(ReceiptData memory, Package[] memory ){
		return (receiptData[_id], packageDetail[_id]);
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