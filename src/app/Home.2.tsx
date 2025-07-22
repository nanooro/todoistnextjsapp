"use client";

export default function Home() {
  return (
    <div className="main w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500 relative ">
      <div className=" w-full max-w-[95vw] absolute p-4 rounded-2xl m-2 top-0 left-1/2 bg-white/40 border-white/100 -translate-x-1/2 h-16   bg-opacity-30 backdrop-blur-3xl  flex justify-start items-center">
        {" "}
        <h1 className="text-4xl -mt-1 font-bold scale-y-110 fontexta">
          Todoist
        </h1>{" "}
        <div className="ml-auto scale-[1.5] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
