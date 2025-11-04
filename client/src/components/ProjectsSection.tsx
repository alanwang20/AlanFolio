import { Folder, User, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const personalProjects = [
  {
    title: 'Agentic Website Development (This site!)',
    description:
      'Developing a personal branding website on Replit, built with React, TypeScript, and Tailwind CSS, designed to dynamically showcase résumé content, projects, and experiences through a modern, responsive interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Replit'],
    status: 'In Progress',
    date: 'Fall 2025 – Present',
  },
  {
    title: 'Agentic Resume Intelligence (ResuMind)',
    description:
      'Built an AI-powered resume optimization system in Python, Flask, and SQLite on Replit as an introduction to Agentic AI (A2A). Designed six parallel agents for parsing, tailoring, proofreading, and ATS scoring to create a privacy-first, upload-once platform for dynamic and personalized resume generation.',
    technologies: ['Python', 'Flask', 'SQLite', 'AI Agents', 'NLP'],
    status: 'Completed',
    date: 'Fall 2025',
  },
];

const academicProjects = [
  {
    title: 'Procedural and Spatial Syntax Analysis for Nursing Workflow and Hand Hygiene Compliance',
    description:
      'Conducting research at Emory University Hospital Midtown to identify procedural and spatial barriers to hand hygiene compliance through literature review, manager interviews, and data collection; developing an evidence-based design framework for improved compliance and preparing a publication-ready paper.',
    technologies: ['Research Design', 'Data Collection', 'Healthcare Analytics'],
    status: 'In Progress',
    date: 'Fall 2025',
  },
  {
    title: 'Simulating Cost-Effectiveness and Time to Recovery for Telehealth vs. In-Person Visits',
    description:
      'Designing a discrete-time simulation model in Python with a user-friendly interface to compare recovery time and cost across telehealth, in-person, and hybrid care models; manually coding transition probabilities and recovery functions informed by existing healthcare literature.',
    technologies: ['Python', 'Simulation Modeling', 'Healthcare Analytics'],
    status: 'In Progress',
    date: 'Fall 2025',
  },
  {
    title: 'Impacts of Social Determinants of Health on Bloodstream-Acquired MRSA Infections in California',
    description:
      'Integrating hospital-reported infection data with county-level socioeconomic variables to model and forecast MRSA infection rates using regression, time-series, and spatial deep learning techniques; uncovering social and structural factors driving infection disparities across California counties.',
    technologies: ['Python', 'Deep Learning', 'Time Series', 'Spatial Analysis'],
    status: 'In Progress',
    date: 'Fall 2025',
  },
  {
    title: 'ClusterCure: SDoH Analysis for Health Desert Identification and ER Visit Prediction',
    description:
      'Engineered a 200+ feature county-level dataset and used PCA and LASSO to identify key predictors of preventable ER visits. Clustered counties by SDoH profiles and trained SVM and Random Forest models to predict and prevent ER visits.',
    technologies: ['Python', 'PCA', 'LASSO', 'SVM', 'Random Forest'],
    status: 'Completed',
    date: 'Spring 2025',
  },
  {
    title: 'State-Level Electricity Forecasting and Visualization Tool',
    description:
      'Built a GCP MySQL pipeline to ingest 2.5M+ EIA API records. Developed LSTM and XGBoost models for forecasting electricity demand/generation, applied PageRank to identify grid vulnerabilities, and created interactive Tableau visualizations.',
    technologies: ['Python', 'LSTM', 'XGBoost', 'GCP', 'MySQL', 'Tableau', 'PageRank'],
    status: 'Completed',
    date: 'Fall 2025',
  },
  {
    title: 'Humana-Mays Case Competition (50th out of 284 Teams)',
    description:
      'Developed CatBoost model (AUC: 0.75) on 1.9M+ records to predict member engagement in preventive care; delivered actionable recommendations leveraging Humana\'s architecture to boost Medicare Advantage plan ratings and health outcomes.',
    technologies: ['Python', 'CatBoost', 'Healthcare Analytics'],
    status: 'Completed',
    date: 'Fall 2025',
  },
  {
    title: 'Genre Matters: Parametric and Nonparametric Analysis of Genre Popularity in Television Shows',
    description:
      'Analyzed over 1,000 TV shows using parametric and nonparametric statistical methods to compare episode rating distributions across genres, uncovering significant patterns in audience reception and genre popularity.',
    technologies: ['Statistical Analysis', 'Python', 'Data Visualization'],
    status: 'Completed',
    date: 'Fall 2025',
  },
  {
    title: 'Spotify Song Recommender',
    description:
      'Built a Python application using Spotify\'s API to analyze user listening trends and generate personalized song recommendations, improving engagement through similarity-based insights.',
    technologies: ['Python', 'Spotify API', 'Recommendation Systems'],
    status: 'Completed',
    date: 'Spring 2025',
  },
  {
    title: 'Housing Price Predictor',
    description:
      'Modeled housing prices for 900K+ listings using PCA, Linear Regression, Random Forest, and XGBoost in R, enhancing property valuation accuracy for buyers and agents.',
    technologies: ['R', 'PCA', 'Random Forest', 'XGBoost'],
    status: 'Completed',
    date: 'Fall 2023',
  },
  {
    title: 'Does Defense Win Championships?',
    description:
      'Conducted descriptive and regression analyses on NFL data to assess the impact of defensive performance on long-term team success.',
    technologies: ['Statistical Analysis', 'Regression', 'Sports Analytics'],
    status: 'Completed',
    date: 'Fall 2023',
  },
];

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative py-24 px-6 bg-muted/20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Folder className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-projects-title">
            Projects
          </h2>
        </div>

        {/* Personal Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold">Personal Projects</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {personalProjects.map((project, index) => (
              <Card
                key={index}
                className="hover-elevate transition-all duration-300 flex flex-col border-l-4 border-l-primary/30"
                data-testid={`card-personal-project-${index}`}
              >
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl leading-tight" data-testid={`text-personal-title-${index}`}>
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge 
                      variant={project.status === 'In Progress' ? 'default' : 'secondary'}
                      className="w-fit"
                    >
                      {project.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs"
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

        {/* Academic Projects */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold">Academic Projects</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {academicProjects.map((project, index) => (
              <Card
                key={index}
                className="hover-elevate transition-all duration-300 flex flex-col border-l-4 border-l-primary/30"
                data-testid={`card-academic-project-${index}`}
              >
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl leading-tight" data-testid={`text-academic-title-${index}`}>
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge 
                      variant={project.status === 'In Progress' ? 'default' : 'secondary'}
                      className="w-fit"
                    >
                      {project.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs"
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
      </div>
    </section>
  );
}
