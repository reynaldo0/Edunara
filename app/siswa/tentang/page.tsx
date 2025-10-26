import NavbarSiswa from "@/app/components/NavbarSiswa";
import VisiMisi from "./VisiMisi";
import TeamNutriverse from "./Team";
import Values from "./Values";
import HeroSiswa from "@/app/components/HeroSiswa";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarSiswa />
            <HeroSiswa />
            <VisiMisi />
            <Values />
            <TeamNutriverse />
        </main>
    );
}
