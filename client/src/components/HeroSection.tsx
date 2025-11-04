import { Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@assets/headshot_updated-1_1762218703663.jpg';
import AnimatedBackground from './AnimatedBackground';

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background pointer-events-none z-0" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Alan Wang
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Healthcare Analytics & Data Science
              </p>
            </div>

            <div className="space-y-4 text-base md:text-lg text-foreground/90">
              <p>
                Master's student at Georgia Tech (4.0 GPA) specializing in Computational Data Analytics,
                with a proven track record of transforming healthcare operations through innovative
                data engineering and machine learning solutions.
              </p>
              <p className="text-muted-foreground">
                Incoming Lead Analyst (Analytics Leadership Development Program) at Cigna Group. Previously 
                drove impactful insights at Cigna Group and Centene through engineering KPIs, building 
                predictive models, and automating large-scale data pipelines to support decision-making 
                and value-based care.
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
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
              <img
                src={profileImage}
                alt="Alan Wang"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/20 shadow-2xl"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
