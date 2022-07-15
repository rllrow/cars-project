export interface Car {
  id: number;
  name: string;
  color: string;
  year: number;
  image: string;
  model: CarModel;
}
export interface CarModel extends Pick<Car,"id"| "name" >{}
export interface CreateCar extends Omit<Car, 'model'> {
  modelId: number;
}

