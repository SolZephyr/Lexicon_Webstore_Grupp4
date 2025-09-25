export default function StockStatus({ amount }: { amount: number }) {
    return (
        <p className="text-sm text-gray-500 flex items-center gap-2">
            {amount > 7 ? (
                <span className="inline-flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3 3 5-5" />
                        </svg>
                    </span>
                    In Stock
                </span>
            ) : amount <= 7 && amount > 0 ? (
                <span className="inline-flex items-center">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mr-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24" height="24"
                            role="img"
                            aria-labelledby="exclTitle exclDesc"
                            className="w-3 h-3 text-white"
                        >
                            <rect x="11" y="6" width="2" height="8" rx="1" fill="none" stroke="currentColor" />
                            <circle cx="12" cy="17" r="1.2" fill="none" stroke="currentColor" />
                        </svg>
                    </span>
                    Low Stock
                </span>
            ) : (
                <span className="inline-flex items-center">
                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l6 6M11 5l-6 6" />
                        </svg>
                    </span>
                    Out of Stock
                </span>
            )}
        </p>
    );
}