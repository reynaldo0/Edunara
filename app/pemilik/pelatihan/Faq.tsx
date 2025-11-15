"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "#Bagaimana cara mendaftarkan lembaga atau kursus saya di Edunara?",
        answer:
            "Anda dapat membuat akun Pemilik Kursus terlebih dahulu. Setelah itu, masuk ke dashboard pemilik dan isi profil lembaga, lalu tambahkan kelas atau program yang ingin ditampilkan.",
    },
    {
        question: "#Apakah saya bisa mengedit informasi kursus setelah dipublikasikan?",
        answer:
            "Ya, Anda dapat memperbarui harga, deskripsi, foto, durasi, serta jadwal kursus kapan saja melalui menu 'Kelola Kursus' di dashboard pemilik.",
    },
    {
        question: "#Bagaimana cara menarik lebih banyak siswa ke kursus saya?",
        answer:
            "Edunara menyediakan fitur optimasi profil, rekomendasi otomatis, serta promosi melalui halaman utama. Pastikan Anda mengunggah foto menarik, deskripsi lengkap, dan ulasan siswa.",
    },
    {
        question: "#Apakah Edunara menyediakan tools promosi otomatis?",
        answer:
            "Ya! Anda dapat menggunakan AI Content Generator untuk membuat caption, script video, dan materi promosi lainnya hanya dengan beberapa klik.",
    },
    {
        question: "#Bagaimana cara mengelola pendaftaran siswa?",
        answer:
            "Setiap pendaftaran yang masuk akan muncul di dashboard Anda. Anda bisa melihat data siswa, mengonfirmasi pendaftaran, atau menghubungi mereka langsung.",
    },
    {
        question: "#Apakah saya dapat mengetahui performa kursus saya?",
        answer:
            "Tentu. Edunara menyediakan data analitik seperti jumlah kunjungan, klik daftar, dan performa setiap kursus untuk membantu Anda memahami minat siswa.",
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
                    src="/illustrasi/pemilik/top.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute bottom-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/wave/rounded-b.webp"
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
