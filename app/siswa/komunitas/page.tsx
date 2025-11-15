import Footer from "@/app/components/Footer";
import NavbarSiswa from "@/app/components/NavbarSiswa";
import Diskusi from "./Diskusi";
import ForumSection from "./Forum";
import ForumTanya from "./ForumTanya";

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
                <Diskusi />
                <ForumTanya />
                <ForumSection />
                <Footer/>
            </div>
        </main>
    );
}
