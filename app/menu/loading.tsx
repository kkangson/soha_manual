export default function MenuLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950">
            <div className="sticky top-0 z-20 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-4 h-[72px] flex items-center">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 animate-pulse" />
                <div className="ml-3 space-y-1">
                    <div className="w-20 h-2 bg-orange-100 dark:bg-orange-900/30 rounded animate-pulse" />
                    <div className="w-32 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse" />
                </div>
            </div>

            <main className="p-0 space-y-12 w-full">
                {[1, 2].map((section) => (
                    <div key={section} className="space-y-4">
                        <div className="h-14 w-full bg-stone-200 dark:bg-stone-800 animate-pulse" />
                        <div className="flex flex-col gap-4">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex flex-col space-y-4">
                                    <div className="aspect-square w-full bg-stone-200 dark:bg-stone-800 animate-pulse" />
                                    <div className="px-4 space-y-2">
                                        <div className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800 rounded animate-pulse" />
                                        <div className="h-4 w-1/2 bg-stone-200 dark:bg-stone-800 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
