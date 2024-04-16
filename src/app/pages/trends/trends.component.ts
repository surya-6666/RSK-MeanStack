import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './trends.component.html',
  styleUrl: './trends.component.css',
})
export class TrendsComponent {
  timestamp = Date.now();
}
