import { Header } from "./components/Header";
import { IntroSequence } from "./components/IntroSequence";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { DiagnosticSection } from "./components/DiagnosticSection";
import { ProcessSection } from "./components/ProcessSection";
import { ResultsSection } from "./components/ResultsSection";
import { FinalCta } from "./components/FinalCta";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <IntroSequence />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <DiagnosticSection />
      <ResultsSection />
      <FinalCta />
      <ContactSection />
      <Footer />
    </main>
  );
}
