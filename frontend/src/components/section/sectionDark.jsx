import React from 'react'
import { GiMechanicGarage } from "react-icons/gi";
import { FaAward, FaWrench, FaShieldAlt, FaCogs, FaClock, FaCarCrash, FaTruckPickup } from "react-icons/fa";

function SectionDark() {
    const services = [
        { id: 1, name: 'Werkstatt-Service', icon: <GiMechanicGarage size={64} /> },
        { id: 2, name: 'Garantie und Kulanz', icon: <FaAward size={64} /> },
        { id: 3, name: 'Reifendienst', icon: <FaWrench size={64} /> },
        { id: 4, name: 'HU und AU', icon: <FaShieldAlt size={64} /> },
        { id: 5, name: 'Teile Sortiment', icon: <FaCogs size={64} /> },
        { id: 6, name: 'Express Service', icon: <FaClock size={64} /> },
        { id: 7, name: 'Pannen-Service', icon: <FaCarCrash size={64} /> },
        { id: 8, name: 'Fahrzeug Hol- und Bring-Service', icon: <FaTruckPickup size={64} /> },
    ];

    return (
        <div className='w-full bg-[#1a1a1e] text-white font-light flex flex-col overflow-hidden'>
            
            {/* ==================== BÖLÜM 1: İKONLAR & HİZMET DETAYI ==================== */}
            <div className='flex flex-col-reverse xl:flex-row min-h-screen w-full'>
                
                {/* SOL TARAF: İkon Grid Alanı */}
                <div className='w-full xl:w-1/2 min-h-screen xl:min-h-screen px-6 py-12 xl:px-26 xl:py-24 flex items-center justify-center'>
                    <div className='grid grid-cols-2 gap-x-12 gap-y-16 w-full max-w-2xl'>
                        {services.map((service) => (
                            <div 
                                key={service.id} 
                                className='group flex flex-col items-center justify-center text-center cursor-pointer pb-6 relative'
                            >
                                <div className='text-gray-400 group-hover:text-red-600 transition-colors duration-300 mb-4'>
                                    {service.icon}
                                </div>
                                <h1 className='text-lg xl:text-xl font-light text-gray-400 group-hover:text-white transition-colors duration-300 mb-4 h-12 flex items-center justify-center'>
                                    {service.name}
                                </h1>
                                <div className='absolute bottom-0 w-full h-[1px] bg-zinc-800 group-hover:bg-red-600 transition-colors duration-300'></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SAĞ TARAF: Detay ve Arka Plan Görsel Alanı */}
                <div className='w-full xl:w-1/2 aspect-[4/3] xl:aspect-auto xl:min-h-screen relative flex flex-col justify-center px-12 xl:px-26 py-16 xl:py-24 bg-cover bg-center' 
                     style={{ 
                         backgroundImage: `linear-gradient(to bottom, rgba(26,26,30,0.6) 0%, #1a1a1e 100%), 
                                           linear-gradient(to right, #1a1a1e 0%, rgba(26,26,30,0.85) 40%, rgba(26,26,30,0.7) 100%), 
                                           url('https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1000')`,
                         backgroundBlendMode: 'multiply'
                     }}>
                    
                    <div className='max-w-2xl z-10'>
                        <h2 className='text-xl xl:text-4xl tracking-wide font-light mb-4 xl:mb-6 text-gray-200'>Einfach eine saubere Sache.</h2>
                        <p className='text-base xl:text-xl font-light italic leading-relaxed text-gray-400 mb-6 xl:mb-8'>
                            Sparen Sie sich weite Wege. Denn in unserem Hause können Sie Ihr Fahrzeug auch für Haupt- und Abgasuntersuchung anmelden. Wie bieten Ihnen tägliche Prüftermine durch die Dekra, dazu zusätzlich variable Termine nach Absprache.
                        </p>
                        <a href="#termin" className='group flex items-center gap-2 xl:gap-3 text-xs xl:text-sm tracking-widest uppercase text-gray-300 hover:text-white font-medium transition-colors duration-300'>
                            Termin Vereinbaren 
                            <span className='transform group-hover:translate-x-2 transition-transform duration-300'>&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ==================== BÖLÜM 2: WIR KAUFEN IHREN STERN (Fotoğraf Solda) ==================== */}
            {/* DEĞİŞİKLİK: Genişliği artırmak için px-6 xl:px-26 yaptık ve max-w sınırlarını büyüttük */}
            <div className='flex flex-col xl:flex-row w-full items-center justify-center min-h-[50vh] py-24 px-6 xl:px-26 gap-12 xl:gap-20 max-w-[1920px] mx-auto'>
                {/* Sol Taraf: Fotoğraf */}
                <div className='w-full xl:w-1/2 flex justify-center xl:justify-start'>
                    <img 
                        src="https://www.henning-automobil.de/wp-content/uploads/2023/01/wir-kaufen-deinen-stern_startseite-full.webp" 
                        className='w-full h-auto object-cover shadow-2xl rounded-sm' 
                        alt="Mercedes GLK" 
                    />
                </div>
                
                {/* Sağ Taraf: Yazı İçeriği */}
                <div className='w-full xl:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl xl:text-5xl tracking-wide uppercase mb-6 text-gray-200 font-normal'>
                        Wir kaufen Ihren Stern.
                    </h2>
                    <p className='text-base xl:text-xl leading-relaxed text-gray-400 mb-8 font-light max-w-3xl'>
                        Wenn Sie sich für ein vehicle aus unserem Angebot interessieren, machen wir Ihnen die Entscheidung leicht. Wir nehmen Ihr altes Fahrzeug zu einem fairen Preis in Zahlung. Gerne machen wir ein unverbindliches Angebot.
                    </p>
                    <a href="#ankauf" className='group flex items-center gap-3 text-sm xl:text-xl tracking-widest uppercase text-gray-300 hover:text-red-700 transition-colors duration-300 w-fit'>
                        zur Ankauf-Website
                        <span className='transform group-hover:translate-x-2 transition-transform duration-300'>&rarr;</span>
                    </a>
                </div>
            </div>

            {/* ==================== BÖLÜM 3: WIR SUCHEN SIE (Fotoğraf Sağda) ==================== */}
            {/* DEĞİŞİKLİK: Yanal boşluklar xl:px-26 olarak açıldı */}
            <div className='flex flex-col xl:flex-row-reverse w-full items-center justify-center min-h-[50vh] pb-24 xl:py-24 px-6 xl:px-26 gap-12 xl:gap-20 max-w-[1920px] mx-auto'>
                {/* Sağ Taraf: Fotoğraf */}
                <div className='w-full xl:w-1/2 flex justify-center xl:justify-end'>
                    <img 
                        src="https://www.henning-automobil.de/wp-content/uploads/2023/01/wir-suchen-sie_startseite-full.webp" 
                        className='w-full h-auto object-cover shadow-2xl rounded-sm' 
                        alt="We want you" 
                    />
                </div>
                
                {/* Sol Taraf: Yazı İçeriği */}
                <div className='w-full xl:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl xl:text-5xl tracking-wide uppercase mb-6 text-gray-200 font-normal'>
                        Wir suchen Sie.
                    </h2>
                    <p className='text-base xl:text-xl leading-relaxed text-gray-400 mb-8 font-light max-w-3xl'>
                        Wenn Sie der Meinung sind, dass Sie die Qualitäten haben, unser Haus zu unterstützen, möchten wir Sie gerne kennenlernen. Bereichern Sie unser engagiertes und freundliches Team mit Ihren Kompetenzen.
                    </p>
                    
                    {/* Çoklu Ok İşaretli Link Butonları */}
                    <div className='flex flex-col gap-4'>
                        <a href="#jobs-mercedes" className='group flex items-center gap-3 text-sm xl:text-xl tracking-widest uppercase text-gray-300 hover:text-red-700 transition-colors duration-300 w-fit'>
                            Jobs Mercedes Benz
                            <span className='transform group-hover:translate-x-2 transition-transform xl:text-xl  duration-300'>&rarr;</span>
                        </a>
                        <a href="#jobs-ford" className='group flex items-center gap-3 xl:text-xl  text-sm tracking-widest uppercase text-gray-300 hover:text-red-700 transition-colors duration-300 w-fit'>
                            Jobs Ford
                            <span className='transform group-hover:translate-x-2 transition-transform duration-300'>&rarr;</span>
                        </a>
                        <a href="#ausbildung" className='group flex xl:text-xl  items-center gap-3 text-sm tracking-widest uppercase text-gray-300 hover:text-red-700 transition-colors duration-300 w-fit'>
                            Ausbildung
                            <span className='transform group-hover:translate-x-2 transition-transform duration-300'>&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SectionDark