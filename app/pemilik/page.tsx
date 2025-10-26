import NavbarPemilik from "../components/NavbarPemilik";
import Hero from "./pelatihan/hero";
import Program from "./pelatihan/Program";
import Strategy from "./pelatihan/Strategy";



export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <Hero />
            <Program />
            <Strategy />
        </main>
    );
}
