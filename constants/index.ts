import { ICarCardProps, ICategoryData, ISideBarDashBoard } from "@/types";
import { BsFillSaveFill } from "react-icons/bs";
import { CgShoppingCart, CgInfo } from "react-icons/cg";
import img1 from "../public/car.jpeg";
import img2 from "../public/cat.jpg";
import img3 from "../public/hero.png";
import img4 from "../public/pattern.png";

export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
];

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];

export interface ICarDataFaker {}

export const CarDataFaker: ICarCardProps[] = [
  {
    id: 1,
    rent: 1330,
    city_mpg: 18,
    class: "midsize car",
    combination_mpg: 21,
    cylinders: 4,
    displacement: 2.2,
    drive: "fwd",
    fuel_type: "gas",
    highway_mpg: 26,
    make: "toyota",
    model: "camry",
    transmission: "a",
    category: "kia",
    year: 1993,
    img: img2,
  },
  {
    id: 2,
    city_mpg: 19,
    class: "midsize car",
    combination_mpg: 22,
    cylinders: 4,
    displacement: 2.2,
    drive: "fwd",
    fuel_type: "gas",
    highway_mpg: 27,
    category: "kia",
    rent: 2330,
    make: "toyota",
    model: "camry",
    transmission: "m",
    year: 1993,
    img: img1,
  },

  {
    id: 4,
    city_mpg: 29,
    class: "kia car",
    combination_mpg: 22,
    cylinders: 12,
    displacement: 2.1,
    drive: "fwd",
    fuel_type: "oil",
    category: "kia",
    highway_mpg: 27,
    make: "KIA",
    rent: 5330,
    model: "camry",
    transmission: "m",
    year: 2004,
    img: img4,
  },

  {
    id: 5,
    city_mpg: 29,
    class: "kia car",
    combination_mpg: 22,
    cylinders: 12,
    displacement: 2.1,
    drive: "fwd",
    fuel_type: "oil",
    highway_mpg: 27,
    make: "KIA",
    rent: 9330,
    category: "geep",
    model: "camry",
    transmission: "m",
    year: 2004,
    img: img4,
  },

  {
    id: 6,
    city_mpg: 29,
    class: "BMA",
    category: "bma",
    combination_mpg: 22,
    cylinders: 12,
    displacement: 2.1,
    drive: "fwd",
    fuel_type: "oil",
    highway_mpg: 27,
    make: "KIA",
    model: "camry",
    transmission: "m",
    rent: 1330,
    year: 2004,
    img: img2,
  },

  {
    id: 7,
    city_mpg: 29,
    class: "BMA",
    category: "bma",
    combination_mpg: 22,
    cylinders: 12,
    displacement: 2.1,
    drive: "fwd",
    fuel_type: "oil",
    highway_mpg: 27,
    make: "KIA",
    model: "camry",
    transmission: "m",
    rent: 13320,
    year: 2024,
    img: img3,
  },
];

export const DataSideBar: ISideBarDashBoard[] = [
  {
    id: 1,
    name: "info",
    link: "/dashboard/info",
    icon: CgInfo,
  },
  {
    id: 2,
    name: "product",
    link: "/dashboard/table",
    icon: CgShoppingCart,
  },
  {
    id: 3,
    name: "saved",
    link: "/dashboard/saved",
    icon: BsFillSaveFill,
  },
];

export const categoryDate: ICategoryData[] = [
  {
    id: 1,
    name: "kia",
    dataCy: "kiaCy",
  },
  {
    id: 2,
    name: "geep",
    dataCy: "geepCy",
  },
  {
    id: 3,
    name: "lancer",
    dataCy: "lancerCy",
  },
  { id: 4, name: "honda", dataCy: "hondaCy" },
  {
    id: 5,
    name: "dong",
    dataCy: "dongCy",
  },
];
