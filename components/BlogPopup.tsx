"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShownPopup) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY;
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollPos / (scrollHeight - clientHeight)) * 100;
      
      // Show after 20% scroll for faster engagement
      if (scrollPercentage >= 20) {
        setShowPopup(true);
        setHasShownPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShownPopup]);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-white/10 backdrop-blur-[20px] animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-in zoom-in-95 duration-500">
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-md flex items-center justify-center text-[#091e42] transition-all z-30 border border-black/5"
          aria-label="Close popup"
        >
          <span className="material-icons text-xl font-bold">close</span>
        </button>

        {/* Content Link */}
        <Link 
          href="/pte#purchase" 
          onClick={handleClose}
          className="block relative cursor-pointer"
        >
          <div className="relative aspect-[1.6/1] w-full overflow-hidden">
            <img 
              src="/pte-offer-popup.png" 
              alt="PTE Discount Offer - Save ₹3000" 
              className="w-full h-full object-cover"
            />
            
            {/* Real Button Overlay - Positioned more clearly over the graphic */}
            <div className="absolute bottom-[10%] right-[6%] z-20">
              <div className="bg-[#ffcc00] hover:bg-[#ffdb4d] text-[#091e42] px-10 py-5 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3 border-b-4 border-black/20 active:border-0 active:translate-y-1">
                Get Coupon Now
                <span className="material-icons group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
