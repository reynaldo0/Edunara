"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import {
    HiPaperAirplane,
    HiCamera,
    HiEye,
    HiChatBubbleOvalLeft,
    HiUserCircle,
} from "react-icons/hi2";

interface Question {
    id: number;
    author: string;
    content: string;
    time: string;
    image?: string | null;
}

const ForumTanya: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            author: "Andi",
            content: "Apa arti gotong royong di masyarakat modern?",
            time: "8 menit yang lalu",
            image: null,
        },
        {
            id: 2,
            author: "Asep",
            content: "Bagaimana cara menjaga budaya lokal di era digital?",
            time: "17 menit yang lalu",
            image: null,
        },
    ]);

    const [newQuestion, setNewQuestion] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Handle file upload dan buat URL untuk preview
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Tambah pertanyaan baru
    const handleSubmit = () => {
        if (!newQuestion.trim() && !selectedImage) return;

        const newEntry: Question = {
            id: questions.length + 1,
            author: "Guest",
            content: newQuestion,
            time: "Baru saja",
            image: previewUrl,
        };

        setQuestions([newEntry, ...questions]);
        setNewQuestion("");
        setSelectedImage(null);
        setPreviewUrl(null);
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-start py-32">
            <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-3xl shadow-md border-4 border-[#BCE0FD] p-6">
                <h2 className="text-center text-2xl md:text-3xl font-bold text-[#003B5C] mb-6">
                    Tanyakan pertanyaanmu disini
                </h2>

                {/* Input pertanyaan */}
                <div className="flex items-center gap-3 bg-white border border-[#BCE0FD] rounded-full px-4 py-2 shadow-sm mb-3">
                    <input
                        type="text"
                        placeholder="Ketik pertanyaanmu disini !!"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    />

                    <label className="cursor-pointer text-[#0077B6] hover:opacity-80">
                        <HiCamera className="text-2xl" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>

                    <button
                        onClick={handleSubmit}
                        className="bg-[#0077B6] hover:bg-[#005F8D] text-white p-2 rounded-full transition"
                    >
                        <HiPaperAirplane className="text-lg rotate-45" />
                    </button>
                </div>

                {/* Preview gambar sebelum dikirim */}
                {previewUrl && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Preview gambar:</p>
                        <div className="relative w-full max-h-64 aspect-video border border-[#BCE0FD] rounded-xl overflow-hidden">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}

                {/* Daftar pertanyaan */}
                <div className="space-y-6">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className="bg-white border border-[#CBE7FF] rounded-2xl p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <HiUserCircle className="text-3xl text-[#0077B6]" />
                                <div>
                                    <p className="font-semibold text-[#003B5C]">{q.author}</p>
                                    <p className="text-xs text-gray-500">ditanya {q.time}</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl min-h-20 flex flex-col items-center justify-center text-gray-600 p-4">
                                <p>{q.content}</p>
                                {q.image && (
                                    <div className="relative w-full max-h-64 aspect-video mt-3 border border-gray-200 rounded-lg overflow-hidden">
                                        <Image
                                            src={q.image}
                                            alt="Gambar Pertanyaan"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0077B6] transition">
                                    <HiEye /> <span>Lihat</span>
                                </div>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0077B6] transition">
                                    <HiChatBubbleOvalLeft /> <span>Balas</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForumTanya;
