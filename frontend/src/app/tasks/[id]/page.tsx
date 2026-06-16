"use client";

import { Header } from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

export default function TaskDetailsPage() {
  const [taskState, setTaskState] = useState<"open" | "accepted" | "submitted">("open");
  const [proof, setProof] = useState("");

  const handleAccept = () => setTaskState("accepted");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proof.trim()) setTaskState("submitted");
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8">
          ← Back to Tasks
        </Link>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-zinc-800 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`border text-xs font-bold px-3 py-1 rounded-full ${
                  taskState === 'open' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  taskState === 'accepted' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                }`}>
                  {taskState === 'open' ? 'Open' : taskState === 'accepted' ? 'In Progress' : 'Pending Review'}
                </span>
                <span className="text-sm text-zinc-500 font-mono">
                  Posted by 0x1234...5678
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Label 100 images of handwritten text
              </h1>
            </div>
            
            <div className="flex flex-col items-start sm:items-end gap-2 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 sm:min-w-[160px]">
              <span className="text-sm text-zinc-500 font-medium">Reward Escrowed</span>
              <div className="flex items-center gap-2 font-bold text-2xl text-white">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px]">ETH</div>
                0.05
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Task Instructions</h2>
              <div className="prose prose-invert max-w-none text-zinc-300">
                <p>
                  We are training a new OCR model and need high-quality labels for a dataset of 100 images containing handwritten text. 
                  You will be provided with a link to the dataset upon accepting the task.
                </p>
                <ul>
                  <li>Transcribe the text exactly as written, preserving punctuation.</li>
                  <li>If a word is completely illegible, mark it as <code>[UNCLEAR]</code>.</li>
                  <li>Submit your results as a JSON file mapping image IDs to the transcribed text.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                 <span className="block text-sm text-zinc-500 mb-1">Deadline</span>
                 <span className="font-medium text-white">June 20, 2026</span>
               </div>
               <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                 <span className="block text-sm text-zinc-500 mb-1">Category</span>
                 <span className="font-medium text-white">Data Labeling</span>
               </div>
            </div>
          </div>

          {/* Actions & Submission UI */}
          <div className="mt-10 pt-8 border-t border-zinc-800">
            {taskState === "open" && (
              <div className="flex justify-end">
                <button 
                  onClick={handleAccept}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Accept Task
                </button>
              </div>
            )}

            {taskState === "accepted" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-lg font-bold text-white">Submit Proof of Work</h3>
                <p className="text-sm text-zinc-400">Provide a link to your completed work (e.g., GitHub repo, Google Drive folder) or IPFS CID.</p>
                <input
                  type="text"
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  placeholder="https://..."
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
                <button 
                  type="submit"
                  className="mt-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                >
                  Submit for Review
                </button>
              </form>
            )}

            {taskState === "submitted" && (
              <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-green-500 text-xl">✓</span>
                </div>
                <h3 className="text-lg font-bold text-green-400">Work Submitted</h3>
                <p className="text-sm text-green-500/80">
                  The task creator is reviewing your submission. You will receive the 0.05 ETH reward automatically once approved.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
