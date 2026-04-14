import { Injectable, signal } from '@angular/core';
import { translations } from '../i18n/translations';

export type Lang = 'en' | 'ja';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  lang = signal<Lang>('en');

  toggle() {
    this.lang.set(this.lang() === 'en' ? 'ja' : 'en');
  }

  /**
   * Look up a dot-separated key in the translations file.
   * e.g. t('nav.home'), t('contact.sendBtn')
   */
  t(key: string): string {
    const keys = key.split('.');
    let node: any = translations[this.lang()];
    for (const k of keys) {
      node = node?.[k];
    }
    return typeof node === 'string' ? node : key;
  }

  /**
   * Choose between an English and a Japanese string based on current lang.
   * Used for per-item data (experience descriptions, project titles, etc.)
   */
  pick(en: string, ja: string): string {
    return this.lang() === 'ja' ? ja : en;
  }

  pickArr(en: string[], ja: string[]): string[] {
    return this.lang() === 'ja' ? ja : en;
  }
}
