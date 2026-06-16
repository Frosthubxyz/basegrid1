import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";

// Mock data for the placeholder UI
const MOCK_TASKS = [
  {
    id: 1,
    title: "Label 100 images of handwritten text",
    reward: "0.05",
    status: "Open" as const,
    creator: "0x1234...5678",
    deadline: "2026-06-20",
  },
  {
    id: 2,
    title: "Verify sentiment analysis on 500 tweets",
    reward: "0.15",
    status: "Open" as const,
    creator: "0xABCD...EF01",
    deadline: "2026-06-18",
  },
  {
    id: 3,
    title: "Categorize support tickets into 5 buckets",
    reward: "0.02",
    status: "In Progress" as const,
    creator: "0x9876...5432",
    deadline: "2026-06-19",
  },
];

export default function TasksMarketplacePage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col mb-10 gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Explore Tasks</h1>
              <p className="text-zinc-400">
                Browse available micro-tasks and earn crypto instantly upon completion.
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <select className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-w-[140px]">
                <option value="newest">Newest First</option>
                <option value="reward_high">Highest Reward</option>
                <option value="reward_low">Lowest Reward</option>
                <option value="deadline">Expiring Soon</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar">
            <button className="px-4 py-1.5 rounded-full bg-white text-zinc-950 text-sm font-bold whitespace-nowrap">
              All Tasks
            </button>
            <button className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Data Labeling
            </button>
            <button className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Verification
            </button>
            <button className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Content Review
            </button>
            <button className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Surveys
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TASKS.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </>
  );
}
