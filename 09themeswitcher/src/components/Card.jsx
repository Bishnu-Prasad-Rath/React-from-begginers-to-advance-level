import React from "react";

export default function Card({ darkMode }) {
  return (
    <div
      className={`w-full max-w-sm mx-auto border rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 ${
        darkMode
          ? "bg-violet-700 border-gray-700"
          : "bg-white border-gray-200"
      } animate-fadeInUp`}
    >
      {/* Image */}
      <a href="/">
        <img
          className="p-6 rounded-t-lg transition-all duration-500 hover:opacity-90"
          src="https://thfvnext.bing.com/th/id/OIP.Pr58hjW8P-RAMuQE2hzKAwHaEK?w=259&h=180&c=7&r=0&o=5&cb=thfvnext&dpr=1.3&pid=1.7"
          alt="Violet Theme"
        />
      </a>

      {/* Card Content */}
      <div className="px-5 pb-5">
        <a href="/">
          <h5
            className={`text-xl font-semibold tracking-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            VIOLET-THEME
          </h5>
        </a>

{/* Ratings */}
<div className="flex items-center mt-2.5 mb-5">
  {[...Array(5)].map((_, i) => (
    <svg
      key={i}
      className="w-4 h-4 text-yellow-300 mr-1 transition-transform duration-300 hover:scale-125"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 
      4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73
      3.522-3.356c.33-.314.16-.888-.283-.95l-4.898-.696-2.175-4.387
      c-.197-.39-.73-.39-.927 0l-2.175 4.387-4.898.696c-.443.062-.613.636-.282.95l3.522 
      3.356-.83 4.73z"/>
    </svg>
  ))}
  <span
    className={`ml-3 px-2.5 py-0.5 rounded text-xs font-semibold ${
      darkMode ? "bg-blue-200 text-blue-800" : "bg-blue-100 text-blue-800"
    }`}
  >
    5.0
  </span>
</div>




        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <span
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            $599
          </span>
          <a
            href="/"
            className={`px-5 py-2.5 rounded-lg text-sm font-medium text-center transition-all duration-300 ${
              darkMode
                ? "bg-purple-500 hover:bg-pink-600 focus:ring-violet-300"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
            } text-white focus:ring-4 focus:outline-none`}
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}
