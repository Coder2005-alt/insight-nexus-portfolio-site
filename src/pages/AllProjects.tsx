
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  // Example additional projects for demonstration (add more here)
  {
    title: "E-commerce Dashboard",
    description: "Realtime analytics for e-commerce KPIs with custom report builders.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tools: ["SQL", "Tableau"],
    outcome: "Raised conversion by 6%",
  },
  {
    title: "HR Attrition Report",
    description: "Automated HR attrition and retention analysis using Python.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    tools: ["Python", "Pandas"],
    outcome: "Improved team stability by 9%",
  },
];

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Python", value: "Python" },
  { label: "Power BI", value: "Power BI" },
  { label: "SQL", value: "SQL" },
];

const AllProjects = () => {
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project =>
    filter === "All"
      ? true
      : project.tools.map(t => t.toLowerCase()).includes(filter.toLowerCase())
  );

  return (
    <section className="bg-white min-h-screen pb-16 pt-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="section-title">All Projects</h2>
          <p className="section-subtitle">Browse my complete portfolio of data projects across analytics and BI.</p>
        </div>
        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {filterOptions.map(option => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              size="sm"
              className={filter === option.value ? "bg-teal text-white" : ""}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <Card key={idx} className="overflow-hidden border-none shadow-lg" style={{ animationDelay: `${idx * 0.08}s` }}>
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
                  {project.tools.map(tool => (
                    <Badge key={tool} className="bg-navy/10 text-navy hover:bg-navy/20">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-teal font-medium">
                    <span className="font-bold">Outcome:</span> {project.outcome}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button onClick={() => navigate("/")} variant="outline" size="lg">
            Back to Home
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
