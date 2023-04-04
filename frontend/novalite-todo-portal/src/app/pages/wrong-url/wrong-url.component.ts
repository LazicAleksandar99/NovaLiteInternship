import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrong-url',
  templateUrl: './wrong-url.component.html',
  styleUrls: ['./wrong-url.component.css']
})
export class WrongUrlComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  redirectToHome() {
    this.route.navigateByUrl('/home/lists')  
  }
}
