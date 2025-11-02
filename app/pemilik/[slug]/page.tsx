"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Guide = {
    slug: string;
    title: string;
    description: string;
    progress: number;
    category: string;
    image: string;
    details: string[];
};

interface GuideDetailProps {
    params: { slug: string };
}

export default function GuideDetailPage({ params }: GuideDetailProps) {
    const { slug } = params;
    const router = useRouter();
    const [guide, setGuide] = useState<Guide | null>(null);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

    // Fetch guide data
    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const res = await fetch("/data/guides.json");
                const data: Guide[] = await res.json();
                const selected = data.find((g) => g.slug === slug) || null;
                setGuide(selected);
                if (selected) {
                    setCheckedItems(new Array(selected.details.length).fill(false));
                }
            } catch (err) {
                console.error("Gagal memuat data:", err);
            }
        };
        fetchGuide();
    }, [slug]);

    const handleCheckboxChange = (index: number) => {
        if (!guide) return;

        const updatedChecked = [...checkedItems];
        updatedChecked[index] = !updatedChecked[index];
        setCheckedItems(updatedChecked);

        const completed = updatedChecked.filter(Boolean).length;
        const total = guide.details.length;
        const newProgress = Math.round((completed / total) * 100);

        setGuide({ ...guide, progress: newProgress });
    };

    if (!guide) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-sky-50">
                <p className="text-slate-600 text-lg">Guide tidak ditemukan atau sedang dimuat...</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-sky-50 p-10 flex flex-col items-center">
            {/* Tabs kategori (non-interaktif) */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["Fasilitas", "Kurikulum", "Tips mengajar", "Tips Promosi", "Branding"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-5 py-2 rounded-full border font-medium transition-all ${guide.category === tab
                                ? "bg-pemilik-primary-100 text-white border-pemilik-primary-100"
                                : "bg-white text-pemilik-primary-200 border-slate-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Gambar utama */}
            <div className="relative w-full max-w-3xl h-60 rounded-2xl overflow-hidden mb-6 shadow">
                <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Judul dan deskripsi */}
            <h1 className="text-3xl font-semibold text-slate-800 mb-3 text-center">
                {guide.title}
            </h1>
            <p className="text-slate-600 text-center max-w-2xl mb-8">{guide.description}</p>

            {/* Progress bar */}
            <div className="w-full max-w-2xl mb-8">
                <div className="w-full bg-slate-200 h-3 rounded-full">
                    <div
                        className="bg-pemilik-primary-100 h-3 rounded-full transition-all"
                        style={{ width: `${guide.progress}%` }}
                    ></div>
                </div>
                <p className="text-right text-slate-600 text-sm mt-1">
                    Selesai {guide.progress}%
                </p>
            </div>

            {/* Detail list dengan checkbox */}
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Langkah-langkah:</h2>
                <ul className="list-disc list-inside space-y-3">
                    {guide.details.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                className="mt-1 w-4 h-4 accent-pemilik-primary-100"
                                checked={checkedItems[idx] || false}
                                onChange={() => handleCheckboxChange(idx)}
                            />
                            <span className="text-slate-700">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tombol kembali */}
            <button
                onClick={() => router.back()}
                className="mt-8 bg-pemilik-primary-100 text-white font-semibold px-6 py-2 rounded-full hover:bg-pemilik-primary-100/90 transition-all"
            >
                ← Kembali
            </button>
        </section>
    );
}
