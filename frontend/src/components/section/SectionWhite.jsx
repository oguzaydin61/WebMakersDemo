import React from 'react'

function SectionWhite() {
  return (
    <div>
      {/* Üst Kısım (Beyaz Alan) */}
      <div className='w-full bg-white xl:flex relative items-center xl:py-24 pb-24 justify-center'>
        <div className='xl:w-1/2 w-full h-auto'>
          <img className='w-full h-auto' src="https://www.henning-automobil.de/wp-content/uploads/2022/09/henning.jpg" alt="" />
        </div>
        <div className='xl:w-2/5 w-full h-full xl:pr-40'>
          <div className='h-full flex flex-col w-full xl:justify-between items-start'>
            <h1 className='text-4xl xl:text-7xl xl:py-6 py-2 uppercase font-light px-4'>Der Tradition verpflichtet. Dem Neuen aufgeschlossen.</h1>
            <h1 className='xl:text-5xl text-xl xl:py-6 py-2 uppercase font-light px-4'>Das freundliche Team von Henning.</h1>
            <p className='px-4 xl:text-xl xl:py-6 py-2 text-lg font-light'>Die <span className='font-bold'>Henning Automobil GmbH</span> hat sich seit dem Jahre 1902 with Kompetenz und Sachverstand kontinuierlich weiter entwickelt und ist heute ein erfolgreiches wie wirtschaftlich gesundes mittelständisches Unternehmen.</p>
          </div>
        </div>
      </div>

      {/* Alt Kısım (Kırmızı & Siyah Alt Yapılı Resim Alanı) */}
      {/* DEĞİŞİKLİK: Mobilde yazının altta kalması için `flex-col-reverse` yaptık */}
      <div className='relative w-full flex flex-col-reverse xl:flex-row xl:items-stretch'>
        
        {/* Yazı Alanı (Mobilde Altta, Masaüstünde Solda) */}
        <div className='xl:w-1/2 w-full text-lg xl:text-2xl text-start justify-center flex flex-col gap-6 px-6 py-12 xl:px-26 xl:py-0'>
          <h1>Zudem sind wir <span className='font-bold'>Service-Stützpunkt</span> für <span className='font-bold'>Mercedes-Benz Pkw- und Nutzfahrzeuge</span> sowie smart und haben ständig ein großes Sortiment an <span className='font-bold'>Original-Ersatzteilen</span> für alle Modelle auf Lager.</h1>
          <h1>Neben unserem Hauptstandort, den es bereits seit über 115 Jahren gibt, bieten wir Ihnen in Herne jetzt auch eine freie Werkstatt für Modelle aller Marken.</h1>
          <h1>Machen Sie sich bei einem Besuch persönlich ein Bild von uns. Erleben Sie engagierte Beratung, aufregende Modelle und einen überzeugenden Service.</h1>
        </div>
        
        {/* Resim Alanı (Mobilde Üstte, Masaüstünde Sağda) */}
        {/* DEĞİŞİKLİK: Siyah arka planı bu div'in içine aldık. Mobilde w-full, masaüstünde xl:w-1/2 olacak */}
        <div className='relative text-white xl:w-1/2 w-full z-10 flex'>
          
          {/* Siyah Arka Plan Katmanı: Artık sadece bu div'in sınırları içinde absolute! */}
          {/* Mobilde sağ tarafta 2/3 kaplar, masaüstünde (xl:) tüm yüksekliği kaplayıp parent flex sayesinde hizalanır */}
          <div className='absolute right-0 top-0 h-full xl:w-2/3 w-2/3 bg-black z-0'></div>
          
          <img 
            src="https://www.henning-automobil.de/wp-content/uploads/2023/01/gtc-gelb-k-full.webp" 
            className='w-full h-full object-cover relative z-10' 
            alt="Car" 
          />
        </div>

      </div>
    </div>
  )
}

export default SectionWhite