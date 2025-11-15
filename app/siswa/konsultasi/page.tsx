"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaUserGraduate,
    FaPaperPlane,
    FaRobot,
    FaArrowLeft,
} from "react-icons/fa";
import NavbarSiswa from "@/app/components/NavbarSiswa";

export default function KonsultasiKeahlian() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        minat: "",
        keahlian: "",
        tujuan: "",
    });
    const [aiResponse, setAiResponse] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [done, setDone] = useState(false);

    const handleChange = (key: string, value: string) => {
        setAnswers({ ...answers, [key]: value });
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        setIsTyping(true);
        setDone(true);

        const response = `
🎯 Berdasarkan jawabanmu, kamu memiliki minat di bidang *${answers.minat}* dengan keahlian di *${answers.keahlian}*.
Untuk mencapai tujuan *${answers.tujuan}*, disarankan kamu fokus pada pengembangan keterampilan yang sesuai.

✨ **Rekomendasi Jalur Pembelajaran:**
1. Ikuti kursus pengantar tentang ${answers.minat}.
2. Perdalam kemampuan teknis terkait ${answers.keahlian}.
3. Bangun portofolio mini project sebagai bukti kompetensi.
4. Konsultasi rutin dengan mentor di bidang tersebut.

Semangat terus! Dunia butuh orang dengan semangat seperti kamu 🚀
    `;

        let index = 0;
        const typing = setInterval(() => {
            setAiResponse(response.slice(0, index));
            index++;
            if (index > response.length) {
                clearInterval(typing);
                setIsTyping(false);
            }
        }, 20);
    };

    const reset = () => {
        setStep(1);
        setAnswers({ minat: "", keahlian: "", tujuan: "" });
        setAiResponse("");
        setDone(false);
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br py-44 from-sky-50 via-white to-sky-100 text-gray-800 px-4">
            {/* Tombol kembali pojok kanan atas */}
            <NavbarSiswa/>
            <button
                onClick={() => router.back()}
                className="absolute cursor-pointer top-32 md:top-42 left-5 md:left-20 flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white text-sky-600 rounded-full shadow-sm border border-sky-100 font-medium transition"
            >
                <FaArrowLeft /> Kembali
            </button>

            {/* Logo + Title */}
            <div className="flex flex-col items-center mb-8 text-center">
                <div className="p-4 bg-sky-100 rounded-full shadow-md mb-3">
                    <FaUserGraduate className="text-sky-600 text-4xl" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-sky-700 mb-1">
                    Konsultasi Keahlian
                </h1>
                <p className="text-gray-500 max-w-md">
                    Temukan potensi terbaikmu dengan bantuan AI Mentor.
                    Jawab beberapa pertanyaan, dan dapatkan rekomendasi jalur belajar
                    yang cocok denganmu 🎓
                </p>
            </div>

            {/* Card utama */}
            {!done ? (
                <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-lg p-6 transition-all duration-300">
                    <h2 className="text-lg md:text-xl font-semibold text-sky-700 mb-3">
                        {step === 1 && "1️⃣ Apa bidang yang paling kamu minati?"}
                        {step === 2 && "2️⃣ Keahlian apa yang sudah kamu kuasai?"}
                        {step === 3 && "3️⃣ Tujuan karier atau pembelajaranmu apa?"}
                    </h2>

                    <textarea
                        placeholder={
                            step === 1
                                ? "Contoh: desain, teknologi, pendidikan, musik..."
                                : step === 2
                                    ? "Contoh: menulis, menggambar, coding, public speaking..."
                                    : "Contoh: menjadi desainer profesional, membangun startup, menjadi guru..."
                        }
                        value={
                            step === 1
                                ? answers.minat
                                : step === 2
                                    ? answers.keahlian
                                    : answers.tujuan
                        }
                        onChange={(e) =>
                            handleChange(
                                step === 1 ? "minat" : step === 2 ? "keahlian" : "tujuan",
                                e.target.value
                            )
                        }
                        className="w-full border border-sky-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-400 outline-none text-gray-700 transition min-h-[100px]"
                    />

                    {/* Tombol navigasi */}
                    <div className="flex justify-between items-center mt-6">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-5 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 font-medium flex items-center gap-2 transition"
                            >
                                <FaArrowLeft /> Kembali
                            </button>
                        ) : (
                            <div />
                        )}
                        <button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !answers.minat.trim()) ||
                                (step === 2 && !answers.keahlian.trim()) ||
                                (step === 3 && !answers.tujuan.trim())
                            }
                            className={`px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 shadow-md 
              ${step === 3
                                    ? "bg-orange-500 hover:bg-orange-600"
                                    : "bg-sky-500 hover:bg-sky-600"
                                } 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                        >
                            {step === 3 ? "Kirim" : "Lanjut"}
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-lg p-6 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <FaRobot className="text-sky-500 text-2xl" />
                        <h3 className="text-lg md:text-xl font-semibold text-sky-700">
                            Rekomendasi dari AI Mentor
                        </h3>
                    </div>

                    <div className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-sky-50 border border-sky-100 rounded-xl p-4 shadow-inner">
                        {aiResponse || (isTyping ? "Menulis rekomendasi..." : "")}
                    </div>

                    {isTyping && (
                        <div className="mt-3 flex items-center gap-2 text-sky-400">
                            <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            <p className="text-sm">AI sedang mengetik...</p>
                        </div>
                    )}

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={reset}
                            className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow font-medium transition"
                        >
                            Konsultasi Ulang
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
