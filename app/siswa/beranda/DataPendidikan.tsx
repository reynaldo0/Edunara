"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaArrowRight } from "react-icons/fa";

// Dynamic import Bar chart, SSR dimatikan
const Bar = dynamic(() => import("react-chartjs-2").then(mod => mod.Bar), { ssr: false });

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DataPendidikan() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // menandai bahwa kita sudah di client
    }, []);

    const data = {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
            { label: "19–24 tahun", data: [30, 35, 33, 37, 38], backgroundColor: "#1E88E5" },
            { label: "19–23 tahun", data: [25, 28, 27, 29, 30], backgroundColor: "#42A5F5" },
            { label: "16–18 tahun", data: [20, 21, 22, 23, 24], backgroundColor: "#64B5F6" },
            { label: "13–15 tahun", data: [15, 16, 17, 17, 18], backgroundColor: "#90CAF9" },
            { label: "7–12 tahun", data: [10, 11, 12, 12, 13], backgroundColor: "#BBDEFB" },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    color: "#0F172A",
                    boxWidth: 20,
                    font: {
                        size: 16,
                        weight: "bold",
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { color: "#0F172A", font: { size: 14 } },
            },
            y: {
                stacked: true,
                ticks: {
                    color: "#0F172A",
                    font: { size: 14 },
                    callback: (v: string | number) => `${v}%`,
                },
            },
        },
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-siswa-primary-200 to-[#1DA1F2]/70 px-6 py-16" id="data">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#003653] text-center mb-12">
                Indikator Pendidikan Tahun 2020 – 2024
            </h2>

            <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-10">
                {/* Chart Card */}
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-10 w-full md:w-2/3">
                    {isClient ? <Bar data={data} options={options} /> : <p className="text-center">Loading chart...</p>}
                </div>

                {/* Info Card */}
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-10 w-full md:w-1/3 flex flex-col items-center justify-center">
                    <img
                        src="/illustrasi/bpslogo.webp"
                        alt="BPS Logo"
                        className="w-32 h-32 object-contain mb-5"
                    />
                    <h1 className="text-sky-700 font-semibold text-lg mb-3">Data Berdasarkan</h1>
                    <a
                        href="https://www.bps.go.id/en/statistics-table/1/MTUyNSMx/education-indicator--1994-2024.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sky-900 font-bold text-xl"
                    >
                        <span className="transition-transform duration-300 group-hover:translate-x-2">
                            BPS – Statistik Indonesia
                        </span>
                        <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-sky-900" />
                    </a>
                </div>
            </div>
        </section>
    );
}
