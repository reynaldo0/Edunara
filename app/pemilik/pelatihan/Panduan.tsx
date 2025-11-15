"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    const [activeTab, setActiveTab] = useState("Fasilitas");
    const [currentPage, setCurrentPage] = useState(1);
    const [guides, setGuides] = useState<Guide[]>([]);
    const [checklistState, setChecklistState] = useState<Record<string, boolean[]>>({});
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 3;

    const tabs = ["Fasilitas", "Kurikulum", "Tips Mengajar", "Tips Promosi"];

    // Ambil data guides dari json
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

    // Simpan checklist
    useEffect(() => {
        localStorage.setItem("completedDetails", JSON.stringify(checklistState));
    }, [checklistState]);

    // Checklist toggle
    const handleCheck = (slug: string, index: number) => {
        setChecklistState((prev) => {
            const updated = { ...prev };
            updated[slug][index] = !updated[slug][index];
            return updated;
        });
    };

    // Card toggle
    const toggleCard = (slug: string) => {
        setExpandedCard((prev) => (prev === slug ? null : slug));
    };

    // Filter kategori + search
    const filteredGuides = guides.filter(
        (g) =>
            g.category === activeTab &&
            g.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <div className="flex justify-center items-center gap-2 mt-10" id="panduan">
                {pages.map((p, idx) =>
                    typeof p === "number" ? (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(p)}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${currentPage === p
                                    ? "bg-pemilik-primary-100 text-white"
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
        <section className="min-h-screen bg-sky-50 p-10 flex flex-col items-center relative pb-20 md:pb-40" id="panduan">
            <div className="absolute bottom-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/pemilik/bottom.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full max-w-6xl">
                <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
                    Panduan untuk memiliki kursus yang baik
                </h2>

                {/* Dropdown + Search */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

                    {/* Dropdown */}
                    <div className="w-full md:w-1/3">
                        <select
                            value={activeTab}
                            onChange={(e) => handleTabChange(e.target.value)}
                            className="w-full bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-pemilik-primary-100 focus:border-pemilik-primary-100 transition"
                        >
                            {tabs.map((tab) => (
                                <option key={tab} value={tab}>
                                    {tab}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-1/3 relative">
                        <input
                            type="text"
                            placeholder="Cari panduan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-300 px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-pemilik-primary-100 focus:border-pemilik-primary-100 transition"
                        />
                        <span className="absolute right-4 top-2.5 text-slate-400 text-sm">🔍</span>
                    </div>
                </div>

                {/* Cards */}
                {loading ? (
                    <p className="text-slate-600 mt-10 text-center animate-pulse">
                        Memuat panduan...
                    </p>
                ) : currentData.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6 w-full">
                        {currentData.map((g) => {
                            const checks = checklistState[g.slug] || [];
                            const progress =
                                g.details.length > 0
                                    ? Math.round(
                                        (checks.filter(Boolean).length / g.details.length) *
                                        100
                                    )
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
                                                (e.target as HTMLImageElement).src =
                                                    "/images/fallback.jpg";
                                            }}
                                        />
                                    </div>

                                    <h3 className="text-slate-800 font-semibold text-lg mt-2">
                                        {g.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm">{g.description}</p>

                                    {/* Progress */}
                                    <div className="mt-auto">
                                        <div className="w-full bg-slate-200 h-2 rounded-full mb-2">
                                            <div
                                                className="bg-pemilik-primary-100 h-2 rounded-full transition-all"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="text-right text-sm text-slate-600 mb-2">
                                            Selesai {progress}%
                                        </div>

                                        {g.details.length > 0 && (
                                            <button
                                                onClick={() => toggleCard(g.slug)}
                                                className="bg-pemilik-primary-100 text-white font-semibold rounded-full px-4 py-2 hover:bg-pemilik-primary-100/90 transition-all"
                                            >
                                                {expandedCard === g.slug
                                                    ? "Tutup Detail"
                                                    : "Detail"}
                                            </button>
                                        )}
                                    </div>

                                    {/* Checklist */}
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
                    <p className="text-slate-600 mt-10 text-center">
                        Tidak ada panduan pada kategori ini.
                    </p>
                )}

                {/* Pagination */}
                {totalPages > 1 && renderPagination()}
            </div>
        </section>
    );
}
