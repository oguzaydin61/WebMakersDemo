import React, { useState } from 'react';
import axios from 'axios'; // Axios import ettik

function ContactForm() {
  const [formData, setFormData] = useState({
    adresse: 'Dorstener Straße 329',
    team: 'Team Tomru',
    email: '',
    text: '',
    datenschutz: false
  });

  // Kullanıcıya durum bildirmek için yeni state'ler
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    // Yazdığımız PHP Custom Endpoint'ine POST isteği atıyoruz
axios.post('https://dev-oguzaydin61.pantheonsite.io/wp-json/custom/v1/contact', formData)
      .then((response) => {
        if (response.data.success) {
          setStatus({ loading: false, success: true, error: '' });
          // Formu temizle
          setFormData({
            adresse: 'Dorstener Straße 329',
            team: 'Team Tomru',
            email: '',
            text: '',
            datenschutz: false
          });
        }
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || 'Bir hata oluştu kardo.';
        setStatus({ loading: false, success: false, error: errorMsg });
      });
  };

  return (
    <div className='w-full bg-white text-zinc-900 font-light py-24 px-6 xl:px-26'>
      <form onSubmit={handleSubmit} className='max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-16 xl:gap-24 justify-between items-start'>
        
        {/* ==================== SOL TARAF ==================== */}
        <div className='w-full xl:w-1/2 flex flex-col gap-10'>
          <div className='uppercase text-2xl xl:text-4xl tracking-wide leading-tight font-normal text-zinc-800'>
            <h1>Sie haben Fragen?</h1>
            <h1>Wir helfen gerne weiter.</h1>
          </div>

          <div className='flex flex-col gap-6 w-full max-w-xl'>
            <div className='relative w-full border-b border-zinc-200 py-3'>
              <select 
                value={formData.adresse}
                onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                className='w-full bg-transparent appearance-none outline-none pr-8 text-zinc-600 cursor-pointer text-lg'
              >
                <option value="Dorstener Straße 329">Dorstener Straße 329</option>
                <option value="Andere Straße 123">Andere Straße 123</option>
              </select>
              <div className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </div>
            </div>

            <div className='relative w-full border-b border-zinc-200 py-3'>
              <select 
                value={formData.team}
                onChange={(e) => setFormData({...formData, team: e.target.value})}
                className='w-full bg-transparent appearance-none outline-none pr-8 text-zinc-600 cursor-pointer text-lg'
              >
                <option value="Team Tomru">Team Tomru</option>
                <option value="Team Henning">Team Henning</option>
              </select>
              <div className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== SAĞ TARAF ==================== */}
        <div className='w-full xl:w-1/2 flex flex-col gap-8'>
          <h2 className='uppercase text-2xl xl:text-4xl tracking-wide font-normal text-zinc-800 mb-2'>
            Allgemeine Fragen und Anregungen?
          </h2>

          <div className='flex flex-col gap-8 w-full'>
            <div className='w-full border-b border-zinc-200 pb-2 focus-within:border-zinc-500 transition-colors duration-200'>
              <input 
                type="email" 
                placeholder="E-Mail"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className='w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400 text-lg'
              />
            </div>

            <div className='w-full border-b border-zinc-200 pb-2 focus-within:border-zinc-500 transition-colors duration-200'>
              <textarea 
                placeholder="Ihr Text"
                rows={4}
                required
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className='w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400 text-lg resize-none'
              />
            </div>

            {/* Durum Bildirimleri */}
            {status.success && <div className="text-emerald-600 font-normal">Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.</div>}
            {status.error && <div className="text-red-500 font-normal">{status.error}</div>}

            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4'>
              <label className='flex items-center gap-3 cursor-pointer select-none text-zinc-600 text-base'>
                <input 
                  type="checkbox" 
                  checked={formData.datenschutz}
                  onChange={(e) => setFormData({...formData, datenschutz: e.target.checked})}
                  className='w-5 h-5 accent-zinc-800 border-zinc-300 rounded cursor-pointer'
                />
                <span>
                  <a href="#datenschutz" className='underline hover:text-zinc-900 transition-colors'>Datenschutz</a> akzeptieren
                </span>
              </label>

              <button 
                type="submit" 
                disabled={status.loading}
                className='group flex items-center gap-3 text-sm tracking-widest uppercase font-medium text-zinc-800 hover:text-zinc-600 transition-colors duration-300 self-end sm:self-auto disabled:opacity-50'
              >
                {status.loading ? 'Wird gesendet...' : 'Absenden'}
                <span className='transform group-hover:translate-x-2 transition-transform duration-300 text-lg'>&rarr;</span>
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default ContactForm;