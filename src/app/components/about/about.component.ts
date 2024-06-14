import { Component, HostListener, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {
    this.initTypingEffect();
  }

  private initTypingEffect() {
    const typingEffect = new Typed(".multiText", {
      strings: ["EXPERIENCIAS...  ", "LUGARES...  ", "CULTURA...  ", "MÉXICO..."],
      loop: true,
      typeSpeed: 190,
      backSpeed: 190,
      backDelay: 3000
    });
  }

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
