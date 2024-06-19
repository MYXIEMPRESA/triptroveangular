import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-asociate',
  templateUrl: './asociate.component.html',
  styleUrls: ['./asociate.component.css']
})
export class AsociateComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.toggleStickyHeader(window.scrollY > 0);
  }

  private toggleStickyHeader(isSticky: boolean) {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("sticky", isSticky);
    }
  }
}
