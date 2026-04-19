"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function PTEPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "",
    quantity: "" 
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShownPopup) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY;
      const scrollPercentage = (scrollPos / (scrollHeight - clientHeight)) * 100;
      if (scrollPercentage >= 50) {
        setShowPopup(true);
        setHasShownPopup(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShownPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.state || !formData.quantity) {
      setError("Please fill out all compulsory fields.");
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error: dbError } = await supabase
        .from('voucher_bookings')
        .insert([{ 
          full_name: formData.fullName, 
          whatsapp_number: formData.phone, 
          email: formData.email, 
          location: "N/A",
          state: formData.state, 
          quantity: parseInt(formData.quantity) 
        }]);
      if (dbError) throw dbError;
      setSubmitted(true);
      setFormData({ fullName: "", phone: "", email: "", state: "", quantity: "" });
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const testimonials = [
    { name: "Arjun Mehta", role: "MBA Aspirant", content: "PrestigeVoucher saved me ₹3,000 instantly. The code was delivered within minutes and worked perfectly on the Pearson site. Very professional!", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Priya Sharma", role: "Nursing Student", content: "I was worried about legitimacy, but their WhatsApp team was so helpful. Got my voucher and booked my exam for next week. 5 stars!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Rahul Verma", role: "IT Professional", content: "Seamless transaction. The new 10-digit validation makes it secure. Highly recommend for any Indian student going abroad.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop" }
  ];

  const evidencePhotos = [
      "https://images.unsplash.com/photo-1586762522814-9a9986320341?q=80&w=400&h=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=400&h=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&h=600&auto=format&fit=crop"
  ];

  const blogs = [
    { title: "Top 10 Tips to Score 79+ in PTE Academic in 2024", category: "PTE Strategy", date: "April 10, 2024", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&auto=format&fit=crop", desc: "Discover the latest strategies and practice techniques used by top scorers to clear the PTE exam with ease." },
    { title: "PTE vs IELTS: Which is Easier for Australia PR?", category: "Exam Comparison", date: "April 12, 2024", img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=400&auto=format&fit=crop", desc: "A detailed breakdown of both exams, focusing on the scoring algorithms and convenience for Indian test-takers." },
    { title: "How to Book PTE Exam with a Discount Voucher", category: "Booking Guide", date: "April 14, 2024", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop", desc: "Learn the step-by-step process of using a promo code on the official Pearson portal to save thousands." }
  ];

  const faqs = [
    { q: "What is a PTE Promo Code / Voucher?", a: "A PTE Voucher is a unique 12-digit code that acts as a form of payment for your PTE Academic exam. Instead of paying the full price of ₹17,000+ directly on the Pearson site, you can buy a voucher from us at a discounted rate and use it as your payment method." },
    { q: "Is PrestigeVoucher an authorized partner?", a: "Yes, we work with authorized educational partners in India to provide legitimate, verified vouchers that are 100% valid." },
    { q: "How long does it take to receive the code?", a: "Immediately after your successful payment via our secure Razorpay gateway, the voucher code is sent to your registered email and WhatsApp number." },
    { q: "Do these vouchers work for PTE Core or UKVI?", a: "Our vouchers are specifically designed for the PTE Academic and PTE Academic UKVI exams, accepted globally for study and migration." },
    { q: "Can I use the voucher for rescheduling?", a: "Vouchers are primarily for new bookings. Refer to Pearson's official policy for rescheduling fees." },
    { q: "What is the validity of the purchased voucher?", a: "Each voucher is valid for 12 months from the date of issuance." },
    { q: "What if the code doesn't work?", a: "Codes are pre-verified, and we provide 24/7 WhatsApp support. In the rare case of an issue, our experts will assist immediately." }
  ];

  const comparisonPoints = [
    { feature: "Discount Savings", prestige: "Flat ₹2,800-₹3,000", others: "₹500-₹1,000" },
    { feature: "Delivery Speed", prestige: "Instant (60 Sec)", others: "2-24 Hours" },
    { feature: "Support Team", prestige: "24/7 Live WhatsApp", others: "Email Tickets Only" },
    { feature: "Payment Gateway", prestige: "Razorpay (Official)", others: "Manual Bank Transfer" },
    { feature: "Voucher Type", prestige: "Official Pearson Grant", others: "Third-party Codes" },
    { feature: "Documentation", prestige: "Official Tax Invoice", others: "No Bill Provided" }
  ];

  return (
    <div className="bg-[#f8fafc] text-[#1e293b] min-h-screen font-body text-sm md:text-base selection:bg-[#0052cc] selection:text-white">
      {/* Dynamic Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#091e42]/40 backdrop-blur-md animate-in fade-in duration-500">
           <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-[#0052cc]/10">
              <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-[#091e42]/30 hover:text-[#0052cc] transition-all"><span className="material-icons">close</span></button>
              <div className="p-12 text-center space-y-6">
                 <div className="w-20 h-20 bg-[#0052cc]/10 rounded-2xl flex items-center justify-center mx-auto"><span className="material-icons text-4xl text-[#0052cc]">confirmation_number</span></div>
                 <div className="space-y-3">
                    <h3 className="text-2xl font-black text-[#0052cc]">Limited Offer!</h3>
                    <p className="font-semibold text-gray-600">Secure your PTE Exam slot today and save up to ₹2,800.</p>
                 </div>
                 <a href="#purchase" onClick={() => setShowPopup(false)} className="block w-full bg-[#fbbc04] text-[#091e42] py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#0052cc] hover:text-white transition-all shadow-lg">Claim Discount Now</a>
              </div>
           </div>
        </div>
      )}

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0052cc] h-20 flex items-center shadow-lg">
        <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer text-white">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm"><span className="material-icons text-[#0052cc] font-bold">school</span></div>
            <span className="text-2xl font-black tracking-tight">PrestigeVoucher</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <a className="text-xs font-black uppercase text-white/90 hover:text-[#fbbc04] tracking-widest" href="/how-to-book">How to Book</a>
            <a className="text-xs font-black uppercase text-white/90 hover:text-[#fbbc04] tracking-widest" href="#blogs">Blog</a>
            <a className="text-xs font-black uppercase text-white/90 hover:text-[#fbbc04] tracking-widest flex items-center gap-2" href="tel:+919325216364">
              <span className="material-icons text-sm">phone</span>
              Call: +91 93252 16364
            </a>
            <a className="bg-[#fbbc04] text-[#091e42] px-8 py-3 rounded-xl text-xs font-black uppercase hover:bg-white transition-all shadow-md" href="#purchase">Buy Voucher</a>
          </div>
        </div>
      </nav>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <a className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center border-4 border-white shadow-2xl hover:scale-110 transition-transform" href="https://wa.me/919325216364" target="_blank" rel="noopener noreferrer">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.031c0 2.122.541 4.192 1.572 6.014L0 24l6.105-1.601a11.871 11.871 0 005.939 1.6h.005c6.635 0 12.032-5.394 12.035-12.034a11.84 11.84 0 00-3.517-8.503z"/></svg>
        </a>
      </div>

      <main className="relative z-10 overflow-hidden">
        {/* Hero Section */}
        <header className="pt-40 pb-24 px-6 lg:px-16 bg-[#0052cc] text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
               <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <span className="material-icons text-xs text-[#fbbc04]">verified_user</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">Authorized Partner India</span>
               </div>
               <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tight">Save ₹3,000 on <br />PTE <span className="text-[#fbbc04]">Academic</span> Exam</h1>
               <p className="text-xl text-white/80 max-w-xl leading-relaxed font-semibold">Book your PTE slot at the lowest price. Trusted by over 10,000+ students nationwide.</p>
               <div className="flex flex-wrap gap-10 pt-4">
                  <div className="flex flex-col"><span className="text-3xl font-black text-[#fbbc04]">10K+</span><span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Orders</span></div>
                  <div className="flex flex-col"><span className="text-3xl font-black text-[#fbbc04]">4.9/5</span><span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Rating</span></div>
               </div>
            </div>
            <div className="rounded-3xl overflow-hidden border-8 border-white/10 shadow-3xl aspect-video bg-black transform hover:scale-[1.01] transition-transform">
               <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Guide" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </header>

        {/* Booking Form */}
        <section className="py-24 px-6 lg:px-16 bg-[#f1f5f9] relative" id="purchase">
          <div className="max-w-[1700px] mx-auto relative z-10">
            <div className="bg-white rounded-[4rem] shadow-2xl p-10 lg:p-20 border border-slate-100">
               <div className="text-center mb-16"><h2 className="text-5xl font-black text-[#0052cc] mb-4">PTE Voucher Order Form</h2><p className="text-slate-400 font-bold text-lg">Instant Discount Code Delivered via WhatsApp & Email</p></div>
               {submitted ? (
                 <div className="text-center py-20 space-y-6"><div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><span className="material-icons text-5xl">check_circle</span></div><h3 className="text-3xl font-black text-[#0052cc]">Form Submitted!</h3><p className="text-gray-500 font-bold">Redirecting to Razorpay secure checkout...</p></div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Name</p><input name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#f8fafc] border-2 border-slate-200 focus:border-[#0052cc] rounded-2xl px-6 py-5 text-[#091e42] font-black outline-none transition-all" required /></div>
                      <div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">WhatsApp Number</p><input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#f8fafc] border-2 border-slate-200 focus:border-[#0052cc] rounded-2xl px-6 py-5 text-[#091e42] font-black outline-none transition-all" maxLength={10} required /></div>
                      <div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email Address</p><input name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#f8fafc] border-2 border-slate-200 focus:border-[#0052cc] rounded-2xl px-6 py-5 text-[#091e42] font-black outline-none transition-all" type="email" required /></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Your State</p><div className="relative"><select name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-[#f8fafc] border-2 border-slate-200 focus:border-[#0052cc] rounded-2xl px-6 py-5 text-[#091e42] font-black appearance-none outline-none transition-all cursor-pointer" required><option value="" disabled>Choose State</option>{INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select><span className="material-icons absolute right-6 top-1/2 -translate-y-1/2 text-[#0052cc]">expand_more</span></div></div>
                      <div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Quantity</p><div className="relative"><select name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full bg-[#f8fafc] border-2 border-slate-200 focus:border-[#0052cc] rounded-2xl px-6 py-5 text-[#091e42] font-black appearance-none outline-none transition-all cursor-pointer" required><option value="" disabled>Choose Quantity</option>{[1,2,3,4,5].map(n => <option key={n} value={n.toString()}>{n}</option>)}</select><span className="material-icons absolute right-6 top-1/2 -translate-y-1/2 text-[#0052cc]">unfold_more</span></div></div>
                   </div>
                   <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                      <button type="submit" className="w-full lg:w-[400px] bg-[#fbbc04] text-[#091e42] px-12 py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-[#0052cc] hover:text-white transition-all shadow-xl">Buy Now</button>
                      <div className="flex items-center gap-6"><div className="flex -space-x-3">{[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg"><img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" /></div>)}<div className="w-12 h-12 rounded-full bg-[#0052cc] border-4 border-white flex items-center justify-center text-white text-[10px] font-bold">+10K</div></div><div><p className="text-xl font-black leading-none mb-1 tracking-tight">Active Buyers</p><p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Verified Tax Invoices</p></div></div>
                   </div>
                   {error && <p className="text-center font-black text-red-500 animate-pulse">{error}</p>}
                </form>
               )}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 px-6 lg:px-16 bg-white relative">
           <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-4xl lg:text-5xl font-black text-[#0052cc] tracking-tight">Expert Booking Guidance</h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed">PrestigeVoucher is India's most trusted partner for PTE Exam vouchers. We help students realize their international dreams by making the examination process affordable and stress-free.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">{["Instant Code Delivery", "Verified by Thousands", "ISO 27001 Security", "24/7 Live Expert Support"].map(item => (<div key={item} className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 font-black text-[#091e42]"><span className="material-icons text-[#0052cc]">task_alt</span>{item}</div>))}</div>
              </div>
              <div className="bg-[#f8fafc] p-16 rounded-[4rem] border-4 border-[#0052cc]/5 grid grid-cols-2 gap-10 text-center">
                 <div className="space-y-1"><p className="text-4xl font-black text-[#0052cc]">₹2,800</p><p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Savings</p></div>
                 <div className="space-y-1"><p className="text-4xl font-black text-[#0052cc]">100%</p><p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Legitimacy</p></div>
                 <div className="space-y-1"><p className="text-4xl font-black text-[#0052cc]">60 Sec</p><p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Delivery</p></div>
                 <div className="space-y-1"><p className="text-4xl font-black text-[#0052cc]">12 Mo</p><p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Validity</p></div>
              </div>
           </div>
        </section>

        {/* FLIP CARD TESTIMONIALS */}
        <section className="py-24 px-6 lg:px-16 bg-[#f1f5f9] overflow-hidden">
           <div className="max-w-[1920px] mx-auto mb-16 text-center"><span className="text-[#0052cc] font-black text-[11px] uppercase tracking-[0.5em] mb-4 block">Student Stories</span><h2 className="text-5xl font-black text-[#091e42]">Trusted Internationally</h2></div>
           <div className="relative flex overflow-hidden py-10"><div className="animate-marquee whitespace-nowrap flex gap-10 items-center">{[...testimonials, ...testimonials].map((t, i) => (<div key={i} className={`w-[280px] h-[380px] shrink-0 group perspective-1000 ${i % 2 === 0 ? '-translate-y-6' : 'translate-y-6'}`}><div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180 cursor-pointer"><div className="absolute w-full h-full backface-hidden rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white"><img src={t.img} alt={t.name} className="w-full h-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#091e42] to-transparent p-6 pt-16 text-white text-center"><p className="font-black text-lg">{t.name}</p></div></div><div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#0052cc] rounded-[2.5rem] flex flex-col justify-center p-8 whitespace-normal border-4 border-white"><p className="text-white text-sm font-bold leading-relaxed">"{t.content}"</p><p className="text-[#fbbc04] font-black text-[9px] uppercase mt-4 tracking-widest">{t.role}</p></div></div></div>))}</div></div>
        </section>

        {/* PROOF GALLERY */}
        <section className="py-24 px-6 lg:px-16 bg-white overflow-hidden">
           <div className="max-w-[1920px] mx-auto text-center mb-16"><h2 className="text-5xl font-black text-[#091e42]">Live Delivery Proof</h2></div>
           <div className="relative flex overflow-hidden py-20 bg-slate-50/50 rounded-[4rem]">
             <div className="animate-marquee-reverse whitespace-nowrap flex gap-10 items-center">{[...evidencePhotos, ...evidencePhotos].map((url, i) => (<div key={i} className={`w-[260px] h-[350px] shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform transition-all ${i % 2 === 0 ? '-translate-y-8' : 'translate-y-8'}`}><img src={url} alt="Proof" className="w-full h-full object-cover" /></div>))}</div>
           </div>
        </section>

        {/* Comparison Section - Match Background to Website */}
        <section className="py-32 px-6 lg:px-16 bg-[#f8fafc] relative">
           <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-24"><h2 className="text-5xl lg:text-6xl font-black text-[#0052cc] mb-4">Why PrestigeVoucher Wins?</h2><p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">Direct Comparison against standard providers</p></div>
              <div className="bg-white rounded-[4rem] shadow-3xl overflow-hidden border-8 border-slate-50">
                 <table className="w-full text-left">
                    <thead><tr className="bg-[#0052cc] text-white"><th className="p-10 font-black uppercase text-xs tracking-widest">Core Feature</th><th className="p-10 font-black uppercase text-xs tracking-widest text-[#fbbc04]">PrestigeVoucher</th><th className="p-10 font-black uppercase text-xs tracking-widest opacity-40">Others</th></tr></thead>
                    <tbody>{comparisonPoints.map((row, i) => (<tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"><td className="p-10 font-black text-[#091e42] text-lg">{row.feature}</td><td className="p-10 font-bold text-[#0052cc] text-lg flex items-center gap-4"><span className="material-icons text-green-500">verified</span> {row.prestige}</td><td className="p-10 font-medium text-slate-400 text-lg opacity-60">{row.others}</td></tr>))}</tbody>
                 </table>
              </div>
           </div>
        </section>

        {/* Blogs */}
        <section className="py-24 px-6 lg:px-16 bg-white" id="blogs">
           <div className="max-w-[1920px] mx-auto"><div className="mb-16 text-center"><h2 className="text-5xl font-black text-[#091e42]">PTE Resources</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">{blogs.map((blog, i) => (<div key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 transition-all hover:-translate-y-3"><div className="aspect-video overflow-hidden"><img src={blog.img} className="w-full h-full object-cover" /></div><div className="p-12 space-y-4"><h4 className="text-2xl font-black text-[#091e42] leading-tight">{blog.title}</h4><p className="text-slate-500 font-medium leading-relaxed">{blog.desc}</p></div></div>))}</div>
           </div>
        </section>

        {/* FAQs Section - ENLARGED */}
        <section className="py-32 px-6 lg:px-16 bg-[#f1f5f9]" id="faq">
           <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-24"><h2 className="text-6xl font-black text-[#0052cc]">Common Questions</h2><p className="mt-4 text-slate-400 font-bold tracking-widest uppercase">Everything you need to know about PTE grants</p></div>
              <div className="space-y-8">
                 {faqs.map((faq, idx) => (
                   <div key={idx} className="bg-white rounded-[3rem] overflow-hidden border-b-8 border-slate-200 shadow-xl transition-all hover:border-[#0052cc]">
                      <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className={`w-full text-left px-12 py-10 flex justify-between items-center transition-all ${activeFaq === idx ? 'bg-[#0052cc] text-white' : 'hover:bg-[#0052cc]/5'}`}><span className="text-2xl font-black tracking-tight">{faq.q}</span><span className="material-icons text-3xl">{activeFaq === idx ? 'expand_less' : 'expand_more'}</span></button>
                      <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[800px]' : 'max-h-0'}`}><div className="px-12 py-10 text-xl text-slate-500 font-medium leading-relaxed bg-white">{faq.a}</div></div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#091e42] pt-32 pb-16 px-6 lg:px-16 text-white text-center md:text-left">
         <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20"><div className="md:col-span-2 space-y-10"><span className="text-4xl font-black">PrestigeVoucher</span><p className="text-white/40 text-xl font-medium max-w-xl">Reliable PTE vouchers for Indian Students. Verified and secure transactions only.</p></div><div className="space-y-6"><h5 className="text-[11px] font-black text-[#fbbc04] tracking-widest uppercase">Support</h5><p className="font-bold text-lg">hello@prestigevoucher.com</p><p className="font-bold text-lg">+91 93252 16364</p></div></div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 50s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
