
import { useEffect } from 'react';
import { ContactInfo } from './contact/ContactInfo';
import { ContactForm } from './contact/ContactForm';

const Contact = () => {
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

  return (
    <section id="contact" className="bg-lightgray">
      <div className="container-custom">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or need data analysis services? Let's talk!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
