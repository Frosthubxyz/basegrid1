import { Header } from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              The decentralized human verification network
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Work Small. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                Earn Fast.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl">
              Connect with global micro-opportunities. Complete AI verification tasks, data labeling, and more. Trustless escrow guarantees your payment on Base.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link 
                href="/tasks" 
                className="px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Start Earning
              </Link>
              <Link 
                href="/create" 
                className="px-8 py-4 rounded-xl bg-zinc-900 text-white font-bold text-lg border border-zinc-800 hover:bg-zinc-800 transition-colors"
              >
                Post a Task
              </Link>
            </div>
          </div>
          
          {/* Stats Preview */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 border-t border-zinc-800/50 pt-12 w-full max-w-4xl">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-sm text-zinc-500">On-Chain Payments</span>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-3xl font-bold text-white">0%</span>
              <span className="text-sm text-zinc-500">Intermediary Fees</span>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-3xl font-bold text-white">&lt;1s</span>
              <span className="text-sm text-zinc-500">Payout Time</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
