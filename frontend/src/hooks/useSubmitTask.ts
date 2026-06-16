import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TaskManagerABI } from "../abis";

const TASK_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_TASK_MANAGER_ADDRESS as `0x${string}`;

export function useSubmitTask() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const submitTask = async (taskId: number, proof: string) => {
    writeContract({
      address: TASK_MANAGER_ADDRESS,
      abi: TaskManagerABI,
      functionName: "submitTask",
      args: [taskId, proof],
    });
  };

  return {
    submitTask,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  };
}
