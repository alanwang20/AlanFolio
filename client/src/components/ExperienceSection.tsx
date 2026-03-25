import { useState } from 'react';
import { Briefcase, Calendar, TrendingUp, ChevronDown, ChevronsDown, ChevronsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const experiences = [
  {
    title: 'Lead Analyst',
    company: 'Cigna Group',
    period: 'July 2025',
    type: 'Analytics Leadership Development Program',
    description: [],
    skills: [],
    isUpcoming: true,
  },
  {
    title: 'Data Scientist',
    company: 'Cigna Group',
    period: 'May 2025 – Aug 2025',
    isIntern: true,
    type: 'Pricing and Underwriting – R&D',
    description: [
      'Conducted feature testing experiments on in-production account-level renewal risk models in Databricks, engineering 7,500+ clinical features from member-level data for account-level feature testing',
      'Validated experiment models against baseline models and identified a high-impact signal from features tied to significant model improvement',
      'Designed and tested R&D proposals for aggregating member-level data into account-level features using tensor representations and multi-level modeling, exploring alternatives to historical feature engineering methods used by team over the past five years',
    ],
    skills: ['Databricks', 'Python', 'Feature Engineering', 'Predictive Modeling', 'Healthcare Analytics'],
  },
  {
    title: 'Data Engineer',
    company: 'Centene Corporation',
    department: 'Call Center Engineering',
    period: 'May 2024 – Aug 2024',
    isIntern: true,
    description: [
      'Led 4 projects utilizing Python/SQL to explore bot routing, agent staffing, authentication failure, and caller dropout. Analyzed data from Snowflake, engineered 10+ KPIs, clustered 50+ bots, and built business-oriented and data-driven visualizations',
      'Uncovered 10 bot routing inconsistencies affecting 750K+ annual callers and 3 daily staffing misalignments with call volume. Presented findings to 150+ stakeholders to guide call center optimization',
    ],
    skills: ['Python', 'SQL', 'Snowflake', 'Data Visualization', 'Call Center Analytics'],
  },
  {
    title: 'Data Engineer / Technical Product Owner',
    company: 'Centene Corporation',
    department: 'Product Support Analytics',
    period: 'May 2023 – Aug 2023',
    isIntern: true,
    description: [
      'Partnered with Recovery Platform teams to identify 7 critical KPIs for recovery claims performance, deployed live dashboard to production',
      'Engineered end-to-end analytics production pipeline and deployed 50+ Snowflake objects (Streams, Tasks, Views) to extract unstructured JSON data from Confluent Cloud, transform it into structured tables, and load it into Power BI for semi-hourly reporting',
    ],
    skills: ['Power BI', 'Snowflake', 'Confluent Cloud', 'Analytics Engineering', 'ETL'],
  },
  {
    title: 'Technical Product Owner / Manager',
    company: 'Centene Corporation',
    period: 'May 2022 – Dec 2022',
    isIntern: true,
    description: [
      'Automated onboarding process via Python (Selenium), cutting entitlement processing time by 55% and onboarding time from 2 months to 30 minutes (projected $170M savings)',
      'Led surveys and interviews to identify 3 onboarding bottlenecks and presented solutions to drive onboarding/entitlement process redesign',
    ],
    skills: ['Python', 'Selenium', 'Process Automation', 'Product Management'],
  },
  {
    title: 'Information Systems / Technology Consultant',
    company: 'Global Connect Group',
    period: 'Jan 2022 – Jan 2023',
    isIntern: true,
    description: [
      'Supported the group\'s platform-as-a-service model by troubleshooting SQL-hosted variable errors and integrating multiple business models across diverse sectors',
      'Managed online marketing content via SquareSpace while fostering strong relationships with CEOs and executives to align technical and business goals',
    ],
    skills: ['SQL', 'SquareSpace', 'Business Integration'],
  },
  {
    title: 'Account Executive',
    company: 'Flex ATL',
    period: 'May 2021 – Jun 2021',
    isIntern: true,
    description: [
      'Fundraised for the International Fund for Animal Welfare through direct marketing, developing strong skills in public speaking, customer engagement, and product promotion',
      'Collaborated with Regional Managers and Corporate Trainers to refine interpersonal communication and professional networking skills',
    ],
    skills: ['Direct Marketing', 'Public Speaking', 'Customer Engagement'],
  },
];

const PRIMARY_COUNT = 5;

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAdditional, setShowAdditional] = useState(false);

  const toggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const primaryExperiences = experiences.slice(0, PRIMARY_COUNT);
  const additionalExperiences = experiences.slice(PRIMARY_COUNT);

  const renderCard = (exp: typeof experiences[0], index: number) => {
    const isExpanded = expandedIndex === index;
    const hasDetails = exp.description.length > 0 || exp.skills.length > 0;

    return (
      <Card
        key={index}
        className={`transition-all duration-300 ${
          exp.isUpcoming ? 'ring-2 ring-primary/40' : ''
        } ${hasDetails ? 'cursor-pointer hover-elevate' : ''}`}
        onClick={() => hasDetails && toggle(index)}
        data-testid={`card-experience-${index}`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4 mb-1">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground" data-testid={`text-title-${index}`}>
                {exp.title}
              </h3>
              {exp.isUpcoming && (
                <Badge variant="default" className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="h-3 w-3" />
                  Incoming
                </Badge>
              )}
              {exp.isIntern && (
                <Badge variant="secondary" className="shrink-0 text-xs">
                  Internship
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
              <Calendar className="h-3 w-3" />
              <span className="text-xs" data-testid={`text-period-${index}`}>{exp.period}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm font-medium text-primary" data-testid={`text-company-${index}`}>
              {exp.company}
            </span>
            {exp.department && (
              <span className="text-xs text-muted-foreground">{exp.department}</span>
            )}
            {exp.type && (
              <span className="text-xs text-muted-foreground">{exp.type}</span>
            )}
          </div>

          {hasDetails && (
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-3 border-t border-border space-y-3">
                {exp.description.length > 0 && (
                  <ul className="space-y-2 list-disc list-inside text-foreground/90">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed" data-testid={`text-description-${index}-${i}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
            </div>
          )}

          {hasDetails && (
            <div className="flex justify-end mt-2">
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      id="experience"
      ref={ref}
      className={`relative py-14 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-experience-title">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-3">
          {primaryExperiences.map((exp, index) => renderCard(exp, index))}

          <div
            className={`overflow-hidden transition-all duration-500 ${
              showAdditional ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-3 pt-3">
              {additionalExperiences.map((exp, i) =>
                renderCard(exp, PRIMARY_COUNT + i)
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAdditional(prev => !prev)}
          className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto"
          data-testid="button-toggle-additional"
        >
          {showAdditional ? (
            <>
              <ChevronsUp className="h-4 w-4" />
              Hide additional experience
            </>
          ) : (
            <>
              <ChevronsDown className="h-4 w-4" />
              Show additional experience
            </>
          )}
        </button>
      </div>
    </section>
  );
}
