import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import emailjs from '@emailjs/browser';

// ── Fill these in after setting up your EmailJS account ──────────────────────
const EMAILJS_PUBLIC_KEY  = 'nJkXB15aVTRKaybgy';
const EMAILJS_SERVICE_ID  = 'service_ohst33';
const EMAILJS_TEMPLATE_ID = 'template_gy9q0j3';
// ─────────────────────────────────────────────────────────────────────────────

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
  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(private el: ElementRef) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

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

  async onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.status = 'sending';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    this.formData.name,
          email:   this.formData.email,
          message: this.formData.message,
          title:   `Portfolio Contact from ${this.formData.name}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      this.status = 'success';
      this.formData = { name: '', email: '', message: '' };

      // Reset back to idle after 4 seconds
      setTimeout(() => (this.status = 'idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      this.status = 'error';
      setTimeout(() => (this.status = 'idle'), 4000);
    }
  }
}
