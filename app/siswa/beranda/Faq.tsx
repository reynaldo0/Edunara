"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "#Bagaimana cara mencari kursus yang sesuai?",
        answer:
            "Gunakan fitur pencarian di halaman utama dan filter berdasarkan kategori, lokasi, atau tingkat keahlian untuk menemukan kursus yang paling sesuai dengan kebutuhanmu.",
    },
    {
        question: "#Apakah saya bisa mendaftar langsung melalui website Edunara?",
        answer:
            "Tentu! Setelah menemukan kursus yang kamu minati, klik tombol 'Daftar Sekarang' dan kamu akan diarahkan ke halaman pendaftaran resmi lembaga tersebut.",
    },
    {
        question: "#Apakah kursus di Edunara semuanya berbayar?",
        answer:
            "Tidak semua. Beberapa lembaga menawarkan kursus gratis, sedangkan yang lain menyediakan program berbayar dengan fasilitas tambahan seperti sertifikat dan bimbingan mentor.",
    },
    {
        question: "#Bagaimana cara mengetahui reputasi lembaga kursus?",
        answer:
            "Setiap lembaga di Edunara memiliki profil lengkap beserta ulasan dari peserta sebelumnya, sehingga kamu bisa menilai kualitas dan kredibilitas lembaga sebelum mendaftar.",
    },
    {
        question: "#Apakah saya bisa mendapatkan rekomendasi kursus otomatis?",
        answer:
            "Ya! Setelah kamu memilih minat dan bidang yang diinginkan, sistem kami akan memberikan rekomendasi kursus yang relevan dengan profil dan preferensimu.",
    },
    {
        question: "#Apakah Edunara menyediakan dukungan pengguna?",
        answer:
            "Ya, tim kami siap membantu. Kamu dapat menghubungi kami melalui halaman kontak jika mengalami kendala dalam menggunakan platform.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20 md:py-44" id="faq">
            {/* Wave Background */}
            <div className="absolute top-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/wave/top.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute bottom-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/wave/footer.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-12 relative z-10">
                {/* Left Side: Title & Subtitle */}
                <div className="md:w-1/2 text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-pemilik-primary-200 mb-4">
                        Pertanyaan yang sering ditanyakan
                    </h2>
                    <p className="text-[#063970] text-base md:text-lg leading-relaxed max-w-md">
                        Temukan jawaban dari pertanyaan umum seputar kursus, pendaftaran,
                        dan dukungan mentor kami.
                    </p>
                </div>

                {/* Right Side: FAQ List */}
                <div className="md:w-1/2 w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-6 py-4 text-left"
                            >
                                <span className="text-sm md:text-base font-medium text-[#063970]">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <FaMinus className="text-[#063970]" />
                                ) : (
                                    <FaPlus className="text-[#063970]" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ${openIndex === index
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                    } overflow-hidden bg-white rounded-b-3xl px-6`}
                            >
                                <p className="text-sm text-[#063970] py-3">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
