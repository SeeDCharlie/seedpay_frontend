import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  constructor() { 
    if (!localStorage.getItem('cartItems')){
      localStorage.setItem('cartItems', '[]');
    }
    
  }

  ngOnInit(): void {
  }

}
