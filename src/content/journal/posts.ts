import type { JournalPost } from "./types";

// Editorial journal entries for Akdamar Kahvaltı Evi. Metadata (slug/date/cover)
// is invariant across locales; en/tr are fully authored, hy/ru are shorter
// courtesy translations.

export const journalPosts: JournalPost[] = [
  {
    slug: "what-makes-a-van-breakfast",
    date: "2026-05-02",
    cover: "/images/box-breakfast.jpg",
    coverAlt: "A laden Van breakfast table",
    text: {
      en: {
        title: "What Makes a Van Breakfast",
        excerpt:
          "It is not a meal so much as a slow morning laid out in dozens of little dishes, meant to be lingered over until the tea runs out — and the tea never quite runs out.",
        body: [
          "The first thing you notice is the table itself. Before you have ordered anything, it begins to fill: small copper-rimmed plates arriving two and three at a time, until the white cloth disappears beneath them. This is the Van kahvaltı, and its first rule is abundance. One price, one table, and a quiet understanding that nobody leaves hungry.",
          "Count the plates and you will lose count. There is otlu peynir, the famous herbed cheese threaded with wild mountain greens. There is honey still trembling in the comb, set beside a bowl of thick clotted kaymak so that you can fold the two together — bal-kaymak, the sweetest mouthful in Anatolia. Eggs arrive sizzling in a black pan, sometimes plain, sometimes with tomato and pepper as menemen, sometimes crowned with the spiced sausage they call sucuk.",
          "Around these anchors the small dishes gather like a constellation. Olives cured black and green, slabs of butter the colour of straw, walnuts, fresh tomatoes and cucumbers sliced thin, sour-cherry and rose-petal jams, tahini loosened with grape molasses, soft white cheeses and sharp aged ones. Warm bread comes and comes again, and you tear it rather than cut it.",
          "But the abundance is not the point. The point is time. A Van breakfast is a refusal to hurry — a morning spent at the table while the lake brightens outside and the conversation drifts from family to weather to nothing at all. The plates are simply permission to stay a while longer.",
          "And then there is the tea. Poured dark from the double pot into tulip-shaped glasses, it is the metronome of the whole affair. Your glass is refilled before it is empty, again and again, by hands that consider an empty glass a small failure of hospitality. You do not ask for more; more simply arrives.",
          "This is a tradition cherished by local Armenians and Turks alike, carried down through the generations who have shared these shores. To sit at a Van breakfast is to inherit that shared patience — to understand that the abundance on the table is really an abundance of welcome.",
        ],
      },
      tr: {
        title: "Bir Van Kahvaltısını Ne Yapar",
        excerpt:
          "Bu bir öğün değil, onlarca küçük tabakla önünüze serilen, çay bitene kadar süren ağır bir sabahtır — ve çay bir türlü bitmez.",
        body: [
          "İlk fark ettiğiniz şey sofranın kendisidir. Daha hiçbir şey söylemeden dolmaya başlar: bakır kenarlı küçük tabaklar ikişer üçer gelir, beyaz örtü altlarında kaybolana kadar. İşte bu Van kahvaltısıdır ve ilk kuralı bolluktur. Tek fiyat, tek sofra ve kimsenin aç kalkmayacağına dair sessiz bir mutabakat.",
          "Tabakları saymaya kalkarsanız sayıyı şaşırırsınız. Dağların yabani otlarıyla bezeli o meşhur otlu peynir vardır. Petekte hâlâ titreyen bal, yanında koyu bir kaymak kâsesiyle gelir ki ikisini katlayasınız — bal-kaymak, Anadolu'nun en tatlı lokması. Yumurta kara bir tavada cızırdayarak gelir; kimi zaman sade, kimi zaman domates ve biberle menemen olur, kimi zaman da sucukla taçlanır.",
          "Bu demir atmış lezzetlerin çevresinde küçük tabaklar bir takımyıldız gibi toplanır. Siyah ve yeşil zeytinler, saman renginde tereyağı dilimleri, cevizler, ince doğranmış taze domates ve salatalık, vişne ve gül reçelleri, pekmezle açılmış tahin, yumuşak beyaz peynirler ve keskin eski peynirler. Sıcak ekmek gelir de gelir; kesmez, koparırsınız.",
          "Ama mesele bolluk değildir. Mesele zamandır. Van kahvaltısı acele etmeyi reddetmektir — göl dışarıda aydınlanırken sofrada geçen, sohbetin aileden havaya, oradan da hiçliğe savrulduğu bir sabah. Tabaklar yalnızca biraz daha kalmak için verilmiş bir izindir.",
          "Bir de çay vardır. Çifte demlikten koyu koyu, ince belli bardaklara dökülür ve tüm bu işin metronomudur. Bardağınız boşalmadan doldurulur, yine yine; boş bir bardağı misafirperverliğin küçük bir kusuru sayan ellerce. İstemezsiniz; fazlası kendiliğinden gelir.",
          "Bu, yerli Ermenilerin ve Türklerin birlikte sevdiği, bu kıyıları paylaşan kuşaklardan devralınan bir gelenektir. Van kahvaltısına oturmak, o ortak sabrı miras almaktır — sofradaki bolluğun aslında bir ağırlama bolluğu olduğunu anlamaktır.",
        ],
      },
      hy: {
        title: "Ի՞նչն է կազմում Վանի նախաճաշը",
        excerpt:
          "Ասիկա ճաշ չէ, այլ դանդաղ առտու մը՝ տասնյակ պզտիկ պնակներով սեղանի վրայ տարածուած, որ կը տեւէ մինչեւ թէյը հատնի — իսկ թէյը երբեք չի հատնիր։",
        body: [
          "Առաջին բանը որ կը նկատես՝ սեղանն է ինքնին։ Դեռ ոչինչ պատուիրած՝ կը սկսի լեցուիլ պղնձէ եզրով պզտիկ պնակներով, մինչեւ ճերմակ սփռոցը անհետանայ անոնց տակ։ Ասիկա Վանի նախաճաշն է, եւ անոր առաջին օրէնքը առատութիւնն է՝ մէկ գին, մէկ սեղան, եւ լուռ հասկացողութիւն մը թէ ոչ ոք անօթի պիտի մեկնի։",
          "Հոս կայ խոտով պանիրը՝ լերան վայրի դալարիքով հիւսուած, մեղրը՝ դեռ խորիսխին մէջ դողդղացող, քայմաքին քով, եւ ձուածեղը՝ սեւ թաւային մէջ տաք-տաք։ Անոնց շուրջ պզտիկ պնակները կը հաւաքուին համաստեղութեան մը պէս՝ ձիթապտուղ, կարագ, ընկոյզ, թարմ բանջարեղէն եւ զանազան անոյշներ։ Տաք հացը կու գայ ու կու գայ։",
          "Բայց իմաստը առատութիւնը չէ, այլ ժամանակը։ Վանի նախաճաշը աճապարելու մերժում մըն է՝ առտու մը անցուցած սեղանին շուրջ, մինչ լիճը դուրսը կը լուսանայ։ Ասիկա աւանդութիւն մըն է՝ սիրուած տեղւոյն հայերէն եւ թուրքերէն հաւասարապէս, այս ափերը բաժնեկցող սերունդներէն ժառանգուած։",
        ],
      },
      ru: {
        title: "Что такое ванский завтрак",
        excerpt:
          "Это не столько трапеза, сколько медленное утро, разложенное на десятки маленьких тарелок, за которыми сидишь, пока не кончится чай, — а чай не кончается никогда.",
        body: [
          "Первое, что замечаешь, — это сам стол. Ещё ничего не заказав, ты видишь, как он начинает наполняться: маленькие тарелочки с медной каймой прибывают по две и по три, пока белая скатерть не исчезает под ними. Это и есть ванский завтрак, и его первое правило — изобилие. Одна цена, один стол и негласное понимание: голодным не уйдёт никто.",
          "Здесь есть знаменитый травяной сыр отлу пейнир с дикими горными травами, мёд, ещё дрожащий в сотах, рядом с густыми сливками каймак, чтобы сложить их вместе. Яичница шипит на чёрной сковороде, а вокруг этих опор собираются, словно созвездие, маленькие блюда: оливки, масло цвета соломы, грецкие орехи, свежие овощи и варенья. Тёплый хлеб приносят снова и снова.",
          "Но смысл не в изобилии, а во времени. Ванский завтрак — это отказ спешить: утро, проведённое за столом, пока озеро светлеет за окном. Это традиция, которую одинаково берегут местные армяне и турки, унаследованная от поколений, деливших эти берега. Сидеть за ванским завтраком — значит унаследовать это общее гостеприимство.",
        ],
      },
    },
  },
  {
    slug: "wild-herbs-in-our-otlu-peynir",
    date: "2026-04-18",
    cover: "/images/herbs.jpg",
    coverAlt: "Fresh wild mountain herbs on a board",
    text: {
      en: {
        title: "The Wild Herbs in Our Otlu Peynir",
        excerpt:
          "Before the cheese is cheese, it is a hillside — a handful of mountain herbs gathered in the brief green weeks when the snow has just let go of the slopes.",
        body: [
          "Every wheel of otlu peynir begins not in a dairy but on a mountainside. In the short, urgent weeks of spring, when the snowmelt is still running cold off the highlands above Van, the herbs come up all at once. For a little while the slopes are greener than they will be all year, and that is when the foraging begins.",
          "The herb everyone names first is sirmo — a wild relative of garlic, slender and pungent, that gives the cheese its unmistakable savour. Alongside it come heliz and mendi, gathered by people who have known these hillsides their whole lives and can tell one green blade from another by smell alone. It is patient, knee-bending work, done by hand, basket by basket.",
          "Back at the dairy the herbs are washed, sometimes wilted in a little salt, and chopped. Then the cheese is built in layers — a bed of fresh curd, a scattering of herbs, more curd, more herbs — so that every slice you eventually cut reveals a dark green seam running through the white.",
          "Then it waits. Traditionally the layered cheese is packed into skins or earthenware and buried to age, kept cool and even-tempered through the months while the flavours marry. The herbs give their oils to the curd; the curd softens and sharpens; what was bright and grassy turns deep, faintly wild, almost mineral.",
          "When you taste it at our table, that whole season is in your mouth. There is salt, and the slow tang of the aging, and underneath it the green ghost of the highland spring — the cold water, the thin air, the brief weeks when the mountain was at its most generous.",
          "This knowledge of which herbs to gather and how to layer them is shared heritage, kept alive by local Armenians and Turks alike across these highlands. We are only the latest hands to carry it from the slope to the table.",
        ],
      },
      tr: {
        title: "Otlu Peynirimizdeki Yabani Otlar",
        excerpt:
          "Peynir daha peynir olmadan önce bir yamaçtır — karın eğimleri yeni bıraktığı o kısa yeşil haftalarda toplanan bir avuç dağ otu.",
        body: [
          "Her otlu peynir tekeri bir mandırada değil, bir dağ yamacında başlar. Baharın kısa ve telaşlı haftalarında, kar suyu Van'ın yukarısındaki yaylalardan hâlâ soğuk soğuk akarken, otlar bir anda boy verir. Kısa bir süre için yamaçlar yılın geri kalanından daha yeşildir; işte ot toplama tam o zaman başlar.",
          "Herkesin önce andığı ot sirmodur — sarımsağın yabani bir akrabası, ince ve keskin, peynire o yanılmaz tadını veren. Yanında heliz ve mendi gelir; bu yamaçları bir ömür tanımış, bir yeşil filizi diğerinden yalnızca kokusundan ayırabilen insanlarca toplanır. Sabır isteyen, bel büken, elle yapılan bir iştir; sepet sepet.",
          "Mandıraya dönünce otlar yıkanır, kimi zaman bir tutam tuzla pörsütülür ve doğranır. Sonra peynir katman katman örülür — bir kat taze lor, bir serpme ot, yine lor, yine ot — öyle ki sonunda kestiğiniz her dilim, beyazın içinden geçen koyu yeşil bir damar gösterir.",
          "Sonra bekler. Geleneksel olarak katmanlı peynir tuluğa ya da küpe basılır ve yıllanmak üzere gömülür; aylar boyunca serin ve dengeli tutulur, tatlar birbirine sinerken. Otlar yağını lora verir; lor yumuşar ve keskinleşir; taze ve çayırımsı olan şey derinleşir, hafif yabanileşir, neredeyse madensi olur.",
          "Soframızda tattığınızda, o koca mevsim ağzınızdadır. Tuz vardır, yıllanmanın ağır mayhoşluğu vardır ve altında yaylanın baharının yeşil hayaleti — soğuk su, ince hava, dağın en cömert olduğu o kısa haftalar.",
          "Hangi otun toplanacağı ve nasıl katlanacağı bilgisi, bu yaylalarda yerli Ermenilerin ve Türklerin birlikte yaşattığı ortak bir mirastır. Biz onu yamaçtan sofraya taşıyan yalnızca en son elleriz.",
        ],
      },
      hy: {
        title: "Մեր խոտով պանիրին վայրի խոտերը",
        excerpt:
          "Պանիրը պանիր ըլլալէ առաջ՝ լերան լանջ մըն է. բուռ մը լեռնային խոտ, հաւաքուած այն կարճ կանաչ շաբաթներուն, երբ ձիւնը նոր ձգած է զառիվայրերը։",
        body: [
          "Ամէն խոտով պանիր կը սկսի ոչ թէ կաթնարանին մէջ, այլ լերան լանջին վրայ։ Գարունի կարճ շաբաթներուն, երբ ձիւնահալը դեռ պաղ կը հոսի Վանի վերի սարահարթերէն, խոտերը միանգամէն կը բուսնին։ Բոլորէն առաջ կը յիշուի սիրմոն՝ սխտորի վայրի ազգականը, որ պանիրին կու տայ իր անշփոթելի համը, անոր քով՝ հելիզ եւ մենտի։",
          "Կաթնարան վերադառնալով՝ խոտերը կը լուացուին ու կը կտրտուին, ապա պանիրը կը շինուի շերտ առ շերտ՝ թարմ շոռ, քիչ մը խոտ, դարձեալ շոռ, դարձեալ խոտ։ Ապա կը սպասէ՝ թաղուած ու հովցած ամիսներով, մինչ համերը կ՚ամուսնանան, եւ կանաչ ու խոտանման եղածը կը խորանայ ու կը վայրենանայ։",
          "Երբ զայն կը համտեսես մեր սեղանին վրայ, ամբողջ եղանակը բերանիդ մէջ է՝ աղը, յամեցումի թթուութիւնը, եւ անոնց տակ՝ սարահարթի գարունին կանաչ ուրուականը։ Ո՛ր խոտը հաւաքելու եւ ի՛նչպէս շերտաւորելու այս գիտութիւնը ընդհանուր ժառանգութիւն է՝ պահպանուած տեղւոյն հայերէն եւ թուրքերէն հաւասարապէս։",
        ],
      },
      ru: {
        title: "Дикие травы в нашем отлу пейнире",
        excerpt:
          "Прежде чем стать сыром, он был горным склоном — горстью трав, собранных в те короткие зелёные недели, когда снег только сошёл с откосов.",
        body: [
          "Каждая головка отлу пейнира начинается не на сыроварне, а на горном склоне. В короткие, торопливые недели весны, когда талая вода ещё холодно сбегает с нагорий над Ваном, травы поднимаются разом. Первой все называют сирмо — дикого родственника чеснока, тонкого и острого, дающего сыру его безошибочный вкус; рядом с ним собирают гелиз и менди.",
          "Вернувшись на сыроварню, травы моют и режут, а затем сыр выкладывают слоями — свежий творог, россыпь трав, снова творог, снова травы, — так что в каждом ломтике видна тёмно-зелёная прожилка. Потом он ждёт: по traditsii его закапывают вызревать, держа в прохладе долгие месяцы, пока вкусы соединяются и зелёное становится глубоким и почти диким.",
          "Когда ты пробуешь его за нашим столом, во рту целый сезон: соль, медленная терпкость выдержки и под ними зелёный призрак горной весны. Знание о том, какие травы собирать и как их укладывать, — общее наследие, которое в этих нагорьях одинаково хранят местные армяне и турки.",
        ],
      },
    },
  },
  {
    slug: "a-morning-on-akhtamar",
    date: "2026-03-30",
    cover: "/images/akhtamar-church.jpg",
    coverAlt:
      "The Armenian Church of the Holy Cross on Akhtamar Island, Lake Van",
    text: {
      en: {
        title: "A Morning on Akhtamar",
        excerpt:
          "Take the early boat across the turquoise water, sit beneath a thousand-year-old church, and let breakfast become a way of keeping company with history.",
        body: [
          "The boats leave from the southern shore while the lake is still smooth as glass. It is a short crossing, but a transforming one: the water turns from grey to an improbable mineral turquoise, the engine noise falls away behind you, and ahead a small island rises out of the brightness with a single silhouette on its crest.",
          "That silhouette is the Church of the Holy Cross, Surb Khach, built of warm rose-coloured stone in the tenth century. Walk up to it and the walls reveal themselves slowly: carved across the stone are kings and prophets, vines heavy with grapes, lions and birds and a whole testament worked in low relief. It is one of the great achievements of medieval Armenian art, and it has watched over this water for more than a thousand years.",
          "We do not come to Akhtamar to settle anything about the past. We come to honour it — quietly, with respect for everyone who has prayed here, carved here, and loved this lake. The island asks for a certain stillness, and a breakfast is a good way to keep it.",
          "So we set the table near the shore, in the shade of almond trees that flower pink before anything else in the year. The same dishes you would find on the mainland are here too — the herbed cheese, the honey and kaymak, the warm bread, the dark tea — but the turquoise water changes them. Everything tastes a little cleaner, a little more deliberate, eaten in such a place.",
          "Between mouthfuls you keep looking up: at the carvings, at the gulls turning over the church, at the far snow on the mountains across the lake. The morning slows to the pace of the stone. You begin to feel like one more guest in a very long line of guests.",
          "This shore is held dear by local Armenians and Turks alike, a shared inheritance carried gently across generations. To eat breakfast in the shadow of Surb Khach is to take your small place in that continuity — grateful, unhurried, and humbled by the water and the stone.",
        ],
      },
      tr: {
        title: "Akhtamar'da Bir Sabah",
        excerpt:
          "Turkuaz suyun üzerinden sabahın ilk teknesine binin, bin yıllık bir kilisenin altına oturun ve kahvaltının tarihle arkadaşlık etmenin bir yolu olmasına izin verin.",
        body: [
          "Tekneler güney kıyısından, göl hâlâ cam gibi dümdüzken kalkar. Kısa ama dönüştürücü bir geçiştir: su griden inanılması güç bir madensi turkuaza döner, motor sesi arkanızda kalır ve ileride o aydınlığın içinden tepesinde tek bir siluet taşıyan küçük bir ada yükselir.",
          "O siluet, onuncu yüzyılda sıcak gül renkli taştan yapılmış Akdamar Kilisesi, Surp Haç'tır. Yukarı çıktıkça duvarlar kendini ağır ağır gösterir: taşa kazınmış krallar ve peygamberler, üzüm yüklü asmalar, aslanlar, kuşlar ve alçak kabartmayla işlenmiş koca bir kutsal kitap. Ortaçağ Ermeni sanatının büyük başarılarından biridir ve bin yılı aşkın süredir bu suyun üzerinde nöbet tutar.",
          "Akhtamar'a geçmiş hakkında bir hüküm vermeye gelmiyoruz. Onu onurlandırmaya geliyoruz — sessizce, burada dua etmiş, burada taş işlemiş ve bu gölü sevmiş herkese saygıyla. Ada belli bir dinginlik ister; bir kahvaltı da onu korumanın güzel bir yoludur.",
          "Böylece sofrayı kıyıya yakın, yılın her şeyden önce pembe açan badem ağaçlarının gölgesinde kurarız. Karada bulacağınız aynı tabaklar burada da vardır — otlu peynir, bal ve kaymak, sıcak ekmek, koyu çay — ama turkuaz su onları değiştirir. Böyle bir yerde her şey biraz daha temiz, biraz daha özenli tat verir.",
          "Lokmalar arasında durmadan başınızı kaldırırsınız: kabartmalara, kilisenin üzerinde dönen martılara, gölün karşı kıyısındaki dağların uzak karına. Sabah, taşın hızına yavaşlar. Kendinizi çok uzun bir konuk dizisinin bir konuğu daha gibi hissetmeye başlarsınız.",
          "Bu kıyı, yerli Ermenilerin ve Türklerin birlikte aziz bildiği, kuşaklar boyu usulca taşınan ortak bir mirastır. Surp Haç'ın gölgesinde kahvaltı etmek, o sürekliliğin içindeki küçük yerinizi almaktır — minnettar, telaşsız ve suyun ile taşın karşısında alçakgönüllü.",
        ],
      },
      hy: {
        title: "Առտու մը Աղթամարի վրայ",
        excerpt:
          "Նստէ՛ առտուան առաջին նաւը՝ կապուտակ ջուրին վրայէն, բազմէ՛ հազարամեայ եկեղեցիի մը տակ, եւ թո՛ղ որ նախաճաշը դառնայ պատմութեան հետ ընկերակցելու միջոց մը։",
        body: [
          "Նաւերը հարաւային ափէն կը մեկնին, երբ լիճը դեռ ապակիի պէս ողորկ է։ Կարճ բայց փոխակերպող անցում մըն է. ջուրը մոխրագոյնէն կը դառնայ անհաւանական կապուտակ, եւ առջեւ պզտիկ կղզի մը կը բարձրանայ՝ իր գագաթին մէկ ուրուագիծով։ Այդ ուրուագիծը Սուրբ Խաչ եկեղեցին է՝ տասներորդ դարու վարդագոյն քարէ կերտուած։",
          "Անոր պատերը դանդաղօրէն կը բացայայտուին՝ քարին վրայ փորագրուած թագաւորներ ու մարգարէներ, որթատունկեր, առիւծներ ու թռչուններ՝ ողջ կտակարան մը՝ ցած քանդակով։ Միջնադարեան հայ արուեստի մեծ նուաճումներէն մէկն է, որ հազար տարիէ աւելի կը հսկէ այս ջուրին վրայ։ Մենք Աղթամար կու գանք ո՛չ թէ անցեալին մասին վճիռ տալու, այլ զայն պատուելու՝ յարգանքով բոլորին հանդէպ։",
          "Ուստի սեղանը կը պատրաստենք ափին մօտ՝ նշենիներու շուքին տակ, եւ նոյն պնակները հոս ալ կան՝ խոտով պանիր, մեղր ու քայմաք, տաք հաց, մուգ թէյ։ Այս ափը սիրելի է տեղւոյն հայերուն ու թուրքերուն հաւասարապէս՝ սերունդէ սերունդ մեղմօրէն փոխանցուած ընդհանուր ժառանգութիւն մը։",
        ],
      },
      ru: {
        title: "Утро на Ахтамаре",
        excerpt:
          "Сядьте на ранний катер через бирюзовую воду, устройтесь под тысячелетней церковью и позвольте завтраку стать способом побыть в обществе истории.",
        body: [
          "Катера отходят от южного берега, пока озеро ещё гладкое, как стекло. Переправа короткая, но преображающая: вода становится из серой невероятно минеральной бирюзой, шум мотора стихает позади, а впереди из света поднимается маленький остров с единственным силуэтом на гребне. Этот силуэт — церковь Святого Креста, Сурб Хач, сложенная из тёплого розового камня в десятом веке.",
          "Её стены раскрываются медленно: по камню вырезаны цари и пророки, лозы, тяжёлые от винограда, львы и птицы — целый завет в низком рельефе. Это одно из великих достижений средневекового армянского искусства, более тысячи лет хранящее эту воду. Мы приезжаем на Ахтамар не для того, чтобы решать что-то о прошлом, а чтобы почтить его — тихо и с уважением ко всем.",
          "Поэтому мы накрываем стол у берега, в тени миндальных деревьев, и те же блюда, что и на материке, есть и здесь — травяной сыр, мёд и каймак, тёплый хлеб, тёмный чай, — но бирюзовая вода меняет их вкус. Этот берег одинаково дорог местным армянам и туркам, общее наследие, бережно передаваемое из поколения в поколение.",
        ],
      },
    },
  },
];
