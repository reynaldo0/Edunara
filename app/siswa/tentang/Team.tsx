"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

// Tipe data untuk social media
interface Socials {
    github: string;
    instagram: string;
    linkedin: string;
}

// Tipe data untuk anggota tim
interface TeamMember {
    id: number;
    name: string;
    role: string;
    img: string;
    socials: Socials;
}

export default function Team() {
    const [animateCards, setAnimateCards] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimateCards(true), 300);
        return () => clearTimeout(timeout); // Cleanup
    }, []);

    const teamData: TeamMember[] = [
        {
            id: 1,
            name: "Reynaldo Yusellino",
            role: "Frontend Developer",
            img: "/illustrasi/siswa/tentang/hero.png",
            socials: {
                github: "https://github.com/reynaldo0",
                instagram: "https://www.instagram.com/rynldysllino",
                linkedin: "https://www.linkedin.com/in/reynaldo-yusellino",
            },
        },
        {
            id: 2,
            name: "Bekhyun Aditya",
            role: "UI/UX Designer",
            img: "/team/adit.jpg",
            socials: {
                github: "https://github.com/Hzinterpol",
                instagram: "https://www.instagram.com/bekhyunaditya_?igsh=OGVqYXJpcDJjZzdt",
                linkedin:
                    "https://www.linkedin.com/in/bekhyun-aditya-45786930a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            },
        },
        {
            id: 3,
            name: "Afkar Sukmawan",
            role: "Frontend Developer",
            img: "/team/afkar.jpg",
            socials: {
                github: "https://github.com/Afkar-Saga",
                instagram: "https://www.instagram.com/afkar_saga/",
                linkedin:
                    "https://www.linkedin.com/in/afkar-sukmawan-ahmad/",
            },
        },
    ];

    return (
        <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 py-20 relative overflow-hidden pb-60">
            {/* Background */}
            <div
                className="absolute inset-0 bg-[url('/background/heroabout.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            {/* Judul */}
            <h2
                className={`text-5xl md:text-7xl font-extrabold text-[#003653] mb-16 tracking-wide drop-shadow-xl transition-all duration-700 ease-out ${animateCards ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                    }`}
            >
                Team GrowLab
            </h2>

            {/* Cards */}
            <div
                className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ease-out ${animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                {teamData.map((member, i) => (
                    <div
                        key={member.id}
                        className="relative group bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-[#A2DBF9] p-10 flex flex-col items-center transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                        style={{
                            animation: animateCards ? `fadeInUp 0.8s ease forwards` : "none",
                            animationDelay: `${i * 0.3}s`,
                            opacity: 0,
                        }}
                    >
                        {/* Foto */}
                        <div className="relative mb-6 w-40 h-44 md:w-48 md:h-52 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[#A2DBF9] transition-all duration-500 mt-2 bg-white flex items-center justify-center">
                            <Image
                                src={member.img}
                                alt={member.name}
                                fill // Membuat gambar menutupi parent div
                                className={`transition-transform duration-500 transform ${member.id === 1
                                        ? "object-contain group-hover:scale-[1.05]"
                                        : "object-cover object-top group-hover:scale-[1.05]"
                                    }`}
                                style={{ imageRendering: "auto" }}
                                priority={member.id === 1} // Optional: prioritas loading untuk gambar utama
                            />
                            {/* Overlay Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                        </div>

                        {/* Nama & Role */}
                        <h3 className="font-bold text-2xl md:text-3xl text-[#003653] mb-2 group-hover:text-[#003653]/90 transition">
                            {member.name}
                        </h3>
                        <p className="text-lg md:text-xl italic text-gray-600 mb-4">{member.role}</p>

                        {/* Social Icons */}
                        <div className="flex gap-5 mt-2 text-xl">
                            <a
                                href={member.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#A2DBF9] text-[#003653] hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href={member.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#A2DBF9] text-black hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href={member.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#A2DBF9] text-black hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Animasi Custom */}
            <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </section>
    );
}
