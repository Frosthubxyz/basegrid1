// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BaseGridReputation {
    address public owner;
    address public taskManager;
    
    mapping(address => uint256) public scores;
    
    event ScoreIncreased(address indexed user, uint256 newScore);
    event ScoreDecreased(address indexed user, uint256 newScore);

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

    function increaseScore(address user, uint256 amount) external onlyTaskManager {
        scores[user] += amount;
        emit ScoreIncreased(user, scores[user]);
    }

    function decreaseScore(address user, uint256 amount) external onlyTaskManager {
        if (scores[user] > amount) {
            scores[user] -= amount;
        } else {
            scores[user] = 0;
        }
        emit ScoreDecreased(user, scores[user]);
    }

    function getScore(address user) external view returns (uint256) {
        return scores[user];
    }
}
