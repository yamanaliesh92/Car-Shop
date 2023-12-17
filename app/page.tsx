import { Hero } from "@/components";
import AllCars from "../components/allCars";
import ScrollToTop from "@/components/scroleToTop";
import { CarDataFaker } from "@/constants";
import { Suspense } from "react";

export default function Home() {
  const dataIsEmpty = CarDataFaker.length < 1;

  // const filterCategory = (category: string) => {
  //   const find = CarDataFaker.find((item) => item.category === category);
  //   return find;
  // };

  // const categry = [...new Set(CarDataFaker.map((it) => it.category))];

  return (
    <main className="overflow-hidden dark:bg-black dark:text-white ">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width dark:bg-black dark:text-white">
        <div className="home__text-container">
          <h4 className="t text-4xl font-extrabold">Car Catalogue</h4>
          <p>Explore the cars you might likes</p>
        </div>
        {/* <div className="home__filters "> */}
        {/* <SearchBar /> */}
        {/* <div className="home__filter-container "> */}
        {/* <CustomFilter title="fuel" /> */}
        {/* <CustomFilter title="year" /> */}
        {/* </div> */}
        {/* </div> */}

        {dataIsEmpty ? (
          <div className="home__error-container">
            <h1 className="text-black font-bold">Oops,no result</h1>
          </div>
        ) : (
          // <div className="home__cars-wrapper">
          <Suspense
            fallback={
              <p style={{ textAlign: "center" }}>
                loading... on initial request
              </p>
            }
          >
            {" "}
            <AllCars />
          </Suspense>

          // </div>
        )}
      </div>
      <ScrollToTop />
    </main>
  );
}
