import { Component } from '@angular/core';
import { BrandsComponent } from '../brands/brands.component';
import { TrendsComponent } from '../trends/trends.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [BrandsComponent, TrendsComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  images: string[] = [
    '../../../assets/banner/b1.png',
    '../../../assets/banner/b2.png',
    '../../../assets/banner/b3.png',
  ];
}
