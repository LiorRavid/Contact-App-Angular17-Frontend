import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Contact } from '../../shared/models/contact.model';
import { RandomUserResponse, RandomUserApiResult } from '../../shared/models/random-user.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_URL = 'https://randomuser.me/api/';

    constructor(private http: HttpClient) { }

    fetchContacts(count: number = 50): Observable<Contact[]> {
        return this.http.get<RandomUserResponse>(`${this.API_URL}?results=${count}`).pipe(
            map(response => response.results.map(user => this.mapToContact(user)))
        );
    }

    private mapToContact(user: RandomUserApiResult): Contact {
        return {
            id: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            phone: user.phone,
            cell: user.cell,
            picture: user.picture.large
        };
    }
}
