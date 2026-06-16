import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-600 to-violet-500 flex items-center justify-center">
          <span className="text-white font-bold text-lg leading-none">B</span>
        </div>
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          BaseGrid
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/tasks" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
          Explore Tasks
        </Link>
        <Link href="/create" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
          Post Task
        </Link>
        <Link href="/leaderboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
          Leaderboard
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <ConnectButton 
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }} 
          chainStatus="icon" 
          showBalance={false} 
        />
      </div>
    </header>
  );
}
