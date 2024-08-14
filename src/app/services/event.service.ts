import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventManagmentItem } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private jsonUrl = 'assets/events.json';

  constructor(private http: HttpClient) { }

  getItems(): Observable<EventManagmentItem[]> {
    return this.http.get<EventManagmentItem[]>(this.jsonUrl);
  }
}
