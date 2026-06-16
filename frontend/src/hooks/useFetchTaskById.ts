import { useReadContract } from "wagmi";
import { TaskManagerABI } from "../abis";

const TASK_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_TASK_MANAGER_ADDRESS as `0x${string}`;

export function useFetchTaskById(taskId: number) {
  const { data: task, isLoading, error } = useReadContract({
    address: TASK_MANAGER_ADDRESS,
    abi: TaskManagerABI,
    functionName: "tasks",
    args: [taskId],
  });

  return {
    task,
    isLoading,
    error,
  };
}
