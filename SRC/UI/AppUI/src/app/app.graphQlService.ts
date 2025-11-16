import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from './app.query';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private apollo: Apollo) {}

  getUsers(appQuerry: any): Observable<any[]> {
    return this.apollo
      .watchQuery<{ users: any[] }>({ query: appQuerry })
     .valueChanges.pipe(map(result => result.data?.users ?? []) );
  }
}

@Injectable({ providedIn: 'root' })
export class UserDataServiceById {
  constructor(private apollo: Apollo) {}

  getUsersById(appQuerry: any, id: number): Observable<any> {
    return this.apollo
      .watchQuery<{ user: any}>({ 
        query: appQuerry,
        variables: { userId : id }
       })
     .valueChanges.pipe(map(result => result.data?.user) );
  }
}