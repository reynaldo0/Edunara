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

    const [openDropdown, setOpenDropdown] = useState<"kursus" | "domisili" | null>(null);

    const kursusList = ["Matematika", "Bahasa Inggris", "Bahasa Jepang", "Bahasa Korea", "Pemrograman"];
    const domisiliList = ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Barat", "Jakarta Utara"];

    const handleSave = () => {
        if (!selectedKursus || !selectedDomisili) {
            alert("Silakan lengkapi pilihan kursus dan domisili terlebih dahulu.");
            return;
        }

        setSiswa({
            nama: "Andi",
            kategori: selectedKursus,
            lokasi: selectedDomisili,
            peta: `/illustrasi/siswa/beranda/${selectedDomisili.toLowerCase().replace(" ", "-")}.svg`,
        });

        localStorage.setItem(
            "siswaData",
            JSON.stringify({
                nama: "Andi",
                kategori: selectedKursus,
                lokasi: selectedDomisili,
            })
        );

        router.push("/siswa");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <Image src="/illustrasi/bg.png" alt="Background" fill className="object-cover object-center" priority />
            </div>
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] -z-10"></div>

            {/* Form Card */}
            <div className="bg-[#D9F1FF]/95 rounded-4xl p-10 md:p-14 w-full max-w-4xl flex flex-col items-center gap-10 text-center border border-[#CBE8FF]/60 shadow-2xl relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-[#AEE3FF] rounded-full p-3">
                        <div className="w-20 h-20 relative">
                            <Image src="/illustrasi/siswa.png" alt="Siswa" fill className="object-contain" />
                        </div>
                    </div>
                    <p className="font-semibold text-lg text-[#003B5C]">Siswa</p>

                    {/* Copywriting baru */}
                    <p className="text-[#003B5C]/80 text-base max-w-md">
                        Kami ingin memberikan pengalaman belajar terbaik untuk kamu.
                        Pilih bidang kursus dan lokasi domisilimu agar kami bisa mencocokkan rekomendasi yang paling sesuai.
                    </p>
                </div>

                {/* Dropdown Kursus */}
                <div className="w-full max-w-md relative">
                    <label className="block text-[#003B5C] font-bold text-xl mb-2">
                        Pilih Kursus yang Kamu Minati
                    </label>

                    <button
                        type="button"
                        onClick={() =>
                            setOpenDropdown(openDropdown === "kursus" ? null : "kursus")
                        }
                        className="w-full bg-white border border-[#AEE3FF] rounded-xl px-4 py-3 text-left flex justify-between items-center hover:border-[#4DB7FF] transition cursor-pointer"
                    >
                        {selectedKursus || "Pilih kursus yang ingin kamu pelajari..."}
                        <svg
                            className={`w-5 h-5 transition-transform duration-300 ${openDropdown === "kursus" ? "rotate-180" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <ul
                        className={`absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${openDropdown === "kursus" ? "max-h-60 py-2" : "max-h-0"
                            }`}
                    >
                        {kursusList.map((kursus) => (
                            <li
                                key={kursus}
                                className="px-4 py-2 hover:bg-[#4DB7FF] hover:text-white cursor-pointer transition"
                                onClick={() => {
                                    setSelectedKursus(kursus);
                                    setOpenDropdown(null);
                                }}
                            >
                                {kursus}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dropdown Domisili */}
                <div className="w-full max-w-md relative">
                    <label className="block text-[#003B5C] font-bold text-xl mb-2">
                        Di Mana Domisilimu?
                    </label>

                    <button
                        type="button"
                        onClick={() =>
                            setOpenDropdown(openDropdown === "domisili" ? null : "domisili")
                        }
                        className="w-full bg-white border border-[#BFD4FF] rounded-xl px-4 py-3 text-left flex justify-between items-center hover:border-[#4DB7FF] transition cursor-pointer"
                    >
                        {selectedDomisili || "Pilih daerah tempat tinggal kamu..."}
                        <svg
                            className={`w-5 h-5 transition-transform duration-300 ${openDropdown === "domisili" ? "rotate-180" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <ul
                        className={`absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${openDropdown === "domisili" ? "max-h-60 py-2" : "max-h-0"
                            }`}
                    >
                        {domisiliList.map((kota) => (
                            <li
                                key={kota}
                                className="px-4 py-2 hover:bg-[#4DB7FF] hover:text-white cursor-pointer transition"
                                onClick={() => {
                                    setSelectedDomisili(kota);
                                    setOpenDropdown(null);
                                }}
                            >
                                {kota}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-siswa-primary-100 text-white px-10 py-3 cursor-pointer rounded-xl font-semibold mt-4 hover:bg-primary-100/90 transition-all"
                >
                    Mulai Sekarang
                </button>
            </div>
        </div>
    );
}
