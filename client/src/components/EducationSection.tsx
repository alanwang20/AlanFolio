import { GraduationCap, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const education = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'Master of Science in Analytics',
    track: 'Computational Data Analytics Track',
    period: '2023 - 2025',
    location: 'Atlanta, GA',
  },
  {
    school: 'University of Georgia',
    degree: 'Bachelor of Business Administration',
    track: 'Management Information Systems',
    period: '2019 - 2023',
    location: 'Athens, GA',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 bg-muted/20">
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
              className="hover-elevate transition-all duration-300"
              data-testid={`card-education-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground" data-testid={`text-school-${index}`}>
                      {edu.school}
                    </h3>
                    <p className="text-lg font-medium text-primary" data-testid={`text-degree-${index}`}>
                      {edu.degree}
                    </p>
                    <p className="text-base text-muted-foreground" data-testid={`text-track-${index}`}>
                      {edu.track}
                    </p>
                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium" data-testid={`text-period-${index}`}>
                      {edu.period}
                    </span>
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
