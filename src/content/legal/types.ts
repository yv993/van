// Shape of a KVKK legal document. Rendered by the /gizlilik (Aydınlatma) and
// /cerez-politikasi (Çerez) pages. Turkish is the legally operative version;
// English is a courtesy translation. HY/RU pages reuse one of these + a note.

export interface LegalSection {
  heading: string;
  /** Body paragraphs (rendered as <p>). */
  paragraphs?: string[];
  /** Optional bullet list (e.g. the KVKK Md. 11 data-subject rights). */
  list?: string[];
}

export interface LegalDoc {
  title: string;
  /** Short "last reviewed / version" line. */
  updated: string;
  /** Prominent notice that this is a TEMPLATE for the business/lawyer to finalize. */
  templateNotice: string;
  intro?: string;
  sections: LegalSection[];
}

export interface LegalContent {
  /** Aydınlatma Metni + Açık Rıza summary + KVKK Md. 11 rights. */
  privacy: LegalDoc;
  /** Çerez (cookie) policy. */
  cookies: LegalDoc;
}
