import { Linkedin, Github, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@assets/headshot_updated-1_1762218703663.jpg';

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative flex items-center justify-center px-6 pt-8 pb-8 mt-16 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        <div className="absolute top-1/4 left-20 w-2 h-2 bg-primary/40 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/30 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary/50 rounded-full" />
        <div className="absolute top-2/3 right-20 w-2 h-2 bg-purple-400/40 rounded-full" />

        <svg className="absolute top-32 right-32 w-24 h-24 text-primary/10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <svg className="absolute bottom-32 left-32 w-32 h-32 text-primary/10" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" transform="rotate(15 50 50)" />
        </svg>

        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Left: photo on top, name/title/tagline below */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-primary/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -inset-8 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-125" />
              <img
                src={profileImage}
                alt="Alan Wang"
                className="relative w-44 h-44 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/30 shadow-2xl shadow-primary/20"
                data-testid="img-profile"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Alan Wang
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-medium">
                Healthcare Data Scientist
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/70">
                Incoming @ Cigna | M.S. Analytics @ Georgia Tech
              </p>
            </div>
          </div>

          {/* Right: bio text + buttons */}
          <div className="space-y-4">
            <div className="space-y-2 text-sm md:text-base text-foreground/90">
              <p>
                Data Scientist passionate about applying machine learning, analytics engineering, and information systems to solve problems in healthcare informatics. Incoming ALDP Lead Analyst at The Cigna Group.
              </p>
              <p className="text-muted-foreground">
                Holds an M.S. in Computational Data Analytics from the Georgia Institute of Technology, with industry and academic experience in building predictive models, developing end-to-end analytics products, and driving research and development.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild data-testid="button-linkedin">
                <a
                  href="https://www.linkedin.com/in/alanwang2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild data-testid="button-github">
                <a
                  href="https://github.com/alanwang20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild data-testid="button-contact">
                <a href="#contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>

      <a
        href="#education"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer z-10"
        data-testid="link-scroll-down"
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
