import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

import guitarIcon from '@/assets/guitar-icon.jpg';
import pianoIcon from '@/assets/piano-icon.jpg';
import harmoniumIcon from '@/assets/harmonium-icon.jpg';
import harmonicaIcon from '@/assets/harmonica-icon.jpg';
import ukuleleIcon from '@/assets/ukulele-icon.jpg';
import keyboardIcon from '@/assets/keyboard-icon.jpg';

const InstrumentsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playingInstrument, setPlayingInstrument] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const instruments = [
    { 
      name: 'Guitar', 
      icon: guitarIcon, 
      description: 'Acoustic & Electric Guitar lessons for all skill levels',
      color: 'from-amber-500 to-orange-600',
      sound: 'guitar-strum'
    },
    { 
      name: 'Piano', 
      icon: pianoIcon, 
      description: 'Classical and modern piano techniques',
      color: 'from-slate-600 to-slate-800',
      sound: 'piano-chord'
    },
    { 
      name: 'Harmonium', 
      icon: harmoniumIcon, 
      description: 'Traditional Indian classical instrument',
      color: 'from-red-500 to-red-700',
      sound: 'harmonium-note'
    },
    { 
      name: 'Harmonika', 
      icon: harmonicaIcon, 
      description: 'Pocket-sized melodic instrument',
      color: 'from-blue-500 to-blue-700',
      sound: 'harmonica-melody'
    },
    { 
      name: 'Ukulele', 
      icon: ukuleleIcon, 
      description: 'Fun and easy to learn string instrument',
      color: 'from-green-500 to-green-700',
      sound: 'ukulele-strum'
    },
    { 
      name: 'Keyboard', 
      icon: keyboardIcon, 
      description: 'Electronic keyboard and synthesizer',
      color: 'from-purple-500 to-purple-700',
      sound: 'keyboard-chord'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateInstruments();
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

  const animateInstruments = () => {
    const cards = document.querySelectorAll('.instrument-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
      }, index * 150);
    });
  };

  const playInstrumentSound = (instrumentName: string, soundId: string) => {
    if (isMuted) return;
    
    setPlayingInstrument(instrumentName);
    
    // Simulate sound playing (in a real app, you'd use actual audio files)
    console.log(`Playing ${soundId} sound...`);
    
    // Create a visual feedback effect
    const card = document.querySelector(`[data-instrument="${instrumentName}"]`);
    if (card) {
      (card as HTMLElement).style.transform = 'scale(1.05)';
      setTimeout(() => {
        (card as HTMLElement).style.transform = 'scale(1)';
      }, 300);
    }
    
    setTimeout(() => setPlayingInstrument(null), 1000);
  };

  return (
    <section 
      id="instruments" 
      ref={sectionRef}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Instruments We Teach
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master your favorite instrument with our expert instructors and comprehensive curriculum
          </p>
          
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isMuted ? 'Unmute' : 'Mute'} Sounds
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instruments.map((instrument, index) => (
            <Card 
              key={index}
              data-instrument={instrument.name}
              className="instrument-card opacity-0 bg-card border-0 shadow-card hover:shadow-warm transition-all duration-700 transform translate-y-12 scale-75 hover:-translate-y-2 group cursor-pointer"
              onClick={() => playInstrumentSound(instrument.name, instrument.sound)}
            >
              <CardContent className="p-6">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${instrument.color} rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="relative text-center">
                    <div className="mb-4 relative">
                      <img 
                        src={instrument.icon} 
                        alt={instrument.name} 
                        className="w-24 h-24 mx-auto rounded-full object-cover shadow-accent ring-4 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300"
                      />
                      {playingInstrument === instrument.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-accent/20 animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {instrument.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {instrument.description}
                    </p>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-accent font-medium">
                        {isMuted ? 'Click to see animation' : 'Click to hear sound'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstrumentsSection;