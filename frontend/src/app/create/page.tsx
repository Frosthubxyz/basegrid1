"use client";

import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const taskSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be under 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000, "Description is too long"),
  category: z.string().min(1, "Please select a category"),
  reward: z.coerce.number().min(0.0001, "Reward must be at least 0.0001 ETH"),
  deadline: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Deadline must be in the future",
  }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function CreateTaskPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      category: "data_labeling",
    }
  });

  const onSubmit = async (data: TaskFormValues) => {
    const loadingToast = toast.loading("Funding smart contract escrow...");
    try {
      // Placeholder for Wagmi contract integration
      console.log("Form validated and ready for contract:", data);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate tx delay
      
      toast.success("Task created successfully!", { id: loadingToast });
      reset();
    } catch (error) {
      toast.error("Failed to create task. Please try again.", { id: loadingToast });
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Post a New Task</h1>
          <p className="text-zinc-400">
            Create a micro-task, fund it with ETH on Base, and workers will complete it instantly.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-zinc-300">
                Task Title
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                placeholder="e.g., Label 100 images for AI training"
                className={`bg-zinc-950 border ${errors.title ? 'border-red-500' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.title && <span className="text-red-500 text-xs font-medium">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-zinc-300">
                Task Details / Instructions
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={5}
                placeholder="Describe exactly what the worker needs to do..."
                className={`bg-zinc-950 border ${errors.description ? 'border-red-500' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
              ></textarea>
              {errors.description && <span className="text-red-500 text-xs font-medium">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-medium text-zinc-300">
                  Category
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className={`bg-zinc-950 border ${errors.category ? 'border-red-500' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none`}
                >
                  <option value="data_labeling">Data Labeling</option>
                  <option value="verification">Verification</option>
                  <option value="content_review">Content Review</option>
                  <option value="surveys">Surveys</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && <span className="text-red-500 text-xs font-medium">{errors.category.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="reward" className="text-sm font-medium text-zinc-300">
                  Reward (in ETH)
                </label>
                <input
                  {...register("reward")}
                  type="number"
                  id="reward"
                  step="0.0001"
                  placeholder="0.01"
                  className={`bg-zinc-950 border ${errors.reward ? 'border-red-500' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                {errors.reward && <span className="text-red-500 text-xs font-medium">{errors.reward.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="deadline" className="text-sm font-medium text-zinc-300">
                  Deadline
                </label>
                <input
                  {...register("deadline")}
                  type="datetime-local"
                  id="deadline"
                  className={`bg-zinc-950 border ${errors.deadline ? 'border-red-500' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                {errors.deadline && <span className="text-red-500 text-xs font-medium">{errors.deadline.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              {isSubmitting ? "Processing..." : "Fund & Post Task"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
