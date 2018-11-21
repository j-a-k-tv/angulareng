import { Directive, ElementRef, OnInit, Host } from '@angular/core';
import { FluentRevealEffect } from "fluent-reveal-effect"

@Directive({
  selector: '.reveal-button-group'
})
export class RevealbuttoncontainerDirective implements OnInit {

  $reG: any

  constructor(@Host() el: ElementRef) {
    this.$reG = el;
  }

  ngOnInit() {
    FluentRevealEffect.applyEffect([this.$reG.nativeElement], {
      clickEffect: true,
      lightColor: "rgba(255,255,255,1)",
      gradientSize: 80,
      isContainer: true,
      children: {
        borderSelector: this.$reG.nativeElement.querySelectorAll('.reveal-button-holder'),
        elementSelector: this.$reG.nativeElement.querySelectorAll('.reveal-button-holder .reveal-button'),
        lightColor: "rgba(255,255,255,0.2)",
        gradientSize: 110
      }
    });
  }



}
