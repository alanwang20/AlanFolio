import { Code2, Database, BarChart3, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    title: 'Development & Cloud',
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
      className={`relative py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Code2 className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-skills-title">
            Technical Skills
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300"
              data-testid={`card-skill-category-${index}`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold" data-testid={`text-category-${index}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="default"
                        className="text-xs"
                        data-testid={`badge-skill-${index}-${i}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.libraries.map((lib, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs"
                        data-testid={`badge-library-${index}-${i}`}
                      >
                        {lib}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-center" data-testid="text-certifications-title">
            Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm px-4 py-2"
                data-testid={`badge-certification-${index}`}
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
