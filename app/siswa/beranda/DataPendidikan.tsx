"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaArrowRight } from "react-icons/fa";

const Bar = dynamic(
    () => import("react-chartjs-2").then(mod => mod.Bar),
    { ssr: false }
);

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import Image from "next/image";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DataPendidikan() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    // =========================
    //     DATA DARI BPS
    // =========================
    const labels = ["2020", "2021", "2022", "2023", "2024"];

    const datasets = [
        {
            label: "19–24 tahun",
            data: [36.57, 37.51, 38.09, 38.94, 39.41],
            backgroundColor: "#1E88E5",
        },
        {
            label: "19–23 tahun",
            data: [32.15, 32.48, 32.83, 33.47, 33.98],
            backgroundColor: "#42A5F5",
        },
        {
            label: "16–18 tahun",
            data: [70.03, 70.06, 71.55, 72.76, 73.44],
            backgroundColor: "#64B5F6",
        },
        {
            label: "13–15 tahun",
            data: [94.65, 95.16, 95.74, 96.03, 96.18],
            backgroundColor: "#90CAF9",
        },
        {
            label: "7–12 tahun",
            data: [99.34, 99.27, 99.48, 99.54, 99.58],
            backgroundColor: "#BBDEFB",
        },
    ];

    const data = { labels, datasets };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#0F172A",
                    font: { size: 14 },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: { color: "#0F172A" },
            },
            y: {
                stacked: true,
                ticks: {
                    color: "#0F172A",
                    callback: (v: number) => `${v}%`,
                },
            },
        },
    };

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-siswa-primary-200 to-[#1DA1F2]/70 px-4 sm:px-8 py-16"
            id="data"
        >
            <h2 className="text-3xl md:text-5xl font-extrabold text-pemilik-primary-200 text-center mb-12">
                Indikator Pendidikan (APS) 2020 – 2024
            </h2>

            <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-8">

                {/* Chart */}
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 w-full md:w-2/3 h-[520px] md:h-[600px]">
                    {isClient ? (
                        <Bar data={data} options={options} />
                    ) : (
                        <p className="text-center">Loading chart...</p>
                    )}
                </div>

                {/* Info Card */}
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-10 w-full md:w-1/3 text-center flex flex-col items-center">
                    <Image
                        src="/illustrasi/bpslogo.webp"
                        alt="BPS Logo"
                        width={112}  
                        height={112}
                        className="object-contain mb-5"
                        priority
                    />
                    <h1 className="text-sky-700 font-semibold text-lg mb-3">
                        Data Berdasarkan
                    </h1>

                    <p className="text-sm text-slate-700 mb-4">
                        Angka Partisipasi Sekolah (APS) berdasarkan kelompok umur.
                        Data asli diambil dari tabel “Education Indicator (1994–2024)” BPS.
                    </p>

                    <a
                        href="https://www.bps.go.id/en/statistics-table/1/MTUyNSMx/education-indicator--1994-2024.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sky-900 font-bold text-lg"
                    >
                        <span className="transition-transform duration-300 group-hover:translate-x-2">
                            BPS Statistik Indonesia
                        </span>
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                    </a>
                </div>
            </div>
        </section>
    );
}
