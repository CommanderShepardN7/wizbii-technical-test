import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private token: string;
  private data: JSON;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.getToken();
  }

  private getToken(){

    let body = new URLSearchParams();
    body.set('username', 'decouverte+2@wizbii.com');
    body.set('password', 'decouverte');
    body.set('client_id', 'test');
    body.set('grant_type', 'password');

    let optionsGetToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'})
    };

    this.http.post("/proxyGetToken",body.toString(),optionsGetToken).subscribe(
      response => {
        this.token = response['access-token'];
        this.getDashBoardData()
      });
  }

  private getDashBoardData(){

    let optionsDashBoard = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ this.token
      })
    };

    this.http.post("/proxyGetDashBoardData",{},optionsDashBoard).subscribe(
      response => {
        this.data = response as JSON;
      });
  }

}
