"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    FaPaperPlane,
    FaFileUpload,
    FaImage,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import NavbarSiswa from "@/app/components/NavbarSiswa";

interface Message {
    sender: "user" | "bot";
    type: "text" | "image" | "file";
    content: string;
}

interface ChatSession {
    id: number;
    title: string;
    messages: Message[];
}

export default function ChatBot() {
    const router = useRouter();

    const [sessions, setSessions] = useState<ChatSession[]>([
        { id: 1, title: "Percakapan 1", messages: [] },
    ]);
    const [activeSession, setActiveSession] = useState(1);
    const [input, setInput] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const scrollRef = useRef<HTMLDivElement>(null);
    const currentChat = sessions.find((s) => s.id === activeSession)!;

    const suggestionPrompts = [
        "Rekomendasikan kursus programming untuk pemula",
        "Bagaimana cara mendaftar kursus bahasa Inggris?",
        "Informasi kursus desain grafis online",
        "Tips memilih mentor terbaik untuk kursus teknologi",
        "Daftar kursus terdekat di Jakarta Pusat",
    ];

    // auto-scroll ke bawah
    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [currentChat.messages, isTyping]);

    // otomatis tutup sidebar di layar kecil
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sendMessage = (text?: string) => {
        const messageText = text || input;
        if (!messageText && !file) return;

        const newMessage: Message[] = [];
        if (messageText)
            newMessage.push({ sender: "user", type: "text", content: messageText });
        if (file) {
            const url = URL.createObjectURL(file);
            const type = file.type.startsWith("image") ? "image" : "file";
            newMessage.push({
                sender: "user",
                type: type as "image" | "file",
                content: url,
            });
            setFile(null);
        }

        setSessions((prev) =>
            prev.map((s) =>
                s.id === activeSession
                    ? { ...s, messages: [...s.messages, ...newMessage] }
                    : s
            )
        );
        setInput("");

        // simulasi bot typing
        setIsTyping(true);
        setTimeout(() => {
            const botReply = generateBotReply(messageText);
            setSessions((prev) =>
                prev.map((s) =>
                    s.id === activeSession
                        ? {
                            ...s,
                            messages: [
                                ...s.messages,
                                { sender: "bot", type: "text", content: botReply },
                            ],
                        }
                        : s
                )
            );
            setIsTyping(false);
        }, 1000);
    };

    const generateBotReply = (userMessage: string) => {
        if (!userMessage) return "Silakan tulis pertanyaan tentang kursus!";
        const msg = userMessage.toLowerCase();
        if (msg.includes("programming"))
            return "Kami merekomendasikan kursus Pemrograman Dasar untuk pemula di Edunara Academy.";
        if (msg.includes("bahasa inggris"))
            return "Untuk kursus Bahasa Inggris, kami memiliki program online & offline dengan mentor profesional.";
        if (msg.includes("desain grafis"))
            return "Kursus Desain Grafis kami mencakup Photoshop, Illustrator, dan Figma untuk semua level.";
        if (msg.includes("mentor"))
            return "Setiap kursus memiliki mentor berpengalaman yang siap membimbing peserta sesuai kebutuhan.";
        if (msg.includes("jakarta"))
            return "Kami memiliki berbagai lokasi kursus di Jakarta Pusat, Selatan, dan Timur.";
        return "Terima kasih! Kami akan segera memberikan informasi terkait pertanyaan Anda.";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    };

    const startNewSession = () => {
        const newId = sessions.length + 1;
        setSessions([
            ...sessions,
            { id: newId, title: `Percakapan ${newId}`, messages: [] },
        ]);
        setActiveSession(newId);
    };

    const deleteSession = (id: number) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        if (activeSession === id && sessions.length > 1)
            setActiveSession(sessions[0].id);
    };

    return (
        <div className="flex h-screen w-full bg-gradient-to-b from-sky-50 to-white font-sans overflow-hidden">
            {/* SIDEBAR */}
            <div
                className={`fixed md:static z-40 h-full bg-white/90 backdrop-blur-md border-r border-sky-100 shadow-sm flex flex-col transition-all duration-300 ${sidebarOpen ? "w-72 left-0" : "-left-72 md:left-0 w-0 md:w-72"
                    }`}
            >
                <div className="p-4 border-b border-sky-100 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="z-50 bg-white border border-sky-100 shadow-md rounded-full p-3 hover:bg-sky-50 transition flex items-center gap-2 text-sky-700 text-sm md:top-6 md:left-6"
                    >
                        <FaArrowLeft className="text-sky-600" />
                        <span className="hidden md:inline">Kembali</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={startNewSession}
                            className="text-white bg-sky-500 hover:bg-sky-600 px-3 py-1.5 rounded-xl text-sm transition"
                        >
                            + Baru
                        </button>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-500 hover:text-red-500 transition md:hidden"
                        >
                            <FaChevronLeft />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className={`p-3 cursor-pointer flex justify-between items-center transition-all ${session.id === activeSession
                                ? "bg-sky-100 font-medium text-sky-700"
                                : "hover:bg-sky-50"
                                }`}
                            onClick={() => {
                                setActiveSession(session.id);
                                if (window.innerWidth < 768)
                                    setSidebarOpen(false); // auto tutup di mobile
                            }}
                        >
                            <div className="truncate max-w-[75%]">
                                {session.title}:{" "}
                                {
                                    session.messages[
                                        session.messages.length - 1
                                    ]?.content?.slice(0, 20)
                                }
                            </div>
                            {sessions.length > 1 && (
                                <FaTimes
                                    className="text-gray-400 hover:text-red-500 transition"
                                    onClick={() => deleteSession(session.id)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* AREA CHAT */}
            <div className="flex-1 flex flex-col relative ml-0 md:ml-0">
                {/* Tombol buka sidebar di mobile */}
                {!sidebarOpen && (
                    <button
                        className="absolute top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <FaChevronRight />
                    </button>
                )}

                {/* Header */}
                <div className="hidden md:flex bg-white/80 backdrop-blur-md border-b border-sky-100 p-4 items-center gap-2 shadow-sm sticky top-0 z-20">
                    <Image
                        src="/icon/chatbot.svg"
                        alt="Chat Bot"
                        width={36}
                        height={36}
                    />
                    <h1 className="font-semibold text-lg text-sky-700">
                        {currentChat.title}
                    </h1>
                </div>

                {/* Pesan */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white via-sky-50/40 to-white"
                >
                    {currentChat.messages.length === 0 && !isTyping ? (
                        <div className="flex flex-col items-center justify-center text-center mt-16 space-y-6">
                            <Image
                                src="/icon/chatbot.svg"
                                alt="Edunara Bot"
                                width={60}
                                height={60}
                                className="opacity-80"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Selamat Datang di{" "}
                                    <span className="text-sky-600">
                                        Edunara Chat
                                    </span>{" "}
                                    👋
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Tanyakan tentang kursus, mentor, lokasi, dan
                                    jadwal kami.
                                </p>
                            </div>
                            {/* PROMPT REKOMENDASI */}
                            <div className="grid md:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
                                {suggestionPrompts.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => sendMessage(prompt)}
                                        className="flex items-center gap-3 px-5 py-4 bg-white border border-sky-100 hover:border-sky-300 shadow-sm rounded-2xl text-gray-700 hover:text-sky-600 hover:shadow-md transition"
                                    >
                                        <div className="bg-sky-100 text-sky-500 rounded-full p-2 text-lg">
                                            {["💻", "📝", "🎨", "📌", "📍"][idx]}
                                        </div>
                                        <span className="text-sm text-left">
                                            {prompt}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {currentChat.messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    {msg.type === "text" && (
                                        <div
                                            className={`px-4 py-3 rounded-2xl shadow-sm max-w-[70%] text-sm ${msg.sender === "user"
                                                ? "bg-orange-400 text-white rounded-br-none"
                                                : "bg-white border border-sky-100 text-gray-700 rounded-bl-none"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    )}
                                    {msg.type === "image" && (
                                        <img
                                            src={msg.content}
                                            alt="uploaded"
                                            className={`rounded-2xl max-w-[60%] border ${msg.sender === "user"
                                                ? "border-orange-400"
                                                : "border-sky-100"
                                                }`}
                                        />
                                    )}
                                    {msg.type === "file" && (
                                        <a
                                            href={msg.content}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${msg.sender === "user"
                                                ? "bg-orange-400 text-white"
                                                : "bg-white border border-sky-100 text-gray-700"
                                                }`}
                                        >
                                            📎{" "}
                                            {msg.content.split("/").pop()}
                                        </a>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-3 rounded-2xl shadow-sm max-w-[40%] bg-white border border-sky-100 text-gray-700 flex items-center gap-1">
                                        <span>Bot sedang mengetik</span>
                                        <span className="flex gap-1 ml-2">
                                            <span className="w-1 h-1 bg-sky-500 rounded-full animate-bounce" />
                                            <span className="w-1 h-1 bg-sky-500 rounded-full animate-bounce delay-200" />
                                            <span className="w-1 h-1 bg-sky-500 rounded-full animate-bounce delay-400" />
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-sky-100 flex items-center gap-3 flex-shrink-0">
                    {file && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-sky-100 rounded-full shadow-sm">
                            <span>{file.name}</span>
                            <FaTimes
                                className="cursor-pointer hover:text-red-500"
                                onClick={() => setFile(null)}
                            />
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Tulis pertanyaan tentang kursus..."
                        className="flex-1 px-4 py-3 border border-sky-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <label className="bg-sky-50 p-2 rounded-full cursor-pointer hover:bg-sky-100 transition">
                        <FaImage className="text-sky-600 w-5 h-5" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label className="bg-sky-50 p-2 rounded-full cursor-pointer hover:bg-sky-100 transition">
                        <FaFileUpload className="text-sky-600 w-5 h-5" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button
                        onClick={() => sendMessage()}
                        className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full transition"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}
