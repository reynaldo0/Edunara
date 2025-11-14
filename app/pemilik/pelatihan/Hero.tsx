"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Typed from "typed.js";

const Hero = () => {
    const typedRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: ["Timur", "Utara", "Selatan", "Timur", "Pusat"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            smartBackspace: true,
            backDelay: 1200,
        });

        return () => typed.destroy();
    }, []);

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center pb-32">
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                <img
                    src="/illustrasi/pemilik/bottom.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 md:py-20 lg:flex-row lg:justify-between relative z-10">
                {/* TEKS */}
                <div className="flex flex-col justify-center text-center p-6 rounded-sm lg:max-w-3xl md:text-left">
                    <h1 className="text-5xl font-bold leading-tight sm:text-6xl text-pemilik-primary-200">
                        Hadirkan Kursus Terbaik di Jakarta{" "}
                        <span
                            ref={typedRef}
                            className="text-siswa-primary-100"
                        ></span>
                    </h1>

                    <p className="mt-6 mb-10 text-lg sm:text-xl text-gray-700">
                        Ingin menjangkau lebih banyak peserta dan memperluas jaringan kursus Anda? Daftarkan program kursus Anda di platform kami dan
                        tunjukkan keunggulan pelatihan yang Anda tawarkan!
                        Kami mendukung berbagai jenis kursus, mulai dari bahasa, teknologi, hingga keterampilan kreatif.
                        <br className="hidden md:inline" />
                        <i>Bergabung sekarang</i> dan bawa kursus Anda ke tingkat berikutnya!
                    </p>

                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <a
                            rel="noopener noreferrer"
                            href="#courses"
                            className="px-10 py-4 text-lg font-semibold rounded-full bg-siswa-primary-100 text-white hover:bg-siswa-primary-100/80 transition"
                        >
                            Lihat Kursus
                        </a>
                    </div>
                </div>

                {/* GAMBAR PETA */}
                <div className="relative h-64 sm:h-80 lg:h-96 w-full">
                    <Image
                        src="/illustrasi/peta/dki.webp"
                        alt="Peta Jakarta"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
