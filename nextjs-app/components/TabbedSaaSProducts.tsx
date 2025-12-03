'use client';

import React, { useState, useRef, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  shortDescription: string;
  description: string;
  users: string;
  highlight: string;
}

const PRODUCTS: Product[] = [
  {
    id: "school-erp",
    name: "SchoolERP",
    category: "Education",
    tagline: "Let us run your campus operations.",
    shortDescription: "Admissions, academics, fees, timetable, parent portal and more.",
    description:
      "SchoolERP centralizes student data, attendance, fees, examinations and communication with parents. Timetables, digital report cards and role-based access keep everyone aligned while reducing paperwork.",
    users: "5,000+ students managed",
    highlight: "Ideal for schools, colleges & coaching centers."
  },
  {
    id: "crm",
    name: "CRM",
    category: "Sales & Marketing",
    tagline: "Never lose a high-value lead again.",
    shortDescription: "Visual pipelines, automated follow-ups and customer view.",
    description:
      "Our CRM gives you pipelines, automation, contact activity timeline and sales analytics so your team closes more deals.",
    users: "200+ sales teams",
    highlight: "Great for B2B agencies & SaaS companies."
  },
  {
    id: "erp",
    name: "ERP",
    category: "Business Ops",
    tagline: "One system for the whole company.",
    shortDescription: "Inventory, purchase, accounting, HR and projects.",
    description:
      "ERP connects finance, HR, inventory and operations into one real-time system — visibility across departments and clear profitability reports.",
    users: "Multi-branch businesses",
    highlight: "Perfect for SMEs, distributors & manufacturers."
  },
  {
    id: "hrms",
    name: "HRMS",
    category: "People",
    tagline: "Keep your team engaged & paid on time.",
    shortDescription: "Profiles, attendance, payroll and performance.",
    description:
      "HRMS automates attendance, payroll runs, leave and reviews so HR works strategically instead of administratively.",
    users: "1,000+ employees served",
    highlight: "Suitable for growing teams."
  },
  {
    id: "helpdesk",
    name: "Helpdesk",
    category: "Support",
    tagline: "Delight customers with fast support.",
    shortDescription: "Ticketing, SLA, canned replies and portal.",
    description:
      "Helpdesk turns emails and messages into organized tickets with SLAs, automations, and a self-service portal for customers.",
    users: "24/7 support teams",
    highlight: "Great for IT, agencies & product teams."
  }
];

export default function TabbedSaaSProducts() {
  const [activeId, setActiveId] = useState<string>(PRODUCTS[0].id);
  const active = PRODUCTS.find(p => p.id === activeId) || PRODUCTS[0];
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(`tab-${activeId}`);
    const container = stripRef.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (elRect.left < containerRect.left || elRect.right > containerRect.right) {
      const scrollLeft = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <section className="tabbed-saas compact bg-light py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div>
            <small className="text-uppercase text-primary fw-bold">Products</small>
            <h2 className="mt-1 mb-1">Our SaaS Products</h2>
            <p className="text-muted mb-0 small">Switch between modules like SchoolERP, CRM and ERP to see details at a glance.</p>
          </div>
          <div className="mt-2 mt-md-0">
            <button className="btn btn-outline-primary btn-sm">Talk to our team</button>
          </div>
        </div>

        <div className="position-relative mb-3">
          <div className="fade-edge-left d-none d-md-block" />
          <div className="fade-edge-right d-none d-md-block" />

          <div ref={stripRef} className="d-flex gap-3 overflow-auto px-1 py-2 tab-strip">
            {PRODUCTS.map((p) => {
              const isActive = p.id === activeId;
              return (
                <div
                  id={`tab-${p.id}`}
                  key={p.id}
                  role="button"
                  onClick={() => setActiveId(p.id)}
                  className={`card flex-shrink-0 ${isActive ? "border-primary shadow-lg" : "border-light"} tab-card`}
                >
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className={`rounded-3 d-flex align-items-center justify-content-center me-3 ${isActive ? "bg-primary text-white" : "bg-primary bg-opacity-10 text-primary"}`} 
                        style={{width: 44, height: 44}}
                      >
                        <strong>{p.name.charAt(0)}</strong>
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-uppercase text-muted fw-semibold">{p.category}</small>
                        <h6 className="mb-0 mt-1">{p.name}</h6>
                        <small className="text-muted d-block">{p.shortDescription}</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-gradient p-0" style={{background: "linear-gradient(90deg,#6f42c1,#4f46e5)"}}>
                <div className="p-4 text-white">
                  <small className="text-uppercase opacity-75">{active.category}</small>
                  <h3 className="mt-2 mb-1">{active.name}</h3>
                  <p className="mb-0 small opacity-80">{active.tagline}</p>
                </div>
              </div>
              <div className="card-body">
                <p className="text-muted">{active.description}</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button className="btn btn-primary btn-sm">View module details</button>
                  <button className="btn btn-outline-secondary btn-sm">Request live demo</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Why teams choose {active.name}</h5>
                <p className="card-text text-muted small">Faster onboarding, less manual work, and better visibility across your organization.</p>

                <ul className="list-unstyled mt-3 mb-0 small text-muted">
                  <li className="d-flex justify-content-between"><span>Time to go live</span><strong className="text-dark">2–4 weeks</strong></li>
                  <li className="d-flex justify-content-between"><span>Implementation support</span><strong className="text-dark">Included</strong></li>
                  <li className="d-flex justify-content-between"><span>Training sessions</span><strong className="text-dark">On-site / Remote</strong></li>
                </ul>

                <div className="mt-auto pt-3">
                  <button className="btn btn-dark w-100">Get a tailored quote</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
