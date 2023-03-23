// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
contract BillOfLading is ERC1155 {

	
	struct Shipper{
		string physicalAddress;
		address walletAddress;
	}

	struct Consignee {
		string physicalAddress;
		address walletAddress;

	}

	struct Carreir {
		string physicalAddress;
		address walletAddress;

	}

	struct Package {
		uint256 marksAndNos;
		string contNumber;
		string description;
		uint256 grossWeight;
		uint256 measurement;
	}

	struct ReceiptData {
		Shipper shipper;
		Consignee consignee;
		Carreir carreir;
		string preCarriageBy;
        string  placeOfReceiptByPreCarrier;
        string  vessel;
        string  portOfLoading;
        string  portOfDischarge;
        string  placeOfDeliveryByOnCarrier;
        string  customReference;
        uint256  billNumber;
        string  shipperReference;
        string  fAgentsReference;
        string  referenceNumber;
        string  preCarriagePayableAt;
        string  onCarriagePayableAt;
        uint256  numberOfBill;
        uint256  issuedAt;
        string  forCarrier;
        string  freightPayableAt;
        uint256  NumberOfOriginalBSL;
        bool  isSentToCarrier;
        bool  isSentToBuyer;
        string  freightAndCharges;
	}


    //mapping (uint256 => OrderData) internal orders;
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
		carreirOrders[_orderData.carreir.walletAddress].push(_id);
		safeTransferFrom(msg.sender, _orderData.shipper.walletAddress, _id, 1, "data");
		emit BillSentToCarreir(msg.sender, _orderData.shipper.walletAddress, _id);

	}

	function sendBillOfLadingToBuyer(uint256 _id) external {
		ReceiptData storage _orderData = receiptData[_id];
		//require(_orderData.seller == msg.sender, "Only called by seller");
		require(!_orderData.isSentToBuyer, "already sent");

		_orderData.isSentToBuyer = true;
		buyerOrders[_orderData.consignee.walletAddress].push(_id);
		safeTransferFrom(msg.sender, _orderData.consignee.walletAddress, _id, 1, 'data');

		emit BillSentToBuyer(msg.sender, _orderData.consignee.walletAddress, _id);

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