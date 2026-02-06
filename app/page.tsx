import Link from "next/link";
import { BookOpen, Utensils } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* Header Section */}
      <header className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-wider text-orange-600 uppercase">Staff Only</h2>
          <h1 className="text-3xl font-bold tracking-tight">Training Manual</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm max-w-[260px] mx-auto">
            Essential guide for new restaurant staff members.
          </p>
        </div>
      </header>

      {/* Action Section */}
      <div className="p-6 pb-12 space-y-4 bg-white dark:bg-stone-900 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <h3 className="text-lg font-semibold px-2 pt-4 mb-2">Modules</h3>

        <Link
          href="/menu"
          className="flex items-center p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors group"
        >
          <div className="w-12 h-12 bg-white dark:bg-stone-600 rounded-full flex items-center justify-center text-orange-600 mr-4 shadow-sm group-hover:scale-105 transition-transform">
            <Utensils className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base">Menu Guide</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">Settings, details & allergies</p>
          </div>
          <div className="text-stone-400">
            →
          </div>
        </Link>

        {/* Placeholder for future modules */}
        <div className="flex items-center p-4 opacity-50 grayscale cursor-not-allowed border border-stone-100 dark:border-stone-800 rounded-xl">
          <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-400 mr-4">
            <span className="font-bold text-lg">?</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base">Service Standards</h4>
            <p className="text-xs text-stone-400">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
