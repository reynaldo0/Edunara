import Navbar from "../components/Navbar";
import Hero from "./beranda/hero";
import Kategori from "./beranda/Kategori";
import Lokasi from "./beranda/lokasi";
import Peta from "./beranda/peta";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <Navbar />
            <Hero />
            <Lokasi />
            <Peta />
            <Kategori />
        </main>
    );
}
