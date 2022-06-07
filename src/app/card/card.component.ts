import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car, CarModel } from '../car';
import { CarsService } from '../cars.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isOpenDeleteModal = false;
  isOpenUpdateModal = false;
  form: FormGroup;

  @Input() car: Car | undefined;
  @Input() carModels: CarModel[];
  @Output() removeCar: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateCar: EventEmitter<Car> = new EventEmitter<Car>();

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.car?.name),
      modelId: new FormControl(this.car?.model.id),
      color: new FormControl(this.car?.color),
      year: new FormControl(this.car?.year),
      image: new FormControl('', Validators.required),
    });
  }

  setIsOpenDeleteModal(): void {
    this.isOpenDeleteModal = !this.isOpenDeleteModal;
  }

  setIsOpenUpdateModal(): void {
    this.isOpenUpdateModal = !this.isOpenUpdateModal;
  }

  onRemove(): void {
    if (!this.car) return;
    const { id } = this.car;
    this.carsService.removeCar(id).subscribe({
      error: (err) => {
        if (err.status !== 200) return;
        this.removeCar.emit(id);
        this.isOpenDeleteModal = !this.isOpenDeleteModal;
      },
      complete: () => {
        this.removeCar.emit(id);
        this.isOpenDeleteModal = !this.isOpenDeleteModal;
      },
    });
  }
  onChangedHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    this.form.patchValue({
      image: file,
    });
  }

  submitUpdate(id: number) {
    this.carsService.updateCar({ ...this.form.value, id }).subscribe((response) => {
      this.updateCar.emit(response);
      this.setIsOpenUpdateModal();
    });
  }
}
