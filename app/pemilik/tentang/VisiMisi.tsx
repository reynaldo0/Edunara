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
                    <p className="text-gray-700 leading-relaxed text-center text-3xl md:text-left">
                        Menjadi penyedia layanan dan pengarah untuk penyedia kursus
                    </p>
                </div>

                {/* Bagian Misi */}
                <div className="md:w-1/2 bg-[#F8FBFF] rounded-2xl p-6 hover:bg-[#ECF5FF] transition-colors duration-300 hover:scale-[1.02]">
                    <h2 className="text-3xl font-bold text-[#01366A] mb-4 text-center md:text-left">
                        Misi
                    </h2>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 leading-relaxed">
                        <li>Menyediakan strategi untuk membangun kursus.</li>
                        <li>Menyediakan pembelajaran mengenai penyedia kursus melalui mentor profesional</li>
                        <li>Menyediakan inspirasi dan motivasi bagi penyedia kursus</li>
                        <li>Menyediakan fitur untuk menjawab pertanyaan </li>
                        <li>Menyediakan forum antarsiswa dan penyedia kursus</li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
