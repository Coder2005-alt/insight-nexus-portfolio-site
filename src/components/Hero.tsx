
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealHero = () => {
      if (heroRef.current) {
        heroRef.current.classList.add('active');
      }
    };

    // Reveal hero section on load
    setTimeout(revealHero, 300);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center bg-lightgray pt-20">
      <div className="container-custom">
        <div 
          ref={heroRef}
          className="flex flex-col items-center text-center reveal"
        >
          <h2 className="text-teal font-semibold mb-4">DATA ANALYST</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
            Empowering Businesses with <br className="hidden md:block" />
            <span className="text-teal">Data-Driven Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-darkgray/80 max-w-2xl mb-8">
            Expert Data Analysis Services Using Python, SQL, Power BI, and Tableau
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg rounded-md">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild className="bg-teal hover:bg-teal/90 text-white px-8 py-6 text-lg rounded-md">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
          
          <a 
            href="#about" 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-20 hidden md:block"
            aria-label="Scroll down"
          >
            <ArrowDown className="text-navy h-8 w-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
