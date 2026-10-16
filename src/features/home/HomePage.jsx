import { Hero } from "./sections/Hero";
import { StatsStrip } from "./sections/StatsStrip";
import { FeaturesGrid } from "./sections/FeaturesGrid";
import { Showcase } from "./sections/Showcase";

/**
 * Landing page. Composed from small section components so each piece stays
 * readable and independently maintainable.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturesGrid />
      <Showcase />
    </>
  );
}
