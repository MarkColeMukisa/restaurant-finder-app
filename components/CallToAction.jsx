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
                <div className=' max-w-7xl mx-auto relative w-full bg-linear-to-bl from-indigo-600 to-indigo-900 rounded-2xl border border-indigo-500 px-6 py-16 pb-18 flex flex-col items-center text-center'>
                    <div className='inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6'>
                        <span className='text-slate-200 text-xs'>Welcome to PrebuiltUI</span>
                    </div>
            
                    <h1 className='text-3xl md:text-[40px]/13 font-medium text-white mb-8 max-w-2xl leading-tight'>
                        Redefine your brand for a bold,<br className="hidden md:block" /> future-ready presence.
                    </h1>
            
                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <button className='bg-white text-gray-900 rounded-full px-6 py-3.5 text-sm flex items-center gap-2 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer'>
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth='2' stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
            
                        <button className='bg-white rounded-full p-1.5 pr-8 flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer'>
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="Avatar" className='size-9 rounded-full object-cover' />
                            <div className="text-left flex flex-col justify-center gap-0.5">
                                <span className="text-xs text-gray-900 leading-tight">Grab 15 minutes with us</span>
                                <span className="text-xs text-gray-900 font-medium leading-tight flex items-center gap-1">
                                    Available <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};