import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IntakeForm } from "./IntakeForm";
import { IntakeScrollProgress } from "./IntakeScrollProgress";
import styles from "./intake.module.css";

export const metadata: Metadata = {
  title: "Vstupní dotazník — Matej Červenka",
  description: "Vstupní dotazník před zahájením osobní tréninkové spolupráce.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function IntakePage() {
  return (
    <main className={styles.page}>
      <IntakeScrollProgress />
      <div className={styles.shell}>
        <header className={styles.intro}>
          <Link className={styles.logoLink} href="/" aria-label="Zpět na hlavní stránku">
            <Image
              className={styles.logo}
              src="/matej-cervenka-logo.png"
              alt="Matej Červenka"
              width={1672}
              height={941}
              priority
            />
          </Link>

          <p className={styles.eyebrow}>Vstupní dotazník</p>
          <h1>Než začneme.</h1>
          <p className={styles.lead}>
            Pár krátkých otázek mi pomůže lépe pochopit tvůj cíl, zkušenosti a možnosti. Díky tomu
            můžeme první trénink i další spolupráci nastavit smysluplně od začátku.
          </p>
          <p className={styles.note}>Vyplnění zabere přibližně 4–5 minut.</p>
        </header>

        <IntakeForm />
      </div>
    </main>
  );
}
