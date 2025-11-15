"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSiswa } from "../../context/SiswaContext";

const categories = [
    { name: "Matematika" },
    { name: "Bahasa Inggris" },
    { name: "Bahasa Jepang" },
    { name: "Bahasa Korea" },
    { name: "Pemrograman" },
] as const;

const daerahList = [
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Barat",
    "Jakarta Utara",
] as const;

type CategoryName = typeof categories[number]["name"];

type Course = {
    id: number;
    category: string;
    title: string;
    description: string;
    rating: number;
    location: string;
    image: string;
};

export default function Kategori() {
    const router = useRouter();
    const { siswa } = useSiswa();

    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryName>("Bahasa Inggris");
    const [selectedDaerah, setSelectedDaerah] = useState("Jakarta Selatan");
    const [input, setInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    // LOAD COURSES JSON
    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data: Course[]) => setCourses(data))
            .catch((err) => console.error("Gagal memuat data:", err));
    }, []);

    // SET CATEGORY FROM CONTEXT
    useEffect(() => {
        if (siswa.kategori && categories.some((c) => c.name === siswa.kategori)) {
            queueMicrotask(() => {
                setSelectedCategory(siswa.kategori as CategoryName);
            });
        }
    }, [siswa.kategori]);

    // RESPONSIVE SLIDES
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerSlide(1);
            else if (window.innerWidth < 1024) setItemsPerSlide(2);
            else setItemsPerSlide(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // FILTER KURSUS
    const filteredCourses = courses.filter((course) => {
        const matchCategory = course.category === selectedCategory;
        const matchDaerah = course.location === selectedDaerah;

        const matchSearch =
            course.title.toLowerCase().includes(input.toLowerCase()) ||
            course.description.toLowerCase().includes(input.toLowerCase());

        return matchCategory && matchDaerah && matchSearch;
    });

    const maxIndex = Math.max(0, filteredCourses.length - itemsPerSlide);

    const nextSlide = () =>
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const RatingStars = ({ rating }: { rating: number }) => {
        return (
            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const handleExplore = (id: number, title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");

        router.push(`/siswa/kursus/${slug}?id=${id}`);
    };

    return (
        <section
            className="min-h-screen flex flex-col items-center py-12 px-6 sm:px-10 relative overflow-hidden"
            id="kursus"
        >
            <div className="absolute bottom-0 w-full overflow-hidden leading-0">
                <img
                    src="/illustrasi/wave/rounded-b.webp"
                    alt="Wave"
                    className="w-full h-full object-cover"
                />
            </div>

            <h2 className="text-2xl md:text-5xl font-bold text-center text-pemilik-primary-200 mb-10">
                Kategori Kursus
            </h2>

            {/* FILTER BAR */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <select
                        value={selectedDaerah}
                        onChange={(e) => setSelectedDaerah(e.target.value)}
                        className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-200 w-full sm:w-48"
                    >
                        {daerahList.map((d) => (
                            <option key={d}>{d}</option>
                        ))}
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(e.target.value as CategoryName)
                        }
                        className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-200 w-full sm:w-48"
                    >
                        {categories.map((cat) => (
                            <option key={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* SEARCH */}
                <div className="relative w-full sm:w-64">
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-black" />
                    <input
                        type="text"
                        placeholder="Cari kursus..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 bg-gray-200"
                    />
                </div>
            </div>

            {/* HASIL */}
            {filteredCourses.length === 0 ? (
                <p className="text-gray-600 text-lg font-medium text-center">
                    Tidak ada kursus yang cocok dengan pencarian.
                </p>
            ) : (
                <div className="relative w-full max-w-6xl flex items-center justify-center">
                    {/* PREV */}
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`absolute -left-3 sm:-left-8 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition ${currentIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-slate-800" />
                    </button>

                    {/* SLIDER */}
                    <div className="overflow-hidden w-full">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentIndex * 100) / itemsPerSlide
                                    }%)`,
                            }}
                        >
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-3"
                                >
                                    <div className="bg-white rounded-3xl shadow-lg p-5 hover:scale-[1.03] transition cursor-pointer group h-full flex flex-col">
                                        <div className="overflow-hidden rounded-2xl">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <p className="text-sm font-semibold text-gray-400 mt-3">
                                            {course.location}
                                        </p>

                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {course.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 mt-1 flex-1">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center mt-3">
                                            <RatingStars rating={course.rating} />
                                            <span className="ml-2 text-sm text-gray-500">
                                                {course.rating}/5
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleExplore(course.id, course.title)
                                            }
                                            className="mt-5 cursor-pointer bg-siswa-primary-100 text-white px-5 py-2 rounded-full hover:bg-siswa-primary-100/80 transition"
                                        >
                                            Jelajahi
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NEXT */}
                    <button
                        onClick={nextSlide}
                        disabled={currentIndex >= maxIndex}
                        className={`absolute -right-3 sm:-right-8 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition ${currentIndex >= maxIndex
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        <ChevronRightIcon className="w-6 h-6 text-slate-800" />
                    </button>
                </div>
            )}

            {filteredCourses.length > 0 && (
                <div className="flex justify-center mt-10 z-10">
                    <button
                        onClick={() => router.push("/siswa/kursus")}
                        className="bg-siswa-primary-100 text-white px-6 py-2.5 rounded-full font-medium hover:bg-siswa-primary-100/80"
                    >
                        Lihat Semua
                    </button>
                </div>
            )}
        </section>
    );
}
