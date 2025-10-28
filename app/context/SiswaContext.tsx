"use client";

import React, { createContext, useContext, useState } from "react";

type SiswaData = {
    nama?: string;
    lokasi?: string;
    peta?: string; // path gambar peta
    kategori?: string;
};

type SiswaContextType = {
    siswa: SiswaData;
    setSiswa: React.Dispatch<React.SetStateAction<SiswaData>>;
    searchTerm: string; // 🔍 Tambahan untuk pencarian
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // 🔍 Setter-nya
};

const SiswaContext = createContext<SiswaContextType | undefined>(undefined);

export const SiswaProvider = ({ children }: { children: React.ReactNode }) => {
    const [siswa, setSiswa] = useState<SiswaData>({
        nama: "",
        lokasi: "",
        peta: "",
        kategori: "",
    });

    // 🔍 State baru untuk pencarian
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SiswaContext.Provider value={{ siswa, setSiswa, searchTerm, setSearchTerm }}>
            {children}
        </SiswaContext.Provider>
    );
};

export const useSiswa = () => {
    const context = useContext(SiswaContext);
    if (!context) throw new Error("useSiswa harus digunakan di dalam SiswaProvider");
    return context;
};
