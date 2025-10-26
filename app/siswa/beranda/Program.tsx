"use client";

import Image from "next/image";
import { useState } from "react";

const programs = [
    {
        id: 1,
        title: "Digital Marketing untuk Pemula",
        desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
        img: "/images/marketing1.jpg",
        progress: 85,
    },
    {
        id: 2,
        title: "Digital Marketing untuk Pemula",
        desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
        img: "/images/marketing2.jpg",
        progress: 60,
    },
    {
        id: 3,
        title: "Digital Marketing untuk Pemula",
        desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
        img: "/images/marketing3.jpg",
        progress: 95,
    },
];

export default function Program() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="w-full py-16 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#1A202C] mb-10">
                Program Unggulan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl">
                {programs.map((item) => (
                    <div
                        key={item.id}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                        className={`relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center text-center`}
                    >
                        <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={400}
                                height={200}
                                className={`object-cover w-full h-full rounded-xl transition-transform duration-300 ${hovered === item.id ? "scale-105" : ""
                                    }`}
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-[#2B6CB0] mb-2">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">{item.desc}</p>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                            <div
                                className="bg-[#2B6CB0] h-2.5 rounded-full transition-all duration-700"
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-medium text-[#2B6CB0]">
                            Completed {item.progress}%
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
