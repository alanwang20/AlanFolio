import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import LeadershipSection from '@/components/LeadershipSection';
import AcademicExperienceSection from '@/components/AcademicExperienceSection';
import ContactSection from '@/components/ContactSection';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <AcademicExperienceSection />
        <LeadershipSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
