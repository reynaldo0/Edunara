"use client";
import Image from "next/image";

export default function About() {
    return (
        <section className="bg-linear-to-b from-[#1DA1F2]/70 to-siswa-primary-200 relative pb-10" id="tentang">
            <div className="px-6 text-center">
                {/* Judul */}
                <h2 className="text-3xl md:text-5xl font-bold text-pemilik-primary-200 mb-10 py-20 md:mb-20">
                    Kami Membawa Ide Menjadi Nyata
                </h2>

                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 md:gap-36">
                    {/* Kolom kiri */}
                    <div className="flex flex-col gap-6 w-full max-w-sm">
                        {/* Visi */}
                        <div className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Visi</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Menjadi platform digital terdepan yang menghubungkan siswa di
                                seluruh Indonesia dengan lembaga kursus terbaik, untuk
                                menciptakan generasi yang berdaya saing dan berkompetensi global.
                            </p>
                        </div>

                        {/* Inovasi */}
                        <div className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Inovasi
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Menghadirkan solusi teknologi yang memudahkan siswa menemukan,
                                membandingkan, dan mengakses berbagai program pelatihan dengan
                                cepat, mudah, dan terpercaya.
                            </p>
                        </div>

                        {/* Keberlanjutan */}
                        <div className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Keberlanjutan
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Membangun ekosistem pembelajaran yang inklusif dan berkelanjutan,
                                dengan berfokus pada pengembangan potensi siswa serta kemitraan
                                strategis dengan berbagai penyedia kursus di Indonesia.
                            </p>
                        </div>
                    </div>

                    {/* Kolom kanan - Misi */}
                    <div className="gap-10">
                        <Image
                            src="/illustrasi/logow.webp"
                            alt="Logo Edunara"
                            width={420}
                            height={220}
                            className="object-contain mb-6"
                            priority
                        />
                        <div className="bg-white shadow-md p-6 w-full max-w-md text-left rounded-lg hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Misi</h3>
                            <ul className="list-decimal list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
                                <li>
                                    Menyediakan platform terintegrasi bagi siswa untuk mencari
                                    kursus sesuai minat, lokasi, dan kebutuhan mereka.
                                </li>
                                <li>
                                    Menyajikan informasi dan rekomendasi kursus yang relevan,
                                    kredibel, dan mudah dipahami.
                                </li>
                                <li>
                                    Meningkatkan visibilitas lembaga kursus melalui sistem
                                    digitalisasi yang efisien dan transparan.
                                </li>
                                <li>
                                    Membangun komunitas pembelajar aktif sebagai wadah berbagi
                                    pengalaman dan pengetahuan.
                                </li>
                                <li>
                                    Mendukung pengembangan karier siswa melalui akses informasi
                                    edukatif dan bimbingan yang berkelanjutan.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
