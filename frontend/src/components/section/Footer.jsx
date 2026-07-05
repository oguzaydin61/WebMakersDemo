import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'

function Footer() {
  // SVG URL'lerini buraya topladım, temiz dursun diye
  const logos = {
    mercedes: "https://www.henning-automobil.de/wp-content/uploads/2022/11/mercedes-light.svg",
    amg: "https://www.henning-automobil.de/wp-content/uploads/2022/11/amg-light.svg",
    eq: "https://www.henning-automobil.de/wp-content/uploads/2022/11/eq-light.svg",
    smart: "https://www.henning-automobil.de/wp-content/uploads/2022/11/smart-light.svg"
  };

  return (
    <footer className='w-full bg-[#141416] text-gray-400 font-light pt-20 pb-12 px-6 xl:px-26 border-t border-zinc-800'>
      <div className='max-w-[1920px] mx-auto flex flex-col gap-16'>
        
        {/* ==================== ÜST KISIM: LİSTE SÜTUNLARI ==================== */}
        <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 w-full'>
          
          {/* 1. Sütun: Fahrzeuge & Unternehmen */}
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-white text-2xl tracking-wide font-normal'>Fahrzeuge</h3>
              <ul className='flex flex-col gap-2 text-lg'>
                <li><a href="#alle" className='hover:text-white transition-colors'>Alle Fahrzeuge</a></li>
                <li className='flex items-center gap-2'>
                  <a href="#mercedes" className='hover:text-white transition-colors'>Mercedes Modelle</a>
                  <img src={logos.mercedes} alt="Mercedes" className='w-3.5 h-3.5 invert' />
                </li>
              </ul>
            </div>
            
            <div className='flex flex-col gap-4'>
              <h3 className='text-white text-2xl tracking-wide font-normal'>Unternehmen</h3>
              <ul className='flex flex-col gap-2 text-lg'>
                <li><a href="#uns" className='hover:text-white transition-colors'>Über uns</a></li>
                <li><a href="#historie" className='hover:text-white transition-colors'>Historie</a></li>
                <li><a href="#karriere" className='hover:text-white transition-colors'>Karriere</a></li>
                <li><a href="#ausbildung" className='hover:text-white transition-colors'>Ausbildung</a></li>
              </ul>
            </div>
          </div>

          {/* 2. Sütun: Service & Kontakt */}
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-white text-2xl tracking-wide font-normal'>Service</h3>
              <ul className='flex flex-col gap-2 text-lg'>
                <li className='flex items-center gap-2 flex-wrap'>
                  <a href="#pkw" className='hover:text-white transition-colors'>PKW Service</a>
                  <img src={logos.mercedes} alt="Mercedes" className='w-3.5 h-3.5 invert' />
                  <img src={logos.amg} alt="AMG" className='h-2.5 opacity-80' />
                  <img src={logos.eq} alt="EQ" className='h-2.5 opacity-80' />
                  <img src={logos.smart} alt="Smart" className='h-2.5 opacity-80' />
                </li>
                <li className='flex items-center gap-2'>
                  <a href="#transporter" className='hover:text-white transition-colors'>Transporter</a>
                  <img src={logos.mercedes} alt="Mercedes" className='w-3.5 h-3.5 invert' />
                </li>
                <li className='flex items-center gap-2'>
                  <a href="#lkw" className='hover:text-white transition-colors'>LKW Service</a>
                  <img src={logos.mercedes} alt="Mercedes" className='w-3.5 h-3.5 invert' />
                </li>
              </ul>
            </div>
            
            <div className='flex flex-col gap-4'>
              <h3 className='text-white text-2xl tracking-wide font-normal'>Kontakt</h3>
              <ul className='flex flex-col gap-2 text-lg'>
                <li className='flex items-center gap-2'>
                  <a href="#standort" className='hover:text-white transition-colors'>Standort Dorstener</a>
                  <img src={logos.mercedes} alt="Mercedes" className='w-3.5 h-3.5 invert' />
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Sütun: Terminvereinbarung */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-white text-2xl tracking-wide font-normal'>Terminvereinbarung</h3>
            <ul className='flex flex-col gap-2 text-lg'>
              <li><a href="#beratung" className='hover:text-white transition-colors'>Beratungstermin</a></li>
              <li><a href="#werkstatt" className='hover:text-white transition-colors'>Werkstatttermin</a></li>
            </ul>
          </div>

          {/* 4. Sütun: Fahrzeugankauf */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-white text-2xl tracking-wide font-normal'>Fahrzeugankauf</h3>
            <ul className='flex flex-col gap-2 text-lg'>
              <li><a href="#ankauf" className='hover:text-white transition-colors'>Fahrzeugankauf</a></li>
            </ul>
          </div>

        </div>

        {/* ==================== ORTA KISIM: SOSYAL MEDYA VE YASAL LİNKLER ==================== */}
        <div className='flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 pt-8 border-t border-zinc-800/60'>
          
          {/* Sosyal Medya */}
          <div className='flex items-center gap-6'>
            <span className='text-white text-lg font-normal tracking-wide'>Folgen Sie uns:</span>
            <div className='flex items-center gap-4 text-2xl'>
              <a href="#facebook" className='text-gray-400 hover:text-white transition-colors'><FaFacebookF /></a>
              <a href="#instagram" className='text-gray-400 hover:text-white transition-colors'><FaInstagram /></a>
              <a href="#tiktok" className='text-gray-400 hover:text-white transition-colors'><FaTiktok /></a>
            </div>
          </div>

          {/* Yasal Alt Linkler */}
          <div className='flex flex-wrap items-center gap-x-6 gap-y-3 text-xs tracking-wider uppercase text-gray-400 font-normal'>
            <a href="#datenschutz" className='hover:text-white transition-colors'>Datenschutz</a>
            <a href="#barrierefreiheit" className='hover:text-white transition-colors'>Erklärung zur Barrierefreiheit</a>
            <a href="#data-act" className='hover:text-white transition-colors'>EU Data Act</a>
            <a href="#impressum" className='hover:text-white transition-colors'>Impressum</a>
          </div>

        </div>

        {/* ==================== ALT KISIM: ORİJİNAL MARKA LOGOLARI ==================== */}
        {/* Görseldeki gibi yan yana sıralanan şık SVG logolar */}
        <div className='flex items-center gap-10 pt-4 flex-wrap opacity-60 hover:opacity-100 transition-opacity duration-300'>
          <img src={logos.mercedes} alt="Mercedes Benz" className='h-12 w-auto' />
          <img src={logos.amg} alt="AMG" className='h-5 w-auto' />
          <img src={logos.eq} alt="EQ" className='h-6 w-auto' />
          <img src={logos.smart} alt="Smart" className='h-5 w-auto' />
        </div>

      </div>
    </footer>
  )
}

export default Footer