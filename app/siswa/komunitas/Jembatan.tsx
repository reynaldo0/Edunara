"use client";

import React from "react";
import Image from "next/image";

const Jembatan: React.FC = () => {
    return (
        <section className="flex justify-center items-center py-16 px-6">
            <div className="bg-siswa-primary-200 rounded-[32px] p-10 md:p-14 w-full max-w-6xl flex flex-col gap-10 md:gap-14">
                {/* Baris 1: teks kiri, gambar kanan */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[#003B5C] text-lg md:text-3xl font-medium leading-relaxed md:w-1/2">
                        Menjadi tempat untuk menanyakan pertanyaan yang kamu tidak mengerti
                    </div>
                    <div className="bg-white rounded-[16px] shadow-md w-[220px] h-[140px] md:w-[280px] md:h-[180px] flex justify-center items-center">
                        <Image
                            src="/illustrasi/siswa/komunitas/jembatan1.png" // ubah sesuai path gambar kamu
                            alt="Ilustrasi UMKM"
                            width={240}
                            height={160}
                            className="object-contain w-full h-full p-4"
                        />
                    </div>
                </div>

                {/* Baris 2: gambar kiri, teks kanan */}
                <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-8">
                    <div className="text-[#003B5C] text-lg md:text-3xl font-medium leading-relaxed md:w-1/2">
                        Menjadikan forum sebagai tempat diskusi antarsiswa dan tempat kursus
                    </div>
                    <div className="bg-white rounded-[16px] shadow-md w-[220px] h-[140px] md:w-[280px] md:h-[180px] flex justify-center items-center">
                        <Image
                            src="/illustrasi/siswa/komunitas/jembatan2.png" // ubah sesuai path gambar kamu
                            alt="Ilustrasi Kolaborasi"
                            width={240}
                            height={160}
                            className="object-contain w-full h-full p-4"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Jembatan;
