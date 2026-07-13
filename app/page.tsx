import Hero from "./components/Banner";
import BestSellers from "./components/BestSellers";
import Features from "./components/Features";
import Genres from "./components/Genres";
import NewReleases from "./components/NewReleases";
import Newsletter from "./components/Newsletter";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <NewReleases />
      <Genres />
      <Features />
      {/* <BestSellers /> */}
      <Stats />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
