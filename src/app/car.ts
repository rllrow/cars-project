export interface Car {
  id: number;
  name: string;
  color: string;
  year: number;
  image: string;
  model: CarModel;
}
export interface CarModel {
  id: number;
  name: string;
}
export interface CreateCar {
  name: string;
  modelId: number;
  id: number;
  color: string;
  year: number;
  image: string;
}
