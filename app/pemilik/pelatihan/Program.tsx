"use client";
import React from "react";
import Image from "next/image";

const Program: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center py-16 px-6 bg-[#EAF7FF]">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#003B5C] mb-10">
                Program Unggulan UMKM-mu
            </h2>

            {/* Card */}
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between p-10 md:px-14 border border-[#D6E9F9]">
                {/* Text Section */}
                <div className="flex-1 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#003B5C] leading-snug">
                        Membuat <br /> strategi untuk <br /> Kursus kamu
                    </h3>

                    <button className="bg-pemilik-primary-100 hover:bg-pemilik-primary-200 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                        Jelajahi
                    </button>
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

export default Program;
