"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (role: string) => {
    setSelected(role);
    setTimeout(() => {
      if (role === "siswa") router.push("/siswa");
      if (role === "pemilik") router.push("/pemilik");
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/illustrasi/bg.png" // letakkan file gambar di public/bg-login.png
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay transparan lembut biar teks tetap terbaca */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-0"></div>

      {/* Card utama */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl px-8 py-10 md:px-16 md:py-14 max-w-3xl w-[90%] text-center border border-[#CBE8FF]/60">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003B5C] mb-3">
          Selamat Datang
        </h1>
        <p className="text-zinc-600 text-lg mb-10 font-medium">
          Silahkan memilih!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Siswa */}
          <button
            onClick={() => handleSelect("siswa")}
            className={`group flex flex-col items-center justify-center bg-white border-[6px] rounded-2xl p-6 md:p-8 w-52 hover:scale-105 transition-all duration-300 ${selected === "siswa"
                ? "border-[#4DB7FF] shadow-lg"
                : "border-[#AEE3FF] hover:border-[#72C9FF]"
              }`}
          >
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="/illustrasi/siswa.png"
                alt="Siswa"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-[#003B5C]">Siswa</span>
          </button>

          <span className="text-lg font-semibold text-[#003B5C]">atau</span>

          {/* Pemilik Kursus */}
          <button
            onClick={() => handleSelect("pemilik")}
            className={`group flex flex-col items-center justify-center bg-white border-[6px] rounded-2xl p-6 md:p-8 w-52 hover:scale-105 transition-all duration-300 ${selected === "pemilik"
                ? "border-[#3853A4] shadow-lg"
                : "border-[#BFD4FF] hover:border-[#1E2F6E]"
              }`}
          >
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="/illustrasi/pemilik.png"
                alt="Pemilik Kursus"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-[#003B5C]">
              Pemilik Kursus
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
