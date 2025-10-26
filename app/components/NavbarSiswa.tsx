'use client';

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';

interface MenuItem {
    name: string;
    path: string;
}

const NavbarSiswa: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuItems: MenuItem[] = [
        { name: "Beranda", path: "/siswa" },
        { name: "Tentang", path: "/siswa/tentang" },
        { name: "Komunitas", path: "/siswa/komunitas" },
    ];

    return (
        <nav
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%]"
            data-aos="zoom-in-down"
            data-aos-duration="1500"
        >
            <div
                className="flex items-center justify-between 
        bg-white/80 backdrop-blur-lg
        rounded-2xl shadow-lg px-6 py-3 transition-all duration-300 border-siswa-primary-100 border-b-[20px]"
            >
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="font-extrabold text-primary-200 drop-shadow-sm">
                        GrowLab
                    </span>
                </div>

                {/* Menu Desktop */}
                <ul className="hidden md:flex space-x-6 text-gray-900 font-medium">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className="relative transition duration-300 hover:text-siswa-primary-100 
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:h-[2px] after:w-0 after:bg-siswa-primary-100 after:transition-all 
                  after:duration-300 hover:after:w-full font-bold text-primary-200"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link
                    href="http://127.0.0.1:8000/admin/contents"
                    className="hidden md:inline bg-[#A2DBF9] hover:bg-[#A2DBF9]/90 text-black hover:text-white font-bold 
            px-5 py-2 rounded-full transition duration-300 shadow-md"
                >
                    Buat Akun
                </Link>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden w-8 h-8 flex items-center justify-center text-gray-900 focus:outline-none"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-7 w-7 text-siswa-primary-100 transition duration-300" />
                    ) : (
                        <Bars3Icon className="h-7 w-7 text-siswa-primary-100 transition duration-300" />
                    )}
                </button>
            </div>

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
                        className="text-gray-900 font-medium hover:text-siswa-primary-100 transition"
                    >
                        {item.name}
                    </Link>
                ))}

                {/* Tombol Dashboard (Mobile) */}
                <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#594537] hover:bg-[#6e3717] text-white font-bold 
            px-5 py-2 rounded-full transition duration-300 shadow-md"
                >
                    Buat Akun
                </Link>
            </div>
        </nav>
    );
};

export default NavbarSiswa;
