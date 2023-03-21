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

}