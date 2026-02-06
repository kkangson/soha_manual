import Link from "next/link";
import { BookOpen, Utensils, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            Staff Portal v1.0
          </div>
          <h1 className="text-5xl font-black tracking-tighter sm:text-6xl">
            Training <span className="text-orange-600">Manual</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-base max-w-[320px] mx-auto font-medium leading-relaxed">
            Master the art of service with our essential guide for restaurant professionals.
          </p>
        </div>
      </header>

      {/* Modules Selection */}
      <section className="p-6 pb-16 space-y-6 bg-white dark:bg-stone-900 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] border-t border-stone-100 dark:border-stone-800">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xl font-bold tracking-tight">Modules</h3>
            <span className="text-[10px] font-bold text-stone-400 uppercase">Available Now</span>
          </div>

          <Link href="/menu" className="block group">
            <Card className="flex items-center p-5 bg-stone-50 dark:bg-stone-800/50 border-stone-200/60 dark:border-stone-700/50 hover:bg-white dark:hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <div className="w-14 h-14 bg-white dark:bg-stone-700 rounded-2xl flex items-center justify-center text-orange-600 mr-5 shadow-sm group-hover:rotate-6 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg leading-tight">Menu Guide</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium mt-0.5">Settings, attributes & allergies</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </Card>
          </Link>

          {/* Locked module pattern */}
          <div className="flex items-center p-5 opacity-40 grayscale bg-stone-50/50 dark:bg-stone-900/50 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl">
            <div className="w-14 h-14 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-stone-300 mr-5">
              <span className="font-bold text-xl">?</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-stone-400">Service Standards</h4>
              <p className="text-sm text-stone-400 mt-0.5">Coming in the next update</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
