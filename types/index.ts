import { MouseEventHandler } from "react";
import { IconType } from "react-icons";

export interface ICarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface IFilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface IHomeProps {
  searchParams: IFilterProps;
}

export interface ICarCardProps {
  id: number;
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  category: string;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
  rent: number;
  img: any;
}

export interface ICustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyle?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface IOptionProps {
  title: string;
  value: string;
}

export interface ICustomFilterProps {
  title: string;
  options?: IOptionProps[];
}

export interface IShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface ISearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

export interface ISideBarDashBoard {
  id: number;
  name: string;
  link: string;
  icon: IconType;
}

export interface ICategoryData {
  id: number;
  name: string;
  dataCy: string;
}

export interface IPayloadSignUp {
  email: string;
  username: string;
  number: number;
  password: string;
}

export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  token: string;
}

export interface IPayloadCar {
  make: string;
  type: string;
  price: number;
  sell: string;
  year: number;
  name: string;
  userId: number;
  cylinders: number;
  category: string;
  carColor: string;
  transmission: string;
}

export interface IPayloadAllCar {
  make: string;
  type: string;
  price: number;
  sell: string;
  year: number;
  name: string;
  userId: number;
  img: string;
  cylinders: number;
  category: string;
  carColor: string;
  transmission: string;
}
