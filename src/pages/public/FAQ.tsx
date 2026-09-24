import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'Is RELIEFGRID AI connected to live emergency 1122 dispatch in production?',
      a: 'This prototype runs on synthetic demonstration data modeled on real Pakistan geography (Lahore, Karachi, Rawalpindi, Islamabad, Multan). It is designed for hackathon evaluation and architectural proof-of-concept, and explicitly does not trigger real-world sirens or emergency service phone lines.',
    },
    {
      q: 'Why is human approval mandatory before dispatching rescue units?',
      a: 'Consequential emergency response actions carry immediate real-world safety implications. Under our Responsible AI guardrails (02_RELIEFGRID_AGENTIC_AI.md), AI agents synthesize options and explain why a unit was selected, but an authorized human coordinator must review and click Approve before orders are issued.',
    },
    {
      q: 'How does Gemini extract details from natural language reports?',
      a: 'The Incident Intelligence Agent uses Gemini with strict JSON schema response formatting. It parses colloquial text in English, Urdu, or Roman Urdu, detecting victim counts, infant presence, rising water depths, and oxygen dependencies.',
    },
    {
      q: 'How are duplicate emergency calls handled during large events?',
      a: 'The Verification Agent uses geospatial clustering (500-meter radius) and cosine similarity to flag repeat calls about the same building or street. Rather than discarding reports, it links them under a master incident so responders have complete situational context.',
    },
    {
      q: 'How are sensitive patient records and citizen privacy safeguarded?',
      a: 'Personal identifiable information (PII) such as CNIC and private phone numbers are kept in encrypted database tables guarded by Supabase Row Level Security (RLS). Public boards show only first names and generalized vicinity landmarks.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-navy-700" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
          Frequently Asked Questions
        </h1>
        <p className="text-charcoal-600 text-sm mt-1">
          Detailed operational, ethical, and technical answers about RELIEFGRID AI.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-bold text-navy-950 hover:bg-charcoal-50"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-navy-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-charcoal-400 flex-shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
