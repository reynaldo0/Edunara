"use client";

import dynamic from "next/dynamic";

const MapForm = dynamic(() => import("./MapForm"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center text-[#3853A4] font-semibold">
            Memuat peta...
        </div>
    ),
});

export default function DaftarPage() {
    return <MapForm />;
}
