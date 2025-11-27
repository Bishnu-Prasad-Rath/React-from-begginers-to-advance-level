import React from "react";
function Card(){
    return(
        <div className="border p-4 rounded shadow-md bg-blue-500 border-indigo-600">
            <h2 className="text-xl font-bold text-blue-300">Card Title</h2>
            <p className="text-blue-200">This is a sample card component.</p>
        </div>
    )
}
export default Card;