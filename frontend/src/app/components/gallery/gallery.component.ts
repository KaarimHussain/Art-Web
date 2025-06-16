import { Component } from '@angular/core';

interface Portrait {
  id: number;
  src: string;
  alt: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  activeFilter = 'all';
  
  portraits: Portrait[] = [
    {
      id: 1,
      src: 'assets/images/portrait-1.jpg',
      alt: 'Professional headshot of a woman',
      category: 'professional',
    },
    {
      id: 2,
      src: 'assets/images/portrait-2.jpg',
      alt: 'Family portrait outdoors',
      category: 'family',
    },
    {
      id: 3,
      src: 'assets/images/portrait-3.jpg',
      alt: 'Artistic black and white portrait',
      category: 'artistic',
    },
    {
      id: 4,
      src: 'assets/images/portrait-4.jpg',
      alt: 'Couple portrait',
      category: 'couple',
    },
    {
      id: 5,
      src: 'assets/images/portrait-5.jpg',
      alt: 'Corporate team portrait',
      category: 'professional',
    },
    {
      id: 6,
      src: 'assets/images/portrait-6.jpg',
      alt: 'Artistic color portrait',
      category: 'artistic',
    },
  ];

  get filteredPortraits(): Portrait[] {
    return this.activeFilter === 'all' 
      ? this.portraits 
      : this.portraits.filter(portrait => portrait.category === this.activeFilter);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  isActiveFilter(filter: string): boolean {
    return this.activeFilter === filter;
  }

  trackByPortraitId(index: number, portrait: Portrait): number {
    return portrait.id;
  }
}