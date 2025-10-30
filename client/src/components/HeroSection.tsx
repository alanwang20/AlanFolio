import { Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@assets/generated_images/Professional_headshot_for_Alan_Wang_9ec18444.png';

export default function HeroSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="max-w-6xl w-full">
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
                Master's student at Georgia Tech specializing in Computational Data Analytics,
                with a passion for transforming healthcare through innovative technology and
                data-driven insights.
              </p>
              <p className="text-muted-foreground">
                Leveraging expertise in data engineering, machine learning, and healthcare
                analytics to drive meaningful improvements in patient care and operational
                efficiency.
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
                  Connect on LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                data-testid="button-contact"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-3xl" />
              <img
                src={profileImage}
                alt="Alan Wang"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/10"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
