import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private token: string;
  private dashBoardData: JSON;

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

    this.http.post("/proxyGetData" + '/v1/account/validate',body.toString(),optionsGetToken).subscribe(
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

    this.http.post("/proxyGetData" + '/v2/dashboard/?direction=newest',{},optionsDashBoard).subscribe(
      response => {
        this.dashBoardData = response['feed_items']['feed_items'] as JSON;
      });
  }

  private checkKey(object : any, property: string){
      return object.hasOwnProperty(property);
  }

  private getTimeOfPost(time: string) {
    var date = new Date(time),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      daydiff = Math.floor(diff / 86400);

    if (isNaN(daydiff) || daydiff < 0 || daydiff >= 31)
      return '';

    return daydiff == 0 && (
      diff < 60 && " - à l'instant" ||
      diff < 120 &&  " - il y a 1 minute"  ||
      diff < 3600 && " - il y a " + Math.floor(diff / 60) + " minutes" ||
      diff < 7200 && " - il y a 1 heure" ||
      diff < 86400 && " - il y a " + Math.floor(diff / 3600) + " heures") ||
      daydiff == 1 && " - hier" ||
      daydiff < 7 && " - il y a " + daydiff + " jours" ||
      daydiff < 31 && " - il y a " + Math.ceil(daydiff / 7) + " semaine(s)";
  }

}
