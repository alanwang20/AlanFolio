import { Linkedin, Github, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@assets/headshot_updated-1_1762218703663.jpg';
import heroBg from '@assets/ChatGPT_Image_Jan_11,_2026,_08_32_42_PM_1768181598601.png';

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary tracking-wider uppercase">Welcome to my portfolio</p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Alan Wang
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Healthcare Analytics & Data Science
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/70 whitespace-nowrap">
                MS Analytics @ Georgia Tech | Incoming Lead Analyst @ The Cigna Group
              </p>
            </div>

            <div className="space-y-4 text-base md:text-lg text-foreground/90">
              <p>
                Data scientist passionate about solving challenges in healthcare and informatics, with experience in engineering KPIs, building predictive models, and automating large-scale data pipelines to support decision-making and value-based care. Incoming Lead Analyst (Analytics Leadership Development Program) at Cigna Group.
              </p>
              <p className="text-muted-foreground">
                Recently completed M.S. in Computational Data Analytics at Georgia Tech to integrate technical foundations in machine learning, optimization, and simulation with healthcare strategy and systems design. Projects included procedural and spatial syntax analysis to optimize hand dispenser placement at Emory University Hospital Midtown, simulating telehealth recovery outcomes to optimize hypertension treatment, and analyzing epidemiological impact of social determinants of health on statewide MRSA bloodstream infections.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                data-testid="button-linkedin"
              >
                <a
                  href="https://www.linkedin.com/in/alanwang2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                data-testid="button-github"
              >
                <a
                  href="https://github.com/alanwang20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                data-testid="button-contact"
              >
                <a href="#contact" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-primary/15 to-purple-500/15 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -inset-8 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-110" />
              <div className="absolute inset-0 rounded-full border border-primary/15 scale-125" />
              <img
                src={profileImage}
                alt="Alan Wang"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/40 shadow-2xl shadow-primary/30"
                data-testid="img-profile"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a 
        href="#education" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer z-10"
        data-testid="link-scroll-down"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
