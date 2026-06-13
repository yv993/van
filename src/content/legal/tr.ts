import type { LegalContent } from "./types";

// Türkçe, hukuken geçerli (operative) sürümdür. Bu metinler birer ŞABLONDUR;
// yürürlüğe girmeden önce işletme ve bir hukuk danışmanı tarafından gözden
// geçirilip tamamlanmalıdır. Köşeli parantezli [ ... ] alanlar işletme
// tarafından doldurulacak yer tutuculardır.

export const tr: LegalContent = {
  privacy: {
    title: "Gizlilik ve Kişisel Verilerin Korunması (Aydınlatma Metni)",
    updated: "Son güncelleme: [tarih doldurulacak] · Şablon v1",
    templateNotice:
      "Bu metin bir ŞABLONDUR; yürürlüğe girmeden önce işletme ve bir hukuk danışmanı tarafından gözden geçirilip tamamlanmalıdır. Hukuki tavsiye niteliği taşımaz.",
    intro:
      "İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, web sitemiz üzerinden toplanan kişisel verilerinizin hangi amaçlarla işlendiği, kimlere aktarılabileceği ve KVKK kapsamındaki haklarınız hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.",
    sections: [
      {
        heading: "Veri Sorumlusu",
        paragraphs: [
          "KVKK kapsamında kişisel verileriniz, veri sorumlusu sıfatıyla Akdamar Kahvaltı Evi tarafından işlenmektedir.",
          "Adres: [Kahvaltı Sokağı, Van — tam adres doldurulacak]",
          "İletişim: [+90 432 000 00 00]",
          "Başvuru / KVKK e-posta: [kvkk@akdamar-kahvalti.example]",
        ],
      },
      {
        heading: "İşlenen Kişisel Veriler",
        paragraphs: [
          "Web sitemizi kullanım biçiminize bağlı olarak aşağıdaki kişisel veriler işlenebilir:",
        ],
        list: [
          "Rezervasyon talebi: ad, e-posta, telefon (opsiyonel), tarih ve kişi sayısı.",
          "Bülten aboneliği: e-posta adresi.",
          "Site kullanımı: çerezsiz ve anonim analitik (Plausible) yoluyla toplanan veriler veya açık rızanıza bağlı olarak işlenen analitik veriler.",
        ],
      },
      {
        heading: "İşleme Amaçları",
        paragraphs: [
          "Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:",
        ],
        list: [
          "Rezervasyon talebinizi almak, değerlendirmek ve teyit etmek.",
          "Talep etmeniz hâlinde bülten ve duyuru göndermek.",
          "Hizmetlerimizi sunmak ve sizinle iletişim kurmak.",
          "Yasal yükümlülüklerimizi yerine getirmek.",
          "Web sitemizi ve hizmet kalitemizi iyileştirmek.",
        ],
      },
      {
        heading: "Hukuki Sebepler",
        paragraphs: [
          "Kişisel verileriniz, KVKK Madde 5'te düzenlenen aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:",
        ],
        list: [
          "Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (rezervasyon talebinin alınması ve teyidi).",
          "Açık rızanızın bulunması (bülten gönderimi ve isteğe bağlı analitik çerezler).",
          "Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri (site güvenliği ve iyileştirme).",
          "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi.",
        ],
      },
      {
        heading: "Aktarım / Üçüncü Taraflar",
        paragraphs: [
          "Kişisel verileriniz, yalnızca işbu metinde belirtilen amaçların gerçekleştirilmesi için gerekli olduğu ölçüde ve ilgili mevzuata uygun olarak üçüncü taraflarla paylaşılabilir:",
        ],
        list: [
          "E-posta gönderim hizmeti sağlayıcısı (Resend) — rezervasyon teyidi ve bülten gönderimi amacıyla.",
          "Analitik hizmeti sağlayıcısı (Plausible / Vercel) — site kullanımının ölçümlenmesi amacıyla.",
          "Yetkili kamu kurum ve kuruluşları ile yasal merciler — hukuki yükümlülükler kapsamında talep edilmesi hâlinde.",
          "Yurt dışı aktarım uyarısı: Bazı sağlayıcıların sunucuları yurt dışında bulunabilir; bu hâlde aktarım KVKK Madde 9'a uygun olarak ve [yurt dışı aktarım esası / açık rıza / uygun güvenceler — doldurulacak] kapsamında gerçekleştirilir.",
        ],
      },
      {
        heading: "Saklama Süresi",
        paragraphs: [
          "Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı/saklama süreleri uyarınca muhafaza edilir.",
          "Rezervasyon kayıtları, ilgili amacın ortadan kalkmasının ardından makul bir süre içinde ([saklama süresi — ör. ... ay/yıl — doldurulacak]) silinir, yok edilir veya anonim hâle getirilir. Bülten aboneliğine ilişkin e-posta adresiniz, aboneliğinizi sonlandırmanıza kadar saklanır.",
        ],
      },
      {
        heading: "Açık Rıza",
        paragraphs: [
          "Bülten gönderimi ve zorunlu olmayan (isteğe bağlı) çerezlerin kullanımı, ancak açık rızanızın bulunması hâlinde gerçekleştirilir.",
          "Vermiş olduğunuz açık rızayı dilediğiniz zaman geri çekebilirsiniz. Rızanın geri çekilmesi, geri çekme anına kadar yürütülen işlemlerin hukukiliğini etkilemez. Rızanızı geri çekmek için bülten e-postalarındaki abonelikten çıkma bağlantısını kullanabilir veya başvuru e-posta adresimize başvurabilirsiniz.",
        ],
      },
      {
        heading: "İlgili Kişinin Hakları (KVKK Md. 11)",
        paragraphs: [
          "KVKK'nın 11. maddesi uyarınca, veri sorumlusuna başvurarak aşağıdaki haklara sahipsiniz:",
        ],
        list: [
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme ve bu konuda bilgi talep etme.",
          "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.",
          "Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.",
          "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme.",
          "Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.",
          "KVKK ve ilgili mevzuatta öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme.",
          "Düzeltme, silme veya yok etme işlemlerinin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme.",
          "İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi sonucunda aleyhinize bir sonucun ortaya çıkmasına itiraz etme.",
          "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
        ],
      },
      {
        heading: "Başvuru / İletişim",
        paragraphs: [
          "Yukarıda sayılan haklarınızı kullanmak için taleplerinizi, kimliğinizi tevsik edici bilgilerle birlikte başvuru e-posta adresimiz olan [kvkk@akdamar-kahvalti.example] üzerinden iletebilirsiniz.",
          "Başvurularınız, KVKK ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'de öngörülen süre ve esaslar çerçevesinde sonuçlandırılacaktır. İşletme tarafından ileride yayımlanacak ayrıntılı Veri Sorumlusu Başvuru Usulü, bu metni tamamlayıcı niteliktedir.",
        ],
      },
    ],
  },
  cookies: {
    title: "Çerez Politikası",
    updated: "Son güncelleme: [tarih doldurulacak] · Şablon v1",
    templateNotice:
      "Bu metin bir ŞABLONDUR; yürürlüğe girmeden önce işletme ve bir hukuk danışmanı tarafından gözden geçirilip tamamlanmalıdır. Hukuki tavsiye niteliği taşımaz.",
    intro:
      "İşbu Çerez Politikası, web sitemizde hangi çerezlerin ve benzeri teknolojilerin kullanıldığını ve bunlara ilişkin tercihlerinizi nasıl yönetebileceğinizi açıklar.",
    sections: [
      {
        heading: "Çerez Nedir?",
        paragraphs: [
          "Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin temel işlevlerini yerine getirmesine ve kullanım deneyiminizin iyileştirilmesine yardımcı olabilir.",
        ],
      },
      {
        heading: "Reklam ve Takip Çerezleri Kullanmıyoruz",
        paragraphs: [
          "Web sitemiz, reklam amaçlı veya kullanıcıları siteler arası takip eden (third-party tracking) çerezler KULLANMAZ. Verileriniz reklam profili oluşturmak için işlenmez ve bu amaçla üçüncü taraflara satılmaz.",
        ],
      },
      {
        heading: "Zorunlu (Kesinlikle Gerekli) Saklama",
        paragraphs: [
          "Sitenin temel işlevleri için gerekli olan bazı tercihler, çerez yerine tarayıcınızın yerel depolama alanında (localStorage) saklanabilir. Bu veriler kişisel reklam amacı taşımaz ve genel olarak açık rıza gerektirmez.",
        ],
        list: [
          "Tema tercihi (ör. açık/koyu görünüm).",
          "Dil tercihi.",
          "Çerez/izin tercihinize ilişkin seçiminiz (rıza kaydı).",
        ],
      },
      {
        heading: "İsteğe Bağlı Analitik",
        paragraphs: [
          "Analitik ölçümleme yalnızca açık rızanız bulunduğunda etkinleştirilir. Tercihimiz, çerez kullanmayan ve kişisel veriyi en aza indiren (cookieless) Plausible analitiğidir.",
          "Açık rıza vermemeniz hâlinde, isteğe bağlı analitik çalıştırılmaz; sitenin temel işlevleri etkilenmez.",
        ],
      },
      {
        heading: "Rızanızı Değiştirme veya Geri Çekme",
        paragraphs: [
          "Verdiğiniz izni dilediğiniz zaman değiştirebilir veya geri çekebilirsiniz.",
        ],
        list: [
          "Sitedeki çerez/izin bildirimi (banner) üzerinden tercihlerinizi güncelleyebilirsiniz.",
          "Tarayıcınızın site verilerini (localStorage dâhil) temizleyerek mevcut tercihlerinizi sıfırlayabilirsiniz.",
        ],
      },
      {
        heading: "Tarayıcı Kontrolleri",
        paragraphs: [
          "Çoğu tarayıcı, çerezleri ve site verilerini görüntülemenize, engellemenize veya silmenize olanak tanır. Tarayıcınızın ayarlar/gizlilik bölümünden bu kontrollere ulaşabilirsiniz. Zorunlu tercihlerin silinmesi, sitedeki bazı ayarların (ör. tema veya dil) sıfırlanmasına yol açabilir.",
        ],
      },
    ],
  },
};
