
import NavbarSiswa from "../components/NavbarSiswa";
import Hero from "./beranda/hero";
import Kategori from "./beranda/Kategori";
import Lokasi from "./beranda/lokasi";
import Peta from "./beranda/peta";
import Program from "./beranda/Program";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarSiswa />
            <Hero />
            <Lokasi />
            <Peta />
            <Kategori />
            <Program />
        </main>
    );
}
