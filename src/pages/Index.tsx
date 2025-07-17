import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InstrumentsSection from '@/components/InstrumentsSection';
import StudentsSection from '@/components/StudentsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <InstrumentsSection />
      <StudentsSection />
      <TestimonialsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Guitar Music Academy</h3>
              <p className="text-primary-foreground/80">
                Nurturing musical talent and inspiring creativity through expert instruction and passionate teaching.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#instruments" className="hover:text-primary-foreground transition-colors">Instruments</a></li>
                <li><a href="#students" className="hover:text-primary-foreground transition-colors">Students</a></li>
                <li><a href="#reviews" className="hover:text-primary-foreground transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>theguitaracademy0071@gmail.com</p>
                <p>+91 9718100608</p>
                <p>Mon-Sat: 4pM-8PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; {new Date().getFullYear()} Guitar Music Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
