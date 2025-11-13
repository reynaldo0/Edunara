"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Diskusi: React.FC = () => {
    return (
        <section className=" flex justify-center items-center py-32 px-6">
            <div className="bg-white rounded-4xl shadow-lg w-full max-w-6xl flex flex-col md:flex-row justify-between items-center p-8 md:px-12 md:py-4 gap-8">

                {/* Bagian teks */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 space-y-6">
                    <h2 className="text-[#003B5C] font-bold text-3xl md:text-5xl leading-tight">
                        Diskusikan <br /> pertanyaanmu
                    </h2>
                    <Link href="/siswa/komunitas/#diskusi" passHref className="bg-[#AEE3FF] hover:bg-[#9AD8F5] text-[#003B5C] font-semibold px-8 py-3 rounded-full text-base md:text-lg transition-transform transform hover:scale-105">
                        Jelajahi
                    </Link>
                </div>

                {/* Bagian gambar */}
                <div className="md:w-1/2 flex justify-center translate-y-3 md:translate-y-18">
                    <Image
                        src="/illustrasi/siswa/komunitas/diskusi.png"
                        alt="Ilustrasi Diskusi"
                        width={440}
                        height={280}
                        className="object-contain w-full max-w-[420px] md:max-w-[460px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Diskusi;
