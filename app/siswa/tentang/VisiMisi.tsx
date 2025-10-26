'use client';

import React from "react";

export default function VisiMisi() {
    return (
        <section className="flex justify-center items-center py-20">
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-10 w-[90%] md:w-[75%] flex flex-col md:flex-row gap-12 border border-[#DDEBFF]">
                {/* Bagian Visi */}
                <div className="md:w-1/2 bg-[#F8FBFF] rounded-2xl p-6 hover:bg-[#ECF5FF] transition-colors duration-300 hover:scale-[1.02]">
                    <h2 className="text-3xl font-bold text-[#01366A] mb-4 text-center md:text-left">
                        Visi
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-center md:text-left">
                        Menjadi jembatan digital bagi pelaku <span className="font-semibold text-[#0056A1]">UMKM di Indonesia</span>
                        untuk belajar dan berkolaborasi, menciptakan ekosistem bisnis yang tumbuh bersama di era digital.
                    </p>
                </div>

                {/* Bagian Misi */}
                <div className="md:w-1/2 bg-[#F8FBFF] rounded-2xl p-6 hover:bg-[#ECF5FF] transition-colors duration-300 hover:scale-[1.02]">
                    <h2 className="text-3xl font-bold text-[#01366A] mb-4 text-center md:text-left">
                        Misi
                    </h2>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 leading-relaxed">
                        <li>Meningkatkan literasi digital pelaku UMKM melalui pelatihan dan edukasi berkelanjutan.</li>
                        <li>Membangun platform kolaborasi antar pelaku UMKM di berbagai sektor.</li>
                        <li>Memberikan akses mudah terhadap informasi, mentor, dan teknologi terkini.</li>
                        <li>Mendorong inovasi digital dalam operasional bisnis UMKM.</li>
                        <li>Meningkatkan daya saing UMKM di pasar nasional maupun global.</li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
