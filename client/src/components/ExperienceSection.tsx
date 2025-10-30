import { Briefcase, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    title: 'Analytics Leadership Development Program (ALDP) Intern',
    company: 'Cigna Group',
    period: 'May 2025 – Aug 2025',
    location: 'Incoming',
    description: [],
    skills: [],
    isUpcoming: true,
  },
  {
    title: 'Data Engineering Intern',
    company: 'Centene Corporation',
    department: 'Call Center Engineering',
    period: 'May 2024 – Aug 2024',
    location: 'Remote',
    description: [
      'Led 4 end-to-end exploratory initiatives including bot centrality analysis, agent staffing, authentication failure, and pre-emptive caller dropout model',
      'Leveraged Python and SQL to extract data from Snowflake, engineer 10+ KPIs, cluster 50+ bots, and develop visualizations',
      'Discovered 10 bot processes impacting authentication rates for 750,000+ yearly callers and 3 daily discrepancies between agent staffing and call volume',
      'Presented findings to 150+ stakeholders through business reports and technical documentation, outlining key focus areas to optimize call center operations',
    ],
    skills: ['Python', 'SQL', 'Snowflake', 'Data Visualization', 'Call Center Analytics'],
  },
  {
    title: 'Data Engineering / Technical Product Owner Intern',
    company: 'Centene Corporation',
    department: 'Product Support Analytics',
    period: 'May 2023 – Aug 2023',
    location: 'Remote',
    description: [
      'Collaborated with stakeholders from Centene\'s Recovery Platform (CRP) to identify 7 operational KPIs and deploy a live Power BI dashboard to production',
      'Orchestrated analytics engineering pipeline, configuring and deploying 50+ Snowflake objects (Streams, Tasks, Tables, Views) from Confluent Cloud across Git environments',
      'Optimized semi-hourly extraction and transformation of unstructured data for loading into Power BI',
    ],
    skills: ['Power BI', 'Snowflake', 'Confluent Cloud', 'Analytics Engineering', 'ETL'],
  },
  {
    title: 'Technical Product Owner / Manager Intern',
    company: 'Centene Corporation',
    period: 'May 2022 – Dec 2022',
    location: 'Remote',
    description: [
      'Automated new-hire entitlement granting processes using Python (Selenium), reducing processing time per entitlement by 55%',
      'Reduced onboarding time from 2 months to under 30 minutes, with projected cost savings of up to $170M annually',
      'Conducted surveys (Qualtrics) and interviews with hiring managers to uncover 3 key bottlenecks in the new-hire onboarding process',
      'Researched access-control systems and presented findings to business and technical teams',
    ],
    skills: ['Python', 'Selenium', 'Process Automation', 'Qualtrics', 'Product Management'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6">
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
              className={`hover-elevate transition-all duration-300 ${
                exp.isUpcoming ? 'border-2 border-primary/40' : ''
              }`}
              data-testid={`card-experience-${index}`}
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-2xl font-semibold text-foreground" data-testid={`text-title-${index}`}>
                          {exp.title}
                        </h3>
                        {exp.isUpcoming && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Incoming
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg font-medium text-primary" data-testid={`text-company-${index}`}>
                        {exp.company}
                      </p>
                      {exp.department && (
                        <p className="text-sm text-muted-foreground">{exp.department}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium" data-testid={`text-period-${index}`}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {exp.description.length > 0 && (
                    <ul className="space-y-2 list-disc list-inside text-foreground/90">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-base leading-relaxed" data-testid={`text-description-${index}-${i}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.skills.length > 0 && (
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
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
