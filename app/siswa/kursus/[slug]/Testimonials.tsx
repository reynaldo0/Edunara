"use client";

import Image from "next/image";

type Testimonial = {
    name: string;
    role: string;
    message: string;
    image: string;
};

type TestimonialsSectionProps = {
    testimonials?: Testimonial[];
};

export default function TestimonialsSection({
    testimonials = [],
}: TestimonialsSectionProps) {
    if (testimonials.length === 0) return null;

    return (
        <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 text-center mt-16">
            {/* Judul */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-pemilik-primary-200 mb-12">
                Apa kata mereka
            </h2>

            {/* Kontainer dua kartu */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 max-w-6xl mx-auto">
                {testimonials.slice(0, 2).map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center p-6 sm:p-8 w-full md:w-1/2"
                    >
                        {/* Gambar */}
                        <div className="rounded-2xl overflow-hidden w-full h-64 md:h-60 mb-6">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Nama & Jabatan */}
                        <h3 className="text-lg sm:text-xl font-bold text-pemilik-primary-200">
                            {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {item.role}
                        </p>

                        {/* Pesan */}
                        <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed mt-3 max-w-md mx-auto">
                            “{item.message}”
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
