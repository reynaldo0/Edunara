
import HeroDefault from "../components/HeroDefault";
import NavbarPemilik from "../components/NavbarPemilik";
import About from "../siswa/beranda/About";
import Daftar from "./pelatihan/Daftar";
import Feature from "./pelatihan/Feature";
import Hero from "./pelatihan/Hero";
import Panduan from "./pelatihan/Panduan";
import Program from "./pelatihan/Program";
import Strategy from "./pelatihan/Strategy";



export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <HeroDefault />
            <Hero />
            <About />
            <Feature />
            <Daftar />
            <Strategy />
            <Panduan />
        </main>
    );
}
