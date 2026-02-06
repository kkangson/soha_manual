export default function MenuLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950">
            <div className="sticky top-0 z-20 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-4 h-[65px] animate-pulse" />

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
