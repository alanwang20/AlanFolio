import { Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const leadership = [
  {
    organization: 'Lambda Phi Epsilon Fraternity, Inc.',
    roles: [
      {
        title: 'Mid-Atlantic Governor',
        period: 'May 2024 – Present',
        description: [
          'Oversee and support Mid-Atlantic chapters to ensure operational excellence, leadership development, and alignment with national fraternity standards',
          'Mentor chapter officers and facilitate regional collaboration to promote best practices, strengthen connections, and drive organizational growth',
        ],
      },
      {
        title: 'AX Chapter Alumni Advisor',
        period: 'May 2024 – Present',
        description: [
          'Advise active chapter leadership on operations and strategy, ensuring alignment with organizational values while promoting sustainable growth',
          'Strengthen alumni engagement and mentorship by connecting alumni with chapter leaders and supporting officer development through guidance and best practices in governance',
        ],
      },
      {
        title: 'Fraternity Member',
        period: 'Aug 2021 – May 2024',
        description: [
          'Led chapter operations as President, Vice President of Communications, and Sergeant-at-Arms, overseeing governance, internal communications, and member development to drive organizational growth and uphold fraternity standards',
        ],
      },
    ],
  },
  {
    organization: 'Asian American Student Association',
    roles: [
      {
        title: 'Family Group Mentor',
        period: 'Aug 2021 – May 2024',
        description: [
          'Mentored students through the Asian American Student Association\'s Family Group Program, providing academic, professional, and personal guidance while organizing events to foster cultural connection and community engagement',
        ],
      },
    ],
  },
  {
    organization: 'UGA Asian Cultural Diversity Society',
    roles: [
      {
        title: 'Language Tutor',
        period: 'Aug 2020 – May 2021',
        description: [
          'Tutored students in Chinese writing, grammar, and conversation through weekly one-on-one sessions, integrating cultural lessons to enhance language proficiency and appreciation of Chinese traditions',
        ],
      },
    ],
  },
];

export default function LeadershipSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="leadership"
      ref={ref}
      className={`relative py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Users className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-leadership-title">
            Leadership & Asian Advocacy
          </h2>
        </div>

        <div className="space-y-8">
          {leadership.map((org, orgIndex) => (
            <Card
              key={orgIndex}
              className="hover-elevate transition-all duration-300 border-l-4 border-l-primary/30"
              data-testid={`card-organization-${orgIndex}`}
            >
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6" data-testid={`text-org-${orgIndex}`}>
                  {org.organization}
                </h3>
                <div className="space-y-6">
                  {org.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="space-y-3">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                        <h4 className="text-lg font-semibold text-foreground" data-testid={`text-role-${orgIndex}-${roleIndex}`}>
                          {role.title}
                        </h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">{role.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-2 list-disc list-inside text-foreground/90">
                        {role.description.map((item, i) => (
                          <li key={i} className="text-base leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                      {roleIndex < org.roles.length - 1 && (
                        <div className="border-b border-border mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
