import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      className={`relative py-14 px-6 bg-muted/20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-education-title">
            Education
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 flex flex-col"
              data-testid={`card-education-${index}`}
            >
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg leading-tight" data-testid={`text-school-${index}`}>
                  {edu.school}
                </CardTitle>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="default" className="w-fit text-xs">
                    {edu.degree}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <p className="text-sm text-foreground/80" data-testid={`text-track-${index}`}>
                  {edu.track}
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs" data-testid={`text-period-${index}`}>{edu.period}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{edu.location}</span>
                  <Badge
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                    data-testid={`badge-gpa-${index}`}
                  >
                    <Award className="h-3 w-3" />
                    GPA: {edu.gpa}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
