import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car, CarModel, CreateCar } from './car';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`http://localhost:3000/cars`);
  }

  searchCars(q: string) {
    return this.http.get<Car[]>(`http://localhost:3000/cars?q=${q}`);
  }

  getModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`http://localhost:3000/models`);
  }

  createCar(car: CreateCar): Observable<Car> {
    const formData = new FormData();
    formData.append('image', car.image);
    formData.append('name', car.name);
    formData.append('modelId', car.modelId.toString());
    formData.append('color', car.color);
    formData.append('year', car.year.toString());

    return this.http.post<Car>(`http://localhost:3000/cars`, formData);
  }

  removeCar(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/cars/${id}`);
  }

  updateCar(car: CreateCar): Observable<Car> {
    const formData = new FormData();
    formData.append('image', car.image);
    formData.append('name', car.name);
    formData.append('modelId', car.modelId.toString());
    formData.append('color', car.color);
    formData.append('year', car.year.toString());
    formData.append('id', car.id.toString());

    return this.http.put<Car>(`http://localhost:3000/cars`, formData);
  }
}
