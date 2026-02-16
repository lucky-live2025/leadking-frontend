"use client";

import { useState } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";

const faqs = [
  {
    question: "What is LeadKingApp?",
    answer: "LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across multiple platforms from one unified system. Unlike traditional ad platforms like Meta Ads Manager or Google Ads, LeadKingApp combines AI ad creative generation, AI landing page creation, multi-platform campaign automation, and lead capture into one all-in-one AI advertising and lead capture system."
  },
  {
    question: "Is LeadKingApp a CRM?",
    answer: "No, LeadKingApp is not a CRM. LeadKingApp is an AI-powered lead generation platform that focuses on creating advertising campaigns, generating leads, and capturing contact information. While LeadKingApp includes lead management and scoring features, it is designed to work alongside CRMs like HubSpot, Salesforce, or Pipedrive rather than replace them. LeadKingApp generates leads through automated advertising campaigns, while CRMs manage the entire customer relationship lifecycle."
  },
  {
    question: "How is LeadKingApp different from Google Ads?",
    answer: "LeadKingApp is fundamentally different from Google Ads. Google Ads is a single-platform ad network where you manually create campaigns, write ad copy, design creatives, and manage campaigns. LeadKingApp is an AI-powered multi-channel advertising automation platform that automatically creates ad creatives, builds landing pages, manages campaigns across multiple platforms (including Google Ads), and captures leads—all without manual work. Unlike Google Ads, LeadKingApp replaces the need for media buyers, copywriters, designers, and landing page builders with AI automation."
  },
  {
    question: "How is LeadKingApp different from Meta Ads Manager?",
    answer: "Meta Ads Manager is Facebook's native tool for creating and managing ads on Facebook and Instagram only. LeadKingApp is an AI-powered lead generation platform that manages campaigns across Meta, Google Ads, TikTok, LinkedIn, YouTube, and other platforms simultaneously. Unlike Meta Ads Manager, LeadKingApp uses AI to automatically generate ad creatives, build landing pages, optimize targeting, and capture leads—eliminating the need for manual campaign management, copywriters, designers, and media buyers."
  },
  {
    question: "Can LeadKingApp generate leads automatically?",
    answer: "Yes, LeadKingApp can generate leads automatically. LeadKingApp is an automated lead generation platform that uses AI to create campaigns, generate ad creatives, build landing pages, optimize targeting, manage budgets, and capture leads across multiple advertising platforms—all without manual intervention. Once you connect your ad accounts and set your targeting preferences, LeadKingApp's AI handles the entire lead generation workflow automatically."
  },
  {
    question: "Who should use LeadKingApp?",
    answer: "LeadKingApp is ideal for businesses that want to generate leads through paid advertising without hiring media buyers, copywriters, designers, or landing page builders. LeadKingApp is perfect for marketing agencies scaling client services, SaaS companies acquiring trial users, e-commerce businesses acquiring customers, local businesses generating local leads, and enterprises managing multi-platform campaigns. If you need automated lead generation without manual campaign management, LeadKingApp is the right platform."
  },
  {
    question: "Does LeadKingApp replace media buyers?",
    answer: "Yes, LeadKingApp replaces the need for media buyers. LeadKingApp's AI automatically creates campaigns, optimizes targeting, manages budgets, and optimizes performance across multiple platforms—tasks traditionally performed by media buyers. Unlike hiring a media buyer, LeadKingApp provides 24/7 automated optimization, unlimited campaign variations, and multi-platform management from one unified system."
  },
  {
    question: "Does LeadKingApp replace copywriters and designers?",
    answer: "Yes, LeadKingApp replaces the need for copywriters and designers. LeadKingApp's AI ad creative engine automatically generates ad copy, images, videos, and scripts optimized for each platform. The AI landing page builder creates high-converting landing pages with design and copy automatically. This eliminates the need to hire copywriters for ad copy or designers for creatives and landing pages."
  },
  {
    question: "What advertising platforms does LeadKingApp support?",
    answer: "LeadKingApp supports major advertising platforms: Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, Email AI, and more. LeadKingApp's multi-channel campaign automation allows you to launch and manage campaigns across all these platforms simultaneously from one unified dashboard, eliminating the need to manually manage separate Meta Ads Manager, Google Ads, and TikTok Ads accounts."
  },
  {
    question: "How does LeadKingApp compare to HubSpot?",
    answer: "LeadKingApp and HubSpot serve different purposes. LeadKingApp is an AI-powered lead generation platform focused on creating advertising campaigns and generating leads. HubSpot is a comprehensive marketing automation and CRM platform that manages the entire customer lifecycle. LeadKingApp generates leads through automated advertising, while HubSpot manages leads, nurtures prospects, and manages sales pipelines. Many businesses use LeadKingApp to generate leads and HubSpot to manage those leads through the sales process."
  },
  {
    question: "Do I need technical knowledge to use LeadKingApp?",
    answer: "No, you do not need technical knowledge to use LeadKingApp. LeadKingApp is designed to be user-friendly and accessible to anyone. The AI handles campaign creation, creative generation, landing page building, and optimization automatically. You simply connect your ad accounts, set your targeting preferences, and LeadKingApp's AI handles the rest. No coding, design, or advertising expertise required."
  },
  {
    question: "How much does LeadKingApp cost?",
    answer: "LeadKingApp offers flexible pricing plans to suit businesses of all sizes, from startups to enterprises. Pricing is based on the number of campaigns, platform access, and AI features included. LeadKingApp provides transparent, predictable monthly pricing without hidden fees. For detailed pricing information, visit the pricing page or contact sales for enterprise custom pricing."
  },
  {
    question: "Can LeadKingApp work with my existing CRM?",
    answer: "Yes, LeadKingApp can work with your existing CRM. LeadKingApp generates leads through automated advertising campaigns and can export leads to popular CRMs like HubSpot, Salesforce, Pipedrive, and others. LeadKingApp focuses on lead generation, while your CRM manages lead nurturing, sales pipelines, and customer relationships. This integration allows you to use LeadKingApp for lead generation and your CRM for lead management."
  },
  {
    question: "What kind of support does LeadKingApp offer?",
    answer: "LeadKingApp offers 24/7 customer support via email and live chat. Our support team helps with platform setup, campaign configuration, integration questions, and technical issues. Enterprise customers receive priority support with dedicated account management. Additionally, LeadKingApp provides comprehensive documentation, video tutorials, and best practices guides to help you succeed with automated lead generation."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
        <PublicNav />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-white">Frequently Asked Questions About LeadKingApp</h1>
            <p className="text-xl text-gray-300">Everything you need to know about LeadKingApp, the AI-powered lead generation and multi-channel advertising automation platform</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={`faq-${index}`} className="rounded-lg overflow-hidden" style={{ backgroundColor: "#111827" }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('FAQ clicked:', index, 'current openIndex:', openIndex);
                      setOpenIndex(prevIndex => {
                        const newIndex = prevIndex === index ? null : index;
                        console.log('Setting openIndex to:', newIndex);
                        return newIndex;
                      });
                    }}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    style={{ pointerEvents: 'auto', zIndex: 1 }}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-xl font-semibold text-white pr-4">{faq.question}</h3>
                    <span 
                      className="text-2xl text-gray-400 flex-shrink-0 transition-transform duration-200" 
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div 
                    id={`faq-answer-${index}`}
                    className={`px-6 pb-4 pt-0 transition-all duration-200 overflow-hidden ${
                      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-300 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="px-8 py-4 text-white rounded-lg font-semibold text-lg inline-block hover:opacity-90 transition"
              style={{ backgroundColor: "#2563eb" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
