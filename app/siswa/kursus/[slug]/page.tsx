"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MentorSection from "./Mentor";
import HeroDetailKursus from "./Hero";
import DeskripsiKursusSection from "./Deskripsi";
import TestimonialsSection from "./Testimonials";
import ProspekKarirSection from "./Prospek";
import DaftarKursusSection from "./Daftar";
import PertanyaanSection from "./Pertaanyaan";
import NavbarSiswa from "@/app/components/NavbarSiswa";

type Mentor = {
    name: string;
    position: string;
    photo: string;
};

type Testimonial = {
    name: string;
    role: string;
    message: string;
    image: string;
};

type Career = {
    title: string;
    description: string;
    icon: string;
};

type Course = {
    id: number;
    category: string;
    title: string;
    description: string;
    rating: number;
    location: string;
    image: string;
    logo?: string;
    mentor?: Mentor;
    details?: string[];
    testimonials?: Testimonial[];
    careers?: Career[];
    whatsapp?: string;
    website?: string;
};

export default function DetailKursusPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data: Course[]) => {
                const found = data.find((item) => item.id === Number(id));
                setCourse(found || null);
            })
            .catch((err) => console.error("Gagal memuat detail:", err));
    }, [id]);

    // Langsung render meskipun data belum ada
    return (
        <section
            className="relative min-h-screen bg-fixed bg-cover bg-center"
            style={{
                backgroundImage: "url('/illustrasi/bg-siswa.png')",
            }}
        >
            <div className="absolute inset-0 bg-[#F0F9FF]/70 backdrop-blur-[1px]" />

            <div className="relative z-10">
                <NavbarSiswa />
                <HeroDetailKursus />

                {course && (
                    <>
                        <DeskripsiKursusSection
                            title={course.title}
                            image={course.image}
                            details={course.details ?? []} // default ke array kosong
                        />
                        <TestimonialsSection testimonials={course.testimonials ?? []} />
                        <ProspekKarirSection
                            category={course.category}
                            title={course.title}
                            careers={course.careers ?? []}
                        />
                        <DaftarKursusSection
                            title={course.title}
                            image={course.image}
                            whatsapp={course.whatsapp || "6280000000000"}
                        />
                        <PertanyaanSection courseId={course.id.toString()} />
                    </>
                )}
            </div>
        </section>
    );
}
