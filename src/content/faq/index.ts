import type { FaqByLocale } from "./types";

// FAQ content for Akdamar Kahvaltı Evi, rendered by /[locale]/faq.
// Brand name and Van breakfast terms (otlu peynir, bal-kaymak) stay in their
// original form across locales, matching the i18n dictionaries. Western
// Armenian (hy) uses classical orthography. Shipping and exact parking are
// gentle placeholders for the business to confirm.
export const faq: FaqByLocale = {
  en: {
    title: "Questions & answers",
    intro:
      "A few things our guests often ask before they come down to the lake for breakfast.",
    items: [
      {
        q: "What are your opening hours?",
        a: "We open every day from 06:00 to 14:00. It is breakfast only, served from first light until early afternoon.",
      },
      {
        q: "Do I need a reservation?",
        a: "Walk-ins are always welcome, and you can also reserve a table here on the website. On busy weekends, reserving ahead is the wise choice.",
      },
      {
        q: "Do you have vegetarian options? What about allergens?",
        a: "Many of our dishes are vegetarian, and the menu marks the dietary tags for each plate. Some dishes contain nuts such as walnut and pistachio, so please ask our staff about anything specific.",
      },
      {
        q: "Is the food halal?",
        a: "Yes. Our meats are sourced halal, as is standard for this region.",
      },
      {
        q: "Is there parking?",
        a: "There is street parking nearby, and the lakeside lane is an easy walk. On weekends it fills up, so it helps to arrive early.",
      },
      {
        q: "Do you ship the jars?",
        a: "Our small shop offers honey, herbed cheese and breakfast boxes, with shipping within Türkiye. Please treat this as a note to confirm with us, as details may vary.",
      },
      {
        q: "Can I book for a group?",
        a: "Yes, groups are very welcome. For tables of eight or more, please call ahead so we can set the long table for you.",
      },
      {
        q: "What languages do you speak?",
        a: "Our staff speak Turkish and English, and some also speak Armenian and Russian. The website is available in all four languages.",
      },
    ],
  },
  tr: {
    title: "Sorular ve yanıtlar",
    intro:
      "Misafirlerimizin göl kıyısına kahvaltıya inmeden önce sıkça sorduğu birkaç şey.",
    items: [
      {
        q: "Çalışma saatleriniz nedir?",
        a: "Her gün 06:00 – 14:00 arası açığız. Yalnızca kahvaltı veriyoruz; ilk ışıkla başlayıp öğleden hemen sonraya kadar sürüyor.",
      },
      {
        q: "Rezervasyon gerekli mi?",
        a: "Rezervasyonsuz gelenler her zaman baş tacımızdır; dilerseniz web sitesinden de masa ayırtabilirsiniz. Yoğun hafta sonlarında önceden yer ayırtmak akıllıca olur.",
      },
      {
        q: "Vejetaryen seçenekleriniz var mı? Ya alerjenler?",
        a: "Birçok yemeğimiz vejetaryendir ve menüde her tabağın beslenme etiketleri belirtilmiştir. Bazı yemeklerde ceviz ve fıstık gibi sert kabuklu kuruyemişler bulunur; özel durumlar için lütfen personelimize danışın.",
      },
      {
        q: "Yemekler helal mi?",
        a: "Evet. Etlerimiz helal olarak temin edilir; bu, yöremizde olağan bir uygulamadır.",
      },
      {
        q: "Otopark var mı?",
        a: "Yakında cadde üzeri park yeri bulunur ve göl kenarındaki sokak yürüme mesafesindedir. Hafta sonları dolduğu için erken gelmenizde fayda var.",
      },
      {
        q: "Kavanozları kargolar mısınız?",
        a: "Küçük dükkânımızda bal, otlu peynir ve kahvaltı kutuları bulunur; Türkiye içine gönderim yapılır. Ayrıntılar değişebileceğinden, bunu bizimle teyit etmeniz gereken bir not olarak değerlendirin.",
      },
      {
        q: "Grup için rezervasyon yapabilir miyim?",
        a: "Evet, gruplar başımızın üstünde yeri var. 8 ve üzeri masalar için lütfen önceden arayın ki uzun sofrayı sizin için hazırlayalım.",
      },
      {
        q: "Hangi dilleri konuşuyorsunuz?",
        a: "Personelimiz Türkçe ve İngilizce konuşur; bazıları Ermenice ve Rusça da bilir. Web sitemiz dört dilde de mevcuttur.",
      },
    ],
  },
  hy: {
    title: "Հարցեր եւ պատասխաններ",
    intro:
      "Քանի մը բան, որ մեր հիւրերը յաճախ կը հարցնեն՝ նախքան լիճին քով նախաճաշի իջնելը։",
    items: [
      {
        q: "Որո՞նք են ձեր բացման ժամերը։",
        a: "Կը բանանք ամէն օր՝ 06:00-էն 14:00։ Միայն նախաճաշ կը մատուցենք՝ առաջին լոյսէն մինչեւ կէսօրէ կարճ ետք։",
      },
      {
        q: "Ամրագրում պէ՞տք է։",
        a: "Առանց ամրագրումի եկողները միշտ բարի եկած են, իսկ կրնաք նաեւ սեղան ապահովել կայքէն։ Բանուկ շաբաթավերջերուն իմաստուն է նախապէս ամրագրել։",
      },
      {
        q: "Բուսակերներու համար ընտրանք ունի՞ք. իսկ ալերգածինները։",
        a: "Մեր ճաշերէն շատերը բուսակեր են, եւ ցանկը կը նշէ իւրաքանչիւր պնակի սննդային պիտակները։ Կարգ մը ճաշեր կը պարունակեն ընկոյզ եւ փիստակ. յատուկ պարագաներու համար հաճեցէ՛ք հարցնել մեր անձնակազմին։",
      },
      {
        q: "Ճաշը հալա՞լ է։",
        a: "Այո՛։ Մեր միսերը հալալ կերպով կ՚ապահովուին, ինչպէս սովորական է այս շրջանին համար։",
      },
      {
        q: "Կայանատեղի կա՞յ։",
        a: "Մօտակայքը կայ փողոցի եզրին կայանատեղի, իսկ լիճին քովի նրբանցքը քայլելու հեռաւորութեան վրայ է։ Շաբաթավերջերուն կը լեցուի, ուստի օգտակար է կանուխ հասնիլ։",
      },
      {
        q: "Կարա՞ս կ՚ուղարկէք։",
        a: "Մեր փոքրիկ խանութը կ՚առաջարկէ մեղր, խոտաւոր պանիր եւ նախաճաշի տուփեր՝ Թուրքիոյ ներսը առաքումով։ Հաճեցէ՛ք ասիկա նկատել իբրեւ նշում մը՝ մեզի հետ հաստատելու, քանի որ մանրամասները կրնան փոխուիլ։",
      },
      {
        q: "Կրնա՞մ խումբի համար ամրագրել։",
        a: "Այո՛, խումբերը սրտանց բարի եկած են։ Ութ եւ աւելի հոգինոց սեղաններու համար հաճեցէ՛ք նախապէս հեռաձայնել, որպէսզի երկար սեղանը պատրաստենք ձեզի համար։",
      },
      {
        q: "Ի՞նչ լեզուներ կը խօսիք։",
        a: "Մեր անձնակազմը կը խօսի թրքերէն եւ անգլերէն, իսկ ոմանք նաեւ՝ հայերէն եւ ռուսերէն։ Կայքը հասանելի է բոլոր չորս լեզուներով։",
      },
    ],
  },
  ru: {
    title: "Вопросы и ответы",
    intro:
      "Несколько вещей, о которых наши гости часто спрашивают, прежде чем спуститься к озеру на завтрак.",
    items: [
      {
        q: "Каковы ваши часы работы?",
        a: "Мы открыты каждый день с 06:00 до 14:00. Это только завтрак — подаём от первых лучей до раннего полудня.",
      },
      {
        q: "Нужна ли бронь?",
        a: "Гостям без брони мы всегда рады, а ещё вы можете забронировать стол здесь, на сайте. В оживлённые выходные разумнее забронировать заранее.",
      },
      {
        q: "Есть ли вегетарианские блюда? А как насчёт аллергенов?",
        a: "Многие наши блюда вегетарианские, и в меню для каждого блюда указаны пометки о составе. Некоторые блюда содержат орехи — грецкий орех и фисташку, поэтому по особым случаям, пожалуйста, спросите наш персонал.",
      },
      {
        q: "Еда халяльная?",
        a: "Да. Наше мясо поставляется как халяль, что обычно для этого региона.",
      },
      {
        q: "Есть ли парковка?",
        a: "Рядом есть уличная парковка, а до переулка у озера легко дойти пешком. По выходным мест мало, так что лучше приезжать пораньше.",
      },
      {
        q: "Вы отправляете банки?",
        a: "В нашей небольшой лавке есть мёд, сыр с травами и завтрак-боксы, с доставкой по Турции. Пожалуйста, считайте это заметкой для уточнения у нас, так как детали могут меняться.",
      },
      {
        q: "Можно ли забронировать для группы?",
        a: "Да, группам мы очень рады. Для столов на восемь человек и больше, пожалуйста, позвоните заранее, чтобы мы накрыли для вас длинный стол.",
      },
      {
        q: "На каких языках вы говорите?",
        a: "Наш персонал говорит по-турецки и по-английски, а некоторые также по-армянски и по-русски. Сайт доступен на всех четырёх языках.",
      },
    ],
  },
};
