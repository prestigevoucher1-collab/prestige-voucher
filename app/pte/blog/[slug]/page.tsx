import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Metadata, ResolvingMetadata } from 'next';
import BlogPopup from '@/components/BlogPopup';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata
export const revalidate = 0; // Disable caching for now to see live updates

export async function generateMetadata(
  { params }: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.meta_title || `${blog.title} | Fryment Blog`,
    description: blog.meta_description || blog.excerpt,
    keywords: blog.meta_keyword,
    alternates: {
      canonical: blog.canonical_url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.og_img_url || blog.feature_img_url || ''],
    },
  };
}

export default async function BlogSinglePage({ params }: BlogPageProps) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  // Calculate read time
  const wordCount = blog.concept?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Determine if it's a full HTML document
  const isFullHtml = blog.concept?.toLowerCase().includes('<!doctype') || blog.concept?.toLowerCase().includes('<html');

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Article Header */}
      <header className="bg-surface-dim pt-16 pb-12 px-4 border-b border-outline-variant">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/pte/blog" 
            className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:text-accent transition-colors group"
          >
            <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Articles
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-primary mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-on-surface-variant font-bold">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {readTime} Min Read
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              {blog.author || 'Fryment Team'}
            </span>
            <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs uppercase tracking-widest">
              PTE Academic
            </span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        {isFullHtml ? (
          <div className="w-full bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-sm min-h-[800px] flex flex-col">
            <iframe 
              srcDoc={blog.concept} 
              className="w-full flex-1 min-h-[800px] border-none"
              title={blog.title}
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-12">
            {/* Social Sidebar */}
            <aside className="md:w-16 flex md:flex-col gap-4 py-4 order-2 md:order-1 border-t md:border-t-0 border-outline-variant mt-8 md:mt-0">
               <span className="hidden md:block text-[10px] uppercase font-extrabold text-on-surface-variant tracking-widest text-center mb-2">Share</span>
               <button className="p-3 bg-surface-dim hover:bg-primary hover:text-white rounded-2xl transition-all border border-outline-variant flex-1 md:flex-none flex items-center justify-center">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
               </button>
               <button className="p-3 bg-surface-dim hover:bg-primary hover:text-white rounded-2xl transition-all border border-outline-variant flex-1 md:flex-none flex items-center justify-center">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
               </button>
            </aside>

            {/* Content */}
            <main className="flex-1 order-1 md:order-2">
              <div 
                className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:text-primary prose-p:font-body prose-p:text-on-surface/80 prose-a:text-accent prose-a:font-bold prose-img:rounded-3xl"
                dangerouslySetInnerHTML={{ __html: blog.concept || '' }}
              />
              
              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-outline-variant">
                 <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Topic Tags</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="px-4 py-1.5 bg-surface-dim rounded-full text-xs font-bold text-primary">PTE Exam</span>
                   <span className="px-4 py-1.5 bg-surface-dim rounded-full text-xs font-bold text-primary">Study Guide</span>
                   <span className="px-4 py-1.5 bg-surface-dim rounded-full text-xs font-bold text-primary">Preparation</span>
                 </div>
              </div>
            </main>
          </div>
        )}
      </div>

      {/* Footer CTA - Compact Version */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <div className="bg-[#1565d8] rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-white mb-3 relative z-10 leading-tight">
            Ready to Ace Your <span className="text-accent">PTE Academic</span>?
          </h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto text-sm md:text-base font-body relative z-10 opacity-90">
            Get personalized coaching and the best study materials from Fryment Academic.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link 
              href="/contact" 
              className="bg-accent text-on-accent px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent-light transition-all shadow-lg shadow-accent/20"
            >
              Book Free Demo
            </Link>
            <Link 
              href="/pte" 
              className="bg-white/10 text-white backdrop-blur-sm px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <BlogPopup />
    </article>
  );
}
