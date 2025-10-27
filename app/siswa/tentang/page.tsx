import NavbarSiswa from "@/app/components/NavbarSiswa";
import VisiMisi from "./VisiMisi";
import Values from "./Values";
import HeroSiswa from "@/app/components/HeroSiswa";
import Team from "./Team";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarSiswa />
            <HeroSiswa />
            <VisiMisi />
            <Values />
            <Team />
        </main>
    );
}
