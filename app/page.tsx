import { Hero } from "@/components";
import AllCars from "../components/allCars";
import ScrollToTop from "@/components/scroleToTop";
import { CarDataFaker } from "@/constants";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="overflow-hidden dark:bg-black dark:text-white ">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width dark:bg-black dark:text-white">
        <div className="home__text-container">
          <h4 className="t text-4xl font-extrabold">Car Catalogue</h4>
          <p>Explore the cars you might likes</p>
        </div>

        <AllCars />
      </div>
      <ScrollToTop />
    </main>
  );
}
