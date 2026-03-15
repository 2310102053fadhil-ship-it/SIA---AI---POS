'use client';
import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        compliance: false
    });

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Pendaftaran Vendor Baru</h2>
                    <p className="mt-2 text-sm text-slate-500 uppercase tracking-widest font-semibold">Grup SIA Syariah</p>
                </div>

                <form className="mt-8 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Nama Bisnis</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                placeholder="Contoh: Toko Berkah Jaya"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Nama Pemilik (Sesuai KTP)</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                placeholder="Nama Lengkap"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Alamat Email Bisnis</label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                placeholder="nama@bisnis.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-start mt-6">
                        <div className="flex items-center h-5">
                            <input
                                id="compliance"
                                type="checkbox"
                                className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-slate-300 rounded"
                                required
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="compliance" className="font-medium text-slate-700">Validasi Kepatuhan Syariah</label>
                            <p className="text-slate-500 text-xs mt-1">Saya menyatakan bahwa bisnis saya tidak menjual barang haram (khamr, babi, judi, dsb) dan berkomitmen pada perdagangan yang adil.</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all active:scale-95"
                    >
                        DAFTAR SEKARANG
                    </button>
                </form>
            </div>
        </div>
    );
}
