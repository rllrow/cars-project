import { Component, OnInit } from '@angular/core';
import { Car, CarModel } from '../car';
import { CarsService } from '../cars.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [];
  form: FormGroup;
  carModels: CarModel[] = [];
  filterQuery: '';
  isOpenModal = false;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe((next) => (this.cars = next));
    this.carsService.getModels().subscribe((data) => {
      this.carModels = data;
    });
  }

  setIsOpenModal(): void {
    this.isOpenModal = !this.isOpenModal;
    this.form = new FormGroup({
      name: new FormControl(''),
      modelId: new FormControl(''),
      color: new FormControl(''),
      year: new FormControl(''),
      image: new FormControl('', Validators.required),
    });
  }

  filterCar(id: number) {
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  updateCar(updateCar: Car) {
    const { id: changedId } = updateCar;
    this.cars = [...this.cars.map((car) => (car.id === changedId ? updateCar : car))];
  }

  onChangedHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    this.form.patchValue({
      image: file,
    });
  }

  submitForm() {
    this.carsService.createCar({ ...this.form.value }).subscribe((response) => {
      this.cars = [...this.cars, response];
      this.isOpenModal = !this.isOpenModal;
    });
  }
  searchCars() {
    this.carsService.searchCars(this.filterQuery).subscribe((response) => {
      this.cars = response;
    });
  }
}
