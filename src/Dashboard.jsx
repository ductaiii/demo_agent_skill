// Dashboard.jsx - PHIÊN BẢN CHẬM (WATERFALL - CẦN TỐI ƯU)
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const [data, setData] = useState({ crypto: [], forex: null, user: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const label = `thời gian fetch - ${Date.now()}`;
    async function fetchDataSlowly() {
      setLoading(true)

      try {
        console.time(label)

        const [cryptoRes, forexRes, userRes] = await Promise.all([
          fetch(
            '/api/crypto/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1',
          ),
          fetch('/api/forex'),
          fetch(`https://dummyjson.com/users/1`),
        ])

        console.timeEnd(label)
        const cryptoData = await cryptoRes.json()
        const forexData = await forexRes.json()
        const userData = await userRes.json()

        // Cập nhật State sau khi CHỜ cả 3 thằng xong
        const normalizedCrypto = Array.isArray(cryptoData)
          ? cryptoData.slice(0, 10).map((coin) => ({
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol?.toUpperCase(),
              image: coin.image,
              price: coin.current_price,
              marketCap: coin.market_cap,
              rank: coin.market_cap_rank,
              volume24h: coin.total_volume,
              change24h: coin.price_change_percentage_24h,
            }))
          : []


        // Map data từ DummyJSON sang format cũ để không phải sửa giao diện
        const mappedUser = userData?.id
          ? {
              name: { first: userData.firstName, last: userData.lastName },
              email: userData.email,
              picture: { large: userData.image },
              location: {
                city: userData.address.city,
                country: userData.address.country || 'USA',
              },
            }
          : null

        setData({
          crypto: normalizedCrypto,
          forex: forexData,
          user: mappedUser,
        })
      } catch (err) {
        console.error('Lỗi:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDataSlowly()
  }, [])

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-slate-200">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Nexus.
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Market Intelligence & System Status
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              System Online
            </span>
          </div>
        </header>

        {/* Banner quảng cáo */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 shadow-lg shadow-orange-200/50">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-white rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white rounded-full blur-2xl"></div>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5">
            <div className="flex items-center gap-4">
              <span className="text-3xl select-none">🎯</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-0.5">
                  Quảng cáo
                </p>
                <h2 className="text-xl font-extrabold text-white leading-tight">
                  Đầu tư thông minh – Sinh lời vượt trội!
                </h2>
                <p className="text-sm text-white/80 font-medium mt-0.5">
                  Khám phá cơ hội đầu tư crypto hàng đầu ngay hôm nay.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-orange-500 font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Tìm hiểu ngay
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Section 1: Crypto MARQUEE (Clean & Small Icons) */}
        <section className="relative -mx-6 md:-mx-8 py-8 bg-white border-y border-slate-100 shadow-sm overflow-hidden">
          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden group">
            {/* Gradients to fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 40s linear infinite;
              }
              .group:hover .animate-marquee {
                animation-play-state: paused;
              }
            `}</style>

            <div className="flex w-max animate-marquee items-center">
              {/* Double the array for loop */}
              {[...data.crypto, ...data.crypto, ...data.crypto].map(
                (coin, index) => (
                  <div
                    key={`${coin.id}-${index}`}
                    className="mx-6 flex items-center gap-3 select-none group/item cursor-pointer"
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full shadow-sm group-hover/item:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800">
                          {coin.symbol}
                        </span>
                        <span
                          className={`text-xs font-bold ${coin.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                        >
                          {coin.change24h > 0 ? '+' : ''}
                          {coin.change24h.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-500">
                        $
                        {coin.price < 1
                          ? coin.price.toFixed(4)
                          : coin.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Forex & User (Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Forex Card */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                USD / VND Rate
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                  {data.forex?.rates?.VND
                    ? (data.forex.rates.VND / 1000).toFixed(1)
                    : '---'}
                </span>
                <span className="text-xl font-bold text-slate-400">k</span>
              </div>
              <p className="text-sm text-slate-500 mt-2 font-medium">
                Updated just now
              </p>
            </div>
            {/* Decorative bg icon */}
            <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-50">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
              </svg>
            </div>
          </section>

          {/* User Card */}
          <section className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10 h-full flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {data.user ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white opacity-20 blur-md rounded-full"></div>
                    <img
                      src={data.user.picture.large}
                      alt="User"
                      className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl relative z-10"
                    />
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-2 border-indigo-700 rounded-full z-20"></div>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest mb-3">
                      Admin Profile
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight mb-1">
                      {data.user.name.first} {data.user.name.last}
                    </h3>
                    <p className="text-blue-100 font-medium mb-6">
                      {data.user.email}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-[10px] uppercase text-blue-200 font-bold opacity-70">
                          Location
                        </p>
                        <p className="font-semibold text-sm">
                          {data.user.location.city}
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-[10px] uppercase text-blue-200 font-bold opacity-70">
                          Country
                        </p>
                        <p className="font-semibold text-sm">
                          {data.user.location.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="m-auto text-blue-200 animate-pulse font-medium">
                  Fetching User Data...
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
