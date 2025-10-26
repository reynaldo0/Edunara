import HeroSiswa from "@/app/components/HeroSiswa";
import NavbarSiswa from "@/app/components/NavbarSiswa";
import Jembatan from "./Jembatan";
import Diskusi from "./Diskusi";
import ForumSection from "./Forum";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarSiswa />
            <HeroSiswa />
            <Jembatan />
            <Diskusi />
            <ForumSection />
        </main>
    );
}
