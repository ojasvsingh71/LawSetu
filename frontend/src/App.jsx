import { useState } from "react";



function App() {

    const [count, setCount] = useState(0);

    return (
        <div className="w-full min-h-screen p-0 bg-indigo-400 flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl text-white font-bold">LawSetu</h1>
            <h2 className="font-bold text-2xl">value : {count}</h2>
            <button className="bg-black text-white text-xl px-4 py-2 rounded" onClick={()=>setCount(count+1)}>
               Click for PLUS 
            </button> <br />
             <button className="bg-black text-white text-xl px-4 py-2 rounded" onClick={()=>setCount(count-1)}>
               Click for MINUS 
            </button>
        </div>
    );
}

export default App;
