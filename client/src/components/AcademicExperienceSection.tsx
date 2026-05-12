import { useState } from 'react';
import { BookOpen, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const academicExperiences = [
  {
    institution: 'The University of Georgia',
    roles: [
      {
        title: 'Analytics Lab Tutor',
        period: 'Jan 2024 – May 2024',
        description: [
          'Tutored undergraduate and graduate students in R, mathematics, and statistics for Data Science for Business and Economics (BUSN 5000) and Introduction to Econometrics (ECON 4750/6750), strengthening understanding of applied econometric techniques',
        ],
        skills: ['R', 'Statistics', 'Econometrics', 'Tutoring'],
      },
      {
        title: 'Teaching Assistant',
        period: 'Jan 2022 – Jan 2024',
        description: [
          'Supported instruction for MIST 2090: Introduction to Information Systems in Business by assisting with project management, business modeling, and data visualization in Excel and Tableau',
          'Proctored assessments, graded assignments, and provided academic support to over 100 students per semester',
        ],
        skills: ['Excel', 'Tableau', 'Project Management', 'Teaching'],
      },
      {
        title: 'Research Assistant',
        period: 'Aug 2020 – Aug 2021',
        description: [
          'Engineered a prototype to extract live code from Haas Mill Machines using DPRNT statements and integrated macro values with the Losant IoT API for real-time machine monitoring',
          'Collaborated with professors and students nationwide to promote a ThinkTank environment focused on developing smart factory solutions that enhance efficiency through human-technology interaction',
        ],
        skills: ['IoT', 'API Integration', 'Manufacturing Technology', 'Research'],
      },
    ],
  },
  {
    institution: 'Georgia State University',
    roles: [
      {
        title: 'Research Assistant',
        period: 'Jun 2020 – Oct 2021',
        description: [
          'Collected, cleaned, and analyzed large datasets using Excel and Dropbox to support developmental economics research under Dr. Alberto Chong',
          'Applied macroeconomic concepts to review and provide feedback on journal drafts, contributing to Latin American Economic Review (Vol. 29) and ongoing research on firm ownership in rural mining regions',
        ],
        skills: ['Economics Research', 'Data Analysis', 'Excel', 'Academic Writing'],
      },
    ],
  },
];

interface RoleRowProps {
  title: string;
  period: string;
  description: string[];
  skills?: string[];
  testId: string;
}

function RoleRow({ title, period, description, skills, testId }: RoleRowProps) {
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
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
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

export default function AcademicExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="academic-experience"
      ref={ref}
      className={`relative py-8 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-academic-experience-title">
            Academic Experience
          </h2>
        </div>

        <div className="space-y-4">
          {academicExperiences.map((inst, instIndex) => (
            <Card key={instIndex} className="transition-all duration-300" data-testid={`card-institution-${instIndex}`}>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-primary mb-4" data-testid={`text-institution-${instIndex}`}>
                  {inst.institution}
                </p>
                <div className="space-y-4">
                  {inst.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      <RoleRow
                        title={role.title}
                        period={role.period}
                        description={role.description}
                        skills={role.skills}
                        testId={`text-academic-role-${instIndex}-${roleIndex}`}
                      />
                      {roleIndex < inst.roles.length - 1 && (
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
