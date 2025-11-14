"use client";

import NavbarPemilik from "@/app/components/NavbarPemilik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";

export default function AiKontenWizardInteractive() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        kursus: "",
        topik: "",
        detail: "",
    });
    const [generatedContent, setGeneratedContent] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [done, setDone] = useState(false);

    const kursusList = ["Bahasa Inggris", "Matematika", "Pemrograman", "Desain Grafis", "Bahasa Jepang"];

    const handleChange = (key: string, value: string) => {
        setAnswers({ ...answers, [key]: value });
    };

    const handleNext = () => {
        if ((step === 1 && !answers.kursus) || (step === 2 && !answers.topik) || (step === 3 && !answers.detail)) return;
        if (step < 3) setStep(step + 1);
        else handleGenerate();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleGenerate = () => {
        setDone(true);
        setIsTyping(true);

        const response = `
🎯 Konten untuk kursus ${answers.kursus} (Topik: ${answers.topik}):

📌 Caption:
"Belajar ${answers.topik} sekarang! Tingkatkan skill-mu bersama kursus ${answers.kursus}."

🎬 Script Video:
${answers.detail}

✨ Semoga konten ini membantu mempromosikan kursus Anda secara efektif!
    `;

        let index = 0;
        const typing = setInterval(() => {
            setGeneratedContent(response.slice(0, index));
            index++;
            if (index > response.length) {
                clearInterval(typing);
                setIsTyping(false);
            }
        }, 20);
    };

    const reset = () => {
        setStep(1);
        setAnswers({ kursus: "", topik: "", detail: "" });
        setGeneratedContent("");
        setDone(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg gap-6 relative min-h-screen flex flex-col justify-center items-center py-44">
            <NavbarPemilik />
            <button
                onClick={() => router.back()}
                className="absolute top-32 md:top-42 left-5 md:left-20 flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white text-sky-600 cursor-pointer rounded-full shadow-sm border border-sky-100 font-medium transition"
            >
                <FaArrowLeft /> Kembali
            </button>

            <h2 className="text-2xl font-bold text-sky-700 text-center">AI Konten Otomatis</h2>
            <p className="text-gray-600 text-center mb-4">
                Buat caption dan script video untuk feeds, reels, atau postingan kursus dengan cepat!
            </p>

            {/* Stepper */}
            <div className="flex justify-between mb-6">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`flex-1 h-1 rounded-full mx-1 transition-colors duration-500 ${step >= s ? "bg-sky-600" : "bg-sky-200"
                            }`}
                    />
                ))}
            </div>

            {/* Card utama */}
            {!done ? (
                <div className="w-full bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-lg p-6 transition-all duration-500 animate-fade-in">
                    {/* Step Question */}
                    <h3 className="text-lg md:text-xl font-semibold text-sky-700 mb-3">
                        {step === 1 && "Pilih jenis kursus"}
                        {step === 2 && "Masukkan topik konten"}
                        {step === 3 && "Jelaskan detail konten"}
                    </h3>

                    {step === 1 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {kursusList.map((k) => (
                                <button
                                    key={k}
                                    onClick={() => handleChange("kursus", k)}
                                    className={`px-4 py-2 rounded-xl border font-medium text-sm sm:text-base transition-all duration-200 ${answers.kursus === k
                                        ? "bg-sky-600 text-white border-sky-600"
                                        : "bg-white text-gray-700 border-sky-200 hover:border-sky-400"
                                        }`}
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    )}

                    {(step === 2 || step === 3) && (
                        <textarea
                            value={step === 2 ? answers.topik : answers.detail}
                            onChange={(e) => handleChange(step === 2 ? "topik" : "detail", e.target.value)}
                            rows={step === 2 ? 3 : 5}
                            placeholder={
                                step === 2
                                    ? "Tulis topik konten..."
                                    : "Jelaskan detail konten: target audiens, tone, durasi video..."
                            }
                            className="w-full border border-sky-200 rounded-xl p-4 focus:ring-2 focus:ring-sky-400 outline-none text-gray-700 transition min-h-[100px] animate-fade-in"
                        />
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="px-5 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 font-medium flex items-center gap-2 transition"
                            >
                                Kembali
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !answers.kursus) ||
                                (step === 2 && !answers.topik.trim()) ||
                                (step === 3 && !answers.detail.trim())
                            }
                            className={`px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 shadow-md 
                ${step === 3 ? "bg-orange-500 hover:bg-orange-600" : "bg-sky-500 hover:bg-sky-600"} 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                        >
                            {step === 3 ? "Generate" : "Lanjut"} <FaPaperPlane />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-lg p-6 transition-all duration-500 animate-fade-in">
                    <div className="flex items-center gap-3 mb-4">
                        <FaRobot className="text-sky-500 text-2xl" />
                        <h3 className="text-lg md:text-xl font-semibold text-sky-700">Konten AI</h3>
                    </div>

                    <div className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-sky-50 border border-sky-100 rounded-xl p-4 shadow-inner min-h-[150px]">
                        {generatedContent || (isTyping ? "AI sedang menulis konten..." : "")}
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
                            Buat Konten Lagi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
