"use client";

import { useState } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";

const faqs = [
  {
    question: "What is Lead King?",
    answer: "Lead King is an AI-powered lead generation and campaign automation platform that helps businesses generate high-quality leads from around the world."
  },
  {
    question: "How does the Ultra Campaign Generator work?",
    answer: "Our Ultra Campaign Generator uses AI to create complete marketing campaigns in minutes. Just provide your business details and our AI handles the rest."
  },
  {
    question: "What countries do you support?",
    answer: "Lead King supports lead generation from all countries worldwide. Our AI-powered targeting ensures you get the best leads regardless of location."
  },
  {
    question: "How much does it cost?",
    answer: "We offer flexible pricing plans to suit businesses of all sizes. Check our pricing page for detailed information on plans and features."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No technical knowledge required! Lead King is designed to be user-friendly. Anyone can create and launch campaigns with our intuitive interface."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer 24/7 customer support via email and live chat. Our team is always ready to help you succeed with Lead King."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <PublicNav />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">Everything you need to know about Lead King</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg" style={{ backgroundColor: "#111827" }}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <span className="text-2xl text-gray-400">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
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
  );
}

