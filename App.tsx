/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, ChevronRight, Briefcase, ShieldCheck, BarChart3, Globe, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <motion.section 
    id={id} 
    className={`section-padding ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.section>
);

const ExperienceCard = ({ role, summary, responsibilities, period }: { role: string; summary?: string; responsibilities: string[]; period?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8 last:mb-0 border-b border-slate-100 pb-8">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group flex justify-between items-start"
      >
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-brand-dark transition-colors">{role}</h3>
            {period && <span className="text-sm font-medium text-slate-500">{period}</span>}
          </div>
          {summary && <p className="text-slate-700 font-medium mb-2">{summary}</p>}
        </div>
        <div className="ml-4 mt-1 text-slate-400 group-hover:text-brand-dark transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 mt-4">
              {responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-600">
                  <ChevronRight className="w-4 h-4 mt-1 mr-2 text-brand-dark shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ 
  title, 
  summary, 
  background, 
  role, 
  actions, 
  outcome 
}: { 
  title: string; 
  summary: string;
  background: string; 
  role: string;
  actions: string[]; 
  outcome: string 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-white p-8 rounded-xl border transition-all duration-300 ${isExpanded ? 'border-brand-dark shadow-lg' : 'border-slate-200 shadow-sm hover:border-brand-dark/50 hover:shadow-md hover:-translate-y-1'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{title}</h3>
          <p className="text-slate-600 font-medium leading-relaxed">{summary}</p>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`ml-4 p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-brand-dark text-white rotate-180' : 'bg-slate-50 text-slate-400 hover:text-brand-dark'}`}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-slate-100 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Background</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{background}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">My Role</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{role}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Actions</h4>
                <ul className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3">
                  {actions.map((action, i) => (
                    <li key={i} className="flex items-start text-slate-600 text-sm leading-relaxed">
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-brand-dark shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-brand-dark">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Outcome / Value</h4>
                <p className="text-slate-900 font-medium text-sm leading-relaxed">{outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isExpanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="mt-6 text-sm font-bold text-brand-dark flex items-center hover:underline group"
        >
          View More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

const CareerTimeline = () => {
  const steps = [
    {
      title: "Legal Foundation",
      description: "Legal Counsel & Intern roles focusing on contracts, compliance, and IPO due diligence.",
      tag: "Legal",
      color: "bg-slate-200"
    },
    {
      title: "Internal Transition",
      description: "Strategic shift from legal support to business-facing operations within the same organization.",
      tag: "Promotion",
      color: "bg-brand-dark text-white",
      highlight: true
    },
    {
      title: "Business & Investment",
      description: "Business Supervisor role in Asset Management, focusing on investment analysis and project execution.",
      tag: "Current",
      color: "bg-slate-200"
    }
  ];

  return (
    <div className="relative py-12">
      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-slate-100 hidden md:block" />
      <div className="space-y-12">
        {steps.map((step, i) => (
          <motion.div 
            key={i} 
            className="relative flex flex-col md:flex-row md:items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 hidden md:flex">
              <div className={`w-3 h-3 rounded-full ${step.highlight ? 'bg-brand-dark animate-pulse' : 'bg-slate-300'}`} />
            </div>
            <div className={`md:ml-16 p-6 rounded-xl border-2 transition-all duration-300 ${step.highlight ? 'border-brand-dark bg-blue-50/30' : 'border-slate-100 bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900">{step.title}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${step.color}`}>
                  {step.tag}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-brand-dark tracking-tight">YUQING LIN</span>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <button onClick={() => scrollTo("about")} className="hover:text-brand-dark transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-dark transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollTo("experience")} className="hover:text-brand-dark transition-colors relative group">
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-dark transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollTo("work")} className="hover:text-brand-dark transition-colors relative group">
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-dark transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollTo("skills")} className="hover:text-brand-dark transition-colors relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-dark transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-brand-dark transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-dark transition-all group-hover:w-full" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-6">
                Yuqing Lin
              </h1>
              <p className="text-2xl md:text-3xl text-brand-dark font-medium mb-4">
                Cross-border Business & Risk Professional
              </p>
              <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                Supporting international business and investment decisions through legal, financial, and operational insight.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-12">
                {[
                  "Experience in cross-border business and international operations",
                  "Background in legal, compliance, and risk analysis",
                  "Involved in investment evaluation and asset management"
                ].map((point, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center space-x-3 text-slate-700 font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-dark" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollTo("experience")}
                  className="px-8 py-3 bg-brand-dark text-white rounded-md font-medium hover:bg-blue-900 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  View Experience
                </button>
                <button 
                  onClick={() => scrollTo("contact")}
                  className="px-8 py-3 border border-slate-300 text-slate-700 rounded-md font-medium hover:bg-white hover:border-brand-dark transition-all active:scale-95"
                >
                  Contact Me
                </button>
              </div>
            </motion.div>

            {/* Photo Content */}
            <motion.div 
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative group">
                {/* Decorative background elements */}
                <div className="absolute -inset-4 bg-brand-dark/5 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute -inset-4 border border-brand-dark/10 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                
                <div className="relative aspect-[4/5] w-full max-w-[360px] ml-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                  <img 
                    src="https://picsum.photos/seed/yuqing-professional/800/1000" 
                    alt="Yuqing Lin" 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Career Timeline Section */}
      <Section className="bg-white">
        <h2 className="heading-lg">Career Progression</h2>
        <CareerTimeline />
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-slate-50">
        <h2 className="heading-lg">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-lg text-muted">
            <p>
              I started my career in legal roles, focusing on cross-border contracts, compliance, and providing essential support for international business operations.
            </p>
            <p>
              Over time, I became more interested in how legal and compliance work connects with real business decisions. Through my close collaboration with business teams, I was given the opportunity to transition into a more business-facing role in asset management, where I worked on investment-related projects.
            </p>
          </div>
          <div className="space-y-6 text-lg text-muted">
            <p>
              I am comfortable working across multidisciplinary teams—including legal, finance, and business development—to ensure projects are both compliant and commercially viable.
            </p>
            <p>
              Currently, I am interested in roles that combine international business, risk awareness, and commercial decision-making, particularly within the Netherlands' vibrant international market.
            </p>
          </div>
        </div>
      </Section>

      {/* Strengths Section */}
      <Section>
        <h2 className="heading-lg">Core Strengths</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "International Business Support", items: ["Coordinating with diverse stakeholders", "Supporting cross-border operations", "Understanding trade and supply chain context"] },
            { icon: ShieldCheck, title: "Risk & Compliance Awareness", items: ["Legal due diligence", "Contract review and negotiation", "Identifying potential business risks"] },
            { icon: BarChart3, title: "Analytical Thinking", items: ["Basic financial analysis", "Evaluating project feasibility", "Supporting investment decisions"] }
          ].map((strength, i) => (
            <motion.div 
              key={i}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-brand-dark/30 hover:shadow-md transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <strength.icon className="w-10 h-10 text-brand-dark mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="heading-md">{strength.title}</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                {strength.items.map((item, j) => <li key={j}>• {item}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="bg-slate-50">
        <h2 className="heading-lg">Professional Experience</h2>
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <ExperienceCard 
            role="Business Supervisor – Asset Management & Operations"
            summary="Working on investment-related projects, including analysis, coordination, and execution support."
            responsibilities={[
              "Participated in sourcing and evaluating distressed asset opportunities",
              "Conducted legal and basic financial analysis for project feasibility",
              "Supported negotiations with banks and partners",
              "Assisted in post-investment asset management and resolution"
            ]}
            period="Current Role"
          />
          <ExperienceCard 
            role="Legal Counsel – Commercial & Compliance"
            summary="Supported international business operations from a legal and compliance perspective."
            responsibilities={[
              "Reviewed cross-border contracts (trade, logistics, supply chain)",
              "Supported overseas entity setup and compliance processes",
              "Assisted business teams in identifying and managing legal risks"
            ]}
          />
          <ExperienceCard 
            role="Legal Intern (Finance & IPO)"
            responsibilities={[
              "Supported compliance and regulatory research",
              "Participated in due diligence work for financial projects"
            ]}
          />
        </div>
      </Section>

      {/* Selected Work Section */}
      <Section id="work">
        <h2 className="heading-lg">Selected Work</h2>
        <div className="space-y-8">
          <ProjectCard 
            title="Non-Performing Asset (NPA) Portfolio Management & Disposal Process"
            summary="Analyzed and managed the transfer and disposal of Non-Performing Assets (NPAs) through a structured business model selection process."
            background="The project involved sourcing, analyzing, and disposing of NPAs through different business models like proprietary operation, joint ventures, industrial integration, and cooperative acquisition. The goal was to recover maximum value from distressed assets."
            role="Coordinated with banks, asset management companies (AMCs), and intermediaries to obtain NPA information. Conducted due diligence and valuation of assets. Supported business model selection and portfolio assembly decisions."
            actions={[
              "Worked with senior management to define disposal strategies based on liquidity, collateral quality, and regional factors",
              "Evaluated different business models for NPA disposal, including proprietary operations and joint ventures",
              "Collaborated with external service providers and legal teams to manage asset sales and risk mitigation"
            ]}
            outcome="Successfully identified the best-fit business model for each NPA portfolio, leading to improved asset recovery rates and more efficient disposal processes. Supported the company’s strategic goals by aligning asset management with the larger industrial integration model."
          />
          <ProjectCard 
            title="Initial Research for Overseas Company Establishment"
            summary="Conducted a comprehensive legal and regulatory research on the requirements and procedures for establishing foreign-invested companies in logistics services across various regions."
            background="The research aimed to identify the key legal, operational, and financial requirements for foreign companies looking to enter the logistics services industry. This process included understanding restrictions on foreign capital, company registration, labor laws, foreign exchange procedures, and other critical factors for smooth establishment."
            role="Led the research on foreign investment regulations and legal requirements for logistics sector entry. Analyzed key aspects such as company registration procedures, director qualifications, and foreign capital restrictions. Coordinated with internal teams and external partners for gathering data and insights."
            actions={[
              "Compiled a comprehensive list of regulatory requirements related to foreign ownership, labor laws, and tax treaties",
              "Identified specific business model options for foreign investors in the logistics industry (e.g., JV, wholly foreign-owned, and more)",
              "Assessed the legal requirements for foreign currency accounts, capital requirements, and shareholder loans",
              "Focused on understanding any post-incorporation procedures and special director-related requirements",
              "Created a detailed framework for company establishment, including the necessary licensing and permits"
            ]}
            outcome="The research provided a clear, actionable guide for the company’s expansion into new international markets. It identified the necessary legal and regulatory steps, minimized potential risks by highlighting restrictions, and facilitated smoother entry into the logistics services sector. This project contributed to strategic decision-making and positioning for future operations in global markets."
          />
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="bg-slate-50">
        <h2 className="heading-lg">Skills</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Legal & Compliance", skills: ["Contract Review", "Due Diligence", "Compliance Monitoring"] },
            { title: "Business", skills: ["Stakeholder Coordination", "Cross-border Operations", "Asset Management"] },
            { title: "Analytical", skills: ["Microsoft Excel", "Financial Analysis", "Project Feasibility"] }
          ].map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(s => (
                  <motion.span 
                    key={s} 
                    className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded text-sm cursor-default"
                    whileHover={{ scale: 1.05, borderColor: "#1e3a8a", color: "#1e3a8a" }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <footer id="contact" className="bg-brand-dark text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Get in Touch</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Open to opportunities in international business, compliance, and entry-level investment-related roles in the Netherlands.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
              <motion.a 
                href="mailto:linyuqing_lse@163.com" 
                className="flex items-center space-x-3 hover:text-blue-200 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xl font-medium">linyuqing_lse@163.com</span>
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/yuqing-lin-07b63b232" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-blue-200 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-xl font-medium">LinkedIn Profile</span>
              </motion.a>
            </div>

            <div className="mt-24 pt-8 border-t border-white/10 text-blue-200/40 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} Yuqing Lin • Professional Portfolio
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
