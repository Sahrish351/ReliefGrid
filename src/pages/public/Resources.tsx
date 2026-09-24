import React from 'react';
import { FileText, Download, Code, Database, Shield, BookOpen } from 'lucide-react';

export const Resources: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Documentation &amp; Standards</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-950 mt-1">
          Humanitarian Developer Resources &amp; Schemas
        </h1>
        <p className="text-charcoal-600 text-sm sm:text-base mt-2">
          Open schemas, PostgreSQL DDL migrations, Supabase RLS policies, and Gemini agent JSON prompt definitions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <Database className="w-6 h-6 text-navy-900" />
          <h3 className="font-bold text-base text-navy-950">PostgreSQL / Supabase Schema</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Full 27-table DDL including profiles, incidents, vulnerabilities, resources, hospitals, shelters, and audit logs.
          </p>
          <div className="text-xs font-mono text-navy-700 bg-navy-50 p-2 rounded">
            supabase/schema.sql
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <Code className="w-6 h-6 text-emergency-600" />
          <h3 className="font-bold text-base text-navy-950">Multi-Agent AI JSON Schemas</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Strict input and output JSON definitions for Incident Intelligence, Triage scoring, and Response Planning.
          </p>
          <div className="text-xs font-mono text-navy-700 bg-navy-50 p-2 rounded">
            02_RELIEFGRID_AGENTIC_AI.md
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <Shield className="w-6 h-6 text-green-600" />
          <h3 className="font-bold text-base text-navy-950">Security &amp; RLS Policies</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Role-Based Access Control matrix for Citizens, Responders, Hospital staff, Coordinators, and Admins.
          </p>
          <div className="text-xs font-mono text-navy-700 bg-navy-50 p-2 rounded">
            03_RELIEFGRID_SUPABASE.md
          </div>
        </div>

      </div>
    </div>
  );
};
