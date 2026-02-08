import GNB from "@/components/GNB";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <GNB />
      <GetStarted />
      <Footer />
    </div>
  );
}
