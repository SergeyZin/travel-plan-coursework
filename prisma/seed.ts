import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Пляжный отдых',
    slug: 'beach',
    icon: 'Waves',
    description: 'Море, песок и солнце на лучших курортах',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
  },
  {
    name: 'Экскурсионный тур',
    slug: 'excursion',
    icon: 'Landmark',
    description: 'История, достопримечательности и культура',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
  },
  {
    name: 'Горнолыжный тур',
    slug: 'ski',
    icon: 'Snowflake',
    description: 'Горные склоны, снег и активный отдых',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
  },
  {
    name: 'Семейный отдых',
    slug: 'family',
    icon: 'Users',
    description: 'Комфортный отдых для всей семьи',
    image: 'https://images.unsplash.com/photo-1542037104857-4bb4b9fe2433?w=600&q=80',
  },
  {
    name: 'Романтический тур',
    slug: 'romantic',
    icon: 'Heart',
    description: 'Идеальное путешествие для двоих',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
  },
  {
    name: 'Активный тур',
    slug: 'active',
    icon: 'Mountain',
    description: 'Треккинг, рафтинг и приключения',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  },
  {
    name: 'Оздоровительный тур',
    slug: 'wellness',
    icon: 'Spa',
    description: 'Спа, йога и восстановление',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  },
  {
    name: 'Гастрономический тур',
    slug: 'gastronomy',
    icon: 'Utensils',
    description: 'Винодельни, рестораны и местная кухня',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
]

const trips = [
  {
    title: 'Пхукет и Бангкок: классика Таиланда',
    slug: 'thailand-phuket-bangkok',
    shortDescription: 'Пляжный отдых на Пхукете и экскурсии в Бангкоке',
    description: 'Идеальное сочетание пляжного расслабления и культурных открытий. Мы проведём несколько дней на лучших пляжах Пхукета, а затем отправимся в Бангкок — город контрастов, где древние храмы соседствуют с современными небоскрёбами.',
    startDate: '2026-07-15T00:00:00.000Z',
    endDate: '2026-07-24T00:00:00.000Z',
    country: 'Таиланд',
    city: 'Пхукет, Бангкок',
    categorySlug: 'beach',
    season: 'summer',
    isFeatured: true,
    groupSize: 20,
    price: 128000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=80',
      'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1200&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80',
    ],
  },
  {
    title: 'Анталья: пляжный релакс',
    slug: 'turkey-antalya-beach',
    shortDescription: 'Отдых на лазурном побережье Средиземного моря',
    description: 'Неделя в Анталье с проживанием в отеле 5 звёзд по системе all inclusive. Программа включает пляжный отдых, экскурсию к водопадам Дюден и старинной Калейчи, а также поездку в древний город Перге.',
    startDate: '2026-08-01T00:00:00.000Z',
    endDate: '2026-08-08T00:00:00.000Z',
    country: 'Турция',
    city: 'Анталья',
    categorySlug: 'family',
    season: 'summer',
    isFeatured: true,
    groupSize: 30,
    price: 95000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&q=80',
    ],
  },
  {
    title: 'Дубай: город будущего',
    slug: 'uae-dubai-future',
    shortDescription: 'Роскошный отдых в самом футуристичном городе мира',
    description: 'Погрузитесь в атмосферу роскоши и инноваций. В программе: подъём на Бурдж-Халифа, шопинг в Dubai Mall, сафари по пустыне, круиз по Дубай-Крик и фотосессия у Frame Dubai.',
    startDate: '2026-09-10T00:00:00.000Z',
    endDate: '2026-09-16T00:00:00.000Z',
    country: 'ОАЭ',
    city: 'Дубай',
    categorySlug: 'excursion',
    season: 'autumn',
    isFeatured: true,
    groupSize: 15,
    price: 145000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80',
    ],
  },
  {
    title: 'Мальдивы: бунгало над водой',
    slug: 'maldives-water-bungalow',
    shortDescription: 'Романтический отдых на райских островах',
    description: 'Пять дней в вилле над водой на частном острове. Включены завтраки, ужины, snorkeling с маской, каякинг и закатный круиз с шансом увидеть дельфинов. Идеально для медового месяца.',
    startDate: '2026-10-05T00:00:00.000Z',
    endDate: '2026-10-11T00:00:00.000Z',
    country: 'Мальдивы',
    city: 'Мале, атолл Южный Мале',
    categorySlug: 'romantic',
    season: 'autumn',
    isFeatured: true,
    groupSize: 10,
    price: 245000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200&q=80',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    ],
  },
  {
    title: 'Грузия: Тбилиси, Батуми и Кахетия',
    slug: 'georgia-tbilisi-batumi',
    shortDescription: 'Горы, море и винные традиции за 8 дней',
    description: 'Насыщенное путешествие по Грузии. Мы погуляем по старинным кварталам Тбилиси, искупаемся в Чёрном море в Батуми, попробуем вино в Кахетии и полюбуемся Казбеком.',
    startDate: '2026-06-20T00:00:00.000Z',
    endDate: '2026-06-28T00:00:00.000Z',
    country: 'Грузия',
    city: 'Тбилиси, Батуми',
    categorySlug: 'gastronomy',
    season: 'summer',
    isFeatured: true,
    groupSize: 18,
    price: 78000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    ],
  },
  {
    title: 'Армения: древние храмы и горы',
    slug: 'armenia-temples-mountains',
    shortDescription: 'Путешествие по первой христианской стране',
    description: 'Армения удивит вас древними монастырями, глубокими ущельями и радушными хозяевами. В программе: Ереван, храм Гарни, Гегард, озеро Севан, Нораванк и дегустация коньяка.',
    startDate: '2026-08-20T00:00:00.000Z',
    endDate: '2026-08-26T00:00:00.000Z',
    country: 'Армения',
    city: 'Ереван',
    categorySlug: 'excursion',
    season: 'summer',
    isFeatured: false,
    groupSize: 16,
    price: 65000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    ],
  },
  {
    title: 'Египет: пирамиды и Красное море',
    slug: 'egypt-pyramids-sea',
    shortDescription: 'Каир, Луксор и пляжный отдых в Хургаде',
    description: 'Классическое египетское путешествие: пирамиды Гизы и Египетский музей в Каире, круиз по Нилу с посещением Луксора и Карнака, а в конце — отдых на Красном море в Хургаде.',
    startDate: '2026-11-05T00:00:00.000Z',
    endDate: '2026-11-15T00:00:00.000Z',
    country: 'Египет',
    city: 'Каир, Луксор, Хургада',
    categorySlug: 'excursion',
    season: 'autumn',
    isFeatured: false,
    groupSize: 24,
    price: 112000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80',
      'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    ],
  },
  {
    title: 'Индия: Золотой треугольник',
    slug: 'india-golden-triangle',
    shortDescription: 'Дели, Агра и Джайпур за 9 дней',
    description: 'Погружение в яркую и многогранную Индию. Тадж-Махал в Агре, Красный форт в Дели, розовый город Джайпур, слоновья ферма и аюрведический массаж.',
    startDate: '2026-09-25T00:00:00.000Z',
    endDate: '2026-10-04T00:00:00.000Z',
    country: 'Индия',
    city: 'Дели, Агра, Джайпур',
    categorySlug: 'excursion',
    season: 'autumn',
    isFeatured: false,
    groupSize: 20,
    price: 89000,
    difficulty: 'medium',
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80',
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    ],
  },
  {
    title: 'Шерегеш: горные лыжи и сноуборд',
    slug: 'shergesh-ski-winter',
    shortDescription: 'Зимний активный отдых в Кузбассе',
    description: 'Неделя на самом популярном российском горнолыжном курорте. В программе: катание на лыжах и сноуборде, инструкторы для начинающих, вечеринки в après-ski барах и баня с видом на горы.',
    startDate: '2026-01-15T00:00:00.000Z',
    endDate: '2026-01-22T00:00:00.000Z',
    country: 'Россия',
    city: 'Шерегеш',
    categorySlug: 'ski',
    season: 'winter',
    isFeatured: true,
    groupSize: 15,
    price: 52000,
    difficulty: 'medium',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80',
      'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&q=80',
    ],
  },
  {
    title: 'Йога-ретрит на Бали',
    slug: 'bali-yoga-retreat',
    shortDescription: 'Восстановление сил в тропическом раю',
    description: 'Десять дней йоги, медитаций и здорового питания на Бали. Проживание в эко-отеле среди рисовых террас, утренние практики на берегу океана, массажи и кулинарные мастер-классы.',
    startDate: '2026-04-10T00:00:00.000Z',
    endDate: '2026-04-20T00:00:00.000Z',
    country: 'Индонезия',
    city: 'Убуд',
    categorySlug: 'wellness',
    season: 'spring',
    isFeatured: false,
    groupSize: 12,
    price: 135000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80',
    ],
  },
  {
    title: 'Альпы: горные лыжи в Швейцарии',
    slug: 'alps-ski-switzerland',
    shortDescription: 'Катание на лучших трассах Европы',
    description: 'Неделя в швейцарском Церматте у подножия Маттерхорна. Программа включает катание на лыжах и сноуборде по трассам мирового уровня, уроки с инструктором и фондю в горальских ресторанах.',
    startDate: '2026-02-05T00:00:00.000Z',
    endDate: '2026-02-12T00:00:00.000Z',
    country: 'Швейцария',
    city: 'Церматт',
    categorySlug: 'ski',
    season: 'winter',
    isFeatured: true,
    groupSize: 12,
    price: 210000,
    difficulty: 'medium',
    images: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&q=80',
      'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80',
      'https://images.unsplash.com/photo-1518081461904-ae9f8f3167ee?w=1200&q=80',
    ],
  },
  {
    title: 'Красная Поляна: зимний активный отдых',
    slug: 'krasnaya-polyana-winter',
    shortDescription: 'Горнолыжный курорт у Чёрного моря',
    description: 'Отдых на главном российском горнолыжном курорте. Катание на трассах Роза Хутор, Газпром и Красная Поляна, прогулки по Сочи, море зимой и термальные источники.',
    startDate: '2026-01-20T00:00:00.000Z',
    endDate: '2026-01-27T00:00:00.000Z',
    country: 'Россия',
    city: 'Сочи, Красная Поляна',
    categorySlug: 'ski',
    season: 'winter',
    isFeatured: false,
    groupSize: 18,
    price: 68000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80',
      'https://images.unsplash.com/photo-1605540447740-9d1d31f2a2e2?w=1200&q=80',
    ],
  },
  {
    title: 'Вьетнам: зимний beach-escape',
    slug: 'vietnam-winter-beach',
    shortDescription: 'Тёплое море и экзотика зимой',
    description: 'Побег от холодов во Вьетнам: пляжи Нячанга и Фукуока, экскурсии в Хошимин, храмовые комплексы и местная кухня. В программе: snorkeling, круиз по заливу Халонг и шопинг на ночных рынках.',
    startDate: '2026-01-10T00:00:00.000Z',
    endDate: '2026-01-20T00:00:00.000Z',
    country: 'Вьетнам',
    city: 'Нячанг, Хошимин',
    categorySlug: 'beach',
    season: 'winter',
    isFeatured: false,
    groupSize: 20,
    price: 118000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848558?w=1200&q=80',
      'https://images.unsplash.com/photo-1528127220108-612460f947ac?w=1200&q=80',
    ],
  },
  {
    title: 'ОАЭ: зимнее солнце и пустыня',
    slug: 'uae-winter-sun',
    shortDescription: 'Комфортная погода для пляжа и экскурсий',
    description: 'Зимой в Дубае и Абу-Даби идеальная погода: не жарко, но тепло. Программа включает пляжный отдых, подъём на Бурдж-Халифа, шопинг, сафари по пустыне и экскурсию в мечеть шейха Зайда.',
    startDate: '2026-12-15T00:00:00.000Z',
    endDate: '2026-12-22T00:00:00.000Z',
    country: 'ОАЭ',
    city: 'Дубай, Абу-Даби',
    categorySlug: 'beach',
    season: 'winter',
    isFeatured: true,
    groupSize: 16,
    price: 138000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    ],
  },
  {
    title: 'Япония: сакура и весенние традиции',
    slug: 'japan-sakura-spring',
    shortDescription: 'Цветение сакуры в Токио и Киото',
    description: 'Весеннее путешествие в Японию в сезон цветения сакуры. Программа включает Токио, Киото с его храмами и садами, Нару и Осаку. Мы посетим парк Уэно, философскую тропу и замок Химедзи.',
    startDate: '2026-03-25T00:00:00.000Z',
    endDate: '2026-04-05T00:00:00.000Z',
    country: 'Япония',
    city: 'Токио, Киото',
    categorySlug: 'excursion',
    season: 'spring',
    isFeatured: true,
    groupSize: 14,
    price: 225000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1200&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
    ],
  },
  {
    title: 'Европа: весенние столицы',
    slug: 'europe-spring-capitals',
    shortDescription: 'Прага, Вена и Будапешт на майские',
    description: 'Насыщенная экскурсионная программа по трём красивейшим столицам Европы. В Праге мы увидим Карлов мост и Пражский град, в Вене — дворец Шёнбрунн, в Будапеште — купальни Сечени и набережную Дуная.',
    startDate: '2026-05-01T00:00:00.000Z',
    endDate: '2026-05-08T00:00:00.000Z',
    country: 'Чехия, Австрия, Венгрия',
    city: 'Прага, Вена, Будапешт',
    categorySlug: 'excursion',
    season: 'spring',
    isFeatured: false,
    groupSize: 22,
    price: 105000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80',
      'https://images.unsplash.com/photo-1503327431578-585ac47084a6?w=1200&q=80',
      'https://images.unsplash.com/photo-1489924679458-fac3b12e178f?w=1200&q=80',
    ],
  },
  {
    title: 'Сочи: летний пляжный отдых',
    slug: 'sochi-summer-beach',
    shortDescription: 'Чёрное море, горы и развлечения',
    description: 'Неделя в Сочи на Чёрном море. Программа включает пляжный отдых, поездку в Олимпийский парк, дендрарий, водопады и канатную дорогу в горах. Отличный вариант для семейного отдыха.',
    startDate: '2026-07-01T00:00:00.000Z',
    endDate: '2026-07-08T00:00:00.000Z',
    country: 'Россия',
    city: 'Сочи',
    categorySlug: 'family',
    season: 'summer',
    isFeatured: false,
    groupSize: 30,
    price: 58000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
      'https://images.unsplash.com/photo-1561389248-231c9b4543b6?w=1200&q=80',
    ],
  },
  {
    title: 'Алтай: летний треккинг и природа',
    slug: 'altai-summer-active',
    shortDescription: 'Горы, озёра и походы на Алтае',
    description: 'Активное летнее путешествие по Горному Алтаю. В программе: треккинг к озеру Телецкое, восхождение на перевалы, сплав по горной реке, ночёвки в палатках и костровые вечера.',
    startDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-06-25T00:00:00.000Z',
    country: 'Россия',
    city: 'Горный Алтай',
    categorySlug: 'active',
    season: 'summer',
    isFeatured: false,
    groupSize: 15,
    price: 72000,
    difficulty: 'medium',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=80',
    ],
  },
  {
    title: 'Италия: осенние винодельни Тосканы',
    slug: 'italy-tuscany-wine-autumn',
    shortDescription: 'Винные туры, трюфели и средневековые города',
    description: 'Осень — лучшее время для Тосканы. Мы посетим винодельни с дегустацией Кьянти и Брунелло, попробуем свежий трюфель, погуляем по Флоренции, Сиене и Сан-Джиминьяно.',
    startDate: '2026-10-10T00:00:00.000Z',
    endDate: '2026-10-17T00:00:00.000Z',
    country: 'Италия',
    city: 'Флоренция, Сиена',
    categorySlug: 'gastronomy',
    season: 'autumn',
    isFeatured: true,
    groupSize: 12,
    price: 165000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=80',
      'https://images.unsplash.com/photo-1528114039593-43664da1e6af?w=1200&q=80',
    ],
  },
  {
    title: 'Карелия: осенние леса и озёра',
    slug: 'karelia-autumn-nature',
    shortDescription: 'Бархатный сезон на севере России',
    description: 'Осеннее путешествие в Карелию, когда тайга украшена золотыми и багровыми красками. В программе: Рускеала, водопады Кивач, Ладожские шхеры, сбор грибов и ягод, баня на берегу озера.',
    startDate: '2026-09-15T00:00:00.000Z',
    endDate: '2026-09-22T00:00:00.000Z',
    country: 'Россия',
    city: 'Петрозаводск, Рускеала',
    categorySlug: 'active',
    season: 'autumn',
    isFeatured: false,
    groupSize: 16,
    price: 48000,
    difficulty: 'easy',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    ],
  },
]

function getDurationDays(start: string, end: string): number {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffMs = endDate.getTime() - startDate.getTime()
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
}

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.itineraryDay.deleteMany()
  await prisma.tripImage.deleteMany()
  await prisma.review.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.trip.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  const adminPassword = await hash('admin123', 10)
  const userPassword = await hash('user123', 10)
  const organizerPassword = await hash('organizer123', 10)

  await prisma.user.create({
    data: { email: 'admin@travelplan.ru', password: adminPassword, name: 'Администратор', role: 'ADMIN' },
  })

  await prisma.user.create({
    data: { email: 'user@travelplan.ru', password: userPassword, name: 'Иван Петров', role: 'USER' },
  })

  await prisma.user.create({
    data: { email: 'organizer@travelplan.ru', password: organizerPassword, name: 'Event Studio', role: 'ORGANIZER' },
  })

  console.log('✅ Users created')

  for (const cat of categories) {
    await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        image: cat.image,
      },
    })
  }

  console.log('✅ Categories created')

  for (const trip of trips) {
    const category = await prisma.category.findUnique({ where: { slug: trip.categorySlug } })
    if (!category) continue

    const startDate = new Date(trip.startDate)
    const endDate = new Date(trip.endDate)
    const durationDays = getDurationDays(trip.startDate, trip.endDate)

    await prisma.trip.create({
      data: {
        organizerId: (await prisma.user.findFirst({ where: { role: 'ORGANIZER' } }))!.id,
        categoryId: category.id,
        title: trip.title,
        slug: trip.slug,
        description: trip.description,
        shortDescription: trip.shortDescription,
        country: trip.country,
        city: trip.city,
        startDate,
        endDate,
        durationDays,
        price: trip.price,
        currency: 'RUB',
        groupSize: trip.groupSize,
        difficulty: trip.difficulty,
        season: trip.season,
        includes: 'Перелёт, трансфер, проживание, завтраки, экскурсии по программе, страховка',
        excludes: 'Обеды и ужины (кроме указанных), личные расходы, визовые сборы',
        status: 'PUBLISHED',
        isFeatured: trip.isFeatured,
        rating: 5.0,
        reviewsCount: 0,
        viewsCount: 0,
        bookingsCount: 0,
        images: {
          create: trip.images.map((url, index) => ({
            url,
            altText: trip.title,
            isMain: index === 0,
            sortOrder: index,
          })),
        },
        itinerary: {
          create: Array.from({ length: Math.min(durationDays, 5) }, (_, i) => ({
            dayNumber: i + 1,
            title: i === 0 ? 'Прибытие и заселение' : i === durationDays - 1 || i === 4 ? 'Отправление домой' : `День ${i + 1}: экскурсии и отдых`,
            description: i === 0
              ? 'Трансфер из аэропорта, заселение в отель, знакомство с городом.'
              : i === durationDays - 1 || i === 4
                ? 'Завтрак, выселение из отеля и трансфер в аэропорт.'
                : 'Экскурсионная программа, свободное время, фотосессии на лучших локациях.',
            meals: 'Завтрак',
          })),
        },
      },
    })
  }

  console.log('✅ Trips created')
  console.log('🎉 Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
