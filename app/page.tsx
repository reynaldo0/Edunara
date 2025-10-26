"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleSelect = (role: string) => {
    setOpenModal(false);
    if (role === "siswa") router.push("/siswa");
    if (role === "pemilik") router.push("/pemilik");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Selamat Datang 👋
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Silakan pilih jenis pengguna Anda untuk melanjutkan.
        </p>
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800 transition-all"
        >
          Pilih Opsi
        </button>
      </main>

      {/* Modal */}
      {openModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setOpenModal(false)}
          ></div>

          {/* Modal box */}
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-scaleIn">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
                Pilih Jenis Pengguna
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => handleSelect("siswa")}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition-all"
                >
                  Siswa
                </button>
                <button
                  onClick={() => handleSelect("pemilik")}
                  className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 transition-all"
                >
                  Pemilik
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
