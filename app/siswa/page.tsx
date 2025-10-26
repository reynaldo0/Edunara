
import HeroSiswa from "../components/HeroSiswa";
import NavbarSiswa from "../components/NavbarSiswa";
import Kategori from "./beranda/Kategori";
import Lokasi from "./beranda/lokasi";
import Peta from "./beranda/peta";
import Program from "./beranda/Program";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarSiswa />
            <HeroSiswa />
            <Lokasi />
            <Peta />
            <Kategori />
            <Program />
        </main>
    );
}
