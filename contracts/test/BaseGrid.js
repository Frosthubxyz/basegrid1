import { expect } from "chai";
import hre from "hardhat";

describe("BaseGrid", function () {
  let escrow, reputation, taskManager;
  let owner, creator, worker;

  beforeEach(async function () {
    [owner, creator, worker] = await hre.ethers.getSigners();

    const Escrow = await hre.ethers.getContractFactory("BaseGridEscrow");
    escrow = await Escrow.deploy();

    const Reputation = await hre.ethers.getContractFactory("BaseGridReputation");
    reputation = await Reputation.deploy();

    const TaskManager = await hre.ethers.getContractFactory("BaseGridTaskManager");
    taskManager = await TaskManager.deploy(escrow.target, reputation.target);

    await escrow.setTaskManager(taskManager.target);
    await reputation.setTaskManager(taskManager.target);
  });

  it("Should create a task successfully", async function () {
    const reward = hre.ethers.parseEther("1");
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    
    await taskManager.connect(creator).createTask(reward, deadline, "ipfs://task-data");
    
    const task = await taskManager.tasks(1);
    expect(task.creator).to.equal(creator.address);
    expect(task.reward).to.equal(reward);
    expect(task.status).to.equal(0n); // Created
  });

  it("Should fund a task", async function () {
    const reward = hre.ethers.parseEther("1");
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    
    await taskManager.connect(creator).createTask(reward, deadline, "ipfs://task-data");
    await taskManager.connect(creator).fundTask(1, { value: reward });
    
    const task = await taskManager.tasks(1);
    expect(task.status).to.equal(2n); // Open
    
    const deposit = await escrow.deposits(1);
    expect(deposit).to.equal(reward);
  });

  it("Should accept, submit and approve a task", async function () {
    const reward = hre.ethers.parseEther("1");
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    
    await taskManager.connect(creator).createTask(reward, deadline, "ipfs://task-data");
    await taskManager.connect(creator).fundTask(1, { value: reward });
    
    await taskManager.connect(worker).acceptTask(1);
    let task = await taskManager.tasks(1);
    expect(task.status).to.equal(3n); // Accepted

    await taskManager.connect(worker).submitTask(1, "ipfs://proof");
    task = await taskManager.tasks(1);
    expect(task.status).to.equal(4n); // Submitted

    const initialBalance = await hre.ethers.provider.getBalance(worker.address);
    
    await taskManager.connect(creator).approveTask(1);
    task = await taskManager.tasks(1);
    expect(task.status).to.equal(6n); // Paid

    const finalBalance = await hre.ethers.provider.getBalance(worker.address);
    expect(finalBalance).to.be.greaterThan(initialBalance);

    const workerRep = await reputation.getScore(worker.address);
    const creatorRep = await reputation.getScore(creator.address);
    expect(workerRep).to.equal(10n);
    expect(creatorRep).to.equal(5n);
  });
});
