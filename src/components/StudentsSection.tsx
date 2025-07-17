import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Trophy, Star } from 'lucide-react';

const StudentsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Student images from public folder
  const studentImages = [
    '/1111.jpg',
    '/1112.jpg',
    '/1113.jpg',
    '/1114.jpg',
    '/1115.png',
    '/1116.png',
    '/1117.png',
    '/1118.png',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStudents();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateStudents = () => {
    // Animation removed for instant appearance
    const cards = document.querySelectorAll('.student-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = '1';
      (card as HTMLElement).style.transform = 'translateX(0)';
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % studentImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + studentImages.length) % studentImages.length);
  };

  const getVisibleImages = () => {
    return [studentImages[currentSlide]];
  };

  return (
    <section 
      id="students" 
      ref={sectionRef}
      className="py-20 bg-gradient-warm"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our  Students
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are a Family of Musicians, Nurturing Talent and Inspiring Creativity.
          </p>
        </div>

        {/* Student Images Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-8 mb-8">
            {getVisibleImages().map((imgSrc, index) => (
              <Card 
                key={`${currentSlide}-${index}`}
                className="student-card opacity-1 bg-card border-0 shadow-card hover:shadow-warm transition-all duration-700 transform translate-x-0 hover:-translate-y-2 flex items-center justify-center"
              >
                <CardContent className="p-8 flex items-center justify-center">
                  <img 
                    src={imgSrc} 
                    alt={`Student ${currentSlide + 1}`} 
                    className="w-48 h-48 rounded-full object-cover shadow-accent ring-4 ring-secondary/30 group-hover:ring-secondary/50 transition-all duration-300"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <ChevronLeft size={20} />
            </Button>
            
            <div className="flex items-center gap-2">
              {studentImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-accent' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentsSection;