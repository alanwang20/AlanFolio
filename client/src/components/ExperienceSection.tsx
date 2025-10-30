import { Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    title: 'Technical Product Owner Intern',
    company: 'Centene Corporation',
    period: 'Summer 2024',
    location: 'Remote',
    description: [
      'Led cross-functional teams in developing data-driven healthcare solutions',
      'Collaborated with stakeholders to define product roadmaps and prioritize features',
      'Implemented agile methodologies to improve team efficiency and delivery timelines',
      'Conducted user research and translated insights into actionable product requirements',
    ],
    skills: ['Product Management', 'Agile', 'Stakeholder Management', 'Healthcare IT'],
  },
  {
    title: 'Data Engineering Intern',
    company: 'Centene Corporation',
    period: 'Summer 2023',
    location: 'Remote',
    description: [
      'Developed ETL pipelines for healthcare data optimization and integration',
      'Built predictive models to improve patient outcomes and reduce operational costs',
      'Implemented data quality frameworks ensuring HIPAA compliance',
      'Collaborated with clinical teams to deliver analytics dashboards using Power BI',
    ],
    skills: ['Python', 'SQL', 'ETL', 'Power BI', 'Healthcare Analytics', 'HIPAA'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-experience-title">
            Experience
          </h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300"
              data-testid={`card-experience-${index}`}
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold text-foreground" data-testid={`text-title-${index}`}>
                        {exp.title}
                      </h3>
                      <p className="text-lg font-medium text-primary" data-testid={`text-company-${index}`}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium" data-testid={`text-period-${index}`}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 list-disc list-inside text-foreground/90">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-base" data-testid={`text-description-${index}-${i}`}>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs"
                        data-testid={`badge-skill-${index}-${i}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
