"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    HiCamera,
    HiPaperAirplane,
    HiUserCircle,
    HiEye,
    HiChatBubbleOvalLeft,
} from "react-icons/hi2";

type Reply = {
    id: string;
    author: string;
    content: string;
    time: string;
};

type Question = {
    id: string;
    author: string;
    content: string;
    image?: string;
    time: string;
    replies?: Reply[];
};

export default function PertanyaanSection({ courseId }: { courseId: string }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isClient, setIsClient] = useState(false);

    // ✅ Pastikan hanya jalan di client
    useEffect(() => {
        setIsClient(true);

        const saved = localStorage.getItem(`questions_${courseId}`);
        if (saved) {
            setQuestions(JSON.parse(saved));
        } else {
            // dummy data hanya dimasukkan 1x di client
            const dummy: Question[] = [
                {
                    id: crypto.randomUUID(),
                    author: "Rina",
                    content: "Apakah kursus ini cocok untuk pemula?",
                    time: "09:12",
                    replies: [
                        {
                            id: crypto.randomUUID(),
                            author: "Mentor",
                            content: "Tentu! Semua materi diajarkan dari dasar 😊",
                            time: "09:30",
                        },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    author: "Dika",
                    content: "Apakah ada sertifikat setelah lulus?",
                    time: "10:05",
                    replies: [
                        {
                            id: crypto.randomUUID(),
                            author: "Admin Kursus",
                            content: "Ya, ada sertifikat resmi setelah menyelesaikan semua modul 📜",
                            time: "10:20",
                        },
                    ],
                },
            ];
            setQuestions(dummy);
            localStorage.setItem(`questions_${courseId}`, JSON.stringify(dummy));
        }
    }, [courseId]);

    const saveQuestions = (updated: Question[]) => {
        setQuestions(updated);
        if (isClient) {
            localStorage.setItem(`questions_${courseId}`, JSON.stringify(updated));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (!newQuestion.trim() && !imageFile) return;

        const newItem: Question = {
            id: crypto.randomUUID(),
            author: "Kamu",
            content: newQuestion.trim(),
            image: previewUrl || undefined,
            time: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            replies: [],
        };

        const updated = [newItem, ...questions];
        saveQuestions(updated);
        setNewQuestion("");
        setPreviewUrl(null);
        setImageFile(null);
    };

    const handleReply = (questionId: string) => {
        if (!replyText.trim()) return;

        const newReply: Reply = {
            id: crypto.randomUUID(),
            author: "Kamu",
            content: replyText.trim(),
            time: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        const updated = questions.map((q) =>
            q.id === questionId
                ? { ...q, replies: [...(q.replies || []), newReply] }
                : q
        );

        saveQuestions(updated);
        setReplyText("");
        setReplyingTo(null);
    };

    if (!isClient) return null;

    return (
        <section className="flex flex-col items-center py-16 px-4 md:px-8">
            <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-3xl shadow-md border-4 border-[#BCE0FD] p-6">
                <h2 className="text-center text-2xl md:text-3xl font-bold text-[#003B5C] mb-6">
                    Masih Ragu? Cantumkan Pertanyaanmu Disini
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

                {/* Preview gambar */}
                {previewUrl && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Preview gambar:</p>
                        <div className="relative w-full max-h-64 aspect-video border border-[#BCE0FD] rounded-xl overflow-hidden">
                            {/* ✅ Gunakan unoptimized agar blob URL bisa ditampilkan */}
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                unoptimized
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

                            <div className="bg-gray-100 rounded-xl text-gray-600 p-4 break-words whitespace-pre-wrap">
                                <p>{q.content}</p>
                                {q.image && (
                                    <div className="relative w-full max-h-64 aspect-video mt-3 border border-gray-200 rounded-lg overflow-hidden">
                                        <Image
                                            src={q.image}
                                            alt="Gambar Pertanyaan"
                                            fill
                                            unoptimized
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0077B6] transition">
                                    <HiEye /> <span>Lihat</span>
                                </div>
                                <div
                                    className="flex items-center gap-1 cursor-pointer hover:text-[#0077B6] transition"
                                    onClick={() =>
                                        setReplyingTo(q.id === replyingTo ? null : q.id)
                                    }
                                >
                                    <HiChatBubbleOvalLeft /> <span>Balas</span>
                                </div>
                            </div>

                            {replyingTo === q.id && (
                                <div className="mt-3 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Tulis balasanmu..."
                                        className="w-full border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-[#0077B6]"
                                    />
                                    <button
                                        onClick={() => handleReply(q.id)}
                                        className="bg-[#0077B6] hover:bg-[#005F8D] text-white px-4 py-1 rounded-full text-sm transition"
                                    >
                                        Kirim
                                    </button>
                                </div>
                            )}

                            {q.replies && q.replies.length > 0 && (
                                <div className="mt-4 space-y-3 pl-6 border-l-2 border-[#CBE7FF]">
                                    {q.replies.map((r) => (
                                        <div
                                            key={r.id}
                                            className="bg-[#F8FCFF] rounded-xl p-3"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <HiUserCircle className="text-xl text-[#0077B6]" />
                                                <p className="font-semibold text-sm text-[#003B5C]">
                                                    {r.author}
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    {r.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                                                {r.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
