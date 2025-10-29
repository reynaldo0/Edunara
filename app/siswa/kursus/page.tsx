import HeroKursus from "./Hero";

export default function SiswaPage() {
    return (
        <main
            className="relative min-h-screen bg-fixed bg-cover bg-center"
            style={{
                backgroundImage: "url('/illustrasi/bg-siswa.png')",
            }}
        >
            <div className="absolute inset-0 bg-[#F0F9FF]/70 backdrop-blur-[1px]" />

            {/* Konten */}
            <div className="relative z-10">
                <HeroKursus />
            </div>
        </main>
    );
}
