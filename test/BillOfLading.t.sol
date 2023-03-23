// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/BillOfLading.sol";

contract BillTest is Test {
    BillOfLading bill;

    function setUp() public {
        bill = new BillOfLading();
        console.log(address(bill));

    }

    function testgenerateBillOfLading() public {
        BillOfLading.ReceiptData memory data;
        BillOfLading.Shipper memory shipper = BillOfLading.Shipper("Addis Ababa, Ethiopia", address(20));
        BillOfLading.Consignee memory consignee = BillOfLading.Consignee("Addis Ababa, Ethiopia", address(30));
        BillOfLading.Carreir memory carrier = BillOfLading.Carreir("Addis Ababa", address(40));

        data = BillOfLading.ReceiptData({
            shipper: shipper,
            consignee: consignee,
            carreir: carrier,
            preCarriageBy: "Ethiopia",
            vessel: "Ethiopia",
            portOfDischarge: "Gelan",
            placeOfReceiptByPreCarrier: "Addis Ababa",
            portOfLoading: "Dubai",
            placeOfDeliveryByOnCarrier: "Mojo",
            customReference: "12345",
            shipperReference: "5678",
            fAgentsReference: "98764",
            billNumber: 64373829,
            referenceNumber: "2949395",
            preCarriagePayableAt: "Addis Abab",
            onCarriagePayableAt: "Addis Ababa",
            numberOfBill: 3,
            issuedAt: 0,
            freightPayableAt: "Addis Ababa",
            NumberOfOriginalBSL: 1,
            forCarrier: "Yes",
            isSentToCarrier: true,
            isSentToBuyer: true,
			 freightAndCharges: "Yes"
        });

	

		BillOfLading.Package[] memory package = new BillOfLading.Package[](2);
		package[0] = BillOfLading.Package(1, "1","New contrainer", 2000, 20);
		package[1] = BillOfLading.Package(1, "2","New three contrainer", 3000, 30);
		vm.startPrank(address(50));
		bill.generateBillOfLading(data, package);
		vm.stopPrank();
		(BillOfLading.ReceiptData memory _receipt,) = bill.getOrderById(1);
		console.log(_receipt.isSentToCarrier, _receipt.isSentToBuyer, _receipt.issuedAt);
    }

	function testSendBillToBuyer() public {
		testgenerateBillOfLading();
		vm.startPrank(address(50));
		bill.sendBillOfLadingToBuyer(1);
		(BillOfLading.ReceiptData memory _receipt,) = bill.getOrderById(1);
		vm.stopPrank();
		console.log(_receipt.isSentToCarrier, _receipt.isSentToBuyer, _receipt.issuedAt);
		uint256[] memory buyerOrders = bill.getBuyerOrder(_receipt.consignee.walletAddress);
		console.log(buyerOrders[0]);

	}

	function testSendBillToCarreir() public {
		testgenerateBillOfLading();
		vm.startPrank(address(50));
		bill.sendBillOfLadingToCarreir(1);
		(BillOfLading.ReceiptData memory _receipt,) = bill.getOrderById(1);
		vm.stopPrank();
		console.log(_receipt.isSentToCarrier, _receipt.isSentToBuyer, _receipt.issuedAt);
		uint256[] memory CarreirOrders = bill.getCarreirOrder(_receipt.carreir.walletAddress);
		console.log(CarreirOrders[0]);

	}
}
