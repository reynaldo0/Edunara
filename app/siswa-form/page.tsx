"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useSiswa } from "../context/SiswaContext";

export default function SiswaFormPage() {
    const router = useRouter();
    const { setSiswa } = useSiswa(); 
    const [selectedKursus, setSelectedKursus] = useState<string | null>(null);
    const [selectedDomisili, setSelectedDomisili] = useState<string | null>(null);

    const kursusList = ["Matematika", "Bahasa Inggris", "Bahasa Jepang", "Bahasa Korea", "Pemrograman"];
    const domisiliList = ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"];

    const handleSave = () => {
        if (!selectedKursus || !selectedDomisili) {
            alert("Harap pilih kursus dan domisili terlebih dahulu!");
            return;
        }

        // ✅ Simpan ke Context
        setSiswa({
            nama: "Andi", // bisa diganti nanti sesuai input
            kategori: selectedKursus,
            lokasi: selectedDomisili,
            peta: `/illustrasi/siswa/beranda/${selectedDomisili.toLowerCase()}.svg`, // misalnya: /illustrasi/siswa/beranda/bogor.svg
        });

        // ✅ Simpan ke localStorage untuk persistensi
        localStorage.setItem("siswaData", JSON.stringify({
            nama: "Andi",
            kategori: selectedKursus,
            lokasi: selectedDomisili,
        }));

        router.push("/siswa");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/illustrasi/bg.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] -z-10"></div>

            <div className="bg-[#D9F1FF]/95 rounded-4xl p-10 md:p-14 w-full max-w-4xl flex flex-col items-center gap-10 md:gap-14 text-center border border-[#CBE8FF]/60 shadow-2xl relative z-10">
                {/* Judul */}
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-[#AEE3FF] rounded-full p-3">
                        <div className="w-20 h-20 relative">
                            <Image src="/illustrasi/siswa.png" alt="Siswa" fill className="object-contain" />
                        </div>
                    </div>
                    <p className="font-semibold text-lg text-[#003B5C]">Siswa</p>
                </div>

                {/* Pilihan Kursus */}
                <div>
                    <h2 className="text-[#003B5C] font-bold text-xl mb-5">
                        Pilih kursus yang ingin kamu ikuti
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {kursusList.map((kursus) => (
                            <button
                                key={kursus}
                                onClick={() => setSelectedKursus(kursus)}
                                className={`px-5 py-2 rounded-xl font-medium border transition-all duration-200 ${selectedKursus === kursus
                                        ? "bg-[#4DB7FF] text-white border-[#4DB7FF]"
                                        : "bg-white text-[#003B5C] border-[#AEE3FF] hover:border-[#4DB7FF]"
                                    }`}
                            >
                                {kursus}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pilihan Domisili */}
                <div>
                    <h2 className="text-[#003B5C] font-bold text-xl mb-5">
                        Tentukan domisili daerah kamu
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {domisiliList.map((kota) => (
                            <button
                                key={kota}
                                onClick={() => setSelectedDomisili(kota)}
                                className={`px-5 py-2 rounded-xl font-medium border transition-all duration-200 ${selectedDomisili === kota
                                        ? "bg-[#3853A4] text-white border-[#3853A4]"
                                        : "bg-white text-[#003B5C] border-[#BFD4FF] hover:border-[#3853A4]"
                                    }`}
                            >
                                {kota}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-[#3853A4] text-white px-10 py-3 rounded-xl font-semibold mt-4 hover:bg-[#2C418F] transition-all"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
