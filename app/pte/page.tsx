"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function PTEPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  
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
    { name: "Arjun Mehta", role: "MBA Aspirant", content: "Fryment saved me ₹3,000 instantly. The code was delivered within minutes and worked perfectly on the Pearson site. Very professional!", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop" },
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
    { q: "Is Fryment an authorized partner?", a: "Yes, we work with authorized educational partners in India to provide legitimate, verified vouchers that are 100% valid." },
    { q: "How long does it take to receive the code?", a: "Immediately after your successful payment via our secure Paytm gateway, the voucher code is sent to your registered email and WhatsApp number." },
    { q: "Do these vouchers work for PTE Core or UKVI?", a: "Our vouchers are specifically designed for the PTE Academic and PTE Academic UKVI exams, accepted globally for study and migration." },
    { q: "Can I use the voucher for rescheduling?", a: "Vouchers are primarily for new bookings. Refer to Pearson's official policy for rescheduling fees." },
    { q: "What is the validity of the purchased voucher?", a: "Each voucher is valid for 12 months from the date of issuance." },
    { q: "What if the code doesn't work?", a: "Codes are pre-verified, and we provide 24/7 WhatsApp support. In the rare case of an issue, our experts will assist immediately." }
  ];

  const comparisonPoints = [
    { feature: "Discount Savings", prestige: "Flat ₹2,800-₹3,000", others: "₹500-₹1,000" },
    { feature: "Delivery Speed", prestige: "Instant (60 Sec)", others: "2-24 Hours" },
    { feature: "Support Team", prestige: "24/7 Live WhatsApp", others: "Email Tickets Only" },
    { feature: "Payment Gateway", prestige: "Paytm (Official)", others: "Manual Bank Transfer" },
    { feature: "Voucher Type", prestige: "Official Pearson Grant", others: "Third-party Codes" },
    { feature: "Documentation", prestige: "Official Tax Invoice", others: "No Bill Provided" }
  ];

  return (
    <div className="bg-white text-[#1e293b] min-h-screen font-body text-xs md:text-base selection:bg-[#1565d8] selection:text-white">
      {/* Dynamic Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#091e42]/40 backdrop-blur-md animate-in fade-in duration-500">
           <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-[#1565d8]/10">
              <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-[#091e42]/30 hover:text-[#1565d8] transition-all"><span className="material-icons">close</span></button>
           <div className="p-8 md:p-12 text-center space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1565d8]/10 rounded-2xl flex items-center justify-center mx-auto"><span className="material-icons text-3xl md:text-4xl text-[#1565d8]">confirmation_number</span></div>
              <div className="space-y-3">
                 <h3 className="text-xl md:text-2xl font-black text-[#1565d8]">Limited Offer!</h3>
                 <p className="text-sm md:text-base font-semibold text-gray-600">Secure your PTE Exam slot today and save up to ₹2,800.</p>
              </div>
              <a href="#purchase" onClick={() => setShowPopup(false)} className="block w-full bg-[#1565d8] text-white py-4 md:py-5 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-[#091e42] transition-all shadow-lg">Claim Discount Now</a>
           </div>
           </div>
        </div>
      )}

      {/* TopNavBar - White & Clean */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md h-16 md:h-20 flex items-center border-b border-slate-100 shadow-sm">
        <div className="max-w-[1920px] w-full mx-auto px-4 md:px-6 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1565d8] rounded-lg flex items-center justify-center shadow-lg"><span className="material-icons text-lg md:text-xl text-white font-bold">school</span></div>
            <span className="text-lg md:text-2xl font-black tracking-tight text-[#091e42]">Fryment</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <a className="text-sm font-bold text-[#091e42] hover:text-[#1565d8] transition-colors" href="/how-to-book">How to Book</a>
            <a className="text-sm font-bold text-[#091e42] hover:text-[#1565d8] transition-colors" href="#blogs">Blog</a>
            <a className="bg-[#1565d8] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#091e42] transition-all shadow-md flex items-center gap-2" href="tel:+919325216364">
              <span className="material-icons text-sm">phone</span>
              Call: +91 93252 16364
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-4">
             <a className="bg-[#1565d8] text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-1" href="tel:+919325216364">
                <span className="material-icons text-xs">phone</span> Call
             </a>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#091e42] p-1 focus:outline-none">
                <span className="material-icons text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
             </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 top-16 bg-white z-40 transition-transform duration-500 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex flex-col p-8 space-y-10 border-t border-slate-100">
              <a className="text-xl font-black uppercase text-[#091e42] flex items-center gap-4" href="/how-to-book" onClick={() => setIsMenuOpen(false)}>
                 <span className="material-icons text-[#1565d8]">menu_book</span> How to Book
              </a>
              <a className="text-xl font-black uppercase text-[#091e42] flex items-center gap-4" href="#blogs" onClick={() => setIsMenuOpen(false)}>
                 <span className="material-icons text-[#1565d8]">rss_feed</span> Our Blog
              </a>
              <a className="text-xl font-black uppercase text-[#091e42] flex items-center gap-4" href="tel:+919325216364" onClick={() => setIsMenuOpen(false)}>
                 <span className="material-icons text-[#1565d8]">phone</span> Call Support
              </a>
           </div>
        </div>
      </nav>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-32 right-6 z-[999] md:bottom-28 md:right-10">
        <a className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center border-4 border-white shadow-2xl hover:scale-110 transition-transform flex" href="https://wa.me/919325216364" target="_blank" rel="noopener noreferrer">
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.031c0 2.122.541 4.192 1.572 6.014L0 24l6.105-1.601a11.871 11.871 0 005.939 1.6h.005c6.635 0 12.032-5.394 12.035-12.034a11.84 11.84 0 00-3.517-8.503z"/></svg>
        </a>
      </div>

      <main className="relative z-10 overflow-hidden">
        {/* Clean Hero Section - Matches Screenshot Layout */}
        <header className="pt-20 md:pt-28 pb-12 md:pb-20 px-4 md:px-6 lg:px-16 bg-gradient-to-br from-[#f0f7ff] to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1565d8]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            
            {/* Hero Left Content */}
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
               <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <span className="material-icons text-xs text-[#1565d8]">verified</span>
                  <span className="text-[10px] md:text-xs font-bold text-[#091e42] tracking-wide">Trusted by 10,000+ Students Across India</span>
               </div>
               <h1 className="text-3xl md:text-6xl font-black leading-tight tracking-tight text-[#091e42]">
                  The Smartest Way to <span className="text-[#1565d8]">Save ₹3,000</span> & Book PTE Fast
               </h1>
               <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                  Authorized all-in-one platform for PTE vouchers. Instant delivery, 24/7 WhatsApp support, and 100% secure bookings.
               </p>
               
               <div className="space-y-3">
                  {["Instant delivery in 60 seconds", "No hidden charges", "Valid for 12 months"].map(f => (
                    <div key={f} className="flex items-center gap-3">
                       <span className="material-icons text-green-500 bg-green-50 rounded-full p-1 text-sm">check</span>
                       <span className="text-sm md:text-base font-bold text-[#091e42]/80">{f}</span>
                    </div>
                  ))}
               </div>

               <div className="flex items-center gap-4 pt-2">
                  <div className="flex text-amber-400">
                     {[1,2,3,4,5].map(i => <span key={i} className="material-icons text-lg md:text-xl">star</span>)}
                  </div>
                  <p className="text-sm md:text-base font-bold text-[#091e42]">4.9/5 from 8,000+ reviews</p>
               </div>
            </div>

            {/* Hero Right: THE FORM (Moved here per request) */}
            <div className="relative" id="purchase">
               {/* Quick Tag like screenshot */}
               <div className="absolute -top-6 -right-6 md:-right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 z-20 hidden md:flex items-center gap-3 animate-bounce">
                  <div className="w-10 h-10 bg-[#1565d8] rounded-xl flex items-center justify-center text-white"><span className="material-icons">bolt</span></div>
                  <div>
                    <p className="text-xs font-black text-[#091e42]">Instant Setup</p>
                    <p className="text-[10px] text-slate-400 font-bold">Delivery in 60s</p>
                  </div>
               </div>

               <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-3xl p-8 md:p-12 border border-slate-50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#1565d8]"></div>
                  <div className="text-center mb-8">
                    <h2 className="text-xl md:text-3xl font-black text-[#091e42] mb-2">Book Your Voucher</h2>
                    <p className="text-xs md:text-base text-slate-400 font-bold tracking-tight">Fill details to get your discount code</p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-20 space-y-6 animate-in zoom-in-95">
                       <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><span className="material-icons text-5xl">check_circle</span></div>
                       <h3 className="text-2xl font-black text-[#091e42]">Order Initiated!</h3>
                       <p className="text-slate-500 font-bold">Connecting to secure payment gateway...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                       <input name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-[#1565d8] font-bold text-sm md:text-base transition-all" placeholder="Full Name *" required />
                       <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-[#1565d8] font-bold text-sm md:text-base transition-all" placeholder="WhatsApp Number *" maxLength={10} required />
                       <input name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-[#1565d8] font-bold text-sm md:text-base transition-all" placeholder="Email Address *" type="email" required />
                       
                       <div className="relative">
                          <select name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-[#1565d8] font-bold text-sm md:text-base appearance-none cursor-pointer transition-all" required>
                            <option value="" disabled>Choose State *</option>
                            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <span className="material-icons absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                       </div>

                       <div className="relative">
                          <select name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-[#1565d8] font-bold text-sm md:text-base appearance-none cursor-pointer transition-all" required>
                            <option value="" disabled>Quantity *</option>
                            {[1,2,3,4,5].map(n => <option key={n} value={n.toString()}>{n} Voucher{n > 1 ? 's' : ''}</option>)}
                          </select>
                          <span className="material-icons absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                       </div>

                       <button type="submit" className="w-full bg-[#1565d8] text-white py-4 md:py-5 rounded-xl font-black text-sm md:text-lg uppercase tracking-widest hover:bg-[#091e42] transition-all shadow-xl mt-4 flex items-center justify-center gap-2">
                          Buy Voucher Now <span className="material-icons">arrow_forward</span>
                       </button>

                       {error && <p className="text-center font-bold text-red-500 text-xs mt-2">{error}</p>}
                       <p className="text-center text-[10px] md:text-xs text-slate-400 font-medium">100% Secure Transaction. 256-bit SSL Encryption.</p>
                    </form>
                  )}
               </div>
            </div>
          </div>
        </header>
        {/* Trust Bar & Video Section Wrapper - Unified Background to eliminate blandness */}
        <div className="bg-[#f0f7ff] relative overflow-hidden -mt-1">
           <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           
           {/* Trust Bar - Moving Animation */}
           <div className="py-10 border-b border-[#1565d8]/10 relative z-20 overflow-hidden">
              <div className="flex animate-marquee-fast whitespace-nowrap gap-12 md:gap-24 items-center">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="flex gap-12 md:gap-24 items-center shrink-0">
                      {["Pearson VUE", "Oxford University", "Cambridge Assessment", "IDP Global", "British Council", "PTE Academic"].map(brand => (
                        <span key={brand} className="text-xl md:text-3xl font-black tracking-tighter text-[#1565d8] hover:text-[#091e42] transition-colors">{brand}</span>
                      ))}
                   </div>
                 ))}
              </div>
           </div>

           {/* Video Guide Section - Straight Frame per request */}
           <section className="py-12 md:py-20 px-4 md:px-6 lg:px-16 relative z-10">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                 <div className="order-2 lg:order-1 space-y-6">
                    <div className="aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border-8 border-white shadow-3xl bg-black transition-transform duration-500">
                       <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Guide" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="flex justify-center gap-6 md:gap-10">
                       <div className="text-center"><p className="text-xl md:text-2xl font-black text-[#1565d8]">100%</p><p className="text-[10px] font-bold text-slate-400 uppercase">Secure</p></div>
                       <div className="text-center"><p className="text-xl md:text-2xl font-black text-[#1565d8]">Instant</p><p className="text-[10px] font-bold text-slate-400 uppercase">Discount</p></div>
                       <div className="text-center"><p className="text-xl md:text-2xl font-black text-[#1565d8]">Verified</p><p className="text-[10px] font-bold text-slate-400 uppercase">Process</p></div>
                    </div>
                 </div>
                 <div className="space-y-8 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-3 bg-[#1565d8]/10 px-4 py-2 rounded-full border border-[#1565d8]/10">
                       <span className="material-icons text-xs text-[#1565d8]">play_circle_filled</span>
                       <span className="text-[10px] md:text-xs font-bold text-[#1565d8] tracking-wide uppercase">Video Tutorial</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#091e42] leading-tight">Master the Booking <br /><span className="text-[#1565d8]">Process in 2 Minutes</span></h2>
                    <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed">Don't risk making mistakes. Watch exactly how to redeem your voucher and ensure your exam slot is booked correctly.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       {[
                         { icon: "ads_click", title: "Apply Code", desc: "Where to paste your code.", color: "bg-[#1565d8]/10", text: "text-[#1565d8]" },
                         { icon: "savings", title: "Instant Save", desc: "Watch the fee drop to zero.", color: "bg-green-50", text: "text-green-600" },
                         { icon: "schedule", title: "Select Slot", desc: "Pick best centers & dates.", color: "bg-amber-50", text: "text-amber-600" },
                         { icon: "verified", title: "Final Step", desc: "Registration without extra pay.", color: "bg-purple-50", text: "text-purple-600" }
                       ].map((item, i) => (
                         <div key={i} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-2">
                            <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center ${item.text}`}><span className="material-icons">{item.icon}</span></div>
                            <h4 className="font-black text-[#091e42] text-sm md:text-base">{item.title}</h4>
                            <p className="text-[10px] md:text-xs text-slate-400 font-medium leading-tight">{item.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* Why Choose Us - Reduced Blueness */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-16 bg-slate-50 relative">
           <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                 <h2 className="text-3xl md:text-5xl font-black text-[#091e42] tracking-tight">Expert Booking Guidance</h2>
                 <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">Fryment is India's most trusted partner for PTE Exam vouchers. We help students realize their international dreams by making the examination process affordable and stress-free.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4">
                    {["Instant Code Delivery", "Verified by Thousands", "ISO 27001 Security", "24/7 Live Expert Support"].map(item => (
                      <div key={item} className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-100 font-black text-[#091e42] text-sm md:text-base shadow-sm">
                        <span className="material-icons text-[#1565d8]">task_alt</span>{item}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white p-10 md:p-16 rounded-[2rem] md:rounded-[4rem] border border-slate-100 grid grid-cols-2 gap-6 md:gap-10 text-center shadow-xl">
                 <div className="space-y-1"><p className="text-2xl md:text-4xl font-black text-[#1565d8]">₹2,800</p><p className="text-[8px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest">Savings</p></div>
                 <div className="space-y-1"><p className="text-2xl md:text-4xl font-black text-[#1565d8]">100%</p><p className="text-[8px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest">Legitimacy</p></div>
                 <div className="space-y-1"><p className="text-2xl md:text-4xl font-black text-[#1565d8]">60 Sec</p><p className="text-[8px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest">Delivery</p></div>
                 <div className="space-y-1"><p className="text-2xl md:text-4xl font-black text-[#1565d8]">12 Mo</p><p className="text-[8px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest">Validity</p></div>
              </div>
           </div>
        </section>

        {/* FLIP CARD TESTIMONIALS */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-16 bg-white overflow-hidden">
           <div className="max-w-[1920px] mx-auto mb-10 md:mb-16 text-center">
              <span className="text-[#1565d8] font-black text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 block text-center">Student Stories</span>
              <h2 className="text-2xl md:text-4xl font-black text-[#091e42]">Trusted Internationally</h2>
           </div>
           <div className="relative flex overflow-hidden py-10">
             <div className="animate-marquee whitespace-nowrap flex gap-10 items-center">
               {[...testimonials, ...testimonials].map((t, i) => (
                 <div key={i} 
                      onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                      className={`w-[280px] h-[380px] shrink-0 group perspective-1000 ${i % 2 === 0 ? '-translate-y-6' : 'translate-y-6'}`}>
                    <div className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${flippedCard === i ? 'rotate-y-180' : 'group-hover:rotate-y-180'}`}>
                      <div className="absolute w-full h-full backface-hidden rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-slate-50">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#091e42] to-transparent p-6 pt-16 text-white text-center">
                          <p className="font-black text-lg">{t.name}</p>
                        </div>
                      </div>
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#1565d8] rounded-[2.5rem] flex flex-col justify-center p-8 whitespace-normal border-4 border-white text-center shadow-2xl">
                         <span className="material-icons text-[#fbbc04] text-4xl mb-4">format_quote</span>
                         <p className="text-white text-sm font-bold leading-relaxed">"{t.content}"</p>
                         <p className="text-[#fbbc04] font-black text-[9px] uppercase mt-4 tracking-widest">{t.role}</p>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* PROOF GALLERY */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-16 bg-slate-50 overflow-hidden">
           <div className="max-w-[1920px] mx-auto text-center mb-10 md:mb-16"><h2 className="text-2xl md:text-4xl font-black text-[#091e42]">Live Delivery Proof</h2></div>
           <div className="relative flex overflow-hidden py-20 bg-white rounded-[4rem] shadow-sm">
             <div className="animate-marquee-reverse whitespace-nowrap flex gap-10 items-center">{[...evidencePhotos, ...evidencePhotos].map((url, i) => (<div key={i} className={`w-[260px] h-[350px] shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform transition-all ${i % 2 === 0 ? '-translate-y-8' : 'translate-y-8'}`}><img src={url} alt="Proof" className="w-full h-full object-cover" /></div>))}</div>
           </div>

           {/* Comparison Section */}
           <section className="py-12 md:py-32 px-4 md:px-6 lg:px-16 bg-white relative mt-16 rounded-[2rem]">
              <div className="max-w-[1400px] mx-auto">
                 <div className="text-center mb-10 md:mb-24"><h2 className="text-xl md:text-5xl font-black text-[#1565d8] mb-2">Why Fryment Wins?</h2><p className="text-slate-400 font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase text-[8px] md:text-xs text-center">Direct Comparison</p></div>
                 <div className="bg-white rounded-xl md:rounded-[4rem] shadow-2xl overflow-x-auto border-2 md:border-8 border-slate-50">
                    <table className="w-full text-left min-w-[300px] md:min-w-[600px]">
                       <thead><tr className="bg-[#1565d8] text-white"><th className="p-3 md:p-10 font-black uppercase text-[8px] md:text-xs tracking-widest">Core Feature</th><th className="p-3 md:p-10 font-black uppercase text-[8px] md:text-xs tracking-widest text-[#fbbc04]">Fryment</th><th className="p-3 md:p-10 font-black uppercase text-[8px] md:text-xs tracking-widest opacity-40">Others</th></tr></thead>
                       <tbody>{comparisonPoints.map((row, i) => (<tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"><td className="p-3 md:p-10 font-black text-[#091e42] text-[10px] md:text-lg">{row.feature}</td><td className="p-3 md:p-10 font-bold text-[#1565d8] text-[10px] md:text-lg flex items-center gap-2 md:gap-4"><span className="material-icons text-green-500 text-[10px] md:text-base">verified</span> {row.prestige}</td><td className="p-3 md:p-10 font-medium text-slate-400 text-[10px] md:text-lg opacity-60">{row.others}</td></tr>))}</tbody>
                    </table>
                 </div>
              </div>
           </section>
        </section>

        {/* Blogs */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-16 bg-white" id="blogs">
           <div className="max-w-[1920px] mx-auto">
              <div className="mb-10 md:mb-16 text-center"><h2 className="text-2xl md:text-4xl font-black text-[#091e42]">PTE Resources</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                 {blogs.map((blog, i) => (
                   <div key={i} className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 transition-all hover:-translate-y-3">
                      <div className="aspect-video overflow-hidden"><img src={blog.img} className="w-full h-full object-cover" /></div>
                      <div className="p-8 md:p-12 space-y-4">
                         <h4 className="text-xl md:text-2xl font-black text-[#091e42] leading-tight">{blog.title}</h4>
                         <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{blog.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FAQs Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 lg:px-16 bg-slate-50" id="faq">
           <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-8 md:mb-12"><h2 className="text-xl md:text-3xl font-black text-[#1565d8]">Common Questions</h2></div>
              <div className="space-y-3 md:space-y-4">
                 {faqs.map((faq, idx) => (
                   <div key={idx} className="bg-white rounded-lg md:rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:border-[#1565d8]">
                      <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className={`w-full text-left px-4 md:px-8 py-3 md:py-5 flex justify-between items-center transition-all ${activeFaq === idx ? 'bg-[#1565d8] text-white' : 'hover:bg-[#1565d8]/5'}`}><span className="text-xs md:text-lg font-black tracking-tight pr-4">{faq.q}</span><span className="material-icons text-lg md:text-xl">{activeFaq === idx ? 'expand_less' : 'expand_more'}</span></button>
                      <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[800px]' : 'max-h-0'}`}><div className="px-4 md:px-8 py-3 md:py-5 text-[10px] md:text-base text-slate-500 font-medium leading-relaxed bg-white">{faq.a}</div></div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#091e42] pt-20 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 lg:px-16 text-white text-center md:text-left">
         <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
            <div className="md:col-span-2 space-y-6 md:space-y-10">
               <span className="text-3xl md:text-4xl font-black">Fryment</span>
               <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl leading-relaxed">Reliable PTE vouchers for Indian Students. Verified and secure transactions only.</p>
            </div>
            <div className="space-y-4 md:space-y-6">
               <h5 className="text-[10px] md:text-[11px] font-black text-amber-400 tracking-widest uppercase">Support</h5>
               <p className="font-bold text-base md:text-lg">hello@fryment.com</p>
               <p className="font-bold text-base md:text-lg">+91 93252 16364</p>
            </div>
         </div>
         <div className="max-w-[1920px] mx-auto mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">© 2024 Fryment. Authorized Pearson Partner.</p>
         </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 50s linear infinite; }
        .animate-marquee-fast { animation: marquee-fast 30s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
