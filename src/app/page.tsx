"use client";
import { Heading } from "@/components/ui/heading";
import { Todo } from "@/components/ui/todo";

export default function Home() {
  return (
    <div className="main w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col">
      <Heading />
      <div className="flex-grow flex justify-center items-center">
        <Todo />
      </div>
    </div>
  );
}
