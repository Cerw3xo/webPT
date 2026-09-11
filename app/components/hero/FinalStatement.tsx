import { EditorialCta } from "../EditorialCta";
import { useSite } from "../SiteContext";
import s from "./FinalStatement.module.css";

export function FinalStatement() {
  const { content } = useSite();
  const disciplines = content.hero.chapters.map((chapter) => chapter.discipline).join(" · ");

  return (
    <article className={s.wrap}>
      <div className={`container gutter ${s.inner}`}>
        <p className={s.kicker}>{content.hero.finalLabel}</p>
        <h1 className={s.heading}>
          {content.hero.finalLineOne}
          <br />
          <span className={s.secondLine}>
            <span className={s.soft}>{content.hero.finalLineTwo}</span> {content.hero.finalLineThree}
          </span>
        </h1>
        <div className={s.copy}>
          <p>{content.hero.finalLead}</p>
          {content.hero.finalDescription ? <p>{content.hero.finalDescription}</p> : null}
          <p className={s.services}>{content.hero.finalServices}</p>
          <p className={s.disciplines}>{disciplines}</p>
        </div>
        <EditorialCta href="#contact" label={content.hero.finalCta} />
      </div>
    </article>
  );
}
