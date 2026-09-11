"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";
import "./ResultsSection.css";
import "./Typography.css";

type Testimonial = {
  name: string;
  age?: string;
  goal: string;
  quote: string;
  service: string;
  image?: string;
};

export function ResultsSection() {
  const { content } = useSite();
  const testimonials = content.references.cards as Testimonial[];
  const viewportRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef({ hover: false, focus: false, pointer: false, reduced: false });
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || testimonials.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      interactionRef.current.reduced = reducedMotion.matches;
    };

    updateMotionPreference();
    reducedMotion.addEventListener("change", updateMotionPreference);

    let frame = 0;
    let previousTime = performance.now();

    const move = (time: number) => {
      const delta = Math.min(time - previousTime, 40);
      previousTime = time;
      const interaction = interactionRef.current;

      if (!interaction.hover && !interaction.focus && !interaction.pointer && !interaction.reduced) {
        const firstClone = viewport.querySelector<HTMLElement>("[data-carousel-clone='true']");
        const loopPoint = firstClone?.offsetLeft ?? 0;

        viewport.scrollLeft += delta * 0.012;
        if (loopPoint > 0 && viewport.scrollLeft >= loopPoint) {
          viewport.scrollLeft -= loopPoint;
        }
      }

      frame = window.requestAnimationFrame(move);
    };

    frame = window.requestAnimationFrame(move);

    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", updateMotionPreference);
    };
  }, [testimonials.length]);

  useEffect(() => () => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
  }, []);

  const pauseAfterInteraction = () => {
    interactionRef.current.pointer = true;
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      interactionRef.current.pointer = false;
    }, 2500);
  };

  const moveByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".testimonial-card");
    if (!viewport || !card) return;

    pauseAfterInteraction();
    const gap = Number.parseFloat(window.getComputedStyle(viewport).columnGap || "0");
    viewport.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const renderCard = (testimonial: Testimonial, index: number, clone = false) => (
    <article
      className="testimonial-card"
      key={`${clone ? "clone" : "testimonial"}-${testimonial.name}-${index}`}
      data-carousel-clone={clone ? "true" : undefined}
      aria-hidden={clone || undefined}
    >
      <header className="testimonial-card__header">
        <div className="testimonial-card__identity">
          {testimonial.image ? (
            <Image
              className="testimonial-card__avatar"
              src={testimonial.image}
              alt=""
              width={46}
              height={46}
            />
          ) : null}
          <div>
            <p className="testimonial-card__name">{testimonial.name}</p>
            <p className="testimonial-card__goal">{testimonial.goal}</p>
          </div>
        </div>
        {testimonial.age ? <p className="testimonial-card__age">{testimonial.age}</p> : null}
      </header>

      <blockquote className="testimonial-card__quote">{testimonial.quote}</blockquote>

      <footer className="testimonial-card__footer">
        <span>{testimonial.service}</span>
        <span className="testimonial-card__detail" aria-hidden="true">+</span>
      </footer>
    </article>
  );

  return (
    <section className="results-section" id="results">
      <div className="container gutter results-intro">
        <SectionLabel number="05" label={content.references.label} />
        <h2 className="editorial-major">{content.references.headline}</h2>
      </div>

      <div
        className="results-carousel container gutter"
        onMouseEnter={() => { interactionRef.current.hover = true; }}
        onMouseLeave={() => { interactionRef.current.hover = false; }}
        onFocusCapture={() => { interactionRef.current.focus = true; }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) interactionRef.current.focus = false;
        }}
      >
        <div className="results-carousel__controls">
          <button type="button" onClick={() => moveByCard(-1)} aria-label={content.references.previousLabel}>←</button>
          <button type="button" onClick={() => moveByCard(1)} aria-label={content.references.nextLabel}>→</button>
        </div>

        <div
          ref={viewportRef}
          className="results-carousel__viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label={content.references.carouselLabel}
          onPointerDown={() => {
            interactionRef.current.pointer = true;
            if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
          }}
          onPointerUp={pauseAfterInteraction}
          onPointerCancel={pauseAfterInteraction}
        >
          {testimonials.map((testimonial, index) => renderCard(testimonial, index))}
          {testimonials.map((testimonial, index) => renderCard(testimonial, index, true))}
        </div>
      </div>
    </section>
  );
}
