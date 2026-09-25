import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const FAQS = [
    {
      category: 'General & Prototype',
      q: 'Is RELIEFGRID connected to live emergency 1122 dispatch in production?',
      a: 'This prototype operates on synthetic demonstration data modeled on actual Pakistan geography (Lahore, Karachi, Rawalpindi, Islamabad, Multan). It is built for hackathon evaluation and architectural proof-of-concept. It explicitly displays persistent disclaimers and does not trigger real-world sirens or emergency service lines.',
    },
    {
      category: 'AI Architecture & Ethics',
      q: 'Why is human approval mandatory before dispatching rescue units?',
      a: 'Consequential emergency response decisions carry life-and-death safety implications. In accordance with our Responsible AI charter, AI agents synthesize recommendations, explain the underlying factors, and calculate routes, but a certified human coordinator must review and click Approve before dispatch orders are transmitted.',
    },
    {
      category: 'AI Architecture & Ethics',
      q: 'How does Gemini extract details from natural-language reports?',
      a: 'The Incident Intelligence Agent uses Gemini with strict JSON schema response enforcement. It parses colloquial distress calls in English, Urdu, or Roman Urdu, detecting victim counts, infant presence, rising water depths, oxygen dependencies, and landmark approximations.',
    },
    {
      category: 'AI Architecture & Ethics',
      q: 'What happens if Google Gemini experiences high-demand 503 surges?',
      a: 'The server features an automated multi-tier failover engine: gemini-3.6-flash -> gemini-3.5-flash -> gemini-flash-latest -> gemini-3.1-flash-lite -> internal deterministic rule-engine. The system never hangs or fails during peak demonstration evaluations.',
    },
    {
      category: 'Responders & Command',
      q: 'How are duplicate emergency calls handled during large events?',
      a: 'The Verification Agent uses geospatial clustering within a 500-meter radius and semantic similarity to identify repeat calls about the same building or street. Rather than discarding reports, it links them under a single master incident with updated severity scores.',
    },
    {
      category: 'Privacy & Security',
      q: 'How are API keys and sensitive citizen data safeguarded?',
      a: 'GEMINI_API_KEY is isolated on the Node/Express backend on port 5000 and is never exposed to browser clients or committed to GitHub. Citizen data is protected by Supabase Row Level Security (RLS) policies allowing role-based access only.',
    },
    {
      category: 'Responders & Command',
      q: 'Can an Emergency Coordinator modify an AI recommendation before approving?',
      a: 'Yes. The Coordinator Command Center provides three distinct controls: Approve (accepts proposed craft and route), Modify (allows coordinator to select alternative rescue craft or adjust destination hospital), and Reject (requires logging a mandatory operational reason).',
    },
  ];

  const filteredFaqs = FAQS.filter((f) => {
    if (activeCategory !== 'All' && f.category !== activeCategory) return false;
    if (
      searchQuery &&
      !f.q.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.a.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 overflow-x-hidden">
      
      {/* 1. EDITORIAL HEADER */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-navy-700" />
          <span>KNOWLEDGE BASE &bull; COMMON INQUIRIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black font-heading text-navy-950 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-charcoal-600 text-base leading-relaxed">
          Detailed operational, ethical, and technical answers about RELIEFGRID&apos;s multi-agent architecture and emergency workflow.
        </p>
      </div>

      {/* 2. SEARCH & CATEGORY FILTER */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 bg-white border border-charcoal-200 px-4 py-3 rounded-2xl shadow-card">
          <Search className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search questions about AI models, privacy, human approval, or protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm bg-transparent focus:outline-none text-navy-950"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'General & Prototype', 'AI Architecture & Ethics', 'Responders & Command', 'Privacy & Security'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'bg-white border border-charcoal-200 text-charcoal-700 hover:text-navy-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ACCORDION DISCLOSURES */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between text-base font-bold text-navy-950 hover:bg-charcoal-50 transition-colors"
              >
                <span className="pr-4">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-navy-900 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100 pt-4 bg-charcoal-50/50">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal-400 mb-2">
                    {faq.category}
                  </div>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. FINAL CALLOUT */}
      <div className="bg-charcoal-50 rounded-3xl p-8 border border-charcoal-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-navy-950">Have a technical or research question?</h3>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
          Review our complete engineering documentation or contact our emergency coordination team directly.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/ai-technology"
            className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            AI Architecture Specs
          </Link>
          <Link
            to="/contact"
            className="bg-white border border-charcoal-200 text-navy-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-charcoal-100"
          >
            Contact Team
          </Link>
        </div>
      </div>

    </div>
  );
};
