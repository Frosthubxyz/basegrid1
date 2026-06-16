// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BaseGridEscrow {
    address public owner;
    address public taskManager;
    
    mapping(uint256 => uint256) public deposits; // taskId => amount
    
    event Deposited(uint256 indexed taskId, address indexed depositor, uint256 amount);
    event Released(uint256 indexed taskId, address indexed payee, uint256 amount);
    event Refunded(uint256 indexed taskId, address indexed refundee, uint256 amount);

    modifier onlyTaskManager() {
        require(msg.sender == taskManager, "Only TaskManager can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setTaskManager(address _taskManager) external {
        require(msg.sender == owner, "Only owner can set TaskManager");
        taskManager = _taskManager;
    }

    function deposit(uint256 taskId) external payable onlyTaskManager {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        deposits[taskId] += msg.value;
        emit Deposited(taskId, tx.origin, msg.value);
    }

    function release(uint256 taskId, address payable payee) external onlyTaskManager {
        uint256 amount = deposits[taskId];
        require(amount > 0, "No funds to release");
        
        deposits[taskId] = 0;
        (bool success, ) = payee.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Released(taskId, payee, amount);
    }

    function refund(uint256 taskId, address payable refundee) external onlyTaskManager {
        uint256 amount = deposits[taskId];
        require(amount > 0, "No funds to refund");
        
        deposits[taskId] = 0;
        (bool success, ) = refundee.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Refunded(taskId, refundee, amount);
    }
}
