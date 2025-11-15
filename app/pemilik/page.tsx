
import Footer from "../components/Footer";
import HeroDefault from "../components/HeroDefault";
import NavbarPemilik from "../components/NavbarPemilik";
import About from "../siswa/beranda/About";
import Daftar from "./pelatihan/Daftar";
import Faq from "./pelatihan/Faq";
import Feature from "./pelatihan/Feature";
import Hero from "./pelatihan/Hero";
import InspirasiSection from "./pelatihan/Inspirasi";
import Panduan from "./pelatihan/Panduan";
import Strategy from "./pelatihan/Strategy";

export default function Pemilik() {
    return (
        <main className="bg-[#F0F9FF]">
            <NavbarPemilik />
            <HeroDefault />
            <Hero />
            <About />
            <Feature />
            <Daftar />
            <Strategy />
            <Panduan />
            <InspirasiSection />
            <Faq/>
            <Footer/>
        </main>
    );
}
