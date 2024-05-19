import { Component, AfterViewChecked } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AngularMaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewChecked {
  user: string = '';
  payload: any = {};
  constructor() {}
  ngAfterViewChecked() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.payload = jwtDecode(token);
      this.user = this.payload.name;
    } else {
      this.user = '';
    }
  }
  onExit() {
    sessionStorage.removeItem('token');
    this.user = '';
  }
}
