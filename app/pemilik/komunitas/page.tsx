import NavbarPemilik from "@/app/components/NavbarPemilik";
import Diskusi from "./Diskusi";
import ForumSection from "./Forum";
import ForumTanya from "./ForumTanya";

export default function SiswaPage() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <Diskusi />
            <ForumTanya />
            <ForumSection />
        </main>
    );
}
