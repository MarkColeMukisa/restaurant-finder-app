export default function CallToAction() {
    return (
        <>
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    
                * {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>

            <section className='flex items-center justify-center p-4 py-20'>
                <div className=' max-w-6xl mx-auto relative w-full bg-linear-to-bl from-orange-600 to-red-600 rounded-2xl border border-orange-500 px-6 py-16 pb-18 flex flex-col items-center text-center'>
                    <div className='inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6'>
                        <span className='text-slate-200 text-xs'>Join Our Community</span>
                    </div>

                    <h1 className='text-3xl md:text-[40px]/13 font-bold text-white mb-8 max-w-2xl leading-tight'>
                        Hungry? Discover the best restaurants<br className="hidden md:block" /> in your city today.
                    </h1>

                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <button className='bg-white text-gray-900 rounded-full px-8 py-4 text-base font-bold flex items-center gap-2 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer'>
                            Explore Now
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth='2' stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>

                        <button className='bg-white/10 backdrop-blur-md rounded-full p-1.5 pr-8 flex items-center gap-3 hover:bg-white/20 transition-all border border-white/20 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer'>
                            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200" alt="Avatar" className='size-11 rounded-full object-cover ring-2 ring-white/50' />
                            <div className="text-left flex flex-col justify-center gap-0.5">
                                <span className="text-xs text-white/80 leading-tight">Live Chat Support</span>
                                <span className="text-sm text-white font-bold leading-tight flex items-center gap-1">
                                    Online Now <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};