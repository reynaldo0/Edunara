import NavbarPemilik from "@/app/components/NavbarPemilik";
import Hero from "../pelatihan/hero";
import Profesional from "./Profesional";
import Cerita from "./Cerita";



export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <Hero />
            <Profesional />
            <Cerita />
        </main>
    );
}
