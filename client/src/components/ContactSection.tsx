import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const links = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:alanwang2020@gmail.com',
    display: 'alanwang2020@gmail.com',
    testId: 'button-email',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alanwang2020/',
    display: '/in/alanwang2020',
    testId: 'button-linkedin-contact',
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/alanwang20',
    display: '/alanwang20',
    testId: 'button-github-contact',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    href: 'tel:+16785089258',
    display: '(678) 508-9258',
    testId: 'button-phone',
    external: false,
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-8 px-6 border-t border-border transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <p className="text-sm font-medium text-foreground shrink-0" data-testid="text-contact-title">
            Get in Touch
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {links.map(({ icon: Icon, label, href, display, testId, external }) => (
              <Button
                key={label}
                asChild
                variant="outline"
                size="sm"
                data-testid={testId}
              >
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-1.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-xs">{display}</span>
                  <span className="sm:hidden text-xs">{label}</span>
                </a>
              </Button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground shrink-0">
            © 2025 Alan Wang
          </p>
        </div>
      </div>
    </section>
  );
}
