import { BookOpen, Calendar } from 'lucide-react';
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

export default function AcademicExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="academic-experience"
      ref={ref}
      className={`relative py-24 px-6 bg-muted/20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-academic-experience-title">
            Academic Experience
          </h2>
        </div>

        <div className="space-y-8">
          {academicExperiences.map((inst, instIndex) => (
            <Card
              key={instIndex}
              className="hover-elevate transition-all duration-300 border-l-4 border-l-primary/30"
              data-testid={`card-institution-${instIndex}`}
            >
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6" data-testid={`text-institution-${instIndex}`}>
                  {inst.institution}
                </h3>
                <div className="space-y-6">
                  {inst.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="space-y-3">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                        <h4 className="text-lg font-semibold text-foreground" data-testid={`text-academic-role-${instIndex}-${roleIndex}`}>
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
                      {role.skills && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {role.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
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
