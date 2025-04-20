
import { useEffect } from 'react';
import { Database, LineChart, Code, BarChart } from 'lucide-react';

const About = () => {
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

  const skills = [
    { name: 'Python', icon: Code, color: 'bg-blue-100 text-blue-700' },
    { name: 'SQL', icon: Database, color: 'bg-orange-100 text-orange-700' },
    { name: 'Power BI', icon: BarChart, color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Tableau', icon: LineChart, color: 'bg-green-100 text-green-700' }
  ];

  return (
    <section id="about" className="bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Transforming raw data into actionable business insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <img 
              src="/placeholder.svg" 
              alt="Profile" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <div className="mb-8 reveal">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Hi, I'm <span className="text-teal">Jane Doe</span>, a data analyst with <span className="text-teal">5 years</span> of experience
              </h3>
              <p className="text-darkgray mb-6">
                I specialize in transforming complex data into clear, actionable insights that drive business decisions. With expertise in Python, SQL, Power BI, and Tableau, I help businesses unlock their potential through data analysis and visualization.
              </p>
              <p className="text-darkgray mb-6">
                My approach combines technical expertise with business acumen to deliver solutions that not only answer your current questions but help you ask better ones. I believe that good data analysis is both an art and a science - requiring technical skill, creativity, and clear communication.
              </p>
              <p className="text-darkgray font-medium">
                I help businesses unlock their potential through data analysis and visualization.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 reveal">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className={`${skill.color} p-6 rounded-lg text-center flex flex-col items-center transition-transform hover:scale-105`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <skill.icon className="h-12 w-12 mb-3" />
                  <h4 className="font-bold text-lg">{skill.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
