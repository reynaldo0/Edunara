"use client";

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { HiUserCircle } from "react-icons/hi2";
import { FaReply, FaThumbsUp } from "react-icons/fa";

// ===== Interface untuk tipe data =====
interface Reply {
    id: number;
    author: string;
    content: string;
    likes: number;
}

interface Post {
    id: number;
    author: string;
    content: string;
    likes: number;
    replies: Reply[];
}

const ForumSection: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            author: "Sinta",
            content:
                "Saya sedang mencari kursus Desain Grafis yang cocok untuk pemula. Apakah ada rekomendasi lembaga pelatihan di Jakarta Timur yang punya mentor berpengalaman?",
            likes: 12,
            replies: [
                {
                    id: 1,
                    author: "Rudi",
                    content:
                        "Coba cek kursus Desain Grafis di LKP Kreativa. Mentor-nya bagus dan materinya mudah dipahami.",
                    likes: 4,
                },
                {
                    id: 2,
                    author: "Maya",
                    content:
                        "Di Jakarta Timur ada juga Program Pelatihan Berbasis Kompetensi. Gratis dan bersertifikat.",
                    likes: 7,
                },
            ],
        },
        {
            id: 2,
            author: "Dewi",
            content:
                "Apakah kursus Digital Marketing di DKI Jakarta menyediakan sertifikat resmi yang bisa dipakai untuk melamar kerja?",
            likes: 8,
            replies: [
                {
                    id: 1,
                    author: "Fajar",
                    content:
                        "Iya, sebagian besar lembaga sudah terakreditasi dan sertifikatnya berlaku secara nasional.",
                    likes: 2,
                },
            ],
        },
    ]);


    const [newPost, setNewPost] = useState<string>("");
    const [replyContent, setReplyContent] = useState<Record<number, string>>({});
    const [showReplyBox, setShowReplyBox] = useState<number | null>(null);

    // Tambah postingan baru
    const addPost = (): void => {
        if (!newPost.trim()) return;
        const newEntry: Post = {
            id: posts.length + 1,
            author: "Guest",
            content: newPost,
            likes: 0,
            replies: [],
        };
        setPosts([...posts, newEntry]);
        setNewPost("");
    };

    // Tambah balasan
    const addReply = (postId: number): void => {
        const replyText = replyContent[postId];
        if (!replyText?.trim()) return;

        setPosts(
            posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        replies: [
                            ...post.replies,
                            {
                                id: post.replies.length + 1,
                                author: "Guest",
                                content: replyText,
                                likes: 0,
                            },
                        ],
                    }
                    : post
            )
        );

        setReplyContent({ ...replyContent, [postId]: "" });
        setShowReplyBox(null);
    };

    // Tambah like
    const addLike = (postId: number, replyId: number | null = null): void => {
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    if (replyId === null) {
                        return { ...post, likes: post.likes + 1 };
                    }
                    return {
                        ...post,
                        replies: post.replies.map((r) =>
                            r.id === replyId ? { ...r, likes: r.likes + 1 } : r
                        ),
                    };
                }
                return post;
            })
        );
    };

    return (
        <section className="relative py-20 min-h-screen mx-auto pb-12">
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                <img
                    src="/illustrasi/wave/footer.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#003B5C]">
                    Forum Diskusi & Tanya Jawab Kursus DKI Jakarta
                </h2>

                {/* Form Komentar */}
                <div className="bg-white shadow-lg rounded-3xl p-6 mb-8 border border-gray-200 transition-transform hover:scale-[1.01] duration-300">
                    <textarea
                        className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-siswa-primary-100 outline-none bg-white resize-none"
                        rows={3}
                        placeholder="Tanyakan pengalamanmu atau diskusikan seputar kursus di DKI Jakarta..."
                        value={newPost}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setNewPost(e.target.value)
                        }
                    />
                    <button
                        onClick={addPost}
                        className="mt-4 px-6 py-2 bg-siswa-primary-100 text-[#003B5C] rounded-xl font-semibold hover:bg-[#9AD8F5] transition-all shadow-md cursor-pointer"
                    >
                        Kirim
                    </button>
                </div>

                {/* List Diskusi */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white shadow-md rounded-3xl p-6 transition-transform hover:scale-[1.02] duration-300 border border-gray-200"
                        >
                            {/* Header Post */}
                            <div className="flex items-center gap-3 mb-2">
                                <HiUserCircle className="text-4xl text-siswa-primary-100" />
                                <span className="font-semibold text-[#003B5C]">
                                    {post.author}
                                </span>
                                <button
                                    onClick={() => addLike(post.id)}
                                    className="ml-auto flex items-center gap-1 text-sm text-[#0077B6] hover:text-[#005F8D] transition cursor-pointer"
                                >
                                    <FaThumbsUp /> {post.likes}
                                </button>
                            </div>

                            <p className="text-gray-700 mb-3">{post.content}</p>

                            {/* Tombol balas */}
                            <button
                                onClick={() =>
                                    setShowReplyBox(showReplyBox === post.id ? null : post.id)
                                }
                                className="text-sm cursor-pointer text-[#0077B6] hover:underline flex items-center gap-2"
                            >
                                <FaReply /> Balas
                            </button>

                            {/* List balasan */}
                            <div className="ml-10 mt-4 space-y-4 border-l-2 border-siswa-primary-100 pl-4">
                                {post.replies.map((reply) => (
                                    <div
                                        key={reply.id}
                                        className="bg-gray-50 p-3 rounded-xl border transition-transform hover:scale-[1.02] duration-300"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Link
                                                href={`/siswa/profile/${reply.author}`}
                                                className="shrink-0 hover:opacity-80 transition"
                                            >
                                                <HiUserCircle className="text-3xl text-siswa-primary-100" />
                                            </Link>
                                            <span className="text-sm font-medium text-[#003B5C]">
                                                {reply.author}
                                            </span>
                                            <button
                                                onClick={() => addLike(post.id, reply.id)}
                                                className="ml-auto flex items-center gap-1 text-xs text-[#0077B6] hover:text-[#005F8D] transition cursor-pointer"
                                            >
                                                <FaThumbsUp /> {reply.likes}
                                            </button>
                                        </div>
                                        <p className="text-gray-600 text-sm">{reply.content}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Input balasan */}
                            {showReplyBox === post.id && (
                                <div className="mt-4 ml-10 transition-all duration-300">
                                    <textarea
                                        className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-siswa-primary-100 outline-none bg-white resize-none"
                                        rows={2}
                                        placeholder="Tambahkan jawaban atau pengalamanmu di sini..."
                                        value={replyContent[post.id] || ""}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                            setReplyContent({
                                                ...replyContent,
                                                [post.id]: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        onClick={() => addReply(post.id)}
                                        className="mt-2 px-4 py-1 bg-siswa-primary-100 text-[#003B5C] text-sm rounded-lg hover:bg-[#9AD8F5] transition shadow-md cursor-pointer"
                                    >
                                        Kirim Balasan
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForumSection;
