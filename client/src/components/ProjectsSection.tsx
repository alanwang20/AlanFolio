import { Folder, ExternalLink, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'SDoH Analysis for Health Desert Identification and ER Visit Prediction',
    description:
      'Engineering a county-level Georgia dataset with 200+ Social Determinants of Health (SDoH) features including ER, public health, and demographic data. Applying PCA and LASSO to isolate 15 key predictors of preventable ER visits. Clustering counties by SDoH profiles to define health desert severity levels, and training supervised models (SVM, Random Forest) to predict preventable ER visits tied to SDOH feature representation across clusters.',
    technologies: ['Python', 'PCA', 'LASSO', 'SVM', 'Random Forest', 'Healthcare Analytics'],
    category: 'Healthcare ML',
    status: 'In Progress',
  },
  {
    title: 'State-Level Electricity Forecasting and Visualization Tool',
    description:
      'Created Python scripts to extract, transform, and load 2.5M+ records from the Energy Information Administration (EIA) API into a GCP MySQL database. Developed predictive models using LSTM Neural Networks and XGBoost to forecast electricity demand and generation trends. Implemented PageRank to analyze systemic vulnerabilities in the grid. Created interactive visualizations in Tableau and Power BI to enable stakeholders to explore forecasted trends and identify grid risks.',
    technologies: ['Python', 'LSTM', 'XGBoost', 'GCP', 'MySQL', 'Tableau', 'Power BI', 'PageRank'],
    category: 'Data Engineering',
    status: 'Completed',
    date: 'Dec 2024',
  },
  {
    title: 'Humana-Mays Case Competition',
    description:
      'Developed CatBoost model using dataset of 1.9M+ Medicare Advantage members, achieving adjusted AUC score of 0.75 to predict member engagement in preventative care visits. Extracted top 20 features to provide targeted recommendations for addressing member unengagement by leveraging Humana\'s existing architecture—increasing member health outcomes, Medicare Advantage plan ratings, and risk-adjustment payouts.',
    technologies: ['Python', 'CatBoost', 'Healthcare Analytics', 'Predictive Modeling'],
    category: 'Competition',
    status: 'Completed',
    ranking: '50th out of 284 Teams',
    date: 'Sep 2024',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Folder className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-projects-title">
            Projects
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 flex flex-col border-l-4 border-l-primary/30"
              data-testid={`card-project-${index}`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl leading-tight" data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </CardTitle>
                  <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="outline" className="w-fit" data-testid={`badge-category-${index}`}>
                    {project.category}
                  </Badge>
                  <Badge 
                    variant={project.status === 'In Progress' ? 'default' : 'secondary'}
                    className="w-fit"
                  >
                    {project.status}
                  </Badge>
                  {project.ranking && (
                    <Badge variant="secondary" className="w-fit flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {project.ranking}
                    </Badge>
                  )}
                </div>
                {project.date && (
                  <p className="text-xs text-muted-foreground">{project.date}</p>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-foreground/90 leading-relaxed" data-testid={`text-description-${index}`}>
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
