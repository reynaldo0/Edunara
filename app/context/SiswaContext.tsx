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
};

const SiswaContext = createContext<SiswaContextType | undefined>(undefined);

export const SiswaProvider = ({ children }: { children: React.ReactNode }) => {
    const [siswa, setSiswa] = useState<SiswaData>({
        nama: "",
        lokasi: "",
        peta: "",
        kategori: "",
    });

    return (
        <SiswaContext.Provider value={{ siswa, setSiswa }}>
            {children}
        </SiswaContext.Provider>
    );
};

export const useSiswa = () => {
    const context = useContext(SiswaContext);
    if (!context) throw new Error("useSiswa harus digunakan di dalam SiswaProvider");
    return context;
};
