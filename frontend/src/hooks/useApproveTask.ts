import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TaskManagerABI } from "../abis";

const TASK_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_TASK_MANAGER_ADDRESS as `0x${string}`;

export function useApproveTask() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const approveTask = async (taskId: number) => {
    writeContract({
      address: TASK_MANAGER_ADDRESS,
      abi: TaskManagerABI,
      functionName: "approveTask",
      args: [taskId],
    });
  };

  return {
    approveTask,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  };
}
