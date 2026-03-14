'use client';
import React, { useState, useEffect } from 'react';

export default function POSInput() {
    const [selectedHorse, setSelectedHorse] = useState(null);

    const products = [
        {
            id: 1,
            name: 'Kuda Arab (Purebred)',
            price: 75000000,
            category: 'Hewan/Hobi',
            details: {
                certId: 'SY-AR-2024-001',
                vaccines: ['AIE (Jan 2024)', 'Influenza (Dec 2023)'],
                health: 'Sangat Sehat (Grade A)',
                origin: 'Arab Saudi',
                note: 'Telah diaudit kemurnian nasabnya.'
            }
        },
        {
            id: 2,
            name: 'Kuda Pony (Schooling)',
            price: 25000000,
            category: 'Hewan/Hobi',
            details: {
                certId: 'SY-PN-2024-012',
                vaccines: ['Tetanus (Feb 2024)'],
                health: 'Sehat (Grade B)',
                origin: 'Sumbawa',
                note: 'Cocok untuk latihan berkuda anak-anak Syariah.'
            }
        },
        {
            id: 3,
            name: 'Kuda Sandelwood',
            price: 45000000,
            category: 'Hewan/Hobi',
            details: {
                certId: 'SY-SW-2024-045',
                vaccines: ['Influenza (Jan 2024)', 'Rabies (Nov 2023)'],
                health: 'Sangat Sehat (Grade A)',
                origin: 'Sumba',
                note: 'Turunan unggul, lari sangat cepat dan stabil.'
            }
        },
    ];

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product) => {
        setCart([...cart, { ...product, cartId: Math.random() }]);
        setSelectedHorse(null);
    };

    const calculateZakat = (amount) => {
        return amount * 0.025; // 2.5% Zakat Maal representation
    };

    const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

    return (
        <div className="flex h-screen bg-[#f1f5f9] text-slate-800 font-sans">
            {/* Product Grid Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pasar Kuda Syariah</h1>
                        <p className="text-slate-500 text-sm italic">"Amanah dalam jual beli hewan kesayangan Rasulullah"</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-200 uppercase tracking-wider">
                            ● Audit Syariah Terjamin
                        </span>
                        <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div key={p.id}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98] group"
                            onClick={() => setSelectedHorse(p)}
                        >
                            <div className="h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 transition-colors">
                                <span className="text-4xl">🐎</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                            <p className="text-xs text-slate-500 mb-4">{p.category}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-emerald-600 font-black text-xl">{formatIDR(p.price)}</p>
                                <button className="bg-slate-100 p-2 rounded-lg text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                    Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Checkout Sidebar */}
            <aside className="w-96 bg-white border-l border-slate-200 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold">Ringkasan Transaksi</h2>
                    <div className="flex mt-2 space-x-2">
                        <span className="bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-bold">TUNAI</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold italic tracking-tight">AKAD JUAL BELI</span>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 text-slate-400 text-sm italic">Keranjang belanja kosong</div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.cartId} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div>
                                    <p className="text-sm font-semibold">{item.name}</p>
                                    <p className="text-xs text-slate-400">1 ekor &bull; {formatIDR(item.price)}</p>
                                </div>
                                <button
                                    onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))}
                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Harga Pokok</span>
                        <span className="font-semibold">{formatIDR(total)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium text-xs">
                        <span>Infaq/Zakat Jual Beli (2.5%)</span>
                        <span>+ {formatIDR(calculateZakat(total))}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-lg uppercase">Total Akad</span>
                        <span className="text-2xl font-black text-emerald-700">{formatIDR(total + calculateZakat(total))}</span>
                    </div>
                    <button
                        className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all mt-4"
                        onClick={() => alert('Alhamdulillah, Transaksi Berhasil!')}
                    >
                        KONFIRMASI AKAD
                    </button>
                    <p className="text-[10px] text-center text-slate-400 italic">
                        "Setiap transaksi telah menyisihkan zakat perniagaan."
                    </p>
                </div>
            </aside>

            {/* Horse Detail Modal */}
            {selectedHorse && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{selectedHorse.name}</h2>
                                    <p className="text-emerald-600 font-bold uppercase text-xs tracking-widest">{selectedHorse.category}</p>
                                </div>
                                <button onClick={() => setSelectedHorse(null)} className="text-slate-300 hover:text-slate-500 text-2xl font-light">&times;</button>
                            </div>

                            <div className="space-y-4">
                                <section className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">ID Sertifikat Syariah</p>
                                    <p className="font-mono text-sm font-bold text-slate-700">{selectedHorse.details.certId}</p>
                                </section>

                                <div className="grid grid-cols-2 gap-4">
                                    <section className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Status Kesehatan</p>
                                        <p className="text-sm font-bold text-emerald-600">{selectedHorse.details.health}</p>
                                    </section>
                                    <section className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Asal Hewan</p>
                                        <p className="text-sm font-bold text-slate-700">{selectedHorse.details.origin}</p>
                                    </section>
                                </div>

                                <section className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter mb-1">Riwayat Vaksinasi</p>
                                    <ul className="text-xs font-semibold text-emerald-800 space-y-1">
                                        {selectedHorse.details.vaccines.map((v, i) => (
                                            <li key={i}>✓ {v}</li>
                                        ))}
                                    </ul>
                                </section>

                                <p className="text-xs text-slate-500 italic leading-relaxed text-center py-2 px-4 italic">
                                    "{selectedHorse.details.note}"
                                </p>
                            </div>

                            <button
                                onClick={() => addToCart(selectedHorse)}
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 hover:bg-slate-800 transition-all active:scale-[0.98]"
                            >
                                TAMBAHKAN KE AKAD
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
