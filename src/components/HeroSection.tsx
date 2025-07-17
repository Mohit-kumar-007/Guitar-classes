import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Award, Users, Star } from 'lucide-react';
import instructorProfile from '@/assets/instructor-profile.jpg';

const HeroSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero card animation
    if (cardRef.current) {
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'scale(1)';
        }
      }, 300);
    }

    // Stats animation
    if (statsRef.current) {
      const children = Array.from(statsRef.current.children);
      children.forEach((child, index) => {
        setTimeout(() => {
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'translateY(0)';
        }, 800 + index * 200);
      });
    }
  }, []);

  const stats = [
    { icon: Users, label: 'Students', value: '100+' },
    { icon: Award, label: 'Years Experience', value: '8+' },
    { icon: Music, label: 'Instruments', value: '6' },
    { icon: Star, label: 'Reviews', value: '4.9/5' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-warm px-6 py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <Card 
            ref={cardRef}
            className="opacity-0 bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-warm transition-all duration-1000 transform scale-75 hover:-translate-y-2"
          >
            <CardContent className="p-8">
              <div className="text-center">
                <img 
                  src={instructorProfile} 
                  alt="Music Instructor" 
                  className="w-48 h-48 mx-auto rounded-full object-cover shadow-accent mb-6 ring-4 ring-secondary/30"
                />
                <h2 className="text-3xl font-bold text-primary mb-2">Vinod Kumar</h2>
                <p className="text-xl text-muted-foreground mb-4">Professional Music Instructor</p>
                
                <div className="space-y-2 mb-6">
                  <Badge variant="secondary" className="bg-gradient-hero text-primary-foreground">
                    A Brilliant  Music Teacher
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    8+ Years Experience
                  </Badge>
                </div>
                
                <p className="text-foreground leading-relaxed">
                  Passionate about nurturing musical talent and helping students discover the joy of music. 
                  Specialized in multiple instruments with a focus on personalized learning approaches.
                  
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Welcome Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
                Welcome to
                <span className="bg-gradient-hero bg-clip-text text-transparent block">
                  Guitar Music Academy
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Where musical dreams come to life through expert instruction, 
                passionate teaching, and a community that celebrates every note.
              </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="opacity-0 text-center p-4 bg-card/50 rounded-lg border border-border/50 hover:bg-card/80 transition-all duration-700 transform translate-y-8"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;