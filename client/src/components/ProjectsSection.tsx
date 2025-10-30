import { Folder, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Humana-Mays Healthcare Case Competition',
    description:
      'Developed comprehensive healthcare analytics solution addressing key industry challenges. Presented data-driven recommendations to Humana executives, demonstrating expertise in healthcare operations and strategic analysis.',
    technologies: ['Healthcare Analytics', 'Strategic Analysis', 'Presentation'],
    category: 'Competition',
  },
  {
    title: 'Healthcare Data Visualization Platform',
    description:
      'Built interactive dashboards using Power BI and D3.js to visualize complex healthcare datasets. Enabled stakeholders to identify trends, monitor KPIs, and make informed decisions about patient care and resource allocation.',
    technologies: ['Power BI', 'D3.js', 'JavaScript', 'Data Visualization'],
    category: 'Analytics',
  },
  {
    title: 'Predictive Healthcare ML Models',
    description:
      'Designed and implemented machine learning models for patient outcome prediction and risk stratification. Leveraged Python and scikit-learn to improve clinical decision-making and optimize care pathways.',
    technologies: ['Python', 'Machine Learning', 'scikit-learn', 'TensorFlow'],
    category: 'Machine Learning',
  },
  {
    title: 'Healthcare Data Pipeline Optimization',
    description:
      'Engineered scalable ETL pipelines to process and integrate diverse healthcare data sources. Improved data quality, reduced processing time by 40%, and ensured HIPAA compliance across all workflows.',
    technologies: ['Python', 'SQL', 'ETL', 'Data Integration', 'HIPAA'],
    category: 'Data Engineering',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Folder className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-projects-title">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 flex flex-col"
              data-testid={`card-project-${index}`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl" data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </CardTitle>
                  <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
                <Badge variant="outline" className="w-fit" data-testid={`badge-category-${index}`}>
                  {project.category}
                </Badge>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-muted-foreground" data-testid={`text-description-${index}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs"
                      data-testid={`badge-tech-${index}-${i}`}
                    >
                      {tech}
                    </Badge>
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
