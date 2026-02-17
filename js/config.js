/**
 * Evolution Technology — config.js
 * Site-wide configuration. Edit this file to configure integrations.
 */
const ET_CONFIG = {
  /**
   * Formspree endpoint for the contact form.
   * Create a free account at https://formspree.io, create a form,
   * then paste the endpoint here: 'https://formspree.io/f/YOUR_FORM_ID'
   * If left empty, the form will open a mailto: link instead.
   */
  formspreeEndpoint: '',

  /** Contact email (used in footer and mailto fallback) */
  contactEmail: 'info@evotech.ly',

  /** Supported languages */
  languages: ['en', 'ar'],

  /** Default language */
  defaultLang: 'en',
};
