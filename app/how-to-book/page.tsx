"use client";

import { useState } from "react";

export default function HowToBook() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    {
      title: "Choose Your Voucher Quantity",
      icon: "shopping_cart",
      desc: "Fill in the booking form on our main page with your Full Name, WhatsApp number, and Email. Choose between 1 to 5 vouchers depending on your needs."
    },
    {
      title: "Secure Payment via Razorpay",
      icon: "payment",
      desc: "Pay securely using India's most trusted gateway. We support UPI, Debit/Credit Cards, and Net Banking."
    },
    {
      title: "Receive Instant Code",
      icon: "whatsapp",
      desc: "Within 60 seconds of payment, your unique 12-digit PTE Promo Code will be sent to your WhatsApp and Email."
    },
    {
      title: "Visit PearsonPTE.com",
      icon: "public",
      desc: "Log in to your official Pearson account. Select your preferred test center, date, and time slot."
    },
    {
      title: "Apply & Save",
      icon: "check_circle",
      desc: "Paste your PrestigeVoucher code into the box and click 'Apply' on the payment page. Your total will drop by ₹3,000 instantly."
    }
  ];

  const checklists = [
    "A valid Indian Passport (Original) is mandatory for the exam.",
    "The name on your voucher booking MUST match your Passport.",
    "Arrive at the testing center 30 minutes before your slot.",
    "Ensure your email address is correct for the score report.",
    "Check for any local center restrictions or holiday schedules."
  ];

  const faqs = [
    { q: "Is the voucher valid for all of India?", a: "Yes, our vouchers are valid in every official Pearson test center across India, from Delhi to Chennai." },
    { q: "Can I use the voucher for the exam in other countries?", a: "Unless specified as an international voucher, these are typically optimized for use within the Indian regions and centers." },
    { q: "What should I carry to the exam center?", a: "Only your original Passport is accepted as valid ID for the PTE Academic exam in India." },
    { q: "Do I need to pay anything else at the center?", a: "No, once you have booked your slot using our voucher on the Pearson website, your exam fee is fully paid." }
  ];

  return (
    <div className="bg-[#f8fafc] text-[#1e293b] min-h-screen font-body relative overflow-hidden">
      
      {/* Floating WhatsApp */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <a className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center border-4 border-white shadow-2xl hover:scale-110 transition-transform" href="https://wa.me/919325216364" target="_blank" rel="noopener noreferrer">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.031c0 2.122.541 4.192 1.572 6.014L0 24l6.105-1.601a11.871 11.871 0 005.939 1.6h.005c6.635 0 12.032-5.394 12.035-12.034a11.84 11.84 0 00-3.517-8.503z"/></svg>
        </a>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.05]">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#0052cc] rounded-full blur-[180px]"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#fbbc04] rounded-full blur-[180px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0052cc] h-20 flex items-center shadow-lg relative z-50">
        <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer text-white">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="material-icons text-[#0052cc] font-bold">school</span>
            </div>
            <a href="/pte" className="text-2xl font-black tracking-tight">PrestigeVoucher</a>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <a className="text-xs font-black uppercase text-white hover:text-[#fbbc04] tracking-widest" href="/pte">Home</a>
            <a className="text-xs font-black uppercase text-white hover:text-[#fbbc04] tracking-widest flex items-center gap-2" href="tel:+919325216364">
              <span className="material-icons text-sm">phone</span>
              Call: +91 93252 16364
            </a>
            <a className="bg-[#fbbc04] text-[#091e42] px-8 py-3 rounded-xl text-xs font-black uppercase hover:bg-white transition-all shadow-md" href="/pte#purchase">Buy Now</a>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-24 px-6 lg:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-32">
          
          {/* Header */}
          <section className="text-center space-y-8 relative">
             <div className="absolute top-[-50px] right-20 opacity-5 text-[#0052cc]"><span className="material-icons text-[200px]">auto_stories</span></div>
             <h1 className="text-5xl md:text-8xl font-black text-[#0052cc] leading-tight tracking-tight">Complete Booking Guide</h1>
             <p className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto">Follow these steps to secure your examination at a discounted rate.</p>
          </section>

          {/* Steps */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 group transition-all hover:border-[#0052cc]/30">
                <div className="w-20 h-20 bg-[#0052cc]/10 rounded-2xl flex items-center justify-center mb-10">
                  <span className="material-icons text-4xl text-[#0052cc]">{step.icon}</span>
                </div>
                <h3 className="text-3xl font-black text-[#091e42] mb-6">{idx + 1}. {step.title}</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </section>

          {/* Checklist & Common Mistakes - FIXED COLORS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-10">
             <div className="space-y-10 relative p-16 bg-white rounded-[4rem] shadow-2xl border-4 border-slate-50">
                <div className="absolute top-10 right-10 text-[#0052cc]/10"><span className="material-icons text-6xl">list_alt</span></div>
                <h2 className="text-4xl font-black text-[#0052cc]">Official Checklist</h2>
                <div className="space-y-6">
                  {checklists.map((text, i) => (
                    <div key={i} className="flex gap-4 items-start font-black text-slate-600 text-lg leading-tight"><span className="material-icons text-green-500">verified</span>{text}</div>
                  ))}
                </div>
             </div>
             
             {/* Fixed Common Mistakes - Matched to Website Palette */}
             <div className="bg-[#0052cc] text-white p-16 lg:p-20 rounded-[4rem] shadow-3xl relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#fbbc04]/10 rounded-bl-full"></div>
                <div className="relative z-10">
                   <h3 className="text-4xl font-black mb-10 text-[#fbbc04]">Avoid These Mistakes</h3>
                   <div className="space-y-8">
                      <div className="flex gap-5 items-start"><span className="material-icons text-[#fbbc04] text-3xl">report_problem</span><p className="font-extrabold text-xl leading-tight">Name Mismatch: Your profile name must match your Indian Passport exactly.</p></div>
                      <div className="flex gap-5 items-start"><span className="material-icons text-[#fbbc04] text-3xl">report_problem</span><p className="font-extrabold text-xl leading-tight">Wrong Voucher: PTE Home vouchers are NOT for University/Study visas.</p></div>
                      <div className="flex gap-5 items-start"><span className="material-icons text-[#fbbc04] text-3xl">report_problem</span><p className="font-extrabold text-xl leading-tight">Expired ID: Booking your slot with an expired Passport will lead to ban.</p></div>
                   </div>
                </div>
             </div>
          </section>

          {/* FAQ Section - ENLARGED to suit site */}
          <section className="py-20" id="extra-faq">
             <div className="text-center mb-24"><h2 className="text-6xl font-black text-[#0052cc]">Booking Insights</h2><p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-sm">Professional support for your academic journey</p></div>
             <div className="max-w-[1400px] mx-auto space-y-8">
                {faqs.map((faq, idx) => (
                   <div key={idx} className="bg-white rounded-[3.5rem] overflow-hidden border-b-8 border-slate-100 shadow-xl transition-all hover:border-[#0052cc]">
                      <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className={`w-full text-left px-12 py-10 flex justify-between items-center transition-all ${activeFaq === idx ? 'bg-[#0052cc] text-white' : 'hover:bg-slate-50'}`}><span className="text-2xl font-black tracking-tight">{faq.q}</span><span className="material-icons text-3xl">{activeFaq === idx ? 'expand_less' : 'expand_more'}</span></button>
                      <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[800px]' : 'max-h-0'}`}><div className="px-12 py-10 text-xl text-slate-500 font-medium leading-relaxed bg-white">{faq.a}</div></div>
                   </div>
                ))}
             </div>
          </section>

          {/* CTA */}
          <section className="text-center py-20 relative">
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[#fbbc04]"><span className="material-icons text-[300px]">verified</span></div>
             <h2 className="text-4xl font-black text-[#091e42] mb-12 relative z-10">Start Your Global Journey Today</h2>
             <a href="/pte#purchase" className="relative z-10 bg-[#fbbc04] text-[#091e42] px-20 py-8 rounded-[2rem] font-black text-2xl uppercase tracking-[0.2em] hover:bg-[#0052cc] hover:text-white transition-all shadow-3xl inline-block">Order Voucher</a>
          </section>
        </div>
      </main>

      <footer className="bg-[#091e42] py-24 px-6 lg:px-16 text-white text-center">
         <div className="max-w-[1200px] mx-auto opacity-40 font-black text-sm uppercase tracking-[0.5em]">Authorized Pearson Education Partner • PrestigeVoucher Authority</div>
      </footer>
    </div>
  );
}
