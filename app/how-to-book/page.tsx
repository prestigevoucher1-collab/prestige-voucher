"use client";

import { useState } from "react";

export default function HowToBook() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stepsToFollow = [
    {
      id: "01",
      title: "Purchase a Verified Voucher",
      desc: "Get your unique 12-digit code instantly.",
      points: [
        "Buy a valid PTE voucher code from Fryment.",
        "Complete the payment safely to receive the voucher.",
        "Check your inbox for the unique 12-digit voucher code."
      ],
      icon: "shopping_bag"
    },
    {
      id: "02",
      title: "Create Pearson PTE Account",
      desc: "Setup your official exam profile.",
      points: [
        "Visit the Pearson PTE website to begin registration.",
        "Enter all personal details exactly as in your passport.",
        "Verify your email address to activate your PTE profile."
      ],
      icon: "person_add"
    },
    {
      id: "03",
      title: "Select Test Date & Center",
      desc: "Pick a slot that suits your schedule.",
      points: [
        "Choose your preferred test city and authorised centre.",
        "Pick a suitable exam date that fits your schedule.",
        "Confirm a convenient time slot from the options shown."
      ],
      icon: "event"
    },
    {
      id: "04",
      title: "Apply Code & Confirm",
      desc: "Redeem your discount and book.",
      points: [
        "Proceed to the checkout section after slot selection.",
        "Enter your 12-digit voucher code accurately at payment.",
        "Submit your booking and check your email for confirmation."
      ],
      icon: "task_alt"
    }
  ];

  const fullGuide = [
    {
      title: "Visit the Official PTE Website",
      desc: "Start the PTE test booking process by visiting the official Pearson PTE website and clicking on the \"Book Now\" option. This is the only official platform for scheduling your PTE exam."
    },
    {
      title: "Create or Log in to Your myPTE Account:",
      desc: "To continue with How to Book PTE Exam, you need to create a myPTE account. Enter your personal details exactly as they appear on your passport, including your full name and date of birth."
    },
    {
      title: "Choose Test Center, Date, and Time:",
      desc: "After logging in, select your preferred test center, exam date, and available time slot. You can usually schedule the exam up to several months in advance, depending on seat availability."
    },
    {
      title: "Review Your Details Carefully:",
      desc: "Before confirming the PTE exam booking, double-check all your details such as passport information, exam location, and selected date. Any mismatch with your passport details may lead to issues on test day."
    },
    {
      title: "Make Payment and Confirm Booking:",
      desc: "Complete the PTE test booking by paying the exam fee using a valid payment method. Once the payment is successful, you will receive a confirmation email with your test date, time, and test center details."
    }
  ];

  const faqs = [
    { q: "What is a PTE Promo Code / Voucher?", a: "A PTE Voucher is a unique 12-digit code that acts as a form of payment for your PTE Academic exam. Instead of paying the full price directly on the Pearson site, you can buy a voucher from us at a discounted rate." },
    { q: "Is the voucher valid for all of India?", a: "Yes, it's valid for every official Pearson test center across India." },
    { q: "What is the validity of the code?", a: "Every voucher is valid for 12 months from the date of purchase." },
    { q: "Do I need to pay anything extra?", a: "No, the voucher covers the entire standard examination fee on the Pearson website." },
    { q: "Can I use this for PTE Academic UKVI?", a: "Yes, our vouchers are valid for both PTE Academic and PTE Academic UKVI exams." },
    { q: "What if the code doesn't work?", a: "Codes are pre-verified. In the rare case of an issue, our 24/7 WhatsApp support is available to assist you immediately." }
  ];

  return (
    <div className="bg-white min-h-screen font-body text-[#1e293b] selection:bg-[#1565d8] selection:text-white">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white h-16 md:h-20 flex items-center border-b border-slate-100 shadow-sm">
        <div className="max-w-[1920px] w-full mx-auto px-4 md:px-6 lg:px-16 flex items-center justify-between">
          <a href="/pte" className="flex items-center gap-2 md:gap-3 group cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1565d8] rounded-lg flex items-center justify-center shadow-lg"><span className="material-icons text-lg md:text-xl text-white font-bold">school</span></div>
            <span className="text-lg md:text-2xl font-black tracking-tight text-[#091e42]">Fryment</span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            <a className="text-xs font-black uppercase text-[#091e42] hover:text-[#1565d8] tracking-widest" href="/pte">Home</a>
            <a className="bg-[#1565d8] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#091e42] transition-all shadow-lg flex items-center gap-2" href="tel:+919325216364">
              <span className="material-icons text-sm">phone</span>
              Call Support
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-4">
             <a className="bg-[#1565d8] text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-1" href="tel:+919325216364">
                <span className="material-icons text-xs">phone</span> Call
             </a>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#091e42] p-1 focus:outline-none">
                <span className="material-icons text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
             </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 overflow-hidden">
        
        {/* Simple Header */}
        <header className="pt-24 md:pt-40 pb-12 md:pb-16 px-4 md:px-6 lg:px-16 bg-[#f8fafc] text-center relative border-b border-slate-100">
          <div className="max-w-[1200px] mx-auto space-y-4">
             <h1 className="text-3xl md:text-5xl font-black text-[#091e42] leading-tight tracking-tight uppercase tracking-tighter">How to Book PTE Exam <br className="hidden md:block" /> with a Voucher Code</h1>
          </div>
        </header>

        {/* Video Walkthrough Section - Integrated into Layout */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-16 bg-[#1565d8] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="max-w-[1000px] mx-auto space-y-10 relative z-10">
              <div className="text-center space-y-4">
                 <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Video Walkthrough</h2>
                 <p className="text-base text-white/80 font-medium">Watch exactly how to redeem your Fryment voucher on Pearson portal.</p>
              </div>
              <div className="aspect-video rounded-[2rem] overflow-hidden border-[8px] md:border-[12px] border-white/20 shadow-3xl bg-black">
                 <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Guide" frameBorder="0" allowFullScreen></iframe>
              </div>
           </div>
        </section>

        {/* New "How to Book" Grid Layout - Replaces Sticky Animation */}
        <section className="py-20 md:py-32 px-4 md:px-6 lg:px-16 bg-white">
           <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-16 md:mb-24">
                 <h2 className="text-3xl md:text-5xl font-black text-[#091e42] mb-4 uppercase tracking-tighter">Easy Steps to Follow</h2>
                 <p className="text-base md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">Get your discount and book your exam slot in minutes with our authorized vouchers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {stepsToFollow.map((step, idx) => (
                   <div key={idx} className="bg-[#f8fafc] p-8 md:p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-start gap-6 transition-all hover:bg-white hover:shadow-2xl hover:border-[#1565d8] group">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#1565d8] shadow-sm group-hover:bg-[#1565d8] group-hover:text-white transition-all">
                         <span className="material-icons text-3xl">{step.icon}</span>
                      </div>
                      <div className="space-y-4 flex-grow">
                         <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-[#1565d8] uppercase tracking-widest">Step {step.id}</span>
                         </div>
                         <h3 className="text-xl md:text-2xl font-black text-[#091e42] leading-tight">{step.title}</h3>
                         <ul className="space-y-3">
                            {step.points.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-500 text-sm font-medium">
                                 <span className="material-icons text-[#1565d8] text-base">check</span>
                                 <span>{p}</span>
                              </li>
                            ))}
                         </ul>
                      </div>
                      {idx === 0 && (
                        <a href="/pte#purchase" className="w-full bg-[#1565d8] text-white py-4 rounded-xl text-center font-black text-xs uppercase tracking-widest hover:bg-[#091e42] transition-all">Buy Coupon Now</a>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Structured Text Guide */}
        <section className="py-20 md:py-32 px-4 md:px-6 lg:px-16 bg-[#f0f7ff] border-y border-slate-100">
           <div className="max-w-[1000px] mx-auto space-y-16">
              <div className="text-center space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black text-[#091e42] uppercase tracking-tighter">Full Booking Details</h2>
                 <p className="text-base md:text-lg text-slate-500 font-medium">Follow this comprehensive guide for a successful Pearson PTE registration.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 {fullGuide.map((g, i) => (
                   <div key={i} className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6 md:gap-10 items-start hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1565d8]/10 text-[#1565d8] rounded-xl flex items-center justify-center shrink-0 font-black text-lg">{i + 1}</div>
                      <div className="space-y-2">
                         <h4 className="text-xl md:text-2xl font-black text-[#091e42] leading-tight">{g.title}</h4>
                         <p className="text-base text-slate-500 font-medium leading-relaxed">{g.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FAQs */}
        <section className="py-20 md:py-32 px-4 md:px-6 lg:px-16 bg-white" id="faq">
           <div className="max-w-[850px] mx-auto">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-[#091e42] mb-4 uppercase tracking-tighter">Frequently Asked Questions</h2>
                <div className="w-20 h-1.5 bg-[#1565d8] mx-auto rounded-full"></div>
              </div>
              <div className="space-y-4">
                 {faqs.map((faq, idx) => (
                   <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:border-[#1565d8]">
                      <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className={`w-full text-left px-6 md:px-10 py-5 md:py-7 flex justify-between items-center transition-all ${activeFaq === idx ? 'bg-[#1565d8] text-white' : 'hover:bg-[#1565d8]/5'}`}><span className="text-sm md:text-lg font-black tracking-tight pr-6">{faq.q}</span><span className="material-icons text-xl md:text-2xl">{activeFaq === idx ? 'expand_less' : 'expand_more'}</span></button>
                      <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[800px]' : 'max-h-0'}`}><div className="px-6 md:px-10 py-5 md:py-7 text-sm md:text-base text-slate-500 font-medium leading-relaxed bg-white border-t border-slate-50">{faq.a}</div></div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#091e42] pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 lg:px-16 text-white text-center md:text-left">
         <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
            <div className="md:col-span-2 space-y-6 md:space-y-10">
               <span className="text-3xl md:text-5xl font-black">Fryment</span>
               <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl leading-relaxed">Authorized PTE Voucher provider. Trusted by thousands of students for secure and fast exam bookings.</p>
            </div>
            <div className="space-y-4 md:space-y-6">
               <h5 className="text-xs font-black text-amber-400 tracking-widest uppercase">Support</h5>
               <p className="font-bold text-base md:text-lg">hello@fryment.com</p>
               <p className="font-bold text-base md:text-lg">+91 93252 16364</p>
            </div>
         </div>
         <div className="max-w-[1920px] mx-auto mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">© 2026 Fryment. Authorized Pearson Partner.</p>
         </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-32 right-6 z-[999] md:bottom-28 md:right-10">
        <a className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] rounded-full flex items-center justify-center border-4 border-white shadow-2xl hover:scale-110 transition-transform flex" href="https://wa.me/919325216364" target="_blank" rel="noopener noreferrer">
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.031c0 2.122.541 4.192 1.572 6.014L0 24l6.105-1.601a11.871 11.871 0 005.939 1.6h.005c6.635 0 12.032-5.394 12.035-12.034a11.84 11.84 0 00-3.517-8.503z"/></svg>
        </a>
      </div>

    </div>
  );
}
