import type { AboutByLocale } from "./types";

// Locale-aware "About" copy for /[locale]/about. Warm, editorial, premium —
// and deliberately apolitical: we celebrate the shared geography, food and
// hospitality of Lake Van, cherished by local Armenians and Turks alike.

export const about: AboutByLocale = {
  en: {
    title: "Our story",
    intro:
      "Akdamar Kahvaltı Evi began with a simple wish: to set, every single dawn, the kind of breakfast that the shores of Lake Van have laid for a thousand years. A table without end, a pot of tea that never empties, and a chair pulled out for whoever walks in.",
    sections: [
      {
        heading: "The lake & two shores",
        paragraphs: [
          "Lake Van is so wide it was once taken for a sea — a turquoise inland ocean cupped by mountains in the highlands of eastern Anatolia. Its mineral water shifts from jade to deep blue as the sun climbs, and on a still morning the peaks stand mirrored on its surface. We open our doors to that water; every breakfast here begins at its edge.",
          "Around this one lake gathered two shores and two peoples, and out of them grew a single breakfast culture — the same herbed cheese, the same honey and warm bread, the same unhurried morning. We set our table in that spirit, a place loved by local Armenians and Turks alike, where what you remember is the food and the welcome, never anything that divides.",
        ],
      },
      {
        heading: "The herding families",
        paragraphs: [
          "Long before the table is laid, the day begins on the high pastures above the lake. Through the warm months the herding families climb with their sheep and goats to the mountain meadows, where the animals graze on wild grass and the milk takes on the scent of the slope. It is a slow, seasonal rhythm that has barely changed in generations.",
          "From that raw morning milk comes nearly everything we serve: the cultured village butter, churned by hand; the soft fresh cheeses; the thick clotted kaymak. We buy from these families and small dairies by name, the way this table has always been set — nothing arrives in a truck from somewhere far away.",
        ],
      },
      {
        heading: "Otlu peynir",
        paragraphs: [
          "Otlu peynir — Van's herbed cheese — is our signature and the soul of the table. It is a fresh white cheese folded, while still warm, with wild herbs gathered on the mountainsides: sirmo, heliz and mendi, a fragrant kind of wild garlic, leek and thyme that grow only for a few short weeks each spring. The herbs are what give the cheese its green threads and its unmistakable highland perfume.",
          "By the oldest custom the cheese is salted, sealed in skins or earthenware and buried to age underground through the cold months, so the flavour deepens slowly in the cool of the earth. We honour that tradition and serve it the way it has always been eaten here — on warm bread, beside honey, at the centre of a shared table.",
        ],
      },
      {
        heading: "Akhtamar heritage",
        paragraphs: [
          "We take our name from Akhtamar, the small island off the southern shore. On it stands the tenth-century Armenian Church of the Holy Cross — Surp Khach — its honey-coloured stone carved with vines, pomegranates and the figures of an older world. For more than a thousand years it has watched over the water, a beloved landmark for everyone who calls this region home.",
          "The shores of Van hold a long and layered history, written by many hands across the centuries. We are a breakfast house, not a history book, and we honour that past simply and respectfully — by keeping its recipes alive, by naming what we serve, and by laying a table where every guest, from every shore, is made to feel at home.",
        ],
      },
    ],
    valuesTitle: "What we believe",
    values: [
      {
        title: "Made from scratch, every dawn",
        body: "We cook with what grows around the lake — no powders, no shortcuts, no imitation. The bread is baked, the cheese is laid out and the tea is set to brew before the sun is fully up.",
      },
      {
        title: "The whole table, one price",
        body: "A Van breakfast is meant to be shared. You sit down to forty small plates for a single price, and we keep refilling the tea until you ask us to stop.",
      },
      {
        title: "A warm welcome for everyone",
        body: "Neighbour or traveller, from the next street or the far side of the world — every guest is met with the same open door and the same good morning.",
      },
    ],
    ctaTitle: "Come for breakfast",
    ctaLabel: "Reserve a table",
  },
  tr: {
    title: "Hikâyemiz",
    intro:
      "Akdamar Kahvaltı Evi yalın bir dilekle başladı: her şafak, Van Gölü kıyılarının bin yıldır kurduğu o sofrayı yeniden kurmak. Sonu gelmeyen bir sofra, hiç boşalmayan bir çaydanlık ve içeri giren herkes için çekilmiş bir sandalye.",
    sections: [
      {
        heading: "Göl ve iki yaka",
        paragraphs: [
          "Van Gölü öyle geniştir ki bir zamanlar deniz sanılmıştır — Doğu Anadolu yaylalarında, dağların kucakladığı turkuaz bir iç deniz. Madenli suyu, güneş yükseldikçe yeşilden derin maviye döner; durgun bir sabahta zirveler suyun yüzeyinde aksini bulur. Kapımızı o suya açarız; buradaki her kahvaltı onun kıyısında başlar.",
          "Bu tek gölün çevresinde iki yaka ve iki halk bir araya geldi; onlardan da tek bir kahvaltı kültürü doğdu — aynı otlu peynir, aynı bal ve sıcak ekmek, aynı acelesiz sabah. Soframızı da bu ruhla kurarız; yöredeki Ermenilerin ve Türklerin birlikte sevdiği bir yer, hatırınızda yalnızca yemeğin ve karşılamanın kaldığı, ayıran hiçbir şeyin olmadığı bir sofra.",
        ],
      },
      {
        heading: "Çoban aileleri",
        paragraphs: [
          "Sofra kurulmadan çok önce, gün gölün üstündeki yüksek otlaklarda başlar. Sıcak aylar boyunca çoban aileleri koyun ve keçileriyle dağ çayırlarına çıkar; hayvanlar yaban otlarıyla otlar ve süt yamacın kokusunu taşır. Bu, nesillerdir neredeyse hiç değişmeyen, ağır ve mevsimlik bir ritimdir.",
          "Sofraya koyduğumuz hemen her şey o taze sabah sütünden gelir: elde çırpılan köy tereyağı, yumuşacık taze peynirler, koyu kaymak. Bu ailelerden ve küçük mandıralardan teker teker, adıyla alırız; bu sofra hep nasıl kurulduysa öyle — hiçbir şey uzaklardan kamyonla gelmez.",
        ],
      },
      {
        heading: "Otlu peynir",
        paragraphs: [
          "Otlu peynir — Van'ın otlu peyniri — imza tadımız ve sofranın ruhudur. Daha sıcakken, dağ yamaçlarından toplanan yaban otlarıyla katlanan taze bir beyaz peynirdir: sirmo, heliz ve mendi; her ilkbahar yalnızca birkaç kısa hafta yetişen, kokulu bir tür yaban sarımsağı, pırasa ve kekik. Peynire yeşil damarlarını ve o yanılmaz yayla kokusunu veren bu otlardır.",
          "En eski âdete göre peynir tuzlanır, tulumlara ya da küplere mühürlenir ve soğuk aylar boyunca toprağın altına gömülerek olgunlaştırılır; böylece lezzet, toprağın serininde ağır ağır derinleşir. Bu geleneğe saygı duyar ve onu burada hep yendiği gibi sunarız — sıcak ekmeğin üzerinde, balın yanında, ortak bir sofranın tam ortasında.",
        ],
      },
      {
        heading: "Akhtamar mirası",
        paragraphs: [
          "Adımızı, güney kıyısının açığındaki küçük adadan, Akdamar'dan alırız. Üzerinde onuncu yüzyıldan kalma Ermeni Surp Haç Kilisesi durur — bal renkli taşı asmalar, narlar ve daha eski bir dünyanın figürleriyle işlenmiştir. Bin yılı aşkın süredir suyu gözetir; bu yöreyi yurt bilen herkesin sevdiği bir simgedir.",
          "Van kıyıları, yüzyıllar boyunca birçok elin yazdığı uzun ve katmanlı bir tarih taşır. Biz bir kahvaltı eviyiz, bir tarih kitabı değil; o geçmişi yalın ve saygılı bir biçimde onurlandırırız — tariflerini yaşatarak, sunduğumuzu adıyla anarak ve her yakadan her misafirin kendini evinde hissettiği bir sofra kurarak.",
        ],
      },
    ],
    valuesTitle: "Neye inanıyoruz",
    values: [
      {
        title: "Her şafak, sıfırdan",
        body: "Gölün çevresinde yetişenle pişiririz — ne toz karışım, ne kısa yol, ne taklit. Güneş tam doğmadan ekmek pişer, peynir dizilir, çay demlenmeye konur.",
      },
      {
        title: "Bütün sofra, tek fiyat",
        body: "Van kahvaltısı paylaşılmak içindir. Tek fiyata kırk küçük tabağa oturursunuz ve siz “yeter” diyene dek çayı tazeleriz.",
      },
      {
        title: "Herkese sıcacık bir karşılama",
        body: "Komşu ya da yolcu, yan sokaktan ya da dünyanın öbür ucundan — her misafiri aynı açık kapı ve aynı “günaydın” karşılar.",
      },
    ],
    ctaTitle: "Kahvaltıya buyurun",
    ctaLabel: "Masa ayırt",
  },
  hy: {
    title: "Մեր պատմութիւնը",
    intro:
      "Akdamar Kahvaltı Evi սկսաւ պարզ փափաքով մը՝ ամէն արշալոյս կազմել այն նախաճաշը, որ Վանայ լիճին ափերը հազար տարի կը պատրաստեն։ Անվերջ սեղան մը, թէյնիկ մը՝ որ երբեք չի պարպուիր, եւ աթոռ մը՝ քաշուած ամէն ներս մտնողի համար։",
    sections: [
      {
        heading: "Լիճը եւ երկու ափերը",
        paragraphs: [
          "Վանայ լիճը այնքան լայն է, որ ժամանակին ծով կարծուած է՝ փիրուզ ներքին ովկիանոս մը՝ Արեւելեան Անատոլիոյ բարձրավանդակին լեռներով գրկուած։ Անոր հանքային ջուրը, արեւին բարձրանալուն հետ, յասպիսէ կը դառնայ դէպի խոր կապոյտ, եւ հանդարտ առաւօտով՝ գագաթները կ՚արտացոլան անոր մակերեսին։ Մեր դռները կը բանանք այդ ջուրին. հոս ամէն նախաճաշ կը սկսի անոր ափին։",
          "Այս մէկ լիճին շուրջ հաւաքուեցան երկու ափ ու երկու ժողովուրդ, եւ անոնցմէ ծնաւ մէկ նախաճաշի մշակոյթ՝ նոյն խոտով պանիրը, նոյն մեղրն ու ջերմ հացը, նոյն անշտապ առաւօտը։ Մենք սեղանը կը պատրաստենք այդ ոգիով՝ վայր մը՝ սիրուած տեղացի հայերէն ու թուրքերէն հաւասարապէս, ուր ձեր յիշողութեան մէջ կը մնայ միայն ուտեստն ու բարեւը, եւ ոչ երբեք բաժնող որեւէ բան։",
        ],
      },
      {
        heading: "Հովուական ընտանիքները",
        paragraphs: [
          "Սեղանը կազմուելէ շատ առաջ, օրը կը սկսի լիճին վերի բարձր արօտներուն վրայ։ Ջերմ ամիսներուն հովուական ընտանիքները իրենց ոչխարներով ու այծերով կը բարձրանան լեռնային մարգագետինները, ուր անասունները կ՚արածին վայրի խոտով, եւ կաթը կ՚առնէ լանջին բոյրը։ Ասիկա դանդաղ, եղանակային կշռոյթ մըն է՝ որ սերունդներ շարունակ գրեթէ չէ փոխուած։",
          "Այդ թարմ առաւօտեան կաթէն կու գայ գրեթէ ամէն ինչ՝ որ կը մատուցենք. ձեռքով հարուած գիւղական կարագը, փափուկ թարմ պանիրները, թանձր kaymak-ը։ Կը գնենք այս ընտանիքներէն ու փոքր կաթնատուներէն՝ անունով անուն, այնպէս՝ ինչպէս այս սեղանը միշտ պատրաստուած է. ոչինչ կու գայ հեռուէն բեռնատարով։",
        ],
      },
      {
        heading: "Otlu peynir",
        paragraphs: [
          "Otlu peynir-ը՝ Վանի խոտով պանիրը, մեր ստորագրութիւնն է եւ սեղանին հոգին։ Թարմ ճերմակ պանիր մըն է՝ տակաւին ջերմ ատեն ծալուած լեռնալանջերէն հաւաքուած վայրի խոտերով՝ sirmo, heliz եւ mendi. բուրումնաւէտ վայրի սխտորի, պրասի եւ ուրցի տեսակ մը՝ որ կ՚աճի միայն քանի մը կարճ շաբաթ՝ ամէն գարուն։ Հէնց այս խոտերն են, որ պանիրին կու տան իր կանաչ երակներն ու անշփոթելի բարձրավանդակի բոյրը։",
          "Ամէնէն հին սովորութեամբ՝ պանիրը կ՚աղուի, կը կնքուի տիկերու կամ կաւէ կարասներու մէջ եւ կը թաղուի հողին տակ՝ հասնելու ցուրտ ամիսներուն ընթացքին, որպէսզի համը դանդաղօրէն խորանայ հողի զովութեան մէջ։ Կը յարգենք այդ աւանդոյթը եւ կը մատուցենք այնպէս՝ ինչպէս հոս միշտ կերուած է՝ ջերմ հացի վրայ, մեղրի քով, ընդհանուր սեղանի մը կեդրոնը։",
        ],
      },
      {
        heading: "Աղթամարի ժառանգութիւնը",
        paragraphs: [
          "Մեր անունը կ՚առնենք Աղթամարէն՝ հարաւային ափին քով գտնուող փոքր կղզիէն։ Անոր վրայ կը կանգնի տասներորդ դարու հայկական Սուրբ Խաչ եկեղեցին՝ իր մեղրագոյն քարը քանդակուած որթատունկներով, նուռերով ու աւելի հին աշխարհի կերպարներով։ Աւելի քան հազար տարի ան կը հսկէ ջուրին վրայ՝ սիրելի յուշարձան մը՝ բոլորին համար, որ այս շրջանը տուն կը կոչեն։",
          "Վանայ ափերը կը կրեն երկար ու բազմաշերտ պատմութիւն մը՝ դարերու ընթացքին գրուած բազմաթիւ ձեռքերով։ Մենք նախաճաշարան մ՚ենք, ոչ թէ պատմութեան գիրք, եւ այդ անցեալը կը պատուենք պարզ ու յարգալից կերպով՝ պահելով անոր բաղադրատոմսերը կենդանի, անունով յիշելով ինչ որ կը մատուցենք, եւ կազմելով սեղան մը՝ ուր ամէն ափէ ամէն հիւր կը զգայ ինքզինք տան մէջ։",
        ],
      },
    ],
    valuesTitle: "Ինչի՛ կը հաւատանք",
    values: [
      {
        title: "Ամէն արշալոյս՝ սկիզբէն",
        body: "Կ՚եփենք լիճին շուրջ աճողով՝ ոչ փոշիներ, ոչ դիւրին ճամբաներ, ոչ կեղծիք։ Արեւը դեռ լման չծագած՝ հացը կը թխուի, պանիրը կը շարուի, թէյը կը դրուի եռալու։",
      },
      {
        title: "Ամբողջ սեղանը՝ մէկ գին",
        body: "Վանեցի նախաճաշը կիսուելու համար է։ Կը նստիք քառասուն փոքր ափսէի առջեւ՝ մէկ գինով, եւ կը լեցնենք թէյը՝ մինչեւ դուք ըսէք՝ բաւ է։",
      },
      {
        title: "Ջերմ բարեւ՝ բոլորին",
        body: "Դրացի թէ ճամբորդ, յարակից փողոցէն թէ աշխարհի միւս ծայրէն՝ ամէն հիւր կը դիմաւորուի նոյն բաց դռնով ու նոյն բարի լոյսով։",
      },
    ],
    ctaTitle: "Եկէ՛ք նախաճաշի",
    ctaLabel: "Սեղան ապահովել",
  },
  ru: {
    title: "Наша история",
    intro:
      "Akdamar Kahvaltı Evi начался с простого желания — каждый рассвет накрывать тот самый завтрак, что берега озера Ван накрывают вот уже тысячу лет. Бесконечный стол, чайник, который не пустеет, и стул, отодвинутый для каждого, кто входит.",
    sections: [
      {
        heading: "Озеро и два берега",
        paragraphs: [
          "Озеро Ван так широко, что его когда-то принимали за море, — бирюзовый внутренний океан в чаше гор на нагорьях Восточной Анатолии. Его минеральная вода с восходом солнца переходит от нефритового к глубокому синему, а тихим утром вершины отражаются в её глади. Мы открываем двери к этой воде; каждый завтрак здесь начинается у её кромки.",
          "Вокруг этого одного озера сошлись два берега и два народа, и из них выросла единая культура завтрака — тот же сыр с травами, тот же мёд и тёплый хлеб, то же неспешное утро. Мы накрываем стол в этом же духе — место, дорогое и местным армянам, и туркам, где в памяти остаётся только еда и тёплый приём и никогда — то, что разделяет.",
        ],
      },
      {
        heading: "Скотоводческие семьи",
        paragraphs: [
          "Задолго до того, как накрыт стол, день начинается на высоких пастбищах над озером. В тёплые месяцы скотоводческие семьи поднимаются с овцами и козами на горные луга, где животные пасутся на дикой траве, и молоко вбирает запах склона. Это медленный, сезонный ритм, почти не менявшийся поколениями.",
          "Из этого свежего утреннего молока рождается почти всё, что мы подаём: сквашенное деревенское масло, сбитое вручную; мягкие свежие сыры; густой kaymak. Мы покупаем у этих семей и маленьких маслоделен поимённо, так, как этот стол накрывали всегда, — ничего не приезжает грузовиком издалека.",
        ],
      },
      {
        heading: "Otlu peynir",
        paragraphs: [
          "Otlu peynir — ванский сыр с травами — наша визитная карточка и душа стола. Это свежий белый сыр, который ещё тёплым переслаивают дикими травами, собранными на горных склонах: sirmo, heliz и mendi — душистые виды дикого чеснока, лука-порея и чабреца, что растут лишь несколько коротких недель каждую весну. Именно травы дают сыру его зелёные прожилки и безошибочный аромат нагорья.",
          "По древнейшему обычаю сыр солят, запечатывают в бурдюки или глиняные сосуды и закапывают в землю вызревать на холодные месяцы, чтобы вкус медленно углублялся в прохладе земли. Мы чтим эту традицию и подаём его так, как его всегда здесь ели, — на тёплом хлебе, рядом с мёдом, в самом центре общего стола.",
        ],
      },
      {
        heading: "Наследие Ахтамара",
        paragraphs: [
          "Своё имя мы берём от Ахтамара — маленького острова у южного берега. На нём стоит армянская церковь Святого Креста X века — Сурб Хач, — её медового цвета камень покрыт резьбой с виноградной лозой, гранатами и фигурами древнего мира. Больше тысячи лет она смотрит на воду — любимая достопримечательность всех, кто зовёт этот край домом.",
          "Берега Вана хранят долгую и многослойную историю, написанную многими руками на протяжении веков. Мы дом завтраков, а не учебник истории, и чтим это прошлое просто и уважительно — сохраняя его рецепты, называя то, что подаём, и накрывая стол, за которым каждому гостю, с любого берега, по-домашнему тепло.",
        ],
      },
    ],
    valuesTitle: "Во что мы верим",
    values: [
      {
        title: "С нуля, каждый рассвет",
        body: "Мы готовим из того, что растёт вокруг озера, — никаких порошков, упрощений и подделок. Хлеб печётся, сыр раскладывается, а чай ставится завариваться ещё до того, как солнце полностью встанет.",
      },
      {
        title: "Весь стол — одна цена",
        body: "Ванский завтрак создан, чтобы его делить. Вы садитесь за сорок маленьких тарелок по одной цене, и мы доливаем чай, пока вы не попросите остановиться.",
      },
      {
        title: "Тёплый приём каждому",
        body: "Сосед или путник, с соседней улицы или с другого конца света — каждого гостя встречают та же открытая дверь и то же доброе утро.",
      },
    ],
    ctaTitle: "Заходите на завтрак",
    ctaLabel: "Забронировать стол",
  },
};
