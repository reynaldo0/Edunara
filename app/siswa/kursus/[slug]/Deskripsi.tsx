import Image from "next/image";

type DeskripsiKursusSectionProps = {
    title: string;
    details: string[];
    image: string; // tambahkan ini
};

export default function DeskripsiKursusSection({
    title,
    details,
    image,
}: DeskripsiKursusSectionProps) {
    return (
        <section className="bg-siswa-primary-200 mt-16 rounded-[100px] flex flex-col md:flex-row items-center md:items-start justify-between px-6 md:px-14 py-12 md:py-16 max-w-6xl mx-auto shadow-sm">
            {/* Gambar kiri */}
            <div className="flex justify-center md:justify-start md:w-1/2 mb-8 md:mb-0">
                <Image
                    src={image} // gunakan prop image
                    alt={title}
                    width={420}
                    height={320}
                    className="w-[280px] md:w-[380px] object-contain"
                    loading="lazy"
                />
            </div>

            {/* Teks kanan */}
            <div className="md:w-1/2 text-pemilik-primary-200">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                    Pembelajaran Yang Mudah Dengan {title}
                </h2>
                <ul className="list-disc list-inside text-pemilik-primary-200 text-base md:text-xl space-y-3 leading-relaxed font-medium">
                    {details.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
