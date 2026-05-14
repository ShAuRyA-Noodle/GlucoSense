import Nav          from "@/components/landing/Nav";
import Hero         from "@/components/landing/Hero";
import Problem      from "@/components/landing/Problem";
import Physics      from "@/components/landing/Physics";
import Pipeline     from "@/components/landing/Pipeline";
import MLResults    from "@/components/landing/MLResults";
import Technology   from "@/components/landing/Technology";
import ResearchTeam from "@/components/landing/ResearchTeam";
import Footer       from "@/components/landing/Footer";

export default function Landing() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Physics />
      <Pipeline />
      <MLResults />
      <Technology />
      <ResearchTeam />
      <Footer />
    </main>
  );
}
