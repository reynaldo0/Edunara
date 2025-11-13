import HeroPemilik from "../components/HeroPemilik";
import NavbarPemilik from "../components/NavbarPemilik";
import Daftar from "./pelatihan/Daftar";
import Hero from "./pelatihan/Hero";
import Panduan from "./pelatihan/Panduan";
import Program from "./pelatihan/Program";
import Strategy from "./pelatihan/Strategy";



export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <HeroPemilik />
            <Hero />
            <Daftar />
            <Program />
            <Strategy />
            <Panduan />
        </main>
    );
}
