import { Component, HostListener, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

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
