import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateContact();
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

  const animateContact = () => {
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init("-IR61LNJe9HUn6af");

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      };

      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(
        "service_9r19bsf",
        "template_zju34we",  // Make sure this matches your template ID exactly
        templateParams
      );
      
      console.log('EmailJS response:', result);

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'theguitaracademy0071@gmail.com',
      link: 'mailto:theguitaracademy0071@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9718100608',
      link: 'tel:+919718100608'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Click here to view on Google Maps',
      link: 'https://maps.app.goo.gl/7wDTRYhXdnWBWhKc7'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Sat: 4pM-8PM, Sun: Closed',
      link: null
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-gradient-warm"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your musical journey? Contact us today to schedule your first lesson!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="contact-card opacity-0 bg-card border-0 shadow-card transition-all duration-700 transform translate-y-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-border focus:ring-accent focus:border-accent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-border focus:ring-accent focus:border-accent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="border-border focus:ring-accent focus:border-accent resize-none"
                    placeholder="Tell us about your musical interests and goals..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-hero text-primary-foreground hover:shadow-warm transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="contact-card opacity-0 bg-card border-0 shadow-card transition-all duration-700 transform translate-y-12">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="p-3 bg-gradient-hero rounded-lg shadow-accent">
                        <info.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary">{info.title}</h4>
                        {info.link ? (
                          <a 
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : '_self'}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="text-muted-foreground hover:text-accent transition-colors duration-200"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="contact-card opacity-0 bg-card border-0 shadow-card transition-all duration-700 transform translate-y-12">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Find Us</h3>
                
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3513.994371440199!2d76.1506875!3d28.2681875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912bf16995beb7f%3A0x631d7423201b6c69!2sTHE%20GUITAR%20ACADEMY!5e0!3m2!1sen!2sin!4v1752847705564!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    asChild
                    className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                  >
                    <a 
                      href="https://maps.app.goo.gl/7wDTRYhXdnWBWhKc7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;