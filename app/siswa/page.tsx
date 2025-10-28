import HeroSiswa from "../components/HeroSiswa";
import NavbarSiswa from "../components/NavbarSiswa";
import Faq from "./beranda/Faq";
import Kategori from "./beranda/Kategori";
import Lokasi from "./beranda/lokasi";
import Peta from "./beranda/peta";
import Program from "./beranda/Program";

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
                <NavbarSiswa />
                <HeroSiswa />
                <Lokasi />
                <Peta />
                <Kategori />
                <Program />
                <Faq />
            </div>
        </main>
    );
}
