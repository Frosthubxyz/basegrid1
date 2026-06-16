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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
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
            <button className="px-4 py-2.5 bg-zinc-800 text-white text-sm font-medium rounded-xl hover:bg-zinc-700 transition-colors">
              Filter
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
