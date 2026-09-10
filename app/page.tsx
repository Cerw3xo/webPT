import { Header } from "./components/Header";
import { IntroSequence } from "./components/IntroSequence";
import { ManifestSection } from "./components/ManifestSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { DiagnosticSection } from "./components/DiagnosticSection";
import { ProcessSection } from "./components/ProcessSection";
import { ResultsSection } from "./components/ResultsSection";
import { FaqSection } from "./components/FaqSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PageLoader } from "./components/PageLoader";

export default function Home() {
  return (
    <main>
      <PageLoader />
      <Header />
      <IntroSequence />
      <ManifestSection />
      <ServicesSection />
      <AboutSection />
      <DiagnosticSection />
      <ProcessSection />
      <ResultsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
