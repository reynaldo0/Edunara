import HeroPemilik from "@/app/components/HeroPemilik";
import NavbarPemilik from "@/app/components/NavbarPemilik";
import Team from "./Team";
import Values from "./Values";
import VisiMisi from "./VisiMisi";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <HeroPemilik />
            <VisiMisi />
            <Values />
            <Team />
        </main>
    );
}
