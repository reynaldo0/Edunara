"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import untuk komponen peta (non-SSR)
const MapSection = dynamic(() => import("./PetaClient"), {
    ssr: false,
});

export default function Peta() {
    const [selected, setSelected] = useState("Jakarta");

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center bg-[#EBF8FF] px-4 py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-6">
                Kursus di Sekitar Kamu
            </h2>

            {/* Pilihan Daerah */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map((daerah) => (
                    <button
                        key={daerah}
                        onClick={() => setSelected(daerah)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${selected === daerah
                                ? "bg-[#3182CE] text-white shadow-lg scale-105"
                                : "bg-white text-[#1A202C] border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {daerah}
                    </button>
                ))}
            </div>

            {/* Peta (Client Side Only) */}
            <div className="w-full max-w-5xl h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#CBD5E0]">
                <MapSection selected={selected} />
            </div>
        </section>
    );
}
