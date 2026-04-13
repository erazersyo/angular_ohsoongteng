import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  langService = inject(LanguageService);
  visible = false;
  year = new Date().getFullYear();
  formData = { name: '', email: '', message: '' };

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.el.nativeElement);
  }

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    console.log('Message sent:', this.formData);
    this.formData = { name: '', email: '', message: '' };
  }
}
