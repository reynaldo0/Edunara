"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Guide = {
    title: string;
    description: string;
    progress: number; // progress awal dari JSON
    category: string;
    image: string;
    slug: string;
    details: string[];
};

export default function SectionPanduan() {
    const [activeTab, setActiveTab] = useState("Fasilitas");
    const [currentPage, setCurrentPage] = useState(1);
    const [guides, setGuides] = useState<Guide[]>([]);
    const [checklistState, setChecklistState] = useState<Record<string, boolean[]>>({});
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 3;

    const tabs = ["Fasilitas", "Kurikulum", "Tips mengajar", "Tips Promosi", "Branding"];

    // Ambil data guides dari JSON
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const res = await fetch("/data/guides.json");
                if (!res.ok) throw new Error("Gagal memuat guides.json");
                const data: Guide[] = await res.json();

                const storedChecklist = JSON.parse(localStorage.getItem("completedDetails") || "{}");
                const initialChecklist: Record<string, boolean[]> = {};
                data.forEach((g) => {
                    initialChecklist[g.slug] = storedChecklist[g.slug] || new Array(g.details.length).fill(false);
                });

                setGuides(data);
                setChecklistState(initialChecklist);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    // Simpan checklist ke localStorage saat berubah
    useEffect(() => {
        localStorage.setItem("completedDetails", JSON.stringify(checklistState));
    }, [checklistState]);

    // Toggle checklist
    const handleCheck = (slug: string, index: number) => {
        setChecklistState((prev) => {
            const updated = { ...prev };
            updated[slug][index] = !updated[slug][index];
            return updated;
        });
    };

    // Toggle card accordion (hanya satu terbuka)
    const toggleCard = (slug: string) => {
        setExpandedCard((prev) => (prev === slug ? null : slug));
    };

    // Filter data sesuai tab aktif
    const filteredGuides = guides.filter((g) => g.category === activeTab);

    // Pagination
    const totalPages = Math.ceil(filteredGuides.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = filteredGuides.slice(startIdx, startIdx + itemsPerPage);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const renderPagination = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 3;

        for (let i = 1; i <= Math.min(totalPages, maxVisible); i++) pages.push(i);
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
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
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
            {loading ? (
                <p className="text-slate-600 mt-10 text-center animate-pulse">Memuat panduan...</p>
            ) : currentData.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {currentData.map((g) => {
                        const checks = checklistState[g.slug] || [];
                        const progress =
                            g.details.length > 0
                                ? Math.round((checks.filter(Boolean).length / g.details.length) * 100)
                                : g.progress;

                        return (
                            <div
                                key={g.slug}
                                className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition-all"
                            >
                                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-200">
                                    <Image
                                        src={g.image}
                                        alt={g.title}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/images/fallback.jpg";
                                        }}
                                    />
                                </div>

                                <h3 className="text-slate-800 font-semibold text-lg mt-2">{g.title}</h3>
                                <p className="text-slate-600 text-sm">{g.description}</p>

                                {/* Progress Bar */}
                                <div className="mt-auto">
                                    <div className="w-full bg-slate-200 h-2 rounded-full mb-2">
                                        <div
                                            className="bg-pemilik-primary-100 h-2 rounded-full transition-all"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm text-slate-600 mb-2">Selesai {progress}%</div>
                                    {/* Detail Button */}
                                    {g.details.length > 0 && (
                                        <button
                                            onClick={() => toggleCard(g.slug)}
                                            className="bg-pemilik-primary-100 text-white font-semibold rounded-full px-4 py-2 hover:bg-pemilik-primary-100/90 transition-all"
                                        >
                                            {expandedCard === g.slug ? "Tutup Detail" : "Detail"}
                                        </button>
                                    )}
                                </div>

                                {/* Checklist Accordion dengan Animasi */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ${expandedCard === g.slug ? "max-h-96 mt-3" : "max-h-0"
                                        }`}
                                >
                                    {g.details.map((d, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-2 text-sm py-1"
                                        >
                                            <input
                                                type="checkbox"
                                                className="accent-pemilik-primary-100"
                                                checked={checks[idx]}
                                                onChange={() => handleCheck(g.slug, idx)}
                                            />
                                            {d}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-slate-600 mt-10 text-center">Tidak ada panduan pada kategori ini.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && renderPagination()}
        </section>
    );
}
