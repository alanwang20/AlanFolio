import { Briefcase, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const experiences = [
  {
    title: 'Lead Analyst, Analytics Leadership Development Program',
    company: 'Cigna Group',
    period: 'July 2025',
    location: 'Incoming',
    description: [],
    skills: [],
    isUpcoming: true,
  },
  {
    title: 'Data Science Intern, Analytics Leadership Development Program',
    company: 'Cigna Group',
    period: 'May 2025 – Aug 2025',
    location: 'Remote',
    description: [
      'Conducted feature testing experiments on in-production account-level renewal risk models in Databricks, engineering 7,500+ clinical features from member-level data for account-level feature testing',
      'Validated experiment models against baseline models and identified a high-impact signal from features tied to significant model improvement',
      'Designed and tested R&D proposals for aggregating member-level data into account-level features using tensor representations and multi-level modeling, exploring alternatives to historical feature engineering methods used by team over the past five years',
    ],
    skills: ['Databricks', 'Python', 'Feature Engineering', 'Predictive Modeling', 'Healthcare Analytics'],
  },
  {
    title: 'Data Engineering Intern',
    company: 'Centene Corporation',
    department: 'Call Center Engineering',
    period: 'May 2024 – Aug 2024',
    location: 'Remote',
    description: [
      'Led 4 projects utilizing Python/SQL to explore bot routing, agent staffing, authentication failure, and caller dropout. Analyzed data from Snowflake, engineered 10+ KPIs, clustered 50+ bots, and built business-oriented and data-driven visualizations',
      'Uncovered 10 bot routing inconsistencies affecting 750K+ annual callers and 3 daily staffing misalignments with call volume. Presented findings to 150+ stakeholders to guide call center optimization',
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
      'Partnered with Recovery Platform teams to identify 7 critical KPIs for recovery claims performance, deployed live dashboard to production',
      'Engineered end-to-end analytics production pipeline and deployed 50+ Snowflake objects (Streams, Tasks, Views) to extract unstructured JSON data from Confluent Cloud, transform it into structured tables, and load it into Power BI for semi-hourly reporting',
    ],
    skills: ['Power BI', 'Snowflake', 'Confluent Cloud', 'Analytics Engineering', 'ETL'],
  },
  {
    title: 'Technical Product Owner / Manager Intern',
    company: 'Centene Corporation',
    period: 'May 2022 – Dec 2022',
    location: 'Remote',
    description: [
      'Automated onboarding process via Python (Selenium), cutting entitlement processing time by 55% and onboarding time from 2 months to 30 minutes (projected $170M savings)',
      'Led surveys and interviews to identify 3 onboarding bottlenecks and presented solutions to drive onboarding/entitlement process redesign',
    ],
    skills: ['Python', 'Selenium', 'Process Automation', 'Product Management'],
  },
  {
    title: 'Information Systems / Technology Intern',
    company: 'Global Connect Group',
    period: 'Jan 2022 – Jan 2023',
    location: 'Remote',
    description: [
      'Supported the group\'s platform-as-a-service model by troubleshooting SQL-hosted variable errors and integrating multiple business models across diverse sectors',
      'Managed online marketing content via SquareSpace while fostering strong relationships with CEOs and executives to align technical and business goals',
    ],
    skills: ['SQL', 'SquareSpace', 'Business Integration'],
  },
  {
    title: 'Account Executive Intern',
    company: 'Flex ATL',
    period: 'May 2021 – Jun 2021',
    location: 'Atlanta, GA',
    description: [
      'Fundraised for the International Fund for Animal Welfare through direct marketing, developing strong skills in public speaking, customer engagement, and product promotion',
      'Collaborated with Regional Managers and Corporate Trainers to refine interpersonal communication and professional networking skills',
    ],
    skills: ['Direct Marketing', 'Public Speaking', 'Customer Engagement'],
  },
];

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="experience"
      ref={ref}
      className={`relative py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-experience-title">
            Professional Experience
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
