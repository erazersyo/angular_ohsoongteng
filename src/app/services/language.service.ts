import { Injectable, signal } from '@angular/core';
import { translations } from '../i18n/translations';

export type Lang = 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  lang = signal<Lang>('en');

  toggle() {
    this.lang.set('en');
  }

  setLang(_l: Lang) {
    this.lang.set('en');
  }

  t(key: string): string {
    const keys = key.split('.');
    let node: any = translations.en;
    for (const k of keys) {
      node = node?.[k];
    }
    return typeof node === 'string' ? node : key;
  }

  pick(en: string, _ja: string): string {
    return en;
  }

  pickArr(en: string[], _ja: string[]): string[] {
    return en;
  }
}
