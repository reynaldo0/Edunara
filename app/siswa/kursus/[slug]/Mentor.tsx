"use client";

import Image from "next/image";

type Mentor = {
    name: string;
    position: string;
    photo: string;
};

type MentorSectionProps = {
    logo?: string;
    mentor?: Mentor;
    title: string;
};

export default function MentorSection({ logo, mentor, title }: MentorSectionProps) {
    if (!mentor) return null;

    return (
        <section className="py-14 px-6 flex flex-col items-center text-center rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-pemilik-primary-200">
                Kursus {title}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-20 p-10 rounded-3xl max-w-6xl w-full">
                {logo && (
                    <div className="shrink-0 flex justify-center md:justify-end w-full md:w-1/2">
                        <Image
                            src={logo}
                            alt="Logo Kursus"
                            width={400}
                            height={120}
                            className="object-contain"
                        />
                    </div>
                )}

                {/* ✅ Mentor */}
                <div className="flex flex-col items-center bg-white rounded-4xl shadow-2xl p-5">
                    <Image
                        src={mentor.photo}
                        alt={mentor.name}
                        width={320}
                        height={260}
                        className="rounded-2xl object-cover shadow-md"
                    />
                    <p className="mt-4 text-lg md:text-xl font-semibold text-[#0b2d45]">
                        {mentor.name}
                    </p>
                    <p className="text-sm text-gray-500">{mentor.position}</p>
                </div>
            </div>
        </section>
    );
}
