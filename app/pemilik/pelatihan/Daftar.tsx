"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Daftar: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center py-16 px-6 bg-[#EAF7FF] relative pt-20 md:pt-52" id="daftar">
            <div className="absolute top-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/pemilik/rounded-t.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#003B5C] mb-10">
                Daftarkan Kursus kamu, di maps kami
            </h2>

            {/* Card */}
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between p-10 md:px-14 border border-[#D6E9F9]">
                {/* Text Section */}
                <div className="flex-1 space-y-6">
                    <h3 className="text-3xl md:text-5xl font-extrabold text-[#003B5C] leading-snug">
                        Segera daftarkan kursusmu disini
                    </h3>

                    <Link href="/pemilik/daftar" className="bg-pemilik-primary-100 hover:bg-pemilik-primary-100/90 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                        Daftar Sekarang
                    </Link>
                </div>

                {/* Image Section */}
                <div className="relative w-full md:w-[45%] mt-10 md:mt-0 flex justify-center md:translate-y-24">
                    <Image
                        src="/illustrasi/pemilik/beranda/program.png"
                        alt="Ilustrasi UMKM"
                        width={400}
                        height={300}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Daftar;
