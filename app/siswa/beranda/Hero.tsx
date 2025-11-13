"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Typed from "typed.js";
import Link from "next/link";

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
        <section className="relative overflow-hidden min-h-screen flex flex-col-reverse md:flex-row items-center pb-32">
            {/* Wave Background */}
            <div className="absolute bottom-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/wave/bottom.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container flex flex-col-reverse md:flex-row justify-center items-center md:items-start p-6 mx-auto sm:py-12 md:py-20 relative z-10 gap-8">
                {/* TEKS */}
                <div className="flex flex-col justify-center text-left md:text-left p-4 md:p-6 rounded-sm w-full md:max-w-lg">
                    <h1 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-bold leading-snug sm:leading-tight text-pemilik-primary-200">
                        Temukan Kursus Terbaik <br />di Jakarta{" "}
                        <span ref={typedRef} className="text-siswa-primary-100"></span>
                    </h1>

                    <p className="mt-4 sm:mt-6 mb-6 text-sm sm:text-base md:text-lg text-gray-700">
                        Tingkatkan keterampilanmu bersama para mentor profesional! Kami
                        menyediakan berbagai program pelatihan mulai dari kursus bahasa dan
                        teknologi, semuanya berlokasi di pusat <i>kota Jakarta</i>.
                        <br className="hidden md:inline" />
                        Temukan tempat kursus terdekat dan mulailah perjalanan karirmu hari ini.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-center sm:space-y-0 space-y-4 sm:items-start">
                        <Link
                            href="/siswa/#kursus"
                            className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-siswa-primary-100 text-white hover:bg-siswa-primary-100/80 transition"
                        >
                            Lihat Kursus
                        </Link>
                    </div>
                </div>

                {/* GAMBAR PETA */}
                <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-96 shrink-0">
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
