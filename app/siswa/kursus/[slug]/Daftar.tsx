"use client";

import Image from "next/image";

type DaftarKursusSectionProps = {
    title: string;
    image: string;
    whatsapp: string;
};

export default function DaftarKursusSection({
    title,
    whatsapp,
}: DaftarKursusSectionProps) {
    const handleWhatsAppClick = () => {
        const message = `Halo kak, saya tertarik untuk mendaftar kursus ${title}. Apakah masih tersedia?`;
        const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <section className="py-20 px-6 sm:px-12 lg:px-24 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pemilik-primary-200 mb-10">
                Segera Daftarkan Dirimu di <br />
                <span className="text-pemilik-primary-200">{title}</span>
            </h2>

            <div className="bg-siswa-primary-200 rounded-3xl shadow-sm px-8 sm:px-16 py-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
                <div className="flex justify-center md:justify-start md:w-1/2 mb-8 md:mb-0">
                    <Image
                        src="/images/kursus/daftar.webp"
                        alt={title}
                        width={400}
                        height={300}
                        className="object-contain max-w-[320px] md:max-w-[400px] w-full"
                    />
                </div>

                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-xl sm:text-5xl font-bold text-pemilik-primary-200 mb-10">
                        Segeralah daftarkan pada {title.toLowerCase()}!
                    </h3>
                    <button
                        onClick={handleWhatsAppClick}
                        className="bg-pemilik-primary-200 hover:bg-pemilik-primary-200 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-300"
                    >
                        Hubungi
                    </button>
                </div>
            </div>
        </section>
    );
}
