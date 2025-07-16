import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Trophy, Star } from 'lucide-react';

const StudentsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock student data - in a real app, this would come from an API
  const students = [
    {
      name: 'Sarah Johnson',
      instrument: 'Guitar',
      achievement: 'Won Regional Music Competition',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9c8c10b?w=400&h=400&fit=crop&crop=face',
      testimonial: 'The academy transformed my musical journey!',
      level: 'Advanced',
      yearsStudied: 3
    },
    {
      name: 'Michael Chen',
      instrument: 'Piano',
      achievement: 'Performed at City Hall',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      testimonial: 'Amazing teachers and supportive environment.',
      level: 'Intermediate',
      yearsStudied: 2
    },
    {
      name: 'Emily Rodriguez',
      instrument: 'Ukulele',
      achievement: 'Started her own band',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      testimonial: 'From beginner to band leader in 18 months!',
      level: 'Advanced',
      yearsStudied: 1.5
    },
    {
      name: 'David Kumar',
      instrument: 'Harmonium',
      achievement: 'Classical Music Certification',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      testimonial: 'Learned traditional techniques beautifully.',
      level: 'Expert',
      yearsStudied: 4
    },
    {
      name: 'Lisa Thompson',
      instrument: 'Keyboard',
      achievement: 'Compose Original Music',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      testimonial: 'Now I create my own compositions!',
      level: 'Advanced',
      yearsStudied: 2.5
    },
    {
      name: 'Alex Wilson',
      instrument: 'Harmonica',
      achievement: 'Street Performance Artist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      testimonial: 'Turned my hobby into a passion!',
      level: 'Intermediate',
      yearsStudied: 1
    }
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
    const cards = document.querySelectorAll('.student-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateX(0)';
      }, index * 100);
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(students.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(students.length / 3)) % Math.ceil(students.length / 3));
  };

  const getVisibleStudents = () => {
    const startIndex = currentSlide * 3;
    return students.slice(startIndex, startIndex + 3);
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
            Our Proud Students
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrating the musical achievements of our talented students who inspire us every day
          </p>
        </div>

        {/* Student Cards Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {getVisibleStudents().map((student, index) => (
              <Card 
                key={`${currentSlide}-${index}`}
                className="student-card opacity-0 bg-card border-0 shadow-card hover:shadow-warm transition-all duration-700 transform translate-x-24 hover:-translate-y-2 group"
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <img 
                      src={student.image} 
                      alt={student.name} 
                      className="w-24 h-24 mx-auto rounded-full object-cover shadow-accent mb-4 ring-4 ring-secondary/30 group-hover:ring-secondary/50 transition-all duration-300"
                    />
                    
                    <h3 className="text-xl font-bold text-primary mb-2">{student.name}</h3>
                    
                    <div className="flex justify-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-gradient-hero text-primary-foreground">
                        {student.instrument}
                      </Badge>
                      <Badge variant="outline" className="border-accent text-accent">
                        {student.level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">{student.achievement}</span>
                    </div>
                    
                    <p className="text-muted-foreground italic mb-4">
                      "{student.testimonial}"
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-secondary" />
                        <span>{student.yearsStudied} years</span>
                      </div>
                    </div>
                  </div>
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
              {Array.from({ length: Math.ceil(students.length / 3) }).map((_, index) => (
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