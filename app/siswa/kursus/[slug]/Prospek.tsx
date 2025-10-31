"use client";

type Career = {
    title: string;
    description: string;
    icon: string;
};

type Props = {
    category: string;
    title: string;
    careers?: Career[];
};

export default function ProspekKarirSection({ category, title, careers }: Props) {
    if (!careers || careers.length === 0) return null;

    return (
        <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-pemilik-primary-200">
                    Prospek Karir di Bidang {category}
                </h2>
                <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
                    Setelah mengikuti kursus <strong>{title}</strong>, kamu bisa mengejar
                    berbagai peluang karir menarik di industri ini.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {careers.map((career, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center"
                    >
                        
                        <h3 className="text-lg sm:text-xl font-bold italic text-pemilik-primary-200 mb-3">
                            {career.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            {career.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
