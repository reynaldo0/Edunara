"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "#Tingkatkan kemampuanmu melalui khursus terbaik",
        answer:
            "Kamu bisa mengikuti kursus kami secara online maupun offline sesuai jadwal yang tersedia.",
    },
    {
        question: "#Bagaimana cara mendaftar kursus?",
        answer:
            "Cukup isi formulir pendaftaran dan pilih program yang sesuai dengan minatmu.",
    },
    {
        question: "#Apakah ada sertifikat setelah menyelesaikan kursus?",
        answer: "Ya, setiap peserta akan mendapatkan sertifikat resmi setelah lulus.",
    },
    {
        question: "#Apakah ada dukungan mentor selama kursus?",
        answer:
            "Tentu! Mentor kami siap membantu setiap peserta selama proses pembelajaran.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-6 flex justify-center">
            <div className="w-full max-w-5xl">
                <h2 className="text-2xl md:text-5xl font-bold text-center text-[#003653] mb-10">
                    Pertanyaan yang sering ditanyakan
                </h2>
                <div className="space-y-4">
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
                                className={`transition-all duration-300 ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
