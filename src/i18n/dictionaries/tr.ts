import type { Dictionary } from "@/i18n/types";

export const tr: Dictionary = {
  meta: {
    title: "Akdamar Kahvaltı Evi — Van Usulü Kahvaltı Evi",
    description:
      "Gölün iki yakayı buluşturduğu yerde, Van usulü bir kahvaltı evi. Otlu peynir, bal-kaymak ve gölün üstündeki yamaçlardan toplanan bal — şafaktan başlayarak, her yolcuya sıcacık bir karşılamayla.",
    ogAlt: "Sıcacık ahşap bir masaya kurulmuş cömert bir Van kahvaltısı sofrası",
  },
  common: {
    brand: "Akdamar",
    brandTagline: "Kahvaltı Evi · Breakfast House",
    reserve: "Masa ayırt",
    seeMenu: "Menüye göz at",
    add: "Ekle",
    added: "sepetine eklendi",
    skipToContent: "İçeriğe geç",
    language: "Dil",
    toggleTheme: "Açık/koyu tema arasında geçiş yap",
    close: "Kapat",
  },
  nav: {
    menu: "Menü",
    shop: "Dükkân",
    story: "Hikâyemiz",
    heritage: "Miras",
    visit: "Ziyaret",
    openMenu: "Menüyü aç",
    cart: "Sepet",
    primary: "Birincil",
    about: "Hakkımızda",
    journal: "Günce",
    faq: "SSS",
    mobileNav: "Mobil menü",
  },
  hero: {
    eyebrowArmenian: "Բարի լույս",
    // Gloss below is already Turkish — keep empty to avoid "Günaydın — günaydın".
    eyebrowTurkish: "",
    eyebrowGloss: "günaydın",
    titleLines: ["İMPARATORLUKLARI", "DOYURAN", "SABAH"],
    subtitle:
      "Bin yıldır Van, sonu gelmeyen bir sofraya uyanır — otlu peynir, bal, sıcacık tandır ekmeği ve semaverden çay. İki yakanın buluştuğu yere bir tabure çek, otur.",
    badges: ["40+ çeşit", "%100 köyden", "şafaktan beri"],
    signature: "imza tadımız",
    scroll: "Uyanmak için kaydır",
  },
  stats: {
    eyebrow: "Sayılarla bir sabah",
    items: [
      { value: 1000, suffix: "+", label: "ağırlanan sabah" },
      { value: 30, suffix: "+", label: "köylü üretici" },
      { value: 40, suffix: "", label: "sofradaki çeşit" },
      { value: 1, suffix: "", label: "göl, iki yaka" },
    ],
  },
  shop: {
    eyebrow: "Dükkân",
    title: "Van'ı evine götür",
    subtitle:
      "Sofraya koyduğumuz kavanozların tıpkısı — yola hazırlanır, gölden kapına yollanır.",
    badges: {
      raw: "çiğ",
      unpasteurized: "pastörize edilmemiş",
      herbLayered: "otlu",
      curated: "özenle seçilmiş",
    },
    featuredLabel: "Evin gözdesi",
    products: {
      "van-honey": {
        name: "Van çiçek balı",
        tagline: "Gölün üstündeki yamaçlardan",
        desc: "Yüksek çayırlardaki kovanlardan toplanır — çiçeksi, altın renkli ve hiç ısıtılmamış.",
      },
      "otlu-peynir-jar": {
        name: "Otlu peynir",
        tagline: "Otlarla katlanmış beyaz peynir",
        desc: "Aynı çoban ailelerin elinde yaban dağ otlarıyla katlanan taze peynir, salamurada mühürlenir.",
      },
      "murtuga-jar": {
        name: "Murtuğa kavanozu",
        tagline: "Kavrulmuş un & tereyağı",
        desc: "Köy tereyağında ağır ağır pişirilen, fındıksı tatta kavrulmuş un ezmesi. Isıt ve kaşıkla.",
      },
      "bal-kaymak-set": {
        name: "Bal-kaymak seti",
        tagline: "Bal & kaymak",
        desc: "Bir kavanoz çiğ bal ve koyu manda kaymağı — sofranın en sevilen köşesi.",
      },
      "van-breakfast-box": {
        name: "Van Kahvaltı Kutusu",
        tagline: "Tek kutuda koca bir sabah",
        desc: "Otlu peynir, çiçek balı, kaymak, murtuğa ve ceviz — evde bir Van sabahı için ne gerekiyorsa.",
      },
    },
  },
  ingredients: {
    eyebrow: "Dürüst köy malzemeleri",
    title: "Her şey onu kimin yetiştirdiğiyle başlar",
    list: [
      { name: "Otlu peynir", note: "aynı çoban ailelerden" },
      { name: "Çiçek balı", note: "Van Gölü'nün üstündeki yamaçlar" },
      { name: "Köy tereyağı", note: "yöre mandıralarından, her gün çırpılmış" },
      { name: "Ceviz & otlar", note: "tepelerden toplanmış" },
      { name: "Tandır ekmeği", note: "her şafak toprak fırında pişer" },
    ],
    promiseTitle: "Sözümüz",
    promiseBody:
      "Hiçbir şey uzaklardan kamyonla gelmez. Bu sofra hep nasıl kurulduysa öyle; yörenin ailelerinden ve mandıralarından, teker teker adıyla alırız.",
    heroCaption: "Çiğ bal, daha yeni süzülmüş",
  },
  zeroTricks: {
    eyebrow: "Hile yok",
    title: "Sadece göl, otlar ve bal",
    subtitle:
      "Ne kısa yol, ne toz karışım, ne taklit. Gölün çevresinde yetişen her şey fazlasıyla yeter.",
    cards: [
      {
        title: "Gölden başka bir şey yok",
        desc: "Su, hava ve yaban otlağı — yaylanın bütün lezzeti tek bir sabaha sığar.",
      },
      {
        title: "Tepelerden otlar",
        desc: "Sirmo, mendi ve yaban kekiği, daha yamacın kokusu üstündeyken peynire katlanır.",
      },
      {
        title: "Çiğ, altın renkli bal",
        desc: "Hiç ısıtılmamış, hiç inceltilmemiş. Petekten doğrudan sıcak ekmeğin üzerine kaşıklanır.",
      },
    ],
  },
  ritual: {
    eyebrow: "Ritüel",
    title: "Sıcacık tandırda bal-kaymak",
    body: "Tanıyabileceğin malzemeler — unutamayacağın bir sabah. Ekmeği kopar, kaymağa batır, balı gezdir, çayı koy.",
    steps: [
      "Sıcacık tandır ekmeğini kopar",
      "Koyu manda kaymağını sür",
      "Üzerine çiğ balı gezdir",
      "Semaverden çayı doldur",
    ],
  },
  heritage: {
    eyebrow: "Bir ada, bir kilise, iki halk, tek sofra",
    title: "İki yakanın bir kahvaltıyı paylaştığı yer",
    intro:
      "Van Gölü, hatırlanan en eski çağlardan beri komşuları bir araya getirir. Soframızı da bu ruhla kurarız — yöredeki Ermenilerin ve Türklerin birlikte sevdiği bir yer.",
    panels: [
      {
        title: "Göl",
        body: "Bir deniz kadar geniş ve dağlarla çevrili Van Gölü, binlerce yıldır bu yaylanın insanını doyurdu, suladı. Her sabah onun kıyısında başlar.",
      },
      {
        title: "Ada",
        body: "Akdamar adasında, asma ve nar motifleriyle işlenmiş bin yıllık bir kilise durur — bu yöreyi yurt bilen herkesin sevdiği bir simge.",
      },
      {
        title: "Ağrı Dağı",
        body: "Açık bir günde çift zirvesi ufukta belirir; suyun iki yakasındaki sayısız ortak kahvaltının sessiz fonu olur.",
      },
      {
        title: "Tek sofra",
        body: "Otlu peynir, çörek, matsun, bal: ortaklaşa taşınan bir mutfak hafızası. Onu hep servis edildiği gibi sunarız — birlikte.",
      },
    ],
    signoff: "İki yakanın buluştuğu yere otur. Burası Van, burası yuva.",
  },
  menu: {
    eyebrow: "Sofra",
    title: "Şafakta önüne koyduğumuz her şey",
    subtitle:
      "Tek fiyat, sonu gelmeyen küçük tabaklar. Sofranın bir köşesini seç — ya da hepsini getirelim.",
    all: "Hepsi",
    signature: "imza",
    dietary: "Beslenme",
    categories: {
      cheese: "Peynirler & süt ürünleri",
      honey: "Bal & kaymak",
      spoon: "Kaşık klasikleri",
      hot: "Sıcaklar",
      eggs: "Yumurta",
      borek: "Börekler",
      bread: "Ekmek & hamur işi",
      sweets: "Tatlılar",
      tea: "Çay",
      drinks: "İçecekler",
    },
    tags: {
      vegetarian: "Vejetaryen",
      "contains-nuts": "Sert kuruyemiş içerir",
      spicy: "Acılı",
      sweet: "Tatlı",
    },
    items: {
      "otlu-peynir": {
        name: "Van otlu peyniri",
        desc: "Yaban dağ otlarıyla katlanmış taze beyaz peynir; imza tadımız.",
      },
      cokelek: {
        name: "Çökelek",
        desc: "Yumuşak, hafif, hafifçe mayhoş.",
      },
      "van-tereyagi": {
        name: "Köy tereyağı",
        desc: "Soluk altın renginde, hafifçe tuzlu.",
      },
      "bal-kaymak": {
        name: "Bal & kaymak",
        desc: "Sıcak ekmeğin üzerinde çiğ bal ve koyu manda kaymağı.",
      },
      "van-cicek-bali": {
        name: "Çiçek balı",
        desc: "Gölün üstündeki yamaçlardan.",
      },
      murtuga: {
        name: "Murtuğa",
        desc: "Fındıksı tatta, kaşıkla yenir.",
      },
      kavut: {
        name: "Ballı kavut",
        desc: "Çobanın enerji yemeği.",
      },
      cacik: {
        name: "Cacık",
        desc: "Sarımsak, dereotu, zeytinyağı.",
      },
      "sucuklu-yumurta": {
        name: "Sucuklu yumurta",
        desc: "Yumurtayla kızartılmış baharatlı sucuk.",
      },
      menemen: {
        name: "Menemen",
        desc: "Yumuşacık, içini ısıtan.",
      },
      "tandir-ekmegi": {
        name: "Tandır ekmeği",
        desc: "Kalın, çiğnemesi keyifli, hafifçe közlenmiş.",
      },
      "corek-pogaca": {
        name: "Sıcak çörek & poğaça",
        desc: "Peynirli, otlu ya da cevizli.",
      },
      "semaver-cayi": {
        name: "Semaver çayı",
        desc: "İnce belli bardakta demli çay.",
      },
      "kasar-peyniri": {
        name: "Eski kaşar",
        desc: "Yumuşak, altın sarısı, hafif fındıksı olgun peynir.",
      },
      "tereyaginda-bal": {
        name: "Tereyağında bal",
        desc: "Köy tereyağı ve çiğ bal, yan yana.",
      },
      "tahin-pekmez": {
        name: "Tahin-pekmez",
        desc: "Üzüm pekmezine yedirilmiş susam ezmesi.",
      },
      acuka: {
        name: "Acuka (Van ezmesi)",
        desc: "Ateşli ceviz, kırmızı biber ve baharat ezmesi.",
      },
      "pastirmali-yumurta": {
        name: "Pastırmalı yumurta",
        desc: "Çıtırlaşmış pastırma ve köy yumurtası.",
      },
      "kavurmali-yumurta": {
        name: "Kavurmalı yumurta",
        desc: "Ağır pişmiş kuzu kavurma, yumurtayla.",
      },
      cilbir: {
        name: "Çılbır",
        desc: "Sarımsaklı yoğurt üzerine poşe yumurta, acı tereyağı.",
      },
      "sigara-boregi": {
        name: "Sigara böreği",
        desc: "İnce yufkada otlu beyaz peynir, çıtır çıtır.",
      },
      "su-boregi": {
        name: "Su böreği",
        desc: "İpeksi kat kat hamur, tereyağı ve peynir.",
      },
      gozleme: {
        name: "Gözleme",
        desc: "Saçta açılmış, peynirli ve otlu.",
      },
      "kaymakli-kayisi": {
        name: "Kaymaklı kayısı",
        desc: "Güneşte kurutulmuş kayısı, kaymak ve cevizle.",
      },
      katmer: {
        name: "Katmer",
        desc: "Kâğıt inceliğinde hamur, kaymak ve Antep fıstığı.",
      },
      kunefe: {
        name: "Künefe",
        desc: "Tel kadayıf, eriyen peynir, sıcak şerbet.",
      },
      "turk-kahvesi": {
        name: "Türk kahvesi",
        desc: "Taş değirmeninde, cezvede, lokumla.",
      },
      ayran: {
        name: "Ayran",
        desc: "Çırpılmış tuzlu yoğurt, buz gibi.",
      },
      salep: {
        name: "Salep",
        desc: "Tarçın serpili, içini ısıtan kış içeceği.",
      },
    },
  },
  testimonials: {
    eyebrow: "Sofrada sevildi",
    title: "İnsanların hatırladığı sabahlar",
    subtitle: "Gölün kıyısından ve çok daha uzaklardan misafirler.",
    featuredIn: "Yolcuların gözdesi · şuralarda yer aldı",
    featuredLogos: [
      "Gastro Anatolia",
      "Lake & Table",
      "Cornucopia",
      "Van Gazetesi",
      "The Morning Edit",
      "Diaspora Eats",
    ],
    starsLabel: "5 üzerinden {rating} yıldız",
    googleAttribution: "Google yorumları",
    readAllGoogle: "Tüm yorumları Google'da oku",
    ratingFormat: "{rating} ★ · {total} Google yorumu",
    items: {
      araxie: {
        quote:
          "Göl için geldim, kahvaltı için kaldım. Otlu peyniri ve matsunu tatmak, anneannemin sofrasında oturmak gibiydi.",
        city: "Erivan",
        role: "Erivan'dan geldi",
      },
      mehmet: {
        quote:
          "Kendi annemin mutfağı dışında yediğim en güzel kahvaltı. Sırf bal-kaymak için bile doğuya gelmeye değer.",
        city: "İstanbul",
        role: "İstanbul'dan hafta sonu",
      },
      lori: {
        quote:
          "Büyükannemler bu gölün kıyısında büyüdü, ben de onların gölle ilgili hikâyeleriyle büyüdüm. Burada, suyun kıyısında yemek yiyince ne demek istediklerini sonunda tattım.",
        city: "Los Angeles",
        role: "Los Angeles'tan yolculuk",
      },
      sevda: {
        quote:
          "İki sokak ötede büyüdüm ve hâlâ her pazar gelirim. Van'da hiçbir şey bu sofranın yanına yaklaşamaz.",
        city: "Van",
        role: "Yöre sakini, Van",
      },
      anna: {
        quote:
          "Doğrudan petekten bal, hiç bitmeyen çay ve dünyanın en güzel karşılaması. Hiç ayrılmak istemedik.",
        city: "Moskova",
        role: "Moskova'dan tatil",
      },
    },
  },
  gallery: {
    eyebrow: "Galeri",
    title: "Sofradan göle",
    subtitle: "Resimlerle Van'da bir sabah.",
    compareHint: "Karşılaştırmak için sürükle",
    beforeLabel: "Şafak sofrası",
    afterLabel: "Dolu sofra",
    alt: {
      fullTable: "Küçük tabaklarla kurulmuş dolu bir Van kahvaltı sofrası",
      lake: "Altın saatte Van Gölü'nün mavi enginliği",
      church: "Adada bin yıllık taş bir kilise",
      pomegranate: "Işıldayan taneleriyle ikiye ayrılmış nar",
      tea: "Semaverden ince belli bardaklarda demli çay",
      bread: "Yeni koparılmış taze tandır ekmeği",
      walnut: "Ahşap bir tahtada kırılmış bir ceviz yarısı",
      eggs: "Bakır tavada cızırdayan sucuklu yumurta",
      lakeWide: "Geniş gölün ardında yükselen dağlar",
      dawnSpread: "Peynir, bal ve ekmekten sade bir şafak sofrası",
      fullSpread: "Aynı sofra, şimdi kırk küçük tabakla donanmış",
    },
  },
  visit: {
    eyebrow: "Ziyaret",
    title: "Bizi gölün kıyısında bul",
    subtitle:
      "Güneşle birlikte açarız. İçeri buyur ya da aşağıdan masa ayırt — her yolcu başımızın üstünde.",
    hoursLabel: "Saatler",
    hoursValue: "Her gün, şafaktan itibaren",
    hoursDetail: "06.00 – 14.00",
    addressLabel: "Bizi bul",
    addressValue: "Kahvaltı Sokağı, Van",
    addressDetail: "Van, Türkiye",
    phoneLabel: "Önceden ara",
    phoneValue: "+90 432 000 00 00",
    mapPlaceholder: "Harita — Kahvaltı Sokağı, Van",
    mapLabel: "Harita — Kahvaltı Sokağı, Van",
    openNow: "Şu an açık",
    closedNow: "Şu an kapalı",
    form: {
      title: "Masa ayırt",
      name: "Adınız",
      namePlaceholder: "örn. Araxie",
      date: "Tarih",
      time: "Saat",
      guests: "Misafir",
      guest: "misafir",
      guestsPlural: "misafir",
      email: "E-posta",
      emailPlaceholder: "ornek@eposta.com",
      phone: "Telefon",
      phonePlaceholder: "+90 5xx xxx xx xx",
      optional: "isteğe bağlı",
      consent:
        "Kişisel verilerimin işlenmesine ilişkin {link}'ni okudum ve kabul ediyorum.",
      consentLink: "Aydınlatma Metni",
      submit: "Masa ayırt",
      sending: "Gönderiliyor…",
      success:
        "Teşekkürler, {name}! {date} günü, {time} saati için {guests} kişilik masa talebiniz alındı. Telefonla teyit edeceğiz.",
      errorGeneric:
        "Bir şeyler ters gitti. Lütfen tekrar deneyin veya bizi arayın.",
      errors: {
        name: "Lütfen adınızı söyleyin.",
        email: "Teyit edebilmemiz için geçerli bir e-posta girin.",
        consent: "Devam etmek için lütfen aydınlatma metnini kabul edin.",
        date: "Lütfen bir tarih seçin.",
        datePast: "Lütfen bugünü ya da ileri bir tarihi seçin.",
        time: "Lütfen bir saat seçin.",
        guests: "1 ile 12 misafir arasında seçin.",
      },
    },
  },
  closing: {
    titleLines: ["BIRAKIN", "SABAH", "PARLASIN"],
    subtitle:
      "Ağır akan sabahlar, mevsimlik kavanozlar ve gölün kıyısında bir köşe — doğrudan gelen kutuna.",
    emailPlaceholder: "sen@ornek.com",
    button: "Beni haberdar et",
    success: "Listedesin — şafakta görüşürüz.",
    invalidEmail: "Lütfen geçerli bir e-posta adresi girin.",
    sending: "Kaydediliyor…",
    error: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
    consent: "Abone olarak {link}'ni kabul etmiş olursunuz.",
    consentLink: "Aydınlatma Metni",
  },
  footer: {
    tagline:
      "Gölün iki yakayı buluşturduğu bir Van kahvaltı evi. Şafaktan başlayarak, herkese sıcacık bir karşılamayla.",
    exploreTitle: "Keşfet",
    languagesTitle: "Dil",
    followTitle: "Takip et",
    signoffArmenian: "Բարի ախորժակ",
    signoffTurkish: "",
    signoffGloss: "afiyet olsun",
    rights: "© {year} Akdamar Kahvaltı Evi. Tüm hakları saklıdır.",
    credit: "Örnek site — görseller ve yorumlar yalnızca tasarım amaçlıdır.",
    legal: {
      title: "Yasal",
      privacy: "Gizlilik",
      cookies: "Çerezler",
      note: "Bu hukuki metinler Türkçe ve İngilizce olarak sunulmaktadır.",
    },
  },
  consent: {
    title: "Çerezler ve gizliliğiniz",
    body: "Çerezsiz bir analiz aracını yalnızca onayınızla kullanırız. {privacy} ve {cookies} sayfalarımıza bakın.",
    accept: "Kabul et",
    necessary: "Sadece gerekli",
  },
  cart: {
    title: "Sepetin",
    empty: "Sepetin boş",
    emptyHint: "Sabahı evine götürmek için bir kavanoz Van ekle.",
    subtotal: "Ara toplam",
    checkout: "Ödeme",
    checkoutNote: "Demo ödeme — herhangi bir tahsilat yapılmaz.",
    remove: "Kaldır",
    increase: "Adedi artır",
    decrease: "Adedi azalt",
    itemCount: "{count} ürün",
  },
  journal: {
    eyebrow: "Günce",
    title: "Gölden notlar",
    subtitle: "Ağır sabahlar, yaban otları ve sofranın ardındaki hikâyeler.",
    readMore: "Devamını oku",
    backToJournal: "Tüm günce",
    prev: "Önceki",
    next: "Sonraki",
  },
  chapterLabels: {
    arrival: "Varış",
    table: "Sofra",
    ritual: "Ritüel",
    heritage: "Miras",
    visit: "Ziyaret",
  },
  worldMap: {
    eyebrow: "Haritada",
    title: "Uzaydan Van'ın kıyılarına",
    body: "Yörüngeden o mavi iç denize süzülün ve kilisenin bin yıldır suları izlediği adayı bulun.",
    markerLabel: "Akdamar Adası",
    alt: "Uzaydan Van Gölü'ne ve Doğu Türkiye'deki Akdamar Adası'na yakınlaşan uydu küresi",
    card1: {
      title: "Uzaydan Van'a",
      text: "Bir zamanlar deniz sanılacak kadar geniş, Doğu Anadolu'da dağlarla çevrili bir göl.",
    },
    card2: {
      title: "Gölün üstünde Akdamar",
      text: "Güney kıyısının açığında küçük bir ada — ve üzerinde, bu yöreyi yurt bilen herkesin sevdiği bin yıllık Surp Haç Kilisesi.",
    },
  },
};

export default tr;
