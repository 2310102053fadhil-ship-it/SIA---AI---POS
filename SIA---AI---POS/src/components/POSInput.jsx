'use client';
import React, { useState, useEffect } from 'react';

export default function POSInput() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedHorse, setSelectedHorse] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHorses() {
            try {
                const response = await fetch('/api/horses');
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Format data API tidak sesuai:", data);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Gagal mengambil data kuda dari database", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchHorses();
    }, []);

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

    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [checkoutForm, setCheckoutForm] = useState({ name: '', address: '', method: 'Transfer BSI', agree: false });

    const handleCheckout = () => {
        if (cart.length === 0) return alert('Keranjang kosong!');
        setShowCheckoutModal(true);
    };

    const processPayment = async (e) => {
        e.preventDefault();
        if (!checkoutForm.agree) return alert('Harap setujui Akad Jual Beli Syariah');

        try {
            const payload = {
                buyer: checkoutForm,
                items: [...cart],
                total: total,
                zakat: calculateZakat(total),
                grandTotal: total + calculateZakat(total),
            };

            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Transaction failed');

            const data = await response.json();

            setReceiptData({
                ...payload,
                date: new Date(data.transaction.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                transactionId: data.transaction.id
            });

            setShowCheckoutModal(false);
            setCart([]);
            setCheckoutForm({ name: '', address: '', method: 'Transfer BSI', agree: false });
        } catch (error) {
            console.error('Error:', error);
            alert('Mohon maaf, terjadi kesalahan saat memproses akad.');
        }
    };

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

                {loading ? (
                    <div className="flex justify-center items-center h-64 w-full">
                        <p className="text-xl font-bold text-slate-500 animate-pulse">Memuat Data Kuda Syariah...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p.id}
                                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98] group"
                                onClick={() => setSelectedHorse(p)}
                            >
                                <div className="h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 transition-colors overflow-hidden">
                                    {p.image ? (
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <span className="text-4xl">🐎</span>
                                    )}
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
                )}
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
                        onClick={handleCheckout}
                    >
                        BUAT DATA AKAD

                    </button>
                    <p className="text-[10px] text-center text-slate-400 italic">
                        "Setiap transaksi telah menyisihkan zakat perniagaan."
                    </p>
                </div>
            </aside >

            {/* Horse Detail Modal */}
            {
                selectedHorse && (
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
                )
            }

            {/* Checkout Form Modal */}
            {
                showCheckoutModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 my-8">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-800">Formulir Pembeli</h2>
                                        <p className="text-slate-500 text-sm italic">"Lengkapi data untuk akad jual beli"</p>
                                    </div>
                                    <button onClick={() => setShowCheckoutModal(false)} className="text-slate-300 hover:text-slate-500 text-2xl font-light">&times;</button>
                                </div>

                                <form onSubmit={processPayment} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Nama Pembeli Lengkap</label>
                                        <input
                                            type="text" required
                                            value={checkoutForm.name}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 font-semibold"
                                            placeholder="Cth: Budi Santoso"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Alamat Pengiriman/Kandang</label>
                                        <textarea required rows="3"
                                            value={checkoutForm.address}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
                                            placeholder="Alamat lengkap pengiriman kuda..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Metode Pembayaran Syariah</label>
                                        <select
                                            value={checkoutForm.method}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, method: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-semibold text-slate-700"
                                        >
                                            <option value="Transfer BSI">Bank Syariah Indonesia (BSI)</option>
                                            <option value="Transfer Muamalat">Bank Muamalat</option>
                                            <option value="Tunai/COD (Khusus Jabodetabek)">Tunai/COD (Khusus Jabodetabek)</option>
                                        </select>
                                    </div>

                                    <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-4 items-start mt-4">
                                        <input
                                            type="checkbox" required id="akad-agree"
                                            checked={checkoutForm.agree}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, agree: e.target.checked })}
                                            className="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                                        />
                                        <label htmlFor="akad-agree" className="text-sm font-medium text-emerald-900 leading-relaxed cursor-pointer">
                                            Saya bersumpah mewakili akad bahwa pembelian ini bebas riba, dilakukan dengan sadar, dan bersedia membayarkan <strong>Infaq/Zakat Jual Beli 2.5%</strong>.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all mt-6 text-lg tracking-wide"
                                    >
                                        SAHKAN TRANSAKSI
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Success Receipt Modal */}
            {
                receiptData && (
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 p-8 my-8 relative printable-area">
                            {/* Decorative top border */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-xl"></div>

                            <div className="text-center mb-6 pt-4">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold">✓</span>
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">BUKTI AKAD</h2>
                                <p className="text-slate-500 text-xs italic">"Pasar Kuda Syariah - Amanah & Terpercaya"</p>
                                <p className="text-[10px] text-slate-400 mt-2 font-mono">{receiptData.transactionId} &bull; {receiptData.date}</p>
                            </div>

                            <div className="border-t border-dashed border-slate-300 py-4 my-2 text-sm text-slate-700 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Nama Pembeli:</span>
                                    <span className="font-bold text-right">{receiptData.buyer.name}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-slate-500 mr-4">Kirim ke:</span>
                                    <span className="font-bold text-right text-xs leading-tight">{receiptData.buyer.address}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Pembayaran:</span>
                                    <span className="font-bold text-right">{receiptData.buyer.method}</span>
                                </div>
                            </div>

                            <div className="border-t border-b border-dashed border-slate-300 py-4 my-2 space-y-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Daftar Hewan</p>
                                {receiptData.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm font-semibold text-slate-800">
                                        <span>{item.name}</span>
                                        <span>{formatIDR(item.price)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="py-4 space-y-2">
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Subtotal Harga Pokok</span>
                                    <span>{formatIDR(receiptData.total)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-emerald-600">
                                    <span>Infaq/Zakat Jual Beli (2.5%)</span>
                                    <span>+ {formatIDR(receiptData.zakat)}</span>
                                </div>
                            </div>

                            <div className="border-t-4 border-slate-800 pt-4 mt-2 flex justify-between items-baseline">
                                <span className="font-black text-slate-800 uppercase">TOTAL DIBAYAR</span>
                                <span className="text-2xl font-black text-emerald-700">{formatIDR(receiptData.grandTotal)}</span>
                            </div>

                            <div className="mt-10 flex gap-4 print:hidden">
                                <button
                                    onClick={() => window.print()}
                                    className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all active:scale-[0.98]"
                                >
                                    🖨️ CETAK BUKTI
                                </button>
                                <button
                                    onClick={() => setReceiptData(null)}
                                    className="flex-1 border-2 border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
                                >
                                    SELESAI
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
