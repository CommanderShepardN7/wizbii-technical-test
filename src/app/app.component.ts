import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private token: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    let body = new URLSearchParams();
    body.set('username', 'decouverte+2@wizbii.com');
    body.set('password', 'decouverte');
    body.set('client_id', 'test');
    body.set('grant_type', 'password');

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'})
    };

    this.http.post("/proxy",body.toString(),options).subscribe(
      response => {
        console.log("Token is: " + response['access-token']);
        this.token = response['access-token'];
      });

  }


}
