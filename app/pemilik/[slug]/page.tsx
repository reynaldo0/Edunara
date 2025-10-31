"use client";

import { useEffect, useState } from "react";

type Guide = {
    slug: string;
    title: string;
    description: string;
    progress: number;
    category: string;
    image: string;
    details: string[];
};

export default function SectionPanduan() {
    const [guides, setGuides] = useState<Guide[]>([]);

    useEffect(() => {
        fetch("/data/guides.json")
            .then((res) => res.json())
            .then((data) => setGuides(data))
            .catch(console.error);
    }, []);

    return (
        <section className="p-8 bg-sky-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">
                Panduan Kursus
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {guides.map((guide) => (
                    <div
                        key={guide.slug}
                        className="bg-white shadow rounded-2xl p-5 flex flex-col"
                    >
                        <img
                            src={guide.image}
                            alt={guide.title}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h2 className="text-lg font-semibold">{guide.title}</h2>
                        <p className="text-sm text-slate-600 flex-1">{guide.description}</p>

                        <a
                            href={`/panduan/${guide.slug}`}
                            className="mt-4 bg-[#1B3A5F] text-white py-2 px-4 rounded-lg text-center hover:bg-[#163250] transition"
                        >
                            Lihat Selengkapnya
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
