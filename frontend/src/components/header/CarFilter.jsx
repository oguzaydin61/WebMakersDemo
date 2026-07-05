import React, { useState, useMemo, useEffect } from 'react';
import { mockPriceRanges } from '../../api/placeholderData'; // Sadece fiyat aralığı statik kalabilir

export default function CarFilter({ vehicles = [], onFilterChange }) {
  // --- 1. DROPDOWN AÇIK/KAPALI STATE'LERİ ---
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // --- MOBİL PANEL AÇIK/KAPALI STATE'İ ---
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  // --- 2. SEÇİLEN ELEMANLARIN STATE'LERİ ---
  const [selectedBrand, setSelectedBrand] = useState({ id: '', name: 'Alle' });
  const [selectedModel, setSelectedModel] = useState({ id: '', name: 'Alle' });
  const [selectedEngine, setSelectedEngine] = useState({ id: '', name: 'Alle' });
  const [selectedPrice, setSelectedPrice] = useState(mockPriceRanges[0]);

  // --- DİNAMİK DROPDOWN LİSTELERİNİ GELEN ARAÇLARDAN ÜRETME ---
  // Benzersiz markaları listeler
  const dynamicBrands = useMemo(() => {
    const brandsMap = new Map();
    vehicles.forEach(v => {
      if (v.brand) brandsMap.set(v.brand.toLowerCase(), v.brand);
    });
    return Array.from(brandsMap.values()).map(b => ({ id: b, name: b }));
  }, [vehicles]);

  // Seçilen markaya ait benzersiz modelleri listeler
  const dynamicModels = useMemo(() => {
    if (!selectedBrand.id) return [];
    const modelsMap = new Map();
    vehicles
      .filter(v => v.brand?.toLowerCase() === selectedBrand.id.toLowerCase())
      .forEach(v => {
        if (v.model) modelsMap.set(v.model.toLowerCase(), v.model);
      });
    return Array.from(modelsMap.values()).map(m => ({ id: m, name: m }));
  }, [selectedBrand, vehicles]);

  // Benzersiz motor türlerini listeler (ACF'teki ham değerleri ekrana basar)
  const dynamicEngines = useMemo(() => {
    const enginesMap = new Map();
    vehicles.forEach(v => {
      if (v.engineType) {
        const displayName = v.engineType === 'gasoline' ? 'Benzin' : v.engineType === 'diesel' ? 'Dizel' : v.engineType;
        enginesMap.set(v.engineType.toLowerCase(), { id: v.engineType, name: displayName });
      }
    });
    return Array.from(enginesMap.values());
  }, [vehicles]);

  // --- 3. DİNAMİK FİLTRELEME VE SAYI HESAPLAMA ---
// --- 3. DİNAMİK FİLTRELEME VE SAYI HESAPLAMA ---
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      if (selectedBrand.id && vehicle.brand?.toLowerCase() !== selectedBrand.id.toLowerCase()) return false;
      if (selectedModel.id && vehicle.model?.toLowerCase() !== selectedModel.id.toLowerCase()) return false;
      if (selectedEngine.id && vehicle.engineType?.toLowerCase() !== selectedEngine.id.toLowerCase()) return false;
      if (vehicle.price < selectedPrice.min || vehicle.price > selectedPrice.max) return false;
      return true;
    });
  }, [selectedBrand, selectedModel, selectedEngine, selectedPrice, vehicles]);

  // Üst bileşene bilgi fırlatma işini tamamen sildik.
  // Sayı sadece bu bileşenin kendi içinde hesaplanıp ekrana basılıyor.
  const filteredCount = filteredVehicles.length;

  return (
    <>
      {/* ==========================================================
          1. DESKTOP GÖRÜNÜMÜ
          ========================================================== */}
      <div className="hidden md:flex w-full bg-[#18181c] text-gray-400 py-6 px-12 z-20 items-center justify-between">
        
        <div className="w-2/3 flex items-end justify-between gap-6">
          
          {/* DESKTOP DROPDOWN 1: MARKE */}
          <div className="block flex-1 py-2 px-2 min-w-[140px]">
            <span className="text-xl font-extralight block mb-1">MARKE</span>
            <div className="relative w-full">
              <button
                onClick={() => { setIsBrandOpen(!isBrandOpen); setIsModelOpen(false); setIsEngineOpen(false); setIsPriceOpen(false); }}
                className="relative w-full font-extralight py-3 text-left text-white flex items-center justify-between transition-all duration-300"
                style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
              >
                <span className="text-2xl font-extralight tracking-wide">{selectedBrand.name}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isBrandOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
              </button>
              {isBrandOpen && (
                <ul className="absolute left-0 w-full z-[999] bottom-full mb-1 py-1 text-gray-300 font-extralight text-3xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto custom-scrollbar" style={{ background: 'rgba(24, 24, 28, 0.95) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}>
                  <li onClick={() => { setSelectedBrand({ id: '', name: 'Alle' }); setSelectedModel({ id: '', name: 'Alle' }); setIsBrandOpen(false); }} className="px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">Alle</li>
                  {dynamicBrands.map((brand) => (
                    <li key={brand.id} onClick={() => { setSelectedBrand(brand); setSelectedModel({ id: '', name: 'Alle' }); setIsBrandOpen(false); }} className={`px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors ${selectedBrand.id === brand.id ? 'text-white bg-white/5' : ''}`}>{brand.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* DESKTOP DROPDOWN 2: MODELL */}
          <div className="block flex-1 py-2 px-2 min-w-[140px]">
            <span className="text-xl font-extralight block mb-1">MODELL</span>
            <div className="relative w-full">
              <button
                disabled={!selectedBrand.id}
                onClick={() => { setIsModelOpen(!isModelOpen); setIsBrandOpen(false); setIsEngineOpen(false); setIsPriceOpen(false); }}
                className="relative w-full font-extralight py-3 text-left text-white flex items-center justify-between transition-all duration-300 disabled:opacity-30"
                style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
              >
                <span className="text-2xl font-extralight tracking-wide">{selectedBrand.id ? selectedModel.name : '—'}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isModelOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
              </button>
              {isModelOpen && selectedBrand.id && (
                <ul className="absolute left-0 w-full z-[999] bottom-full mb-1 py-1 text-gray-300 font-extralight text-3xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto custom-scrollbar" style={{ background: 'rgba(24, 24, 28, 0.95) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}>
                  <li onClick={() => { setSelectedModel({ id: '', name: 'Alle' }); setIsModelOpen(false); }} className="px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">Alle</li>
                  {dynamicModels.map((model) => (
                    <li key={model.id} onClick={() => { setSelectedModel(model); setIsModelOpen(false); }} className={`px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors ${selectedModel.id === model.id ? 'text-white bg-white/5' : ''}`}>{model.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* DESKTOP DROPDOWN 3: MOTOR */}
          <div className="block flex-1 py-2 px-2 min-w-[140px]">
            <span className="text-xl font-extralight block mb-1">MOTOR</span>
            <div className="relative w-full">
              <button
                onClick={() => { setIsEngineOpen(!isEngineOpen); setIsBrandOpen(false); setIsModelOpen(false); setIsPriceOpen(false); }}
                className="relative w-full font-extralight py-3 text-left text-white flex items-center justify-between transition-all duration-300"
                style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
              >
                <span className="text-2xl font-extralight tracking-wide">{selectedEngine.name}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isEngineOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
              </button>
              {isEngineOpen && (
                <ul className="absolute left-0 w-full z-[999] bottom-full mb-1 py-1 text-gray-300 font-extralight text-3xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto custom-scrollbar" style={{ background: 'rgba(24, 24, 28, 0.95) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}>
                  <li onClick={() => { setSelectedEngine({ id: '', name: 'Alle' }); setIsEngineOpen(false); }} className="px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">Alle</li>
                  {dynamicEngines.map((engine) => (
                    <li key={engine.id} onClick={() => { setSelectedEngine(engine); setIsEngineOpen(false); }} className={`px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors ${selectedEngine.id === engine.id ? 'text-white bg-white/5' : ''}`}>{engine.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* DESKTOP DROPDOWN 4: RATE */}
          <div className="block flex-1 py-2 px-2 min-w-[140px]">
            <span className="text-xl font-extralight block mb-1">RATE</span>
            <div className="relative w-full">
              <button
                onClick={() => { setIsPriceOpen(!isPriceOpen); setIsBrandOpen(false); setIsModelOpen(false); setIsEngineOpen(false); }}
                className="relative w-full font-extralight py-3 text-left text-white flex items-center justify-between transition-all duration-300"
                style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
              >
                <span className="text-2xl font-extralight tracking-wide">{selectedPrice.name}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isPriceOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
              </button>
              {isPriceOpen && (
                <ul className="absolute left-0 w-full z-[999] bottom-full mb-1 py-1 text-gray-300 font-extralight text-3xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto custom-scrollbar" style={{ background: 'rgba(24, 24, 28, 0.95) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}>
                  {mockPriceRanges.map((range) => (
                    <li key={range.id} onClick={() => { setSelectedPrice(range); setIsPriceOpen(false); }} className={`px-4 py-2 text-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors ${selectedPrice.id === range.id ? 'text-white bg-white/5' : ''}`}>{range.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* DESKTOP DİNAMİK SONUÇ BUTONU */}
          <div className="block flex-1 py-2 px-2 min-w-[140px]">
            <span className="text-xl font-extralight block mb-1 invisible">FAHRZEUGE</span>
            <div className="relative w-full">
              <button
                className="relative w-full font-extralight py-3 px-4 text-center text-emerald-400 hover:text-emerald-300 flex items-center justify-between transition-all duration-300 cursor-pointer group"
                style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
              >
                <span className="text-2xl font-extralight tracking-wide">Fahrzeuge</span>
                <span className="text-2xl font-medium ml-2 bg-emerald-500/10 text-emerald-400 px-2 rounded min-w-[2rem] text-center transition-all duration-300 group-hover:bg-emerald-500/20">
                  {filteredCount}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
              </button>
            </div>
          </div>

        </div>

        {/* DESKTOP SAĞ ALAN: LOGOLAR */}
        <div className="w-1/3 flex gap-8 items-center justify-end flex-shrink-0">
          <div><img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/mercedes-light.svg" alt="Mercedes" className="h-9 w-auto object-contain block" /></div>
          <div><img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/amg-light.svg" alt="AMG" className="h-5 w-auto object-contain block" /></div>
          <div><img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/eq-light.svg" alt="EQ" className="h-6 w-auto object-contain block" /></div>
          <div><img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/smart-light.svg" alt="Smart" className="h-6 w-auto object-contain block" /></div>
        </div>

      </div>

      {/* ==========================================================
          2. MOBİL GÖRÜNÜMÜ
          ========================================================== */}
      <div className="flex md:hidden flex-col w-full bg-[#18181c] border-t border-white/5 px-6 py-4 z-40 fixed bottom-0 left-0">
        <button 
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          className="flex items-center justify-between w-full py-2 mb-3 text-white border-b border-white/10"
        >
          <span className="text-lg font-extralight tracking-wider">Filtrele ({filteredCount})</span>
          <svg className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${isMobilePanelOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className="flex items-center justify-between w-full px-2">
          <img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/mercedes-light.svg" alt="Mercedes" className="h-7 w-auto object-contain" />
          <img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/amg-light.svg" alt="AMG" className="h-3.5 w-auto object-contain" />
          <img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/eq-light.svg" alt="EQ" className="h-4.5 w-auto object-contain" />
          <img src="https://www.henning-automobil.de/wp-content/uploads/2022/11/smart-light.svg" alt="Smart" className="h-4.5 w-auto object-contain" />
        </div>
      </div>

      {/* ==========================================================
          3. MOBİL AÇILIR PANEL
          ========================================================== */}
      <div 
        className={`fixed inset-x-0 bottom-[108px] z-30 bg-[#141417]/95 backdrop-blur-lg p-6 border-t border-white/10 transition-transform duration-300 md:hidden max-h-[70vh] overflow-y-auto ${
          isMobilePanelOpen ? 'translate-y-0' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          
          {/* MOBİL DROPDOWN 1: MARKE */}
          <div className="w-full">
            <span className="text-sm font-extralight text-gray-500 block mb-1">MARKE</span>
            <button
              onClick={() => { setIsBrandOpen(!isBrandOpen); setIsModelOpen(false); }}
              className="relative w-full font-extralight py-2 text-left text-white flex items-center justify-between"
              style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
            >
              <span className="text-xl font-extralight">{selectedBrand.name}</span>
              <svg className={`w-4 h-4 text-gray-400 ${isBrandOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
            </button>
            {isBrandOpen && (
              <ul className="w-full bg-[#18181c] border border-white/15 mt-1 max-h-40 overflow-y-auto">
                <li onClick={() => { setSelectedBrand({ id: '', name: 'Alle' }); setSelectedModel({ id: '', name: 'Alle' }); setIsBrandOpen(false); }} className="px-4 py-2 text-sm text-gray-300">Alle</li>
                {dynamicBrands.map((brand) => (
                  <li key={brand.id} onClick={() => { setSelectedBrand(brand); setSelectedModel({ id: '', name: 'Alle' }); setIsBrandOpen(false); }} className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5">{brand.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* MOBİL DROPDOWN 2: MODELL */}
          <div className="w-full">
            <span className="text-sm font-extralight text-gray-500 block mb-1">MODELL</span>
            <button
              disabled={!selectedBrand.id}
              onClick={() => setIsModelOpen(!isModelOpen)}
              className="relative w-full font-extralight py-2 text-left text-white flex items-center justify-between disabled:opacity-30"
              style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
            >
              <span className="text-xl font-extralight">{selectedBrand.id ? selectedModel.name : '—'}</span>
              <svg className={`w-4 h-4 text-gray-400 ${isModelOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
            </button>
            {isModelOpen && selectedBrand.id && (
              <ul className="w-full bg-[#18181c] border border-white/15 mt-1 max-h-40 overflow-y-auto">
                <li onClick={() => { setSelectedModel({ id: '', name: 'Alle' }); setIsModelOpen(false); }} className="px-4 py-2 text-sm text-gray-300">Alle</li>
                {dynamicModels.map((model) => (
                  <li key={model.id} onClick={() => { setSelectedModel(model); setIsModelOpen(false); }} className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5">{model.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* MOBİL DROPDOWN 3: MOTOR */}
          <div className="w-full">
            <span className="text-sm font-extralight text-gray-500 block mb-1">MOTOR</span>
            <button
              onClick={() => setIsEngineOpen(!isEngineOpen)}
              className="relative w-full font-extralight py-2 text-left text-white flex items-center justify-between"
              style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
            >
              <span className="text-xl font-extralight">{selectedEngine.name}</span>
              <svg className={`w-4 h-4 text-gray-400 ${isEngineOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
            </button>
            {isEngineOpen && (
              <ul className="w-full bg-[#18181c] border border-white/15 mt-1 max-h-40 overflow-y-auto">
                <li onClick={() => { setSelectedEngine({ id: '', name: 'Alle' }); setIsEngineOpen(false); }} className="px-4 py-2 text-sm text-gray-300">Alle</li>
                {dynamicEngines.map((engine) => (
                  <li key={engine.id} onClick={() => { setSelectedEngine(engine); setIsEngineOpen(false); }} className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5">{engine.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* MOBİL DROPDOWN 4: RATE */}
          <div className="w-full">
            <span className="text-sm font-extralight text-gray-500 block mb-1">RATE</span>
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="relative w-full font-extralight py-2 text-left text-white flex items-center justify-between"
              style={{ background: 'rgba(24, 24, 28, 0.9) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
            >
              <span className="text-xl font-extralight">{selectedPrice.name}</span>
              <svg className={`w-4 h-4 text-gray-400 ${isPriceOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
            </button>
            {isPriceOpen && (
              <ul className="w-full bg-[#18181c] border border-white/15 mt-1 max-h-40 overflow-y-auto">
                {mockPriceRanges.map((range) => (
                  <li key={range.id} onClick={() => { setSelectedPrice(range); setIsPriceOpen(false); }} className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5">{range.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* MOBİL SONUÇ GÖSTER BUTONU */}
          <button
            onClick={() => setIsMobilePanelOpen(false)}
            className="w-full py-4 text-center text-emerald-400 rounded-lg mt-2 font-medium tracking-wide flex items-center justify-center gap-2 shadow-lg"
            style={{ background: 'rgba(24, 24, 28, 0.95) linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #18181C 100%)' }}
          >
            <span>Ergebnisse anzeigen</span>
            <span className="bg-emerald-500/20 px-2.5 py-0.5 rounded text-sm font-semibold">
              {filteredCount}
            </span>
          </button>

        </div>
      </div>
    </>
  );
}