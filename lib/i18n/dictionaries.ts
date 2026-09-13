export type Lang = 'en' | 'ar'

export interface Dictionary {
  langName: string
  nav: {
    home: string
    buy: string
    rent: string
    commercial: string
    agents: string
    about: string
  }
  properties: {
    heading: string
    count: (n: number) => string
    empty: string
    forSale: string
    forRent: string
    beds: string
    baths: string
    sqm: string
    agent: string
    perMonth: string
    currency: string
    filters: {
      heading: string
      purposeLabel: string
      purposeAll: string
      minPriceLabel: string
      bathroomsLabel: string
      bathroomsAny: string
      furnishedLabel: string
      furnishedAny: string
      furnished: string
      unfurnished: string
      amenitiesHeading: string
      clearAll: string
    }
  }
  home: {
    hero: {
      headline: string
      subheading: string
      governorateLabel: string
      allGovernorates: string
      areaLabel: string
      allAreas: string
      typeLabel: string
      typeAny: string
      typeOptions: string[]
      maxPriceLabel: string
      maxPricePlaceholder: string
      bedroomsLabel: string
      bedroomsAny: string
      searchButton: string
    }
    stats: {
      propertiesLabel: string
      agentsLabel: string
      areasLabel: string
      clientsLabel: string
    }
    featured: {
      heading: string
      subheading: string
      viewAll: string
      empty: string
    }
    why: {
      heading: string
      subheading: string
      items: { title: string; desc: string }[]
    }
    agentsSection: {
      heading: string
      subheading: string
      roles: string[]
      listings: (n: number) => string
    }
    cta: {
      heading: string
      subheading: string
      button: string
    }
  }
  footer: {
    blurb: string
    quickLinksHeading: string
    companyHeading: string
    contactHeading: string
    addressLine1: string
    addressLine2: string
    companyLinks: string[]
    rights: (year: number) => string
  }
  propertyDetail: {
    breadcrumb: {
      properties: string
    }
    notFound: {
      heading: string
      body: string
      backButton: string
    }
    gallery: {
      noPhoto: string
      thumbnailLabel: (n: number, total: number) => string
    }
    specs: {
      sizeLabel: string
      parkingLabel: string
      plotAreaLabel: string
      typeLabel: string
      referenceLabel: string
    }
    description: {
      heading: string
      tabEnglish: string
      tabArabic: string
      empty: string
    }
    amenities: {
      heading: string
    }
    agentCard: {
      contactHeading: string
      whatsapp: string
      call: string
      inquiry: string
      seller: string
      reference: string
      views: (n: number) => string
      whatsappMessage: (title: string, ref: string) => string
      inquirySubject: (title: string, ref: string) => string
    }
    location: {
      heading: string
      mapComingSoon: string
    }
  }
}

// Property type slugs are stable identifiers (used in search query params), matched
// by index to home.hero.typeOptions in each language below.
export const PROPERTY_TYPE_SLUGS = ['apartment', 'villa', 'duplex', 'land', 'office', 'shop', 'building'] as const

export const dictionaries: Record<Lang, Dictionary> = {
  en: {
    langName: 'EN',
    nav: {
      home: 'Home',
      buy: 'Buy',
      rent: 'Rent',
      commercial: 'Commercial',
      agents: 'Agents',
      about: 'About',
    },
    properties: {
      heading: 'All Properties',
      count: (n) => `${n} propert${n === 1 ? 'y' : 'ies'} available`,
      empty: 'No properties found.',
      forSale: 'For Sale',
      forRent: 'For Rent',
      beds: 'Beds',
      baths: 'Baths',
      sqm: 'sqm',
      agent: 'Agent',
      perMonth: 'month',
      currency: 'BHD',
      filters: {
        heading: 'Filters',
        purposeLabel: 'Purpose',
        purposeAll: 'All',
        minPriceLabel: 'Min price',
        bathroomsLabel: 'Bathrooms',
        bathroomsAny: 'Any',
        furnishedLabel: 'Furnishing',
        furnishedAny: 'Any',
        furnished: 'Furnished',
        unfurnished: 'Unfurnished',
        amenitiesHeading: 'Amenities',
        clearAll: 'Clear all filters',
      },
    },
    home: {
      hero: {
        headline: 'Find your place in Bahrain',
        subheading: 'Search verified homes, land, and commercial spaces across Bahrain — bought, sold, and rented the transparent way.',
        governorateLabel: 'Governorate',
        allGovernorates: 'All governorates',
        areaLabel: 'Area',
        allAreas: 'All areas',
        typeLabel: 'Property type',
        typeAny: 'Any type',
        typeOptions: ['Apartment', 'Villa', 'Duplex', 'Land', 'Office', 'Shop', 'Building'],
        maxPriceLabel: 'Max price',
        maxPricePlaceholder: 'Any price',
        bedroomsLabel: 'Bedrooms',
        bedroomsAny: 'Any',
        searchButton: 'Search',
      },
      stats: {
        propertiesLabel: 'Properties listed',
        agentsLabel: 'Trusted agents',
        areasLabel: 'Areas covered',
        clientsLabel: 'Happy clients',
      },
      featured: {
        heading: 'Featured properties',
        subheading: 'A hand-picked selection of our latest and most in-demand listings.',
        viewAll: 'View all',
        empty: 'No featured properties yet — check back soon.',
      },
      why: {
        heading: 'Why Masafa',
        subheading: 'Built for a calmer, more trustworthy property search.',
        items: [
          {
            title: 'Smart map search',
            desc: 'Explore listings by neighborhood with an intuitive, location-first search experience.',
          },
          {
            title: 'Verified agents',
            desc: 'Every agent on Masafa is vetted, so you always know who you are dealing with.',
          },
          {
            title: 'Documented listings',
            desc: 'Full property details and paperwork status upfront — no surprises later.',
          },
        ],
      },
      agentsSection: {
        heading: 'Meet our agents',
        subheading: 'Local experts ready to help you buy, rent, or sell with confidence.',
        roles: ['Senior Property Consultant', 'Rental Specialist', 'Commercial Advisor', 'Listings Manager'],
        listings: (n) => `${n} active listings`,
      },
      cta: {
        heading: 'Have a property to sell or rent?',
        subheading: 'List it on Masafa and reach thousands of verified buyers and tenants.',
        button: 'List your property',
      },
    },
    footer: {
      blurb: 'Masafa is a calmer way to buy, sell, and rent property in Bahrain — verified listings, verified agents, no guesswork.',
      quickLinksHeading: 'Quick links',
      companyHeading: 'Company',
      contactHeading: 'Contact',
      addressLine1: 'Manama, Bahrain',
      addressLine2: 'hello@masafa.bh',
      companyLinks: ['About', 'Careers', 'Blog', 'Contact'],
      rights: (year) => `© ${year} Masafa. All rights reserved.`,
    },
    propertyDetail: {
      breadcrumb: {
        properties: 'Properties',
      },
      notFound: {
        heading: 'Property not found',
        body: 'This listing may have been removed, or the link you followed is incorrect.',
        backButton: 'Back to all properties',
      },
      gallery: {
        noPhoto: 'No photo available',
        thumbnailLabel: (n, total) => `Photo ${n} of ${total}`,
      },
      specs: {
        sizeLabel: 'Size',
        parkingLabel: 'Parking',
        plotAreaLabel: 'Plot area',
        typeLabel: 'Type',
        referenceLabel: 'Reference',
      },
      description: {
        heading: 'Description',
        tabEnglish: 'English',
        tabArabic: 'العربية',
        empty: 'No description available.',
      },
      amenities: {
        heading: 'Amenities',
      },
      agentCard: {
        contactHeading: 'Contact agent',
        whatsapp: 'WhatsApp',
        call: 'Call',
        inquiry: 'Send inquiry',
        seller: 'Seller',
        reference: 'Reference',
        views: (n) => `${n} view${n === 1 ? '' : 's'}`,
        whatsappMessage: (title, ref) => `Hi, I'm interested in "${title}" (Ref: ${ref}). Is it still available?`,
        inquirySubject: (title, ref) => `Inquiry: ${title} (Ref: ${ref})`,
      },
      location: {
        heading: 'Location',
        mapComingSoon: 'Interactive map coming soon',
      },
    },
  },
  ar: {
    langName: 'عربي',
    nav: {
      home: 'الرئيسية',
      buy: 'شراء',
      rent: 'إيجار',
      commercial: 'تجاري',
      agents: 'الوسطاء',
      about: 'من نحن',
    },
    properties: {
      heading: 'جميع العقارات',
      count: (n) => `${n} عقار متاح حاليًا`,
      empty: 'لا توجد عقارات.',
      forSale: 'للبيع',
      forRent: 'للإيجار',
      beds: 'غرف نوم',
      baths: 'حمامات',
      sqm: 'م²',
      agent: 'المسوّق',
      perMonth: 'شهر',
      currency: 'د.ب',
      filters: {
        heading: 'الفلاتر',
        purposeLabel: 'الغرض',
        purposeAll: 'الكل',
        minPriceLabel: 'أقل سعر',
        bathroomsLabel: 'الحمامات',
        bathroomsAny: 'أي عدد',
        furnishedLabel: 'التأثيث',
        furnishedAny: 'أي حالة',
        furnished: 'مفروش',
        unfurnished: 'غير مفروش',
        amenitiesHeading: 'المرافق',
        clearAll: 'مسح كل الفلاتر',
      },
    },
    home: {
      hero: {
        headline: 'ابحث عن مكانك في البحرين',
        subheading: 'ابحث عن منازل وأراضٍ ومساحات تجارية موثوقة في البحرين — بيعًا وشراءً وإيجارًا بكل شفافية.',
        governorateLabel: 'المحافظة',
        allGovernorates: 'كل المحافظات',
        areaLabel: 'المنطقة',
        allAreas: 'كل المناطق',
        typeLabel: 'نوع العقار',
        typeAny: 'أي نوع',
        typeOptions: ['شقة', 'فيلا', 'دوبلكس', 'أرض', 'مكتب', 'محل', 'مبنى'],
        maxPriceLabel: 'أقصى سعر',
        maxPricePlaceholder: 'أي سعر',
        bedroomsLabel: 'غرف النوم',
        bedroomsAny: 'أي عدد',
        searchButton: 'بحث',
      },
      stats: {
        propertiesLabel: 'عقار مُدرج',
        agentsLabel: 'وسيط موثوق',
        areasLabel: 'منطقة مُغطاة',
        clientsLabel: 'عميل سعيد',
      },
      featured: {
        heading: 'عقارات مميزة',
        subheading: 'مجموعة مختارة من أحدث العقارات وأكثرها طلبًا.',
        viewAll: 'عرض الكل',
        empty: 'لا توجد عقارات مميزة حاليًا — تابعونا قريبًا.',
      },
      why: {
        heading: 'لماذا مسافة',
        subheading: 'صُممت لتجربة بحث عقاري أكثر هدوءًا وموثوقية.',
        items: [
          {
            title: 'بحث ذكي بالخريطة',
            desc: 'تصفّح العقارات حسب المنطقة بتجربة بحث بديهية تعتمد على الموقع أولاً.',
          },
          {
            title: 'وسطاء موثوقون',
            desc: 'كل وسيط على مسافة تم التحقق منه، فأنت تعرف دائمًا مع من تتعامل.',
          },
          {
            title: 'عقارات موثّقة',
            desc: 'تفاصيل العقار وحالة الأوراق الرسمية واضحة من البداية — بلا مفاجآت لاحقًا.',
          },
        ],
      },
      agentsSection: {
        heading: 'تعرّف على وسطائنا',
        subheading: 'خبراء محليون جاهزون لمساعدتك على الشراء أو الإيجار أو البيع بثقة.',
        roles: ['استشاري عقارات أول', 'أخصائي تأجير', 'مستشار تجاري', 'مدير إدراجات'],
        listings: (n) => `${n} إعلان نشط`,
      },
      cta: {
        heading: 'لديك عقار للبيع أو الإيجار؟',
        subheading: 'أدرجه على مسافة وصل إلى آلاف المشترين والمستأجرين الموثوقين.',
        button: 'أدرج عقارك',
      },
    },
    footer: {
      blurb: 'مسافة طريقة أكثر هدوءًا لبيع وشراء وإيجار العقارات في البحرين — عقارات موثّقة ووسطاء موثوقون، بلا تخمين.',
      quickLinksHeading: 'روابط سريعة',
      companyHeading: 'الشركة',
      contactHeading: 'تواصل معنا',
      addressLine1: 'المنامة، البحرين',
      addressLine2: 'hello@masafa.bh',
      companyLinks: ['من نحن', 'وظائف', 'المدونة', 'تواصل معنا'],
      rights: (year) => `© ${year} مسافة. جميع الحقوق محفوظة.`,
    },
    propertyDetail: {
      breadcrumb: {
        properties: 'العقارات',
      },
      notFound: {
        heading: 'العقار غير موجود',
        body: 'ربما تمت إزالة هذا الإعلان، أو أن الرابط الذي اتبعته غير صحيح.',
        backButton: 'العودة إلى جميع العقارات',
      },
      gallery: {
        noPhoto: 'لا توجد صورة متاحة',
        thumbnailLabel: (n, total) => `صورة ${n} من ${total}`,
      },
      specs: {
        sizeLabel: 'المساحة',
        parkingLabel: 'مواقف السيارات',
        plotAreaLabel: 'مساحة الأرض',
        typeLabel: 'النوع',
        referenceLabel: 'الرقم المرجعي',
      },
      description: {
        heading: 'الوصف',
        tabEnglish: 'English',
        tabArabic: 'العربية',
        empty: 'لا يوجد وصف متاح.',
      },
      amenities: {
        heading: 'المرافق',
      },
      agentCard: {
        contactHeading: 'تواصل مع الوسيط',
        whatsapp: 'واتساب',
        call: 'اتصال',
        inquiry: 'إرسال استفسار',
        seller: 'البائع',
        reference: 'الرقم المرجعي',
        views: (n) => `${n} مشاهدة`,
        whatsappMessage: (title, ref) => `مرحبًا، أنا مهتم بـ "${title}" (الرقم المرجعي: ${ref}). هل ما زال متاحًا؟`,
        inquirySubject: (title, ref) => `استفسار: ${title} (الرقم المرجعي: ${ref})`,
      },
      location: {
        heading: 'الموقع',
        mapComingSoon: 'الخريطة التفاعلية قريبًا',
      },
    },
  },
}
