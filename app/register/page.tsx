"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] relative overflow-hidden">
            {/* Tombol Kembali */}
            <Link href="/" className="absolute top-6 left-6 bg-[#FFBF55] shadow-md px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#FFBF55]/80 transition-colors z-20">
                Kembali
            </Link>

            <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-6xl w-full z-10">
                <div className="md:w-1/2 flex justify-center items-center">
                    <Image
                        src="/illustrasi/login.png"
                        alt="Illustration"
                        width={400}
                        height={400}
                        className="object-contain"
                    />
                </div>

                <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10 flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-[#003366] text-center md:text-left">
                        Masuk ke Dashboard
                    </h1>

                    <form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                Nama
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Masukan Nama"
                                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Masukan Email"
                                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Masukan Password"
                                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Masukan Konfirmasi Password"
                                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="w-4 h-4" />
                            <label htmlFor="remember" className="text-sm text-gray-600">
                                Ingat saya
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 bg-siswa-primary-100 text-white py-2 rounded-lg hover:bg-siswa-primary-100/80 transition-colors"
                        >
                            Masuk
                        </button>
                    </form>

                    <div className="text-sm text-gray-600 mt-4 flex flex-col gap-1">
                        <p>
                            Sudah punya akun ?{" "}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden">
                <Image
                    src="/illustrasi/wave.png"
                    alt="Background bottom"
                    fill
                    className="object-cover object-bottom"
                    priority
                />
            </div>
        </div>
    );
};

export default Register;
