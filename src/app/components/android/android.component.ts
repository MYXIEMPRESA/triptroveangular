import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-android',
  templateUrl: './android.component.html',
  styleUrls: ['./android.component.css']
})
export class AndroidComponent {

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
