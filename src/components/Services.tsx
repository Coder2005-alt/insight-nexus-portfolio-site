
import { useState, useEffect } from 'react';
import { 
  Database, BarChart3, BrainCircuit, 
  Server, LineChart, FileSpreadsheet 
} from 'lucide-react';

const Services = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const services = [
    {
      title: "Data Cleaning & Preparation",
      description: "Using Python (Pandas, NumPy) and SQL to ensure high-quality, accurate datasets ready for analysis.",
      icon: FileSpreadsheet,
    },
    {
      title: "Data Visualization",
      description: "Creating interactive dashboards with Power BI and Tableau for clear, actionable insights.",
      icon: BarChart3,
    },
    {
      title: "Data Modeling & Analysis",
      description: "Building predictive models and statistical analyses using Python (Scikit-learn, Statsmodels).",
      icon: BrainCircuit,
    },
    {
      title: "Database Management",
      description: "Designing and querying databases with SQL for efficient data storage and retrieval.",
      icon: Server,
    },
    {
      title: "Business Intelligence",
      description: "Delivering customized reports and KPI tracking with Power BI and Tableau.",
      icon: LineChart,
    },
    {
      title: "Data Pipeline Development",
      description: "Building efficient ETL processes to automate data workflows and ensure data consistency.",
      icon: Database,
    }
  ];

  return (
    <section id="services" className="bg-lightgray">
      <div className="container-custom">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">
            Comprehensive data solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-teal" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
              <p className="text-darkgray/80">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
