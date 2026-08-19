import { Header } from "./components/Header";
import { IntroSequence } from "./components/IntroSequence";
import {
  AboutSection,
  CoachingSection,
  ContactSection,
  FinalCta,
  PhilosophySection,
  ResultsSection,
} from "./components/Sections";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <IntroSequence />
      <AboutSection />
      <CoachingSection />
      <PhilosophySection />
      <ResultsSection />
      <FinalCta />
      <ContactSection />
      <Footer />
    </main>
  );
}
