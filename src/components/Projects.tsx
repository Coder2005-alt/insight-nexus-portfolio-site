
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
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

  const projects = [
    {
      title: "Retail Sales Dashboard",
      description: "Built a dashboard to visualize sales trends and inventory levels, querying data from a SQL database.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      tools: ["Power BI", "SQL"],
      outcome: "Enabled 15% faster inventory decisions",
    },
    {
      title: "Customer Churn Prediction",
      description: "Developed a machine learning model to predict customer churn and visualized results in Tableau.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      tools: ["Python", "Pandas", "Scikit-learn", "Tableau"],
      outcome: "Improved retention strategies by 10%",
    },
    {
      title: "Financial Reporting System",
      description: "Created automated financial reports with drill-down capabilities for a small business.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      tools: ["SQL", "Power BI"],
      outcome: "Reduced reporting time by 25%",
    },
    {
      title: "Marketing Campaign Analysis",
      description: "Analyzed campaign performance using Python and visualized ROI in Tableau.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      tools: ["Python", "Tableau"],
      outcome: "Increased campaign efficiency by 12%",
    },
  ];

  return (
    <section id="projects" className="bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of my work in data analysis and visualization
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{project.title}</h3>
                <p className="text-darkgray/80 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <Badge key={tool} className="bg-navy/10 text-navy hover:bg-navy/20">
                      {tool}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-teal font-medium">
                    <span className="font-bold">Outcome:</span> {project.outcome}
                  </p>
                  <Button variant="ghost" size="sm" className="text-navy hover:text-teal">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
