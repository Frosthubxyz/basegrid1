// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBaseGridEscrow {
    function deposit(uint256 taskId) external payable;
    function release(uint256 taskId, address payable payee) external;
    function refund(uint256 taskId, address payable refundee) external;
}

interface IBaseGridReputation {
    function increaseScore(address user, uint256 amount) external;
    function decreaseScore(address user, uint256 amount) external;
}

contract BaseGridTaskManager {
    enum TaskStatus { Created, Funded, Open, Accepted, Submitted, Approved, Paid, Cancelled }

    struct Task {
        uint256 id;
        address payable creator;
        address payable worker;
        uint256 reward;
        uint256 deadline;
        TaskStatus status;
        string dataUri; // IPFS hash for task description
        string submissionUri; // IPFS hash for submission proof
    }

    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;

    IBaseGridEscrow public escrow;
    IBaseGridReputation public reputation;

    event TaskCreated(uint256 indexed taskId, address indexed creator, uint256 reward);
    event TaskFunded(uint256 indexed taskId);
    event TaskAccepted(uint256 indexed taskId, address indexed worker);
    event TaskSubmitted(uint256 indexed taskId, string submissionUri);
    event TaskApproved(uint256 indexed taskId);
    event TaskRejected(uint256 indexed taskId);
    event TaskCancelled(uint256 indexed taskId);

    constructor(address _escrow, address _reputation) {
        escrow = IBaseGridEscrow(_escrow);
        reputation = IBaseGridReputation(_reputation);
    }

    function createTask(uint256 reward, uint256 deadline, string calldata dataUri) external returns (uint256) {
        require(deadline > block.timestamp, "Deadline must be in the future");
        require(reward > 0, "Reward must be greater than 0");

        taskCount++;
        uint256 taskId = taskCount;

        tasks[taskId] = Task({
            id: taskId,
            creator: payable(msg.sender),
            worker: payable(address(0)),
            reward: reward,
            deadline: deadline,
            status: TaskStatus.Created,
            dataUri: dataUri,
            submissionUri: ""
        });

        emit TaskCreated(taskId, msg.sender, reward);
        return taskId;
    }

    function fundTask(uint256 taskId) external payable {
        Task storage t = tasks[taskId];
        require(t.status == TaskStatus.Created, "Invalid status");
        require(msg.value == t.reward, "Incorrect fund amount");

        t.status = TaskStatus.Open;
        escrow.deposit{value: msg.value}(taskId);

        emit TaskFunded(taskId);
    }

    function acceptTask(uint256 taskId) external {
        Task storage t = tasks[taskId];
        require(t.status == TaskStatus.Open, "Task not open");
        require(block.timestamp < t.deadline, "Past deadline");

        t.worker = payable(msg.sender);
        t.status = TaskStatus.Accepted;

        emit TaskAccepted(taskId, msg.sender);
    }

    function submitTask(uint256 taskId, string calldata submissionUri) external {
        Task storage t = tasks[taskId];
        require(t.status == TaskStatus.Accepted, "Task not accepted");
        require(t.worker == msg.sender, "Not the assigned worker");

        t.submissionUri = submissionUri;
        t.status = TaskStatus.Submitted;

        emit TaskSubmitted(taskId, submissionUri);
    }

    function approveTask(uint256 taskId) external {
        Task storage t = tasks[taskId];
        require(t.status == TaskStatus.Submitted, "Task not submitted");
        require(t.creator == msg.sender, "Only creator can approve");

        t.status = TaskStatus.Approved;
        
        // Auto release payment
        escrow.release(taskId, t.worker);
        t.status = TaskStatus.Paid;

        // Increase reputation
        reputation.increaseScore(t.worker, 10);
        reputation.increaseScore(t.creator, 5);

        emit TaskApproved(taskId);
    }

    function rejectTask(uint256 taskId) external {
        Task storage t = tasks[taskId];
        require(t.status == TaskStatus.Submitted, "Task not submitted");
        require(t.creator == msg.sender, "Only creator can reject");

        t.status = TaskStatus.Accepted; // Revert back for resubmission or handle via dispute
        t.submissionUri = "";
        
        reputation.decreaseScore(t.worker, 5);

        emit TaskRejected(taskId);
    }

    function cancelTask(uint256 taskId) external {
        Task storage t = tasks[taskId];
        require(t.creator == msg.sender, "Only creator can cancel");
        require(t.status == TaskStatus.Created || t.status == TaskStatus.Open || (t.status == TaskStatus.Accepted && block.timestamp > t.deadline), "Cannot cancel");

        if (t.status == TaskStatus.Open || t.status == TaskStatus.Accepted) {
            escrow.refund(taskId, t.creator);
        }
        
        t.status = TaskStatus.Cancelled;
        emit TaskCancelled(taskId);
    }
}
