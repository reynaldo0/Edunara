"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Guide = {
    title: string;
    description: string;
    progress: number;
    category: string;
    image: string;
    slug: string;
    details: string[];
};

export default function SectionPanduan() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Fasilitas");
    const [currentPage, setCurrentPage] = useState(1);
    const [guides, setGuides] = useState<Guide[]>([]);
    const itemsPerPage = 3;

    const tabs = ["Fasilitas", "Kurikulum", "Tips mengajar", "Tips Promosi", "Branding"];

    // 🔹 Ambil data guides dan progress checklist dari localStorage
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const res = await fetch("/data/guides.json");
                const data: Guide[] = await res.json();

                // Ambil data checklist dari localStorage
                const storedProgress = JSON.parse(localStorage.getItem("completedDetails") || "{}");

                // Hitung ulang progress berdasarkan checklist
                const updatedData = data.map((g) => {
                    const checks = storedProgress[g.slug] || [];
                    const total = g.details.length;
                    const checked = checks.filter(Boolean).length;
                    const progress = total > 0 ? Math.round((checked / total) * 100) : 0;

                    return { ...g, progress };
                });

                setGuides(updatedData);
            } catch (err) {
                console.error("Gagal memuat data guides:", err);
            }
        };

        fetchGuides();
    }, []);

    // Filter berdasarkan tab aktif
    const filteredGuides = guides.filter((g) => g.category === activeTab);

    // Hitung total halaman
    const totalPages = Math.ceil(filteredGuides.length / itemsPerPage);

    // Data yang tampil di halaman aktif
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = filteredGuides.slice(startIdx, startIdx + itemsPerPage);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const goToDetail = (slug: string) => {
        router.push(`/pemilik/${slug}`);
    };

    const renderPagination = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 3;

        for (let i = 1; i <= Math.min(totalPages, maxVisible); i++) {
            pages.push(i);
        }

        if (totalPages > maxVisible) {
            pages.push("...");
            pages.push(totalPages);
        }

        return (
            <div className="flex justify-center items-center gap-2 mt-10">
                {pages.map((p, idx) =>
                    typeof p === "number" ? (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(p)}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${currentPage === p
                                ? "bg-pemilik-primary-100 text-slate-900"
                                : "text-slate-600 hover:bg-yellow-100"
                                }`}
                        >
                            {p}
                        </button>
                    ) : (
                        <span key={idx} className="text-slate-500 px-2">
                            {p}
                        </span>
                    )
                )}
            </div>
        );
    };

    return (
        <section className="min-h-screen bg-sky-50 p-10 flex flex-col items-center">
            <h2 className="text-center text-2xl font-semibold text-slate-800 mb-6">
                Panduan untuk memiliki kursus yang baik
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-5 py-2 rounded-full border font-medium transition-all ${activeTab === tab
                            ? "bg-pemilik-primary-100 text-white border-pemilik-primary-100"
                            : "bg-white text-pemilik-primary-200 border-slate-300 hover:bg-slate-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Cards */}
            {currentData.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {currentData.map((g, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition-all"
                        >
                            <div className="relative w-full h-40 rounded-xl overflow-hidden">
                                <Image src={g.image} alt={g.title} fill className="object-cover" />
                            </div>

                            <h3 className="text-slate-800 font-semibold text-lg mt-2">{g.title}</h3>
                            <p className="text-slate-600 text-sm">{g.description}</p>

                            <div className="mt-auto">
                                <div className="w-full bg-slate-200 h-2 rounded-full mb-2">
                                    <div
                                        className="bg-pemilik-primary-100 h-2 rounded-full transition-all"
                                        style={{ width: `${g.progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-right text-sm text-slate-600 mb-2">
                                    Selesai {g.progress}%
                                </div>
                                <button
                                    onClick={() => goToDetail(g.slug)}
                                    className="bg-pemilik-primary-100 text-white font-semibold rounded-full px-4 py-2 hover:bg-pemilik-primary-100/90 transition-all"
                                >
                                    selengkapnya
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-600 mt-10 text-center">Memuat panduan...</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && renderPagination()}
        </section>
    );
}
