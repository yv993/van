import type { Locale } from "@/i18n/config";

// Warm, brand-coloured transactional emails for reservations. Inline styles
// only (email clients strip <style>). The guest confirmation is localized to
// the locale they submitted in; the staff notification stays in Turkish.

interface ReservationData {
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  email: string;
  phone?: string;
}

const STR: Record<
  Locale,
  {
    subject: string;
    greeting: string;
    intro: string;
    name: string;
    date: string;
    time: string;
    guests: string;
    outro: string;
  }
> = {
  en: {
    subject: "Your reservation at Akdamar Kahvaltı Evi",
    greeting: "Thank you",
    intro: "We've received your reservation request:",
    name: "Name",
    date: "Date",
    time: "Time",
    guests: "Guests",
    outro: "We'll confirm by phone. Afiyet olsun!",
  },
  tr: {
    subject: "Akdamar Kahvaltı Evi rezervasyonunuz",
    greeting: "Teşekkürler",
    intro: "Rezervasyon talebinizi aldık:",
    name: "Ad",
    date: "Tarih",
    time: "Saat",
    guests: "Kişi",
    outro: "Telefonla teyit edeceğiz. Afiyet olsun!",
  },
  hy: {
    subject: "Ձեր ամրագրումը՝ Akdamar Kahvaltı Evi",
    greeting: "Շնորհակալութիւն",
    intro: "Ստացանք ձեր ամրագրման հայցը.",
    name: "Անուն",
    date: "Թուական",
    time: "Ժամ",
    guests: "Հոգի",
    outro: "Հեռաձայնով պիտի հաստատենք։ Բարի ախորժակ։",
  },
  ru: {
    subject: "Ваша бронь в Akdamar Kahvaltı Evi",
    greeting: "Спасибо",
    intro: "Мы получили вашу заявку на бронь:",
    name: "Имя",
    date: "Дата",
    time: "Время",
    guests: "Гостей",
    outro: "Мы подтвердим по телефону. Приятного аппетита!",
  },
};

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;",
  );

function fmtDate(date: string, locale: Locale): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(d);
  } catch {
    return date;
  }
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:#8a6a4f;font-size:13px;width:90px">${esc(label)}</td>
    <td style="padding:6px 0;color:#2a1a11;font-size:15px;font-weight:600">${esc(value)}</td>
  </tr>`;
}

function shell(inner: string): string {
  return `<div style="margin:0;padding:24px;background:#fbf5ea;font-family:Inter,Segoe UI,Arial,sans-serif">
    <div style="max-width:480px;margin:0 auto;background:#fffdf7;border:1px solid #e8dcc4;border-radius:20px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#e2761e,#e9b949);padding:22px 28px">
        <div style="color:#fffdf7;font-size:18px;font-weight:700;letter-spacing:-0.01em">Akdamar Kahvaltı Evi</div>
        <div style="color:#fff7ea;font-size:12px;opacity:.9">Van · the morning that fed empires</div>
      </div>
      <div style="padding:28px">${inner}</div>
    </div>
    <div style="max-width:480px;margin:12px auto 0;color:#8a6a4f;font-size:11px;text-align:center">
      Kahvaltı Sokağı, Van · Türkiye
    </div>
  </div>`;
}

/** Confirmation email sent to the guest, in their submitted locale. */
export function guestConfirmation(data: ReservationData, locale: Locale) {
  const s = STR[locale] ?? STR.en;
  const table = `<table style="width:100%;border-collapse:collapse;margin-top:14px">
    ${row(s.name, data.name)}
    ${row(s.date, fmtDate(data.date, locale))}
    ${row(s.time, data.time)}
    ${row(s.guests, String(data.guests))}
  </table>`;
  const inner = `<p style="margin:0 0 4px;color:#2a1a11;font-size:20px;font-weight:700">${esc(s.greeting)}, ${esc(data.name)}!</p>
    <p style="margin:0;color:#5a3a22;font-size:15px">${esc(s.intro)}</p>
    ${table}
    <p style="margin:18px 0 0;color:#5a3a22;font-size:14px">${esc(s.outro)}</p>`;
  return { subject: s.subject, html: shell(inner) };
}

/** Notification email sent to the restaurant (Turkish, with contact details). */
export function staffNotification(data: ReservationData, locale: Locale) {
  const s = STR.tr;
  const table = `<table style="width:100%;border-collapse:collapse;margin-top:14px">
    ${row(s.name, data.name)}
    ${row(s.date, `${fmtDate(data.date, "tr")} · ${data.time}`)}
    ${row(s.guests, String(data.guests))}
    ${row("E-posta", data.email)}
    ${row("Telefon", data.phone || "—")}
    ${row("Dil", locale)}
  </table>`;
  const inner = `<p style="margin:0 0 4px;color:#2a1a11;font-size:18px;font-weight:700">Yeni rezervasyon talebi</p>
    <p style="margin:0;color:#5a3a22;font-size:14px">Web sitesinden gelen yeni bir rezervasyon talebi:</p>
    ${table}`;
  return { subject: `Yeni rezervasyon — ${data.name} (${data.date} ${data.time})`, html: shell(inner) };
}
