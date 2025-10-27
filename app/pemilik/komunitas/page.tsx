import HeroPemilik from "@/app/components/HeroPemilik";
import NavbarPemilik from "@/app/components/NavbarPemilik";
import Diskusi from "./Diskusi";
import ForumSection from "./Forum";
import ForumTanya from "./ForumTanya";
import Jembatan from "./Jembatan";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <HeroPemilik />
            <Jembatan />
            <Diskusi />
            <ForumTanya />
            <ForumSection />
        </main>
    );
}
