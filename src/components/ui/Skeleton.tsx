export function ProductCardSkeleton() {
    return (
        <div className="card-bg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-56 bg-gray-200 dark:bg-gray-700" />
            <div className="p-5 space-y-4">
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="h-[500px] bg-gray-200 dark:bg-gray-700 rounded-3xl" />
                <div className="space-y-6">
                    <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="space-y-3">
                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
                        <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                    </div>
                    <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                    <div className="space-y-3 pt-6">
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    </div>
                    <div className="flex gap-4 pt-8">
                        <div className="flex-1 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                        <div className="flex-1 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
