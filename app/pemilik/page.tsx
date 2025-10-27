import HeroPemilik from "../components/HeroPemilik";
import NavbarPemilik from "../components/NavbarPemilik";
import Panduan from "./pelatihan/Panduan";
import Program from "./pelatihan/Program";
import Strategy from "./pelatihan/Strategy";



export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <HeroPemilik />
            <Program />
            <Strategy />
            <Panduan />
        </main>
    );
}
