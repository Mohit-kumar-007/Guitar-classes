import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'Parent of Piano Student',
      content: 'My daughter has been taking piano lessons here for 2 years. The progress she has made is incredible! The teachers are patient, skilled, and truly care about each student\'s development.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9c8c10b?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Robert Chen',
      role: 'Guitar Student',
      content: 'As an adult learner, I was nervous about starting guitar lessons. The instructors here made me feel comfortable and confident. I\'m now playing songs I never thought I could!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Ukulele Student',
      content: 'The ukulele classes are so much fun! I love the relaxed atmosphere and the way they teach. Within months, I was playing my favorite songs and even performing for friends.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Parent of Keyboard Student',
      content: 'Professional, organized, and results-driven. My son has developed not just technical skills but also a deep love for music. The academy has exceeded our expectations.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Lisa Thompson',
      role: 'Harmonium Student',
      content: 'Learning harmonium here has been a spiritual journey. The traditional approach combined with modern teaching methods creates the perfect learning environment.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Mark Johnson',
      role: 'Harmonica Student',
      content: 'I never thought I could learn harmonica at 45! The instructors are patient and encouraging. Now I play with a local band every weekend. Dreams do come true here!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateTestimonials();
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const animateTestimonials = () => {
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-secondary fill-current' : 'text-muted'
        }`}
      />
    ));
  };

  return (
    <section 
      id="reviews" 
      ref={sectionRef}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real testimonials from our amazing students and their families
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="testimonial-card opacity-0 bg-gradient-hero border-0 shadow-warm transition-all duration-700 transform translate-y-8">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <Quote className="w-12 h-12 mx-auto mb-6 text-primary-foreground/80" />
                <blockquote className="text-2xl md:text-3xl font-medium text-primary-foreground mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name} 
                    className="w-16 h-16 rounded-full object-cover shadow-accent"
                  />
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-primary-foreground">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-primary-foreground/80">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <div className="flex mt-2">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card 
              key={index}
              className={`testimonial-card opacity-0 bg-card border-0 shadow-card hover:shadow-warm transition-all duration-700 transform translate-y-8 hover:-translate-y-2 cursor-pointer ${
                index === currentTestimonial ? 'ring-2 ring-accent' : ''
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-muted-foreground italic mb-4 line-clamp-4">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover shadow-accent"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial ? 'bg-accent' : 'bg-muted'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;