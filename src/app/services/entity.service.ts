import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity, recordId } from '../model/entity';

@Injectable({
    providedIn: 'root'
})
export class EntityService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getEntities(): Observable<Entity[]> {
        return this.http.get<Entity[]>(`${this.apiUrl}/entities`);
    }

    getEntity(id: string): Observable<Entity> {
        return this.http.get<Entity>(`${this.apiUrl}/entity/${id}`);
    }

    createEntity(entity: { id?: string, name: string }): Observable<Entity> {
        return this.http.post<Entity>(`${this.apiUrl}/entity`, entity);
    }

    updateEntity(id: string, entity: { name: string }): Observable<Entity> {
        return this.http.put<Entity>(`${this.apiUrl}/entity/${id}`, entity);
    }

    deleteEntity(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/entity/${id}`);
    }

    // Helper method to extract the actual ID string
    getIdString(recordId: any): string {
        if (!recordId) return '';

        if (recordId.id && typeof recordId.id === 'object' && recordId.id.String) {
            return recordId.id.String;
        }

        if (recordId.id && typeof recordId.id === 'string') {
            return recordId.id;
        }

        return '';
    }
}