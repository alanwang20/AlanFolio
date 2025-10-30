import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating on healthcare analytics projects or discussing
            opportunities? Let's connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover-elevate transition-all duration-300" data-testid="card-email">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground text-sm">Send me a message</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full"
                data-testid="button-email"
              >
                <a href="mailto:alanwang2020@gmail.com" className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  alanwang2020@gmail.com
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300" data-testid="card-linkedin">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Linkedin className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">LinkedIn</h3>
                <p className="text-muted-foreground text-sm">Professional network</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full"
                data-testid="button-linkedin-contact"
              >
                <a
                  href="https://www.linkedin.com/in/alanwang2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  /in/alanwang2020
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300" data-testid="card-github">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Github className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">GitHub</h3>
                <p className="text-muted-foreground text-sm">View my code</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full"
                data-testid="button-github-contact"
              >
                <a
                  href="https://github.com/alanwang20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  /alanwang20
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300" data-testid="card-phone">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Phone</h3>
                <p className="text-muted-foreground text-sm">Give me a call</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full"
                data-testid="button-phone"
              >
                <a href="tel:+16785089258" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  (678) 508-9258
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 Alan Wang. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
}
