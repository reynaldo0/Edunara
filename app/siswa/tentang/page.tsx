import NavbarSiswa from "@/app/components/NavbarSiswa";
import Hero from "./Hero";
import VisiMisi from "./VisiMisi";
import TeamNutriverse from "./Team";
import Values from "./Values";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarSiswa />
            <Hero />
            <VisiMisi />
            <Values/>
            <TeamNutriverse />
        </main>
    );
}
