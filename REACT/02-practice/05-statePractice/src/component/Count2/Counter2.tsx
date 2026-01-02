import { useState } from "react";

function Counter2() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-xl shadow-2xl w-64 mx-auto mt-10 border border-gray-800">
        <h2 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-widest">
            Counter
        </h2>

        <p className="text-6xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            {count}
        </p>

        <div className="flex gap-4 mb-4">
            <button
            onClick={decrement}
            className="w-12 h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-all active:scale-95 font-bold text-xl shadow-lg shadow-red-500/20"
            >
            -
            </button>
            <button
            onClick={increment}
            className="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all active:scale-95 font-bold text-xl shadow-lg shadow-green-500/20"
            >
            +
            </button>
        </div>

        <button
            onClick={reset}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors text-sm font-medium border border-gray-600"
        >
            Reset
        </button>
        </div>
    );
}

export default Counter2;
