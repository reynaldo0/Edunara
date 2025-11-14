"use client";

import NavbarPemilik from "@/app/components/NavbarPemilik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";

export default function AiGenerateGambarDashboard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        kursus: "",
        konsep: "",
        style: "",
    });
    const [generatedImagePrompt, setGeneratedImagePrompt] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [done, setDone] = useState(false);

    const kursusList = ["Bahasa Inggris", "Matematika", "Pemrograman", "Desain Grafis", "Bahasa Jepang"];

    const handleChange = (key: string, value: string) => {
        setAnswers({ ...answers, [key]: value });
    };

    const handleNext = () => {
        if ((step === 1 && !answers.kursus) || (step === 2 && !answers.konsep) || (step === 3 && !answers.style)) return;
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
🎨 AI Generate Gambar untuk kursus ${answers.kursus}:

- Konsep: ${answers.konsep}
- Gaya / Style: ${answers.style}

Gunakan prompt ini untuk membuat poster, materi visual, atau ilustrasi promosi secara instan!
    `;

        let index = 0;
        const typing = setInterval(() => {
            setGeneratedImagePrompt(response.slice(0, index));
            index++;
            if (index > response.length) {
                clearInterval(typing);
                setIsTyping(false);
            }
        }, 20);
    };

    const reset = () => {
        setStep(1);
        setAnswers({ kursus: "", konsep: "", style: "" });
        setGeneratedImagePrompt("");
        setDone(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 relative min-h-screen flex flex-col justify-center items-center py-44">
            <NavbarPemilik />
            <button
                onClick={() => router.back()}
                className="absolute top-32 md:top-42 left-5 md:left-20 flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white text-sky-600 cursor-pointer rounded-full shadow-sm border border-sky-100 font-medium transition"
            >
                <FaArrowLeft /> Kembali
            </button>
            {/* Kiri: Card Pertanyaan */}
            <div className="flex-1 bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-lg p-6 animate-fade-in transition-all">
                <h2 className="text-2xl font-bold text-sky-700 mb-4 text-center">AI Generate Gambar</h2>
                <p className="text-gray-600 mb-6 text-center">
                    Ciptakan materi visual dan poster promosi secara instan untuk mendukung strategi pemasaran kursusmu.
                </p>

                <h3 className="text-lg md:text-xl font-semibold text-sky-700 mb-3">
                    {step === 1 && "1️⃣ Pilih jenis kursus"}
                    {step === 2 && "2️⃣ Tentukan konsep gambar"}
                    {step === 3 && "3️⃣ Pilih gaya / style visual"}
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
                        value={step === 2 ? answers.konsep : answers.style}
                        onChange={(e) => handleChange(step === 2 ? "konsep" : "style", e.target.value)}
                        rows={step === 2 ? 3 : 5}
                        placeholder={
                            step === 2
                                ? "Misal: poster motivasi, infografik kursus, banner promosi..."
                                : "Misal: minimalis, futuristik, colorful, flat design..."
                        }
                        className="w-full border border-sky-200 rounded-xl p-4 focus:ring-2 focus:ring-sky-400 outline-none text-gray-700 transition min-h-[100px] animate-fade-in"
                    />
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="px-5 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 font-medium transition"
                        >
                            Kembali
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={
                            (step === 1 && !answers.kursus) ||
                            (step === 2 && !answers.konsep.trim()) ||
                            (step === 3 && !answers.style.trim())
                        }
                        className={`px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 shadow-md 
              ${step === 3 ? "bg-orange-500 hover:bg-orange-600" : "bg-sky-500 hover:bg-sky-600"} 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                    >
                        {step === 3 ? "Generate" : "Lanjut"} <FaPaperPlane />
                    </button>
                </div>
            </div>

            {/* Preview / AI Response */}
            <div className="flex-1 bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-lg p-6 animate-fade-in transition-all min-h-[400px]">
                <div className="flex items-center gap-3 mb-4">
                    <FaRobot className="text-sky-500 text-2xl" />
                    <h3 className="text-lg md:text-xl font-semibold text-sky-700">Prompt AI Gambar</h3>
                </div>

                {/* Prompt Text */}
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-sky-50 border border-sky-100 rounded-xl p-4 shadow-inner min-h-[250px]">
                    {generatedImagePrompt || (isTyping ? "AI sedang menyiapkan prompt..." : "Hasil prompt akan muncul di sini")}
                </div>

                {/* Gambar Dummy */}
                {done && !isTyping && (
                    <div className="mt-6 flex justify-center">
                        <img
                            src={`https://via.placeholder.com/600x400.png?text=${encodeURIComponent(answers.kursus + " - " + answers.konsep)}`}
                            alt="Generated Dummy"
                            className="rounded-xl shadow-lg max-w-full transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                )}

                {isTyping && (
                    <div className="mt-3 flex items-center gap-2 text-sky-400">
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-sky-400 rounded-full [animation-delay:0.2s] animate-bounce"></span>
                        <span className="w-2 h-2 bg-sky-400 rounded-full [animation-delay:0.4s] animate-bounce"></span>
                        <p className="text-sm">AI sedang mengetik...</p>
                    </div>
                )}

                {done && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={reset}
                            className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow font-medium transition"
                        >
                            Buat Prompt Lagi
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}
