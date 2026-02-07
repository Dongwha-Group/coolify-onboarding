import GNB from "@/components/GNB";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import ProjectStructure from "@/components/ProjectStructure";
import SetupGuide from "@/components/SetupGuide";
import CodeSnippets from "@/components/CodeSnippets";
import DeployPipeline from "@/components/DeployPipeline";
import Checklist from "@/components/Checklist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <GNB />
      <Hero />
      <Mission />
      <Features />
      <Architecture />
      <ProjectStructure />
      <SetupGuide />
      <CodeSnippets />
      <DeployPipeline />
      <Checklist />
      <Footer />
    </div>
  );
}
