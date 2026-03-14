'use client';
import React, { useState, useEffect } from 'react';

export default function POSInput() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const products = [
        { id: 1, name: 'Kurma Ajwa 500g', price: 125000, category: 'Makanan' },
        { id: 2, name: 'Madu Murni 1kg', price: 210000, category: 'Minuman' },
        { id: 3, name: 'Habbatussauda Caps', price: 85000, category: 'Suplemen' },
        { id: 4, name: 'Air Zam-Zam 1L', price: 45000, category: 'Minuman' },
    ];

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product) => {
        setCart([...cart, { ...product, cartId: Math.random() }]);
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
                        <h1 className="text-2xl font-bold text-slate-900">Kasir Syariah</h1>
                        <p className="text-slate-500 text-sm">Cabang: Jakarta Pusat - Shiddiq</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                            ● AUDIT SYARIAH OK
                        </span>
                        <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div key={p.id}
                            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
                            onClick={() => addToCart(p)}
                        >
                            <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400">
                                Gambar {p.name}
                            </div>
                            <h3 className="font-bold text-slate-800">{p.name}</h3>
                            <p className="text-xs text-slate-500 mb-2">{p.category}</p>
                            <p className="text-emerald-600 font-bold">{formatIDR(p.price)}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Checkout Sidebar */}
            <aside className="w-96 bg-white border-l border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold">Ringkasan Transaksi</h2>
                    <div className="flex mt-2 space-x-2">
                        <span className="bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-bold">DEBIT</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold">KREDIT (Bebas Riba)</span>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 text-slate-400 text-sm italic">Keranjang belanja kosong</div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.cartId} className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold">{item.name}</p>
                                    <p className="text-xs text-slate-400">1 x {formatIDR(item.price)}</p>
                                </div>
                                <button
                                    onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))}
                                    className="text-slate-300 hover:text-red-500"
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatIDR(total)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium text-xs">
                        <span>Est. Infaq/Zakat (2.5%)</span>
                        <span>+ {formatIDR(calculateZakat(total))}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                        <span className="font-bold">Total Akhir</span>
                        <span className="text-2xl font-black text-slate-900">{formatIDR(total + calculateZakat(total))}</span>
                    </div>
                    <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all">
                        BAYAR (Alhamdulillah)
                    </button>
                </div>
            </aside>
        </div>
    );
}
