/* Bilingual project catalogue. Add future projects here; the homepage and projects page render automatically. */
(function () {
  'use strict';

  var en = window.ET_LOCALE_EN;
  var ar = window.ET_LOCALE_AR;

  en.nav.projects = 'Our Projects';
  ar.nav.projects = 'مشاريعنا';

  en.pages.home.projects = {
    label: 'Built by Evolution',
    title: 'Products shaped by real business',
    subtitle: 'We do more than advise and develop for others. We build and operate products of our own.'
  };
  ar.pages.home.projects = {
    label: 'من تطويرنا',
    title: 'منتجات صُمّمت من واقع العمل',
    subtitle: 'لا نكتفي بتقديم الخدمات التقنية؛ بل نبني منتجاتنا ونطوّرها باستمرار لتخدم احتياجات حقيقية.'
  };

  en.pages.projects = {
    meta: 'Products and projects built by Evolution Technology',
    title: 'Our Projects',
    hero: {
      label: 'Our Work',
      title: 'Systems we believe in—and stand behind',
      subtitle: 'Each project begins with a real operational need and grows through close work with the people who use it.'
    },
    cta: { title: 'Have a challenge worth solving?', subtitle: 'Let us understand your work and identify the right next step.', btn: 'Talk to our team' }
  };
  ar.pages.projects = {
    meta: 'مشاريع ومنتجات من تطوير شركة تقنية التطور',
    title: 'مشاريعنا',
    hero: {
      label: 'أعمالنا',
      title: 'أنظمة نؤمن بها ونقف خلفها',
      subtitle: 'يبدأ كل مشروع من احتياج فعلي، ثم يتطور بالتعاون مع الأشخاص الذين يستخدمونه في عملهم اليومي.'
    },
    cta: { title: 'لديك تحدٍ يستحق حلاً أفضل؟', subtitle: 'دعنا نفهم طبيعة عملك ونحدد معك الخطوة الأنسب.', btn: 'تحدث معنا' }
  };

  en.projects = [{
    name: 'Evo Commerce', category: 'Business management system',
    slogan: 'Every move accounted for.',
    description: 'One connected system for sales, purchasing, inventory, POS, accounting, treasury, HR, commissions, and reporting—with Arabic and English interfaces, configurable base currency, and multi-currency support.',
    tags: ['Sales & POS', 'Inventory', 'Accounting', 'Reports'],
    image: 'img/projects/evo-commerce-dashboard.png', imageAlt: 'Evo Commerce dashboard', cta: 'Ask about Evo Commerce'
  }];
  ar.projects = [{
    name: 'نظام إيفو التجاري', category: 'نظام متكامل لإدارة الأعمال',
    slogan: 'كل حركة محسوبة.',
    description: 'نظام واحد يربط المبيعات والمشتريات والمخزون ونقاط البيع والحسابات والخزينة والموظفين والعمولات والتقارير. يعمل بالعربية والإنجليزية، مع إمكانية اختيار العملة الأساسية ودعم تعدد العملات.',
    tags: ['المبيعات ونقاط البيع', 'المخزون', 'الحسابات', 'التقارير'],
    image: 'img/projects/evo-commerce-dashboard.png', imageAlt: 'لوحة التحكم في نظام إيفو التجاري', cta: 'استفسر عن إيفو التجاري'
  }];
})();
