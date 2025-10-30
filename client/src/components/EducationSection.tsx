import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const education = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'Master of Science in Analytics',
    track: 'Computational Data Analytics Track',
    period: 'Aug 2024 – Dec 2025',
    location: 'Atlanta, GA',
    gpa: '4.00/4.00',
  },
  {
    school: 'University of Georgia',
    degree: 'Bachelor of Business Administration',
    track: 'Management Information Systems (Data Analytics)',
    period: 'Aug 2020 – May 2024',
    location: 'Athens, GA',
    gpa: '3.99/4.00',
  },
];

export default function EducationSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="education"
      ref={ref}
      className={`relative py-24 px-6 bg-muted/20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold" data-testid="text-education-title">
            Education
          </h2>
        </div>

        <div className="grid gap-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 border-l-4 border-l-primary/30"
              data-testid={`card-education-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-semibold text-foreground" data-testid={`text-school-${index}`}>
                      {edu.school}
                    </h3>
                    <p className="text-lg font-medium text-primary" data-testid={`text-degree-${index}`}>
                      {edu.degree}
                    </p>
                    <p className="text-base text-foreground/80" data-testid={`text-track-${index}`}>
                      {edu.track}
                    </p>
                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                  </div>
                  <div className="flex flex-col gap-3 lg:items-end">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium" data-testid={`text-period-${index}`}>
                        {edu.period}
                      </span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="w-fit flex items-center gap-2"
                      data-testid={`badge-gpa-${index}`}
                    >
                      <Award className="h-3 w-3" />
                      GPA: {edu.gpa}
                    </Badge>
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
