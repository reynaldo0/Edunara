"use client";

import { FiArrowRight } from "react-icons/fi";

export default function InspirasiSection() {
    const stories = [
        {
            name: "Bapak Andri",
            role: "Pendiri Kursus Bahasa Inggris",
            story:
                "Berawal dari mengajar satu murid di teras rumah, kini memiliki lembaga kursus dengan lebih dari 300 siswa setiap tahun.",
        },
        {
            name: "Ibu Ratna",
            role: "Pemilik Kursus Komputer",
            story:
                "Dulu hanya lulusan SMA dengan kemampuan komputer dasar, kini berhasil membuka kursus yang membantu ratusan siswa mendapatkan pekerjaan.",
        },
        {
            name: "Pak Junaedi",
            role: "Pengajar Matematika",
            story:
                "Pernah gagal masuk perguruan tinggi, tetapi akhirnya membangun bimbel yang meluluskan banyak siswa ke universitas ternama.",
        },
    ];

    return (
        <section className="w-full py-20 bg-gradient-to-b from-[#2E6DA4] to-[#79C1FF]">
            <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Cerita Inspiratif dari Pemilik Kursus
                </h2>

                <p className="text-gray-100 max-w-2xl mx-auto mb-12">
                    Kisah nyata para pemilik kursus yang memulai dari bawah hingga mampu
                    mengembangkan lembaga pendidikan yang bermanfaat bagi banyak orang.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {stories.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            {/* Name + Role */}
                            <p className="text-[#003B5C] font-bold text-lg">{item.name}</p>
                            <p className="text-[#003B5C] text-sm opacity-80 mb-3">
                                {item.role}
                            </p>

                            {/* Story */}
                            <p className="text-[#003B5C] text-sm leading-relaxed">
                                {item.story}
                            </p>

                            {/* Arrow */}
                            <div className="flex items-center justify-end mt-4 text-[#003B5C]">
                                <FiArrowRight size={22} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
