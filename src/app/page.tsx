import GNB from "@/components/GNB";
import Hero from "@/components/Hero";
import Architecture from "@/components/Architecture";
import Features from "@/components/Features";
import SetupGuide from "@/components/SetupGuide";
import CodeSnippets from "@/components/CodeSnippets";
import Checklist from "@/components/Checklist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <GNB />
      <Hero />
      <Architecture />
      <Features />
      <SetupGuide />
      <CodeSnippets />
      <Checklist />
      <Footer />
    </div>
  );
}
