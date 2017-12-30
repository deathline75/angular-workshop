import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DadJokeService {

  constructor(private http: HttpClient) { }

  getDadJoke(): Observable<DadJoke> {
    return this.http.get<DadJoke>('https://icanhazdadjoke.com/', {
      headers: new HttpHeaders().set('Accept', 'application/json')
    });
  }
}

export interface DadJoke {
  id: string;
  joke: string;
  status: number;
}
