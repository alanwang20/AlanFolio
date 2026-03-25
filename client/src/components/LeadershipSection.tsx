import { useState } from 'react';
import { Users, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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

interface RoleRowProps {
  title: string;
  period: string;
  description: string[];
  testId: string;
}

function RoleRow({ title, period, description, testId }: RoleRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onClick={() => setExpanded(prev => !prev)}
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="text-xs">{period}</span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-300 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-3 border-t border-border">
          <ul className="space-y-1.5 list-disc list-inside text-foreground/80">
            {description.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="leadership"
      ref={ref}
      className={`relative py-8 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <Users className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-leadership-title">
            Leadership & Asian Advocacy
          </h2>
        </div>

        <div className="space-y-4">
          {leadership.map((org, orgIndex) => (
            <Card key={orgIndex} className="transition-all duration-300" data-testid={`card-organization-${orgIndex}`}>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-primary mb-4" data-testid={`text-org-${orgIndex}`}>
                  {org.organization}
                </p>
                <div className="space-y-4">
                  {org.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      <RoleRow
                        title={role.title}
                        period={role.period}
                        description={role.description}
                        testId={`text-role-${orgIndex}-${roleIndex}`}
                      />
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
