import React from "react";

const Values: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center py-24 px-6 space-y-16">
            {/* Inovasi */}
            <div className="bg-siswa-primary-200 rounded-3xl p-12 text-center max-w-4xl shadow-xl transition-transform duration-300">
                <div className="rounded-3xl p-12 bg-white text-center max-w-2xl shadow-xl transition-transform duration-300 hover:scale-105 my-5">
                    <h2 className="text-4xl font-extrabold text-[#003B5C] mb-6">Inovasi</h2>
                    <p className="text-[#003B5C] text-lg md:text-xl leading-relaxed font-medium">
                        Menjadi jembatan digital bagi pelaku UMKM di Indonesia untuk belajar
                        dan berkolaborasi
                    </p>
                </div>

                {/* Keberlanjutan */}
                <div className="rounded-3xl p-12 bg-white text-center max-w-2xl shadow-xl transition-transform duration-300 hover:scale-105">
                    <h2 className="text-4xl font-extrabold text-[#003B5C] mb-6">Keberlanjutan</h2>
                    <p className="text-[#003B5C] text-lg md:text-xl leading-relaxed font-medium">
                        Menjadi jembatan digital bagi pelaku UMKM di Indonesia untuk belajar
                        dan berkolaborasi
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Values;
