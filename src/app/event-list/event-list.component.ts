import { Component } from '@angular/core';
import { EventManagmentItem } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {


  events: EventManagmentItem[] = [];
  filteredEvents: EventManagmentItem[] = [];
  pagedEvents: EventManagmentItem[] = [];
  searchTerm: string = '';
  selectedEvent!: EventManagmentItem;
  isListView: boolean = true;
  isCreating: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  first: number = 0;
  rows: number = 10;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getItems().subscribe(data => {
      this.events = data;
      this.filteredEvents = data;
      this.updatePagedEvents();
    });
  }

  filterItems(): void {
    this.filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 0;
    this.updatePagedEvents();
  }

  toggleView(view: string): void {
    switch (view) {
      case 'list':
        this.isListView = true;
        break;
      case 'tiles':
        this.isListView = false;
        break;
      default:
        break;
    }
  }

  openForm(item?: EventManagmentItem): void {
    this.isCreating = true;
    this.selectedEvent = item || { name: '', id: 0, color: '', createdDate: new Date(), lastUpdate: new Date(), createdBy: '' };
  }

  closeForm(refresh: boolean = false): void {
    this.isCreating = false;
    if (refresh) {
      this.ngOnInit();
    }
  }

  onItemCreated(newItem: EventManagmentItem): void {
    const index = this.events.findIndex(event => event.name === this.selectedEvent.name);
    if (index > -1) {
      this.events[index] = newItem;
    } else {
      this.events.push(newItem);
    }
    this.filterItems();
    this.closeForm();
  }

  paginate(event: any): void {
    this.currentPage = event.page;
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedEvents();
  }

  updatePagedEvents(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEvents = this.filteredEvents.slice(start, end);
  }
}

