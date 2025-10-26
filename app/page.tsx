"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleSelect = (role: string) => {
    setOpenModal(false);
    if (role === "siswa") router.push("/siswa");
    if (role === "pemilik") router.push("/pemilik");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#CBE8FF] to-[#F0F9FF] overflow-hidden">
      {/* Ilustrasi background dekoratif */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#AEE3FF] rounded-full opacity-30 blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD580] rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Konten utama */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003B5C] drop-shadow-sm">
          Selamat Datang
        </h1>
        <p className="text-zinc-600 text-base md:text-lg">
          Silakan pilih jenis pengguna Anda untuk melanjutkan.
        </p>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded-full bg-[#003B5C] px-8 py-3 text-white text-lg font-semibold shadow-md hover:bg-[#005A88] hover:shadow-lg transition-all duration-300"
        >
          Pilih Opsi
        </button>
      </main>

      {/* Modal */}
      {openModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-2xl text-center border border-zinc-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003B5C] mb-8">
              Pilih Jenis Pengguna
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Kartu Siswa */}
              <button
                onClick={() => handleSelect("siswa")}
                className="group flex flex-col items-center justify-center bg-white border-8 border-[#AEE3FF] hover:border-[#72C9FF] rounded-2xl p-6 transition-all hover:scale-105 shadow-sm hover:shadow-md"
              >
                <div className="w-24 h-24 mb-4 relative">
                  <Image
                    src="/illustrasi/siswa.png"
                    alt="Siswa"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-semibold text-[#003B5C]">
                  Siswa
                </span>
              </button>

              {/* Kartu Pemilik Kursus */}
              <button
                onClick={() => handleSelect("pemilik")}
                className="group flex flex-col items-center justify-center bg-white border-8 border-[#FFD580] hover:border-[#FFC14D] rounded-2xl p-6 transition-all hover:scale-105 shadow-sm hover:shadow-md"
              >
                <div className="w-24 h-24 mb-4 relative">
                  <Image
                    src="/illustrasi/pemilik.png"
                    alt="Pemilik Kursus"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-semibold text-[#003B5C]">
                  Pemilik Kursus
                </span>
              </button>
            </div>

            <button
              onClick={() => setOpenModal(false)}
              className="mt-8 rounded-full px-6 py-2 text-[#003B5C] font-semibold border border-[#003B5C] hover:bg-[#003B5C] hover:text-white transition-all duration-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
