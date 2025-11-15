'use client';

import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import Image from "next/image";

interface MenuItem {
    name: string;
    path: string;
}

const NavbarPemilik: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showNavbar, setShowNavbar] = useState<boolean>(true); // kontrol navbar
    const [lastScrollY, setLastScrollY] = useState<number>(0);   // untuk deteksi arah scroll

    const menuItems: MenuItem[] = [
        { name: "Beranda", path: "/pemilik" },
        { name: "Tentang", path: "/pemilik/#tentang" },
        { name: "Daftar", path: "/pemilik/#daftar" },
        { name: "Panduan", path: "/pemilik/#panduan" },
        { name: "FAQ", path: "/pemilik/#faq" },
    ];

    // Efek scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 50) {
                // scroll ke bawah → sembunyikan navbar
                setShowNavbar(false);
            } else {
                // scroll ke atas → tampilkan navbar
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] transition-transform duration-300 ease-in-out
        ${showNavbar ? "translate-y-0" : "-translate-y-32"}`}
            data-aos="zoom-in-down"
            data-aos-duration="1500"
        >
            <div className="relative flex items-center justify-between 
          bg-white/80 backdrop-blur-lg
          rounded-2xl shadow-lg px-4 md:px-6 py-3 transition-all duration-300 border-pemilik-primary-200 border-b-30"
            >
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link href="/">
                        <Image
                            src="/illustrasi/logo.webp"
                            alt="Logo"
                            width={124}
                            height={48}
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* Menu Desktop */}
                <ul className="hidden md:flex space-x-6 text-gray-900 font-medium">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className="relative transition duration-300 hover:text-pemilik-primary-200 
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:h-0.5 after:w-0 after:bg-pemilik-primary-200 after:transition-all 
                  after:duration-300 hover:after:w-full font-bold text-primary-200"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Tombol Buat Akun Desktop */}
                <Link
                    href="/register"
                    className="hidden md:inline bg-pemilik-primary-200 hover:bg-pemilik-primary-200/90 text-white font-bold 
              px-5 py-2 rounded-full transition duration-300 shadow-md"
                >
                    Buat Akun
                </Link>

                {/* Hamburger Button (Mobile) */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden w-8 h-8 flex items-center justify-center text-gray-900 focus:outline-none"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-7 w-7 text-pemilik-primary-200 transition duration-300" />
                    ) : (
                        <Bars3Icon className="h-7 w-7 text-pemilik-primary-200 transition duration-300" />
                    )}
                </button>

                {/* PESAN MAINTENANCE */}
                <span className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 
            text-white text-xs sm:text-sm text-center whitespace-nowrap overflow-hidden overflow-ellipsis">
                    Temukan Kursus Terbaik Bersama Edunara!
                </span>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-20 right-4 w-56 bg-white/80 backdrop-blur-md 
            shadow-lg rounded-xl px-6 py-4 flex flex-col items-center space-y-4 
            transition-all duration-300 transform origin-top-right
            ${isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
            >
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className="text-gray-900 font-medium hover:text-pemilik-primary-200 transition"
                    >
                        {item.name}
                    </Link>
                ))}

                {/* Tombol Buat Akun Mobile */}
                <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="bg-pemilik-primary-200 hover:bg-pemilik-primary-200/80 text-white font-bold 
              px-5 py-2 rounded-full transition duration-300 shadow-md"
                >
                    Buat Akun
                </Link>
            </div>
        </nav>
    );
};

export default NavbarPemilik;
