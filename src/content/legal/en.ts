import type { LegalContent } from "./types";

// English is a courtesy translation; the Turkish version is the legally
// operative text. These documents are TEMPLATES that must be reviewed and
// finalized by the business and a legal advisor before publication. The
// bracketed [ ... ] fields are placeholders for the business to complete.

export const en: LegalContent = {
  privacy: {
    title: "Privacy and Protection of Personal Data (Clarification Text)",
    updated: "Last reviewed: [date to be set] · Template v1",
    templateNotice:
      "This text is a TEMPLATE; it must be reviewed and completed by the business and a legal advisor before it takes effect. It does not constitute legal advice. The Turkish version is the legally operative text.",
    intro:
      "This Clarification Text (Aydınlatma Metni) is prepared under Türkiye's Law No. 6698 on the Protection of Personal Data (\"KVKK\") to inform you about the purposes for which the personal data collected through our website is processed, to whom it may be transferred, and your rights under the KVKK.",
    sections: [
      {
        heading: "Data Controller",
        paragraphs: [
          "Under the KVKK, your personal data is processed by Akdamar Kahvaltı Evi acting as the data controller.",
          "Address: [Kahvaltı Sokağı, Van — tam adres doldurulacak]",
          "Contact: [+90 432 000 00 00]",
          "Requests / KVKK e-mail: [kvkk@akdamar-kahvalti.example]",
        ],
      },
      {
        heading: "Personal Data We Process",
        paragraphs: [
          "Depending on how you use our website, the following personal data may be processed:",
        ],
        list: [
          "Reservation request: name, e-mail, phone (optional), date and number of guests.",
          "Newsletter subscription: e-mail address.",
          "Site usage: data collected via cookieless, anonymous analytics (Plausible), or analytics data processed only where you have given explicit consent.",
        ],
      },
      {
        heading: "Purposes",
        paragraphs: [
          "Your personal data is processed for the following purposes:",
        ],
        list: [
          "To receive, evaluate and confirm your reservation request.",
          "To send newsletters and announcements where you have requested them.",
          "To provide our services and to communicate with you.",
          "To fulfil our legal obligations.",
          "To improve our website and the quality of our service.",
        ],
      },
      {
        heading: "Legal Bases",
        paragraphs: [
          "Your personal data is processed on the following legal bases set out in Article 5 of the KVKK:",
        ],
        list: [
          "Processing being directly related to the conclusion or performance of a contract (receiving and confirming the reservation request).",
          "Your explicit consent (newsletter delivery and optional analytics cookies).",
          "The legitimate interests of the data controller, provided this does not harm your fundamental rights and freedoms (site security and improvement).",
          "Compliance with a legal obligation of the data controller.",
        ],
      },
      {
        heading: "Transfers / Third Parties",
        paragraphs: [
          "Your personal data may be shared with third parties only to the extent necessary to achieve the purposes stated in this text and in accordance with applicable legislation:",
        ],
        list: [
          "E-mail delivery service provider (Resend) — for reservation confirmations and newsletter delivery.",
          "Analytics service provider (Plausible / Vercel) — for measuring site usage.",
          "Authorised public authorities and legal bodies — where requested within the scope of legal obligations.",
          "Cross-border transfer notice: Some providers' servers may be located abroad; in that case the transfer is carried out in accordance with Article 9 of the KVKK and within the scope of [cross-border transfer basis / explicit consent / appropriate safeguards — to be completed].",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "Your personal data is retained for as long as necessary for the purposes for which it is processed and in line with the statute-of-limitations and retention periods foreseen in the relevant legislation.",
          "Reservation records are deleted, destroyed or anonymised within a reasonable period after the relevant purpose ceases to exist ([retention period — e.g. ... months/years — to be completed]). Your newsletter e-mail address is retained until you unsubscribe.",
        ],
      },
      {
        heading: "Explicit Consent",
        paragraphs: [
          "Newsletter delivery and the use of non-essential (optional) cookies are carried out only where you have given your explicit consent.",
          "You may withdraw your explicit consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out up to the moment of withdrawal. To withdraw your consent you may use the unsubscribe link in the newsletter e-mails or contact us at our requests e-mail address.",
        ],
      },
      {
        heading: "Your Rights (KVKK Art. 11)",
        paragraphs: [
          "Under Article 11 of the KVKK, by applying to the data controller you have the following rights:",
        ],
        list: [
          "To learn whether your personal data is being processed and to request information about it.",
          "To request information if your personal data has been processed.",
          "To learn the purpose of processing and whether your data is used in line with that purpose.",
          "To know the third parties to whom your personal data is transferred, domestically or abroad.",
          "To request rectification of your personal data if it has been processed incompletely or inaccurately.",
          "To request the erasure or destruction of your personal data within the conditions set out in the KVKK and relevant legislation.",
          "To request that rectification, erasure or destruction be notified to the third parties to whom your personal data has been transferred.",
          "To object to a result arising against you due to analysis of your data exclusively through automated systems.",
          "To request compensation if you suffer damage due to unlawful processing of your personal data.",
        ],
      },
      {
        heading: "Requests / Contact",
        paragraphs: [
          "To exercise the rights listed above, you may submit your requests, together with information verifying your identity, to our requests e-mail address [kvkk@akdamar-kahvalti.example].",
          "Your applications will be concluded within the periods and principles foreseen in the KVKK and the Communiqué on the Procedures and Principles of Application to the Data Controller. A detailed Data Controller Application Procedure to be published by the business in the future will supplement this text.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    updated: "Last reviewed: [date to be set] · Template v1",
    templateNotice:
      "This text is a TEMPLATE; it must be reviewed and completed by the business and a legal advisor before it takes effect. It does not constitute legal advice. The Turkish version is the legally operative text.",
    intro:
      "This Cookie Policy explains which cookies and similar technologies are used on our website and how you can manage your preferences regarding them.",
    sections: [
      {
        heading: "What Are Cookies?",
        paragraphs: [
          "Cookies are small text files stored on your device through your browser when you visit a website. Cookies can help the site perform its core functions and can improve your browsing experience.",
        ],
      },
      {
        heading: "We Do Not Use Advertising or Tracking Cookies",
        paragraphs: [
          "Our website does NOT use advertising cookies or third-party cookies that track users across sites. Your data is not processed to build advertising profiles and is not sold to third parties for such purposes.",
        ],
      },
      {
        heading: "Strictly Necessary Storage",
        paragraphs: [
          "Some preferences required for the site's core functions may be stored in your browser's local storage (localStorage) rather than in cookies. This data is not used for personalised advertising and generally does not require explicit consent.",
        ],
        list: [
          "Theme preference (e.g. light/dark appearance).",
          "Language preference.",
          "Your choice regarding cookie/consent preferences (consent record).",
        ],
      },
      {
        heading: "Optional Analytics",
        paragraphs: [
          "Analytics measurement is enabled only where you have given explicit consent. Our preference is cookieless Plausible analytics, which uses no cookies and minimises personal data.",
          "If you do not give explicit consent, optional analytics is not run; the core functions of the site are not affected.",
        ],
      },
      {
        heading: "Changing or Withdrawing Your Consent",
        paragraphs: [
          "You can change or withdraw the consent you have given at any time.",
        ],
        list: [
          "You can update your preferences via the cookie/consent banner on the site.",
          "You can reset your current preferences by clearing the site's data (including localStorage) in your browser.",
        ],
      },
      {
        heading: "Browser Controls",
        paragraphs: [
          "Most browsers allow you to view, block or delete cookies and site data. You can access these controls from the settings/privacy section of your browser. Deleting strictly necessary preferences may cause some settings on the site (e.g. theme or language) to reset.",
        ],
      },
    ],
  },
};
