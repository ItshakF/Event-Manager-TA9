import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventManagmentItem } from '../models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() itemCreated = new EventEmitter<EventManagmentItem>();
  @Input() item!: EventManagmentItem;

  onSubmit() {
    const newItem = {
      color: this.item.color || '#0000ff',
      name: this.item.name,
      createdDate: this.item.createdDate || new Date().toLocaleDateString(),
      lastUpdate: new Date(),
      createdBy: this.item.createdBy || 'User Name',
      id: 0
    };

    this.itemCreated.emit(newItem);
    this.close.emit();
    }

  closeForm() {
    this.close.emit();
  }
}

