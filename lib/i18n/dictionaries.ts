import type { PropertyStatus } from '../property-status'
import type { ConditionOption, FurnishingOption, PaymentMethodOption, SellerType } from '../property-wizard-options'

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
  auth: {
    login: {
      heading: string
      subheading: string
      emailLabel: string
      emailPlaceholder: string
      passwordLabel: string
      passwordPlaceholder: string
      submit: string
      submitting: string
      genericError: string
      reassurance: string
    }
    staffOnlyNotice: string
  }
  dashboard: {
    nav: {
      overview: string
      properties: string
      addProperty: string
      sellers: string
      agents: string
      leads: string
      comingSoon: string
    }
    topbar: {
      logout: string
    }
    overview: {
      heading: string
      subheading: string
      stats: {
        total: string
        active: string
        pending: string
        drafts: string
        leads: string
        views: string
        whatsapp: string
      }
    }
    properties: {
      heading: string
      subheading: string
      searchPlaceholder: string
      resultCount: (n: number) => string
      empty: string
      filterAll: string
      statusLabels: Record<PropertyStatus, string>
      table: {
        title: string
        ref: string
        purpose: string
        price: string
        area: string
        seller: string
        agent: string
        status: string
        views: string
        created: string
        actions: string
        noImage: string
      }
      actions: {
        edit: string
        preview: string
        duplicate: string
        hide: string
        publish: string
        delete: string
      }
      confirmDelete: {
        title: string
        body: string
        confirm: string
        cancel: string
      }
      feedback: {
        publishSuccess: string
        hideSuccess: string
        deleteSuccess: string
        duplicateSuccess: string
        updateError: string
        deleteError: string
        duplicateError: string
      }
      editPlaceholder: {
        heading: string
        body: string
        backLink: string
      }
    }
    propertyWizard: {
      pageTitle: string
      stepIndicator: (current: number, total: number) => string
      back: string
      next: string
      requiredHint: string
      purpose: {
        heading: string
        subheading: string
        sale: string
        rent: string
      }
      type: {
        heading: string
        subheading: string
      }
      seller: {
        heading: string
        subheading: string
        existingTab: string
        newTab: string
        selectLabel: string
        selectPlaceholder: string
        fullNameLabel: string
        phoneLabel: string
        whatsappLabel: string
        emailLabel: string
        typeLabel: string
        typeOptions: Record<SellerType, string>
        notesLabel: string
        showOnWebsiteLabel: string
      }
      agent: {
        heading: string
        subheading: string
        selectLabel: string
        selectPlaceholder: string
        empty: string
      }
      location: {
        heading: string
        subheading: string
        countryLabel: string
        countryValue: string
        governorateLabel: string
        governoratePlaceholder: string
        areaLabel: string
        areaPlaceholder: string
        projectNameLabel: string
        buildingNameLabel: string
        unitNumberLabel: string
        floorLabel: string
        addressLabel: string
        latitudeLabel: string
        longitudeLabel: string
      }
      details: {
        heading: string
        subheading: string
        sizeSqmLabel: string
        landAreaSqmLabel: string
        bedroomsLabel: string
        bathroomsLabel: string
        parkingLabel: string
        floorsCountLabel: string
        yearBuiltLabel: string
        conditionLabel: string
        conditionPlaceholder: string
        conditionOptions: Record<ConditionOption, string>
        furnishingLabel: string
        furnishingPlaceholder: string
        furnishingOptions: Record<FurnishingOption, string>
      }
      price: {
        heading: string
        subheading: string
        currencyLabel: string
        salePriceLabel: string
        priceNotesLabel: string
        monthlyRentLabel: string
        weeklyRentLabel: string
        depositLabel: string
        commissionLabel: string
        utilitiesLabel: string
        electricityLabel: string
        waterLabel: string
        internetLabel: string
        paymentMethodLabel: string
        paymentMethodPlaceholder: string
        paymentMethodOptions: Record<PaymentMethodOption, string>
      }
      amenities: {
        heading: string
        subheading: string
        empty: string
      }
      photos: {
        heading: string
        subheading: string
        dropzone: string
        dropzoneHint: string
        uploading: string
        primaryBadge: string
        setPrimary: string
        moveBack: string
        moveForward: string
        remove: string
        youtubeLabel: string
        tourLabel: string
        tourTypeVirtual: string
        tourType360: string
        errors: {
          tooLarge: string
          uploadFailed: string
        }
      }
      description: {
        heading: string
        subheading: string
        titleArLabel: string
        descriptionArLabel: string
        titleEnLabel: string
        descriptionEnLabel: string
      }
      preview: {
        heading: string
        subheading: string
      }
      save: {
        heading: string
        subheading: string
        saveDraft: string
        submitReview: string
        publish: string
        saving: string
      }
      feedback: {
        authError: string
        sellerError: string
        propertyError: string
        validationError: string
        publishBlockedFallback: string
      }
      pageTitleEdit: string
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
    auth: {
      login: {
        heading: 'Dashboard sign in',
        subheading: 'Staff access only. Enter the email and password your admin set up for you.',
        emailLabel: 'Email',
        emailPlaceholder: 'you@masafa.bh',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password',
        submit: 'Sign in',
        submitting: 'Signing in…',
        genericError: 'We couldn’t sign you in. Check your email and password and try again.',
        reassurance: 'Accounts are created by the Masafa team — contact your admin if you need access.',
      },
      staffOnlyNotice: 'That area is for Masafa staff only.',
    },
    dashboard: {
      nav: {
        overview: 'Overview',
        properties: 'Properties',
        addProperty: 'Add Property',
        sellers: 'Sellers',
        agents: 'Agents',
        leads: 'Leads',
        comingSoon: 'Soon',
      },
      topbar: {
        logout: 'Log out',
      },
      overview: {
        heading: 'Overview',
        subheading: 'A snapshot of your listings and activity.',
        stats: {
          total: 'Total properties',
          active: 'Active / Published',
          pending: 'Pending review',
          drafts: 'Drafts',
          leads: 'Leads',
          views: 'Views',
          whatsapp: 'WhatsApp clicks',
        },
      },
      properties: {
        heading: 'Properties',
        subheading: 'Manage every listing in one place.',
        searchPlaceholder: 'Search by title or reference number',
        resultCount: (n) => `${n} propert${n === 1 ? 'y' : 'ies'}`,
        empty: 'No properties match your filters.',
        filterAll: 'All',
        statusLabels: {
          draft: 'Draft',
          pending_review: 'Pending review',
          published: 'Published',
          active: 'Active',
          reserved: 'Reserved',
          sold: 'Sold',
          rented: 'Rented',
          expired: 'Expired',
          hidden: 'Hidden',
          rejected: 'Rejected',
        },
        table: {
          title: 'Property',
          ref: 'Ref',
          purpose: 'Purpose',
          price: 'Price',
          area: 'Area',
          seller: 'Seller',
          agent: 'Agent',
          status: 'Status',
          views: 'Views',
          created: 'Created',
          actions: 'Actions',
          noImage: 'No photo',
        },
        actions: {
          edit: 'Edit',
          preview: 'Preview',
          duplicate: 'Duplicate',
          hide: 'Hide',
          publish: 'Publish',
          delete: 'Delete',
        },
        confirmDelete: {
          title: 'Delete this property?',
          body: 'Are you sure? This can’t be undone.',
          confirm: 'Delete',
          cancel: 'Cancel',
        },
        feedback: {
          publishSuccess: 'Property published.',
          hideSuccess: 'Property hidden.',
          deleteSuccess: 'Property deleted.',
          duplicateSuccess: 'Property duplicated as a new draft.',
          updateError: 'We couldn’t update this property. You may not have permission.',
          deleteError: 'We couldn’t delete this property. You may not have permission.',
          duplicateError: 'We couldn’t duplicate this property. You may not have permission.',
        },
        editPlaceholder: {
          heading: 'Property not found',
          body: 'This property may have been deleted, or the link is incorrect.',
          backLink: 'Back to properties',
        },
      },
      propertyWizard: {
        pageTitle: 'Add Property',
        stepIndicator: (current, total) => `Step ${current} of ${total}`,
        back: 'Back',
        next: 'Next',
        requiredHint: 'This is required to continue.',
        purpose: {
          heading: 'What are you listing?',
          subheading: 'Choose whether this property is for sale or for rent.',
          sale: 'For Sale',
          rent: 'For Rent',
        },
        type: {
          heading: 'Property type',
          subheading: 'Choose the type that best describes this property.',
        },
        seller: {
          heading: 'Seller',
          subheading: 'Pick an existing seller, or add a new one.',
          existingTab: 'Existing seller',
          newTab: '+ Add new seller',
          selectLabel: 'Seller',
          selectPlaceholder: 'No seller / choose later',
          fullNameLabel: 'Full name',
          phoneLabel: 'Phone',
          whatsappLabel: 'WhatsApp',
          emailLabel: 'Email',
          typeLabel: 'Seller type',
          typeOptions: {
            owner: 'Owner',
            company: 'Company',
            developer: 'Developer',
            broker: 'Broker',
          },
          notesLabel: 'Internal notes',
          showOnWebsiteLabel: 'Show seller on website',
        },
        agent: {
          heading: 'Assigned agent',
          subheading: 'Choose the agent responsible for this listing.',
          selectLabel: 'Agent',
          selectPlaceholder: 'Choose an agent',
          empty: 'No active agents found.',
        },
        location: {
          heading: 'Location',
          subheading: 'Where is this property located?',
          countryLabel: 'Country',
          countryValue: 'Bahrain',
          governorateLabel: 'Governorate',
          governoratePlaceholder: 'Choose a governorate',
          areaLabel: 'Area',
          areaPlaceholder: 'Choose an area',
          projectNameLabel: 'Project name',
          buildingNameLabel: 'Building name',
          unitNumberLabel: 'Unit number',
          floorLabel: 'Floor',
          addressLabel: 'Address',
          latitudeLabel: 'Latitude',
          longitudeLabel: 'Longitude',
        },
        details: {
          heading: 'Property details',
          subheading: 'Size, rooms, and condition.',
          sizeSqmLabel: 'Size (sqm)',
          landAreaSqmLabel: 'Land area (sqm)',
          bedroomsLabel: 'Bedrooms',
          bathroomsLabel: 'Bathrooms',
          parkingLabel: 'Parking spaces',
          floorsCountLabel: 'Number of floors',
          yearBuiltLabel: 'Year built',
          conditionLabel: 'Condition',
          conditionPlaceholder: 'Choose a condition',
          conditionOptions: {
            new: 'New',
            excellent: 'Excellent',
            good: 'Good',
            needs_renovation: 'Needs renovation',
          },
          furnishingLabel: 'Furnishing',
          furnishingPlaceholder: 'Choose furnishing',
          furnishingOptions: {
            furnished: 'Furnished',
            unfurnished: 'Unfurnished',
            semi_furnished: 'Semi-furnished',
          },
        },
        price: {
          heading: 'Price',
          subheading: 'Set the price and payment terms.',
          currencyLabel: 'Currency',
          salePriceLabel: 'Sale price',
          priceNotesLabel: 'Price notes',
          monthlyRentLabel: 'Monthly rent',
          weeklyRentLabel: 'Weekly rent',
          depositLabel: 'Security deposit',
          commissionLabel: 'Commission',
          utilitiesLabel: 'Utilities included',
          electricityLabel: 'Electricity',
          waterLabel: 'Water',
          internetLabel: 'Internet',
          paymentMethodLabel: 'Payment method',
          paymentMethodPlaceholder: 'Choose a payment method',
          paymentMethodOptions: {
            cash: 'Cash',
            cheque: 'Cheque',
            bank_transfer: 'Bank transfer',
          },
        },
        amenities: {
          heading: 'Amenities',
          subheading: 'Select everything this property offers.',
          empty: 'No amenities available yet.',
        },
        photos: {
          heading: 'Photos & media',
          subheading: 'Drag and drop photos, or click to choose files.',
          dropzone: 'Drag photos here, or click to browse',
          dropzoneHint: 'JPG or PNG, up to 15MB each — resized automatically before upload.',
          uploading: 'Uploading…',
          primaryBadge: 'Primary',
          setPrimary: 'Set as primary',
          moveBack: 'Move earlier',
          moveForward: 'Move later',
          remove: 'Remove',
          youtubeLabel: 'YouTube video URL',
          tourLabel: 'Virtual tour / 360° URL',
          tourTypeVirtual: 'Virtual tour',
          tourType360: '360° tour',
          errors: {
            tooLarge: 'That file is too large (max 15MB).',
            uploadFailed: 'That photo couldn’t be uploaded. Please try again.',
          },
        },
        description: {
          heading: 'Description',
          subheading: 'Write a title and description in both languages.',
          titleArLabel: 'Title (Arabic)',
          descriptionArLabel: 'Description (Arabic)',
          titleEnLabel: 'Title (English)',
          descriptionEnLabel: 'Description (English)',
        },
        preview: {
          heading: 'Preview',
          subheading: 'This is how the listing will appear on the public site.',
        },
        save: {
          heading: 'Save',
          subheading: 'Choose how to save this listing.',
          saveDraft: 'Save as Draft',
          submitReview: 'Submit for Review',
          publish: 'Publish',
          saving: 'Saving…',
        },
        feedback: {
          authError: 'Your session expired. Please sign in again.',
          sellerError: 'We couldn’t save the new seller. Please check the details and try again.',
          propertyError: 'We couldn’t save this property. Please check the details and try again.',
          validationError: 'Please complete the required steps before saving.',
          publishBlockedFallback: 'You don’t have publish rights, so this was submitted for review instead.',
        },
        pageTitleEdit: 'Edit Property',
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
    auth: {
      login: {
        heading: 'تسجيل دخول لوحة التحكم',
        subheading: 'الدخول مخصص للفريق فقط. أدخل البريد الإلكتروني وكلمة المرور اللذين أعدهما لك المسؤول.',
        emailLabel: 'البريد الإلكتروني',
        emailPlaceholder: 'you@masafa.bh',
        passwordLabel: 'كلمة المرور',
        passwordPlaceholder: 'أدخل كلمة المرور',
        submit: 'تسجيل الدخول',
        submitting: 'جارِ تسجيل الدخول…',
        genericError: 'تعذّر تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور وحاول مرة أخرى.',
        reassurance: 'يتم إنشاء الحسابات من قبل فريق مسافة — تواصل مع المسؤول إذا احتجت إلى صلاحية الدخول.',
      },
      staffOnlyNotice: 'هذه المنطقة مخصصة لفريق مسافة فقط.',
    },
    dashboard: {
      nav: {
        overview: 'نظرة عامة',
        properties: 'العقارات',
        addProperty: 'إضافة عقار',
        sellers: 'البائعون',
        agents: 'الوسطاء',
        leads: 'العملاء المحتملون',
        comingSoon: 'قريبًا',
      },
      topbar: {
        logout: 'تسجيل الخروج',
      },
      overview: {
        heading: 'نظرة عامة',
        subheading: 'لمحة سريعة عن عقاراتك ونشاطك.',
        stats: {
          total: 'إجمالي العقارات',
          active: 'نشط / منشور',
          pending: 'قيد المراجعة',
          drafts: 'مسودات',
          leads: 'العملاء المحتملون',
          views: 'المشاهدات',
          whatsapp: 'نقرات واتساب',
        },
      },
      properties: {
        heading: 'العقارات',
        subheading: 'إدارة جميع الإعلانات من مكان واحد.',
        searchPlaceholder: 'ابحث بالعنوان أو الرقم المرجعي',
        resultCount: (n) => `${n} عقار`,
        empty: 'لا توجد عقارات مطابقة للفلاتر.',
        filterAll: 'الكل',
        statusLabels: {
          draft: 'مسودة',
          pending_review: 'قيد المراجعة',
          published: 'منشور',
          active: 'نشط',
          reserved: 'محجوز',
          sold: 'مباع',
          rented: 'مؤجر',
          expired: 'منتهي',
          hidden: 'مخفي',
          rejected: 'مرفوض',
        },
        table: {
          title: 'العقار',
          ref: 'المرجع',
          purpose: 'الغرض',
          price: 'السعر',
          area: 'المنطقة',
          seller: 'البائع',
          agent: 'الوسيط',
          status: 'الحالة',
          views: 'المشاهدات',
          created: 'تاريخ الإنشاء',
          actions: 'الإجراءات',
          noImage: 'لا توجد صورة',
        },
        actions: {
          edit: 'تعديل',
          preview: 'معاينة',
          duplicate: 'نسخ',
          hide: 'إخفاء',
          publish: 'نشر',
          delete: 'حذف',
        },
        confirmDelete: {
          title: 'حذف هذا العقار؟',
          body: 'هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.',
          confirm: 'حذف',
          cancel: 'إلغاء',
        },
        feedback: {
          publishSuccess: 'تم نشر العقار.',
          hideSuccess: 'تم إخفاء العقار.',
          deleteSuccess: 'تم حذف العقار.',
          duplicateSuccess: 'تم نسخ العقار كمسودة جديدة.',
          updateError: 'تعذّر تحديث هذا العقار. قد لا تملك الصلاحية اللازمة.',
          deleteError: 'تعذّر حذف هذا العقار. قد لا تملك الصلاحية اللازمة.',
          duplicateError: 'تعذّر نسخ هذا العقار. قد لا تملك الصلاحية اللازمة.',
        },
        editPlaceholder: {
          heading: 'العقار غير موجود',
          body: 'ربما تم حذف هذا العقار، أو أن الرابط غير صحيح.',
          backLink: 'العودة إلى العقارات',
        },
      },
      propertyWizard: {
        pageTitle: 'إضافة عقار',
        stepIndicator: (current, total) => `الخطوة ${current} من ${total}`,
        back: 'رجوع',
        next: 'التالي',
        requiredHint: 'هذا الحقل مطلوب للمتابعة.',
        purpose: {
          heading: 'ما الذي تعرضه؟',
          subheading: 'اختر ما إذا كان هذا العقار للبيع أو للإيجار.',
          sale: 'للبيع',
          rent: 'للإيجار',
        },
        type: {
          heading: 'نوع العقار',
          subheading: 'اختر النوع الذي يصف هذا العقار بشكل أفضل.',
        },
        seller: {
          heading: 'البائع',
          subheading: 'اختر بائعًا موجودًا أو أضف بائعًا جديدًا.',
          existingTab: 'بائع موجود',
          newTab: '+ إضافة بائع جديد',
          selectLabel: 'البائع',
          selectPlaceholder: 'بدون بائع / اختيار لاحقًا',
          fullNameLabel: 'الاسم الكامل',
          phoneLabel: 'الهاتف',
          whatsappLabel: 'واتساب',
          emailLabel: 'البريد الإلكتروني',
          typeLabel: 'نوع البائع',
          typeOptions: {
            owner: 'مالك',
            company: 'شركة',
            developer: 'مطوّر',
            broker: 'وسيط',
          },
          notesLabel: 'ملاحظات داخلية',
          showOnWebsiteLabel: 'إظهار البائع على الموقع',
        },
        agent: {
          heading: 'الوسيط المسؤول',
          subheading: 'اختر الوسيط المسؤول عن هذا الإعلان.',
          selectLabel: 'الوسيط',
          selectPlaceholder: 'اختر وسيطًا',
          empty: 'لا يوجد وسطاء نشطون.',
        },
        location: {
          heading: 'الموقع',
          subheading: 'أين يقع هذا العقار؟',
          countryLabel: 'الدولة',
          countryValue: 'البحرين',
          governorateLabel: 'المحافظة',
          governoratePlaceholder: 'اختر محافظة',
          areaLabel: 'المنطقة',
          areaPlaceholder: 'اختر منطقة',
          projectNameLabel: 'اسم المشروع',
          buildingNameLabel: 'اسم المبنى',
          unitNumberLabel: 'رقم الوحدة',
          floorLabel: 'الطابق',
          addressLabel: 'العنوان',
          latitudeLabel: 'خط العرض',
          longitudeLabel: 'خط الطول',
        },
        details: {
          heading: 'تفاصيل العقار',
          subheading: 'المساحة والغرف والحالة.',
          sizeSqmLabel: 'المساحة (م²)',
          landAreaSqmLabel: 'مساحة الأرض (م²)',
          bedroomsLabel: 'غرف النوم',
          bathroomsLabel: 'الحمامات',
          parkingLabel: 'مواقف السيارات',
          floorsCountLabel: 'عدد الطوابق',
          yearBuiltLabel: 'سنة البناء',
          conditionLabel: 'الحالة',
          conditionPlaceholder: 'اختر الحالة',
          conditionOptions: {
            new: 'جديد',
            excellent: 'ممتاز',
            good: 'جيد',
            needs_renovation: 'يحتاج إلى تجديد',
          },
          furnishingLabel: 'التأثيث',
          furnishingPlaceholder: 'اختر حالة التأثيث',
          furnishingOptions: {
            furnished: 'مفروش',
            unfurnished: 'غير مفروش',
            semi_furnished: 'مفروش جزئيًا',
          },
        },
        price: {
          heading: 'السعر',
          subheading: 'حدد السعر وشروط الدفع.',
          currencyLabel: 'العملة',
          salePriceLabel: 'سعر البيع',
          priceNotesLabel: 'ملاحظات على السعر',
          monthlyRentLabel: 'الإيجار الشهري',
          weeklyRentLabel: 'الإيجار الأسبوعي',
          depositLabel: 'مبلغ التأمين',
          commissionLabel: 'العمولة',
          utilitiesLabel: 'الخدمات المشمولة',
          electricityLabel: 'الكهرباء',
          waterLabel: 'الماء',
          internetLabel: 'الإنترنت',
          paymentMethodLabel: 'طريقة الدفع',
          paymentMethodPlaceholder: 'اختر طريقة الدفع',
          paymentMethodOptions: {
            cash: 'نقدًا',
            cheque: 'شيك',
            bank_transfer: 'تحويل بنكي',
          },
        },
        amenities: {
          heading: 'المرافق',
          subheading: 'اختر كل ما يوفره هذا العقار.',
          empty: 'لا توجد مرافق متاحة حاليًا.',
        },
        photos: {
          heading: 'الصور والوسائط',
          subheading: 'اسحب وأفلت الصور، أو اضغط لاختيار الملفات.',
          dropzone: 'اسحب الصور هنا، أو اضغط للتصفح',
          dropzoneHint: 'JPG أو PNG، حتى 15 ميجابايت لكل صورة — يتم تصغيرها تلقائيًا قبل الرفع.',
          uploading: 'جارِ الرفع…',
          primaryBadge: 'الصورة الرئيسية',
          setPrimary: 'تعيين كصورة رئيسية',
          moveBack: 'نقل للخلف',
          moveForward: 'نقل للأمام',
          remove: 'إزالة',
          youtubeLabel: 'رابط فيديو يوتيوب',
          tourLabel: 'رابط الجولة الافتراضية / 360°',
          tourTypeVirtual: 'جولة افتراضية',
          tourType360: 'جولة 360°',
          errors: {
            tooLarge: 'هذا الملف كبير جدًا (الحد الأقصى 15 ميجابايت).',
            uploadFailed: 'تعذّر رفع هذه الصورة. الرجاء المحاولة مرة أخرى.',
          },
        },
        description: {
          heading: 'الوصف',
          subheading: 'اكتب عنوانًا ووصفًا باللغتين.',
          titleArLabel: 'العنوان (عربي)',
          descriptionArLabel: 'الوصف (عربي)',
          titleEnLabel: 'العنوان (إنجليزي)',
          descriptionEnLabel: 'الوصف (إنجليزي)',
        },
        preview: {
          heading: 'المعاينة',
          subheading: 'هكذا سيظهر الإعلان على الموقع العام.',
        },
        save: {
          heading: 'الحفظ',
          subheading: 'اختر طريقة حفظ هذا الإعلان.',
          saveDraft: 'حفظ كمسودة',
          submitReview: 'إرسال للمراجعة',
          publish: 'نشر',
          saving: 'جارِ الحفظ…',
        },
        feedback: {
          authError: 'انتهت جلستك. الرجاء تسجيل الدخول مرة أخرى.',
          sellerError: 'تعذّر حفظ البائع الجديد. الرجاء التحقق من البيانات والمحاولة مرة أخرى.',
          propertyError: 'تعذّر حفظ هذا العقار. الرجاء التحقق من البيانات والمحاولة مرة أخرى.',
          validationError: 'الرجاء إكمال الخطوات المطلوبة قبل الحفظ.',
          publishBlockedFallback: 'لا تملك صلاحية النشر، لذا تم إرسال هذا العقار للمراجعة بدلاً من ذلك.',
        },
        pageTitleEdit: 'تعديل العقار',
      },
    },
  },
}
