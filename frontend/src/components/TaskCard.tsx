import Link from "next/link";

interface TaskCardProps {
  id: string | number;
  title: string;
  reward: string;
  status: "Open" | "In Progress" | "Completed" | "Pending Review";
  creator: string;
  deadline: string;
}

export function TaskCard({ id, title, reward, status, creator, deadline }: TaskCardProps) {
  // Determine badge styles based on status
  let statusClasses = "bg-zinc-800 text-zinc-500 border-zinc-700";
  if (status === "Open") {
    statusClasses = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  } else if (status === "In Progress" || status === "Pending Review") {
    statusClasses = "bg-orange-500/10 text-orange-400 border-orange-500/20";
  } else if (status === "Completed") {
    statusClasses = "bg-green-500/10 text-green-400 border-green-500/20";
  }

  return (
    <div className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusClasses}`}>
          {status}
        </span>
        <span className="text-xs text-zinc-500 font-medium font-mono truncate max-w-[120px]">
          {creator}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
        {title}
      </h3>

      <div className="flex-1 mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Reward</span>
          <div className="flex items-center gap-1.5 font-bold text-white">
            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px]">ETH</div>
            {reward}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Deadline</span>
          <span className="text-zinc-300 font-medium">{deadline}</span>
        </div>
      </div>

      <Link 
        href={`/tasks/${id}`}
        className="mt-6 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold text-center rounded-xl transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
