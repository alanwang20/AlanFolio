import { Code2, Database, BarChart3, Cloud, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'SQL', 'Java', 'HTML/CSS'],
    libraries: ['Pandas', 'NumPy', 'scikit-learn', 'Tidyverse', 'XGBoost', 'RandomForest'],
  },
  {
    title: 'Data Processing',
    icon: Database,
    skills: ['Snowflake', 'Apache Spark (PySpark)'],
    libraries: ['Web Scraping', 'Web APIs', 'MySQL', 'SQLite', 'Postgres'],
  },
  {
    title: 'Visualization',
    icon: BarChart3,
    skills: ['Power BI', 'Tableau', 'D3.js', 'Matplotlib'],
    libraries: ['ggplot2', 'UML', 'BPMN 2.0', 'Gephi'],
  },
  {
    title: 'Dev & Cloud',
    icon: Cloud,
    skills: ['AWS', 'GCP', 'Azure', 'Git', 'Salesforce'],
    libraries: ['Agile/Jira'],
  },
];

const certifications = [
  'AWS Certified Cloud Practitioner',
  'Lean Six Sigma Yellow Belt',
  'Snowflake Hands-on Data Essentials',
];

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="skills"
      ref={ref}
      className={`relative py-10 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold" data-testid="text-skills-title">
            Technical Skills
          </h2>
        </div>

        <Card data-testid="card-skills">
          <CardContent className="p-4 divide-y divide-border">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="flex flex-wrap items-start gap-x-4 gap-y-2 py-3 first:pt-1 last:pb-1"
                data-testid={`card-skill-category-${index}`}
              >
                <div className="flex items-center gap-1.5 w-28 shrink-0 pt-0.5">
                  <category.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-muted-foreground" data-testid={`text-category-${index}`}>
                    {category.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {category.skills.map((skill, i) => (
                    <Badge key={i} variant="default" className="text-xs" data-testid={`badge-skill-${index}-${i}`}>
                      {skill}
                    </Badge>
                  ))}
                  {category.libraries.map((lib, i) => (
                    <Badge key={i} variant="secondary" className="text-xs" data-testid={`badge-library-${index}-${i}`}>
                      {lib}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-start gap-x-4 gap-y-2 py-3 last:pb-1">
              <div className="flex items-center gap-1.5 w-28 shrink-0 pt-0.5">
                <Award className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs font-semibold text-muted-foreground" data-testid="text-certifications-title">
                  Certs
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-certification-${index}`}>
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
