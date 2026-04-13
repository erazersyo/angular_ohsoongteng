export const translations = {
  en: {
    nav: {
      home:       'Home',
      skills:     'Skills',
      experience: 'Experience',
      projects:   'Projects',
      contact:    'Contact',
    },
    hero: {
      name:        'Oh Soong Teng',
      namePostfix: '',
      greeting:    "Hi there, I'm",
      subtitle:    'Software Engineer with 3.5 years of experience, based in Malaysia and Japan. I specialise in building modern web applications across both frontend and backend using JavaScript frameworks.',
      viewResume:  'View Resume',
      getInTouch:  'Get In Touch',
    },
    skills: {
      label:          'What I Know',
      titleMain:      'Technical',
      titleHighlight: 'Skills',
    },
    experience: {
      label:          "Where I've Worked",
      titleMain:      'Work',
      titleHighlight: 'Experience',
    },
    projects: {
      label:          "What I've Built",
      titleMain:      'My',
      titleHighlight: 'Projects',
    },
    contact: {
      label:              "Let's Talk",
      titleMain:          'Get In',
      titleHighlight:     'Touch',
      subtitle:           "Have a project in mind or just want to connect? I'd love to hear from you.",
      nameLabel:          'Name',
      emailLabel:         'Email',
      messageLabel:       'Message',
      namePlaceholder:    'Your Name',
      messagePlaceholder: 'Tell me about your project...',
      sendBtn:            'Send Message',
      orText:             'Or reach me via',
      emailLink:          'Email',
      footerPrefix:       'Designed & Built by',
      footerName:         'Oh Soong Teng',
    },
  },

  ja: {
    nav: {
      home:       'ホーム',
      skills:     'スキル',
      experience: '職歴',
      projects:   'プロジェクト',
      contact:    'お問い合わせ',
    },
    hero: {
      name:        'オースンテン',
      namePostfix: 'と申します。',
      greeting:    'はじめまして、',
      subtitle:    'マレーシアと日本を拠点に活動するソフトウェアエンジニア。3年半の実務経験を持ち、JavaScriptフレームワークを用いたフロントエンド・バックエンド開発を専門としています。',
      viewResume:  '履歴書を見る',
      getInTouch:  'お問い合わせ',
    },
    skills: {
      label:          '得意分野',
      titleMain:      '技術',
      titleHighlight: 'スキル',
    },
    experience: {
      label:          '職歴',
      titleMain:      '職務',
      titleHighlight: '経歴',
    },
    projects: {
      label:          '制作実績',
      titleMain:      '私の',
      titleHighlight: 'プロジェクト',
    },
    contact: {
      label:              'ご連絡はこちら',
      titleMain:          '',
      titleHighlight:     'お問い合わせ',
      subtitle:           'プロジェクトのご相談やお問い合わせがございましたら、お気軽にご連絡ください。',
      nameLabel:          'お名前',
      emailLabel:         'メールアドレス',
      messageLabel:       'メッセージ',
      namePlaceholder:    'お名前を入力',
      messagePlaceholder: 'プロジェクトについてお聞かせください...',
      sendBtn:            '送信する',
      orText:             'または以下からご連絡ください',
      emailLink:          'メール',
      footerPrefix:       '設計・開発：',
      footerName:         'オースンテン',
    },
  },
} as const;

export type Translations = typeof translations;
export type Lang = keyof Translations;
