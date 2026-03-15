'use client';
import React from 'react';

export default function Login() {
    return (
        <div className="min-height-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-emerald-50">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">SIA POS SYARIAH</h2>
                    <p className="mt-2 text-sm text-slate-600 italic">"Memulai dengan Bismillah, Menjaga Amanah dalam Setiap Transaksi"</p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="Alamat Email"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="Kata Sandi"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                Ingat saya
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                                Lupa kata sandi?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-md active:scale-[0.98]"
                        >
                            MASUK (Bismillah)
                        </button>
                    </div>
                </form>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-xs text-emerald-800 text-center leading-relaxed">
                        <strong>Pengingat Amanah:</strong> "Wahai orang-orang yang beriman, penuhilah janji-janji." (QS. Al-Ma'idah: 1). Pastikan setiap log masuk diniatkan untuk ibadah.
                    </p>
                </div>
            </div>
        </div>
    );
}
