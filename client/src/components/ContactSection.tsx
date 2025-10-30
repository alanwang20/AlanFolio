import { Mail, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating on healthcare analytics projects or discussing
            opportunities? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
                <a href="mailto:alan.wang@gatech.edu" className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  alan.wang@gatech.edu
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
                <p className="text-muted-foreground text-sm">Let's connect professionally</p>
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
                  Connect on LinkedIn
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
