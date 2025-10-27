"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Story {
    id: number;
    name: string;
    description: string;
    image: string;
}

const InspirationalStory: React.FC = () => {
    const stories: Story[] = [
        { id: 1, name: "Siswandi", description: "Dari pengamen jalanan hingga menjadi pemilik bimbel", image: "/owner1.jpg" },
        { id: 2, name: "Rina", description: "Membangun kursus bahasa dari nol hingga punya 300 murid", image: "/owner2.jpg" },
        { id: 3, name: "Bayu", description: "Berawal dari hobi komputer menjadi bisnis kursus IT sukses", image: "/owner3.jpg" },
        { id: 4, name: "Lestari", description: "Menjadi inspirasi dengan kursus menjahit untuk ibu rumah tangga", image: "/owner4.jpg" },
        { id: 5, name: "Dwi", description: "Transformasi dari tutor privat menjadi pemilik lembaga les", image: "/owner5.jpg" },
        { id: 6, name: "Fahri", description: "Mengajarkan musik dan membangun sekolah seni di kotanya", image: "/owner6.jpg" },
        { id: 7, name: "Citra", description: "Kursus desain grafis yang lahir dari kecintaan pada seni digital", image: "/owner7.jpg" },
        { id: 8, name: "Niko", description: "Membantu anak-anak daerah lewat kursus online gratis", image: "/owner8.jpg" },
        { id: 9, name: "Tania", description: "Menjadi pengusaha sukses lewat kursus memasak rumahan", image: "/owner9.jpg" },
        { id: 10, name: "Hadi", description: "Mengubah hidup lewat kursus bahasa untuk pekerja migran", image: "/owner10.jpg" },
    ];

    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(stories.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStories = stories.slice(startIndex, startIndex + itemsPerPage);

    const handlePageClick = (page: number) => setCurrentPage(page);

    const getVisiblePages = (): (number | string)[] => {
        if (!isMobile || totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);

        if (currentPage <= 2) {
            return [1, 2, 3, "...", totalPages];
        } else if (currentPage >= totalPages - 1) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [1, "...", currentPage, currentPage + 1, "...", totalPages];
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-[#E6F1FF] px-4 py-10">
            <h1 className="text-xl md:text-2xl font-semibold text-[#0A2E56] mb-6 text-center">
                Cerita Inspiratif Pemilik Kursus
            </h1>

            <div className="bg-[#FFB84C] rounded-3xl p-6 md:p-10 w-full max-w-5xl shadow-lg transition-all duration-300">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h2 className="text-white font-bold text-2xl text-center md:text-left md:text-4xl leading-snug">
                            Cerita Inspiratif dari <br /> Pemilik Kursus
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="/illustrasi/pemilik/mentor/cerita.png"
                            alt="Illustration"
                            width={300}
                            height={250}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Story Cards */}
                <div className={`grid gap-6 mt-8 transition-all duration-300 ${itemsPerPage === 1 ? "grid-cols-1" : "md:grid-cols-3"}`}>
                    {currentStories.map((story) => (
                        <div
                            key={story.id}
                            className="bg-white rounded-2xl p-4 flex flex-col shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                                <Image src={story.image} alt={story.name} fill className="object-cover" />
                            </div>
                            <p className="text-sm text-[#0A2E56] font-semibold mb-1">{story.name}</p>
                            <p className="text-sm text-[#0A2E56] opacity-80 mb-3">{story.description}</p>
                            <button className="bg-[#0A2E56] text-white text-sm py-2 px-3 rounded-lg w-fit hover:bg-[#0c396d] transition-colors">
                                Selengkapnya
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center mt-10 gap-2 flex-wrap">
                    {/* Tombol Prev & Next hanya tampil di desktop */}
                    {!isMobile && (
                        <button
                            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
                                    ? "bg-white/50 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#0A2E56] hover:bg-[#0A2E56] hover:text-white shadow-md"
                                }`}
                        >
                            Prev
                        </button>
                    )}

                    {/* Page Numbers */}
                    {getVisiblePages().map((page, i) =>
                        typeof page === "number" ? (
                            <button
                                key={i}
                                onClick={() => handlePageClick(page)}
                                className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center ${currentPage === page
                                        ? "bg-[#0A2E56] text-white shadow-md scale-105"
                                        : "bg-white text-[#0A2E56] hover:bg-[#0A2E56] hover:text-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={i} className="w-9 h-9 flex items-center justify-center text-[#0A2E56] text-sm">
                                {page}
                            </span>
                        )
                    )}

                    {!isMobile && (
                        <button
                            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                                    ? "bg-white/50 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#0A2E56] hover:bg-[#0A2E56] hover:text-white shadow-md"
                                }`}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InspirationalStory;
