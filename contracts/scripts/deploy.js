import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Escrow = await hre.ethers.getContractFactory("BaseGridEscrow");
  const escrow = await Escrow.deploy();
  await escrow.waitForDeployment();
  console.log("Escrow deployed to:", escrow.target);

  const Reputation = await hre.ethers.getContractFactory("BaseGridReputation");
  const reputation = await Reputation.deploy();
  await reputation.waitForDeployment();
  console.log("Reputation deployed to:", reputation.target);

  const TaskManager = await hre.ethers.getContractFactory("BaseGridTaskManager");
  const taskManager = await TaskManager.deploy(escrow.target, reputation.target);
  await taskManager.waitForDeployment();
  console.log("TaskManager deployed to:", taskManager.target);

  // Setup permissions
  await escrow.setTaskManager(taskManager.target);
  await reputation.setTaskManager(taskManager.target);
  console.log("Permissions set up. TaskManager linked.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
