"use client";
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="container mx-auto max-w-md mt-6 text-gray-900">
      <h1 className="text-xl text-center font-mono mb-6">Kind Calculator</h1>
      <Calculator />
    </div>
  );
}
