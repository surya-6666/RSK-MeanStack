import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../../angular-material/angular-material.module';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface IMenu {
  route: string;
  name: string;
  icon: string;
  children?: [];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public payload: any = {};
  user: string = '';
  menuList$: Observable<IMenu>;
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.payload = jwtDecode(token);
      this.user = this.payload.name;
    }
    this.menuList$ = this.http.get<IMenu>('../../../../assets/menuItems.json');
  }
}
