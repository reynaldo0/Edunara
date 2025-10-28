import NavbarSiswa from "@/app/components/NavbarSiswa";
import VisiMisi from "./VisiMisi";
import Values from "./Values";
import HeroSiswa from "@/app/components/HeroSiswa";
import Team from "./Team";

export default function SiswaPage() {
    return (
        <main
            className="relative min-h-screen bg-fixed bg-cover bg-center"
            style={{
                backgroundImage: "url('/illustrasi/bg-siswa.png')",
            }}
        >
            <div className="absolute inset-0 bg-[#F0F9FF]/70 backdrop-blur-[1px]" />
            <div className="relative z-10">
                <NavbarSiswa />
                <HeroSiswa />
                <VisiMisi />
                <Values />
                <Team />
            </div>
        </main>
    );
}
