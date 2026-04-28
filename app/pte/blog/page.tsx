import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogPopup from '@/components/BlogPopup';

export const metadata = {
  title: 'Blog - Fryment PTE Academic Preparation',
  description: 'Expert tips, study guides, and the latest news for PTE Academic exam preparation.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogListPage() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'Published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  }

  return (
    <div className="bg-surface-dim min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1565d8] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-6 tracking-tight">
            Fryment <span className="text-accent">Blog</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-body">
            Stay ahead with the latest PTE exam patterns, expert strategies, and study materials curated by professionals.
          </p>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {!blogs || blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant shadow-sm">
            <h2 className="text-2xl font-headline font-bold text-primary">No blogs yet</h2>
            <p className="text-on-surface-variant mt-2 font-body">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-3xl overflow-hidden border border-outline-variant hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="relative h-56 w-full bg-primary-light overflow-hidden">
                  {blog.feature_img_url ? (
                    <img 
                      src={blog.feature_img_url} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-4xl font-headline font-bold">FRYMENT</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-on-accent text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                      PTE Prep
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1.5">
                       <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-headline font-extrabold text-primary mb-3 line-clamp-2 leading-tight">
                    <Link href={`/pte/blog/${blog.slug}`} className="hover:text-accent transition-colors">
                      {blog.title}
                    </Link>
                  </h2>
                  
                  <p className="text-on-surface-variant font-body text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {blog.excerpt || 'No summary available.'}
                  </p>
                  
                  <Link 
                    href={`/pte/blog/${blog.slug}`} 
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-accent transition-colors group/link"
                  >
                    Read Article
                    <svg className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-primary-dark py-16 px-4">
        <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-8 md:p-12 border border-white/10 text-center relative overflow-hidden">
           <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent rounded-full opacity-10 blur-3xl"></div>
           <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4 relative z-10">Get Expert Tips Directly</h3>
           <p className="text-blue-100 mb-8 max-w-lg mx-auto font-body relative z-10">
             Subscribe to our weekly newsletter and never miss out on the latest PTE preparation strategies.
           </p>
           <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="flex-1 bg-white rounded-xl px-6 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-accent transition-all font-body"
             />
             <button className="bg-accent text-on-accent px-8 py-3 rounded-xl font-bold hover:bg-accent-light transition-all shadow-lg shadow-accent/20">
               Join Now
             </button>
           </form>
        </div>
      </section>
      <BlogPopup />
    </div>
  );
}
