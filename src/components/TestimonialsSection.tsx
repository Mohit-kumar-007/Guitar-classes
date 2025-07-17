import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Chetna Sharma',
      role: 'Piano Student',
      content: 'Best ever academy for learning musical instruments.Teacher is also very down to earth and humble and teaches students with his full potential and with fun❤️Overall its the best academy🌸Dont wait just go and fulfill your passion..',
      rating: 5,
      image: '/1116.png'
    },
    {
      name: 'Mohit Kumar',
      role: 'Guitar Student',
      content: 'I was nervous about starting guitar lessons. The instructors here made me feel comfortable and confident. A fantastic place to start a new journey with music',
      rating: 5,
      image: '/Mohit kumar.jpg'
    },
    {
      name: 'Sweta Jangra',
      role: 'Ukulele Student',
      content: 'Whether you are from music background or not, The Guitar Academy is a great place to learn musical instruments and vocals from basic to advance level. Vinod sir is really helpful, he focuses on each and every student equally. Friendly environment, highly recommended.',
      rating: 5,
      image: '/1115.png'
    },
    {
      name: 'Ritesh Sharma',
      role: 'Parent of Keyboard Student',
      content: 'Amazing I liked it very so much ,Five days instrument classes and one day vocal classes really this is very niceCome and do  better your skills and do not leave this opportunity ,first time music academy opend in Mohindergarh so I say only that come at least once and see it 🙃✨😍',
      rating: 5,
      image: '/Ritesh Sharma.png'
    },
    {
      name: 'Devinder Kumar',
      role: 'Harmonium Student',
      content: 'Very good music  academy in mahendergarh . sir bahut accha shika te hai.  Sach main mara bahut acha experience rha . thanks sir',
      rating: 5,
      image: '/Devinder Kumar.png'
    },
    {
      name: 'Future Farming Indian',
      role: 'Harmonica Student',
      content: 'Best guitar class in mahendergarh',
      rating: 5,
      image: '/Future Farming Indian.png'
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