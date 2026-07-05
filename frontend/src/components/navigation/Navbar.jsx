import React, { useState, useEffect } from 'react';
import { mockFinanceRanges, mockAppointments, mockInterest } from '../../api/placeholderData'
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
const menuItems = [
    { title: "Fahrzeuge", items: ["Alle Fahrzeuge", "Mercedes Modelle", "Junge Sterne", "Mein CLA"] },
    { title: "Service", items: ["PKW Service", "Transporter", "LKW Service"] },
    { title: "Terminvereinbarung", items: ["Beratungstermin", "Werkstatttermin"] },
    { title: "Fahrzeugankauf", items: [] },
    { title: "Unternehmen", items: ["Über uns", "Karriere", "Ausbildung"] },
    { title: "Team Tomru", items: [] },
    { title: "Kontakt", items: ["Dorstener Straße"] },

];


// COUNT (örnek statik)



export default function Navbar() {
    const filteredCount = 18;
    const [isFinanceOpen, setIsFinanceOpen] = useState(false);
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
    const [isInterestOpen, setIsInterestOpen] = useState(false);

    // SELECTED STATES
    const [selectedFinance, setSelectedFinance] = useState(mockFinanceRanges[3]);
    const [selectedAppointment, setSelectedAppointment] = useState(mockAppointments[0]);
    const [selectedInterest, setSelectedInterest] = useState(mockInterest[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Mobilde hangi alt menünün açık olduğunu index numarasıyla tutacağız (Hiçbiri açık değilse null)
    const [activeMobileMenu, setActiveMobileMenu] = useState(null);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setActiveMobileMenu(null); // Ana menü kapanınca mobil alt menü state'ini de sıfırla
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    // Mobil tıklama logic'i
    const handleMenuClick = (index, hasSubItems) => {
        if (!hasSubItems) {
            // Alt menü yoksa doğrudan ana menüyü kapat (Link görevi görür)
            setIsMenuOpen(false);
            return;
        }

        // Alt menü varsa: Zaten açıksa kapat, kapalıysa aç
        if (activeMobileMenu === index) {
            setActiveMobileMenu(null);
        } else {
            setActiveMobileMenu(index);
        }
    };

    return (
        <>
            {/* ANA NAVBAR */}
           <div className='fixed w-full px-10 py-4 z-40 flex justify-between items-center text-white bg-navbar'>
    {/* LOGO ALANI: w-40 (yaklaşık 160px) genişlik verildi */}
    <div className='w-28 flex items-center'>
        <img 
            src="https://www.henning-automobil.de/wp-content/uploads/2023/02/LogoDachmarke_Rot-WEISS.svg" 
            alt="Logo" 
            className="w-full h-auto"
            referrerPolicy="no-referrer" 
        />
    </div>

    {/* MENÜ ALANI */}
    <div>
        <div
            onClick={() => setIsMenuOpen(true)}
            className='flex hover:cursor-pointer transition duration-300 hover:text-gray-300 justify-center gap-2 items-center'
        >
            <div>
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                    <path d="M32 2H0V0H32V2ZM32 18H10V16H32V18ZM32 9.984H6V8H32V9.984Z" fill="currentColor"></path>
                </svg>
            </div>
            <div className='text-xs tracking-widest font-light'>MENÜ</div>
        </div>
    </div>

    {/* SAĞ ALAN */}
    <div>3</div>
</div>

            {/* TAM EKRAN MENÜ KATMANI */}
            <div
                className={`fixed inset-0 z-50 bg-[#141417]/95 bg-drop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Kapatma Butonu */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-3 hover:cursor-pointer text-white hover:text-white text-sm tracking-widest transition-colors flex items-center gap-2 py-2"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Menü Linkleri */}
                <nav className="flex flex-col w-full justify-around h-full items-center gap-8 text-2xl font-extralight tracking-wide text-gray-300 overflow-y-auto pt-20 pb-10">

                    <div className='flex flex-col transition delay-150 md:flex-row items-start md:items-center justify-between w-full px-8 md:px-32 gap-6 md:gap-4'>
                        {menuItems.map((menu, index) => {
                            const hasSubItems = menu.items && menu.items.length > 0;
                            const isCurrentMenuOpen = activeMobileMenu === index;

                            return (
                                /* md:relative ekledik ki absolute olan alt menü tam bu başlığın hizasını baz alsın */
                                <div key={index} className="relative inline-block py-2 w-full md:w-auto md:relative group">

                                    {/* TETİKLEYİCİ BAŞLIK */}
                                    <div
                                        onClick={() => handleMenuClick(index, hasSubItems)}
                                        className="flex items-center justify-between md:justify-start gap-1.5 cursor-pointer text-white group-hover:text-white transition-colors duration-200"
                                    >
                                        <span className="text-sm md:text-2xl font-semibold tracking-wide uppercase">{menu.title}</span>

                                        {hasSubItems && (
                                            <svg
                                                className={`w-3 h-3 transform transition-transform duration-300 md:group-hover:rotate-180 ${isCurrentMenuOpen ? 'rotate-180' : ''
                                                    }`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </div>

                                    {hasSubItems && (
                                        /* 
                                          Mobilde (relative): Hemen altındaki içeriği aşağı iterek temizce açılır.
                                          Masaüstünde (md:absolute): Tam başlığın altında (top-full) ve ortalanmış (left-1/2 -translate-x-1/2) açılır.
                                        */
                                        <ul className={`relative md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 mt-2 min-w-[220px] z-50 text-white font-light text-sm md:text-xl bg-[#141417]/95 p-3 rounded shadow-xl border border-white/5 md:hidden md:group-hover:block ${isCurrentMenuOpen ? 'block' : 'hidden'
                                            }`}>
                                            {menu.items.map((subItem, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="py-2 px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-150 text-left md:text-center"
                                                >
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Sabit Orijinal Linkler */}
                    <div className=' hidden xl:flex px-10 w-full py-4 min-h-40  items-center justify-center gap-10 '>
                        <div className="flex-1">
                            <div className="bg-[#141417] p-5 border border-white/5">

                                <label className="text-sm text-gray-400 block mb-2">
                                    Fahrzeuge mit einer monatl. Finanzierungsrate von
                                </label>

                                {/* CURRENT */}
                                <button
                                    onClick={() => setIsFinanceOpen(!isFinanceOpen)}
                                    className="w-full flex justify-between items-center text-white py-3 border-b border-white/10"
                                >
                                    <span className="text-xl font-extralight">
                                        {selectedFinance.label}
                                    </span>

                                    <svg
                                        className={`w-4 h-4 transition-transform ${isFinanceOpen ? "" : "rotate-180"}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* OPTIONS */}
                                {isFinanceOpen && (
                                    <div className="bg-[#18181c] mt-2 border border-white/10">
                                        {mockFinanceRanges.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    setSelectedFinance(item);
                                                    setIsFinanceOpen(false);
                                                }}
                                                className="px-4 py-2 hover:bg-white/5 cursor-pointer text-sm"
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* BUTTON */}
                                <a
                                    href={`/fahrzeugboerse/#!/vehicles?financingRateMin=${selectedFinance.min}&financingRateMax=${selectedFinance.max}`}
                                    className="mt-4 flex items-center justify-between bg-[#18181c] p-3 border border-white/10 text-emerald-400"
                                >
                                    <span className="text-lg">Fahrzeuge</span>
                                    <span className="bg-emerald-500/10 px-2 py-1 text-sm">
                                        {filteredCount}
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* ===================== MODULE 2 ===================== */}
                        <div className="flex-1">
                            <div className="bg-[#141417] p-5 border border-white/5">

                                <label className="text-sm text-gray-400 block mb-2">
                                    Ich möchte einen Termin vereinbaren
                                </label>

                                {/* CURRENT */}
                                <button
                                    onClick={() => setIsAppointmentOpen(!isAppointmentOpen)}
                                    className="w-full flex justify-between items-center text-white py-3 border-b border-white/10"
                                >
                                    <span className="text-xl font-extralight">
                                        {selectedAppointment.name}
                                    </span>

                                    <svg className={`w-4 h-4 transition-transform ${isAppointmentOpen ? "" : "rotate-180"}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* OPTIONS */}
                                {isAppointmentOpen && (
                                    <div className="bg-[#18181c] mt-2 border border-white/10">
                                        {mockAppointments.map((item) => (
                                            <a
                                                key={item.id}
                                                href={item.url}
                                                className="block px-4 py-2 hover:bg-white/5 text-sm"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {/* BUTTON */}
                                <a
                                    href={selectedAppointment.url}
                                    className="mt-4 flex items-center justify-center bg-[#18181c] p-3 border border-white/10 text-white"
                                >
                                    zur Terminvergabe
                                </a>
                            </div>
                        </div>

                        {/* ===================== MODULE 3 ===================== */}
                        <div className="flex-1">
                            <div className="bg-[#141417] p-5 border border-white/5">

                                <label className="text-sm text-gray-400 block mb-2">
                                    Ich interessiere mich für den Kauf von
                                </label>

                                {/* CURRENT */}
                                <button
                                    onClick={() => setIsInterestOpen(!isInterestOpen)}
                                    className="w-full flex justify-between items-center text-white py-3 border-b border-white/10"
                                >
                                    <span className="text-xl font-extralight">
                                        {selectedInterest.name}
                                    </span>

                                    <svg className={`w-4 h-4 transition-transform ${isInterestOpen ? "" : "rotate-180"}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* OPTIONS */}
                                {isInterestOpen && (
                                    <div className="bg-[#18181c] mt-2 border border-white/10">
                                        {mockInterest.map((item) => (
                                            <a
                                                key={item.id}
                                                href={item.url}
                                                className="block px-4 py-2 hover:bg-white/5 text-sm"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {/* BUTTON */}
                                <a
                                    href={selectedInterest.url}
                                    className="mt-4 flex items-center justify-between bg-[#18181c] p-3 border border-white/10 text-white"
                                >
                                    <span>Fahrzeuge</span>
                                    <span className="text-emerald-400">137</span>
                                </a>
                            </div>
                        </div>




                    </div>
                    <div className='hidden w-full xl:flex flex-col gap-5'>
                        <div className='flex items-center justify-center'>
                            <h1>Folgen Sie uns:</h1>

                        </div>
                        <div className='flex items-center justify-center gap-10'>
                            <FaFacebookF size={36} className="text-white hover:text-red-600 hover:cursor-pointer transition-colors duration-200" /><FaInstagram size={36}className="text-white hover:text-red-600 hover:cursor-pointer transition-colors duration-200" /> <FaTiktok size={36} className="text-white hover:text-red-600 hover:cursor-pointer transition-colors duration-200" />
                        </div>

                    </div>


                </nav>
            </div>
        </>
    );
}