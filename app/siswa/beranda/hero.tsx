"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Hero() {
  return (
    <main>
      {/* Bagian Hero */}
      <div className="bg-[#A2DBF9] rounded-b-[450px] relative flex flex-col items-center overflow-hidden">
        {/* Background Hero */}
        <div
          className="relative flex flex-col items-center justify-center w-full min-h-[55vh] md:min-h-[75vh] bg-contain md:bg-cover bg-top md:bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/illustrasi/siswa/beranda/hero.png')",
          }}
        >
          {/* Kolom pencarian */}
          <div className="absolute bottom-[25%] md:bottom-[28%] flex items-center bg-white rounded-full shadow-md px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 w-[80%] max-w-[420px]">
            <input
              type="text"
              placeholder="Cari sesuatu ??"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            />
            <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Judul */}
      <h1 className="mt-16 md:mt-20 text-center text-xl sm:text-2xl md:text-6xl font-bold text-[#003653] leading-snug px-4">
        Cari Khursus lebih mudah dengan UMKMAcademy
      </h1>
    </main>
  );
}
