import Navbar from "../components/Navbar";
import Hero from "./beranda/hero";
import Lokasi from "./beranda/lokasi";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <Navbar />
            <Hero />
            <Lokasi />
        </main>
    );
}
