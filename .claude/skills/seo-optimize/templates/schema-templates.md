# Schema.org Templates

Ready-to-use JSON-LD templates for structured data. Copy, customize, and add to your pages.

**Placement**: Inside `<script type="application/ld+json">` tag in `<head>` or before `</body>`

**Validation**: Test at https://search.google.com/test/rich-results

---

## 1. Organization (Company/Brand)

Use on: Homepage, About page

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.example.com/#organization",
  "name": "Company Name",
  "alternateName": "Short Name",
  "description": "Brief description of the organization",
  "url": "https://www.example.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.example.com/logo.png",
    "width": 512,
    "height": 512
  },
  "image": "https://www.example.com/images/company-image.jpg",
  "email": "contact@example.com",
  "telephone": "+1-234-567-8900",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State/Province",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.facebook.com/company",
    "https://www.instagram.com/company",
    "https://twitter.com/company",
    "https://www.linkedin.com/company/company"
  ],
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  }
}
```

---

## 2. LocalBusiness (Physical Location)

Use on: Homepage, Contact page, Location pages

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.example.com/#localbusiness",
  "name": "Business Name",
  "description": "Description of your local business",
  "url": "https://www.example.com",
  "telephone": "+1-234-567-8900",
  "email": "contact@example.com",
  "image": "https://www.example.com/images/storefront.jpg",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/business",
    "https://www.instagram.com/business"
  ]
}
```

---

## 3. Restaurant

Use on: Restaurant homepage, Menu pages

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.example.com/#restaurant",
  "name": "Restaurant Name",
  "description": "Description of the restaurant and cuisine",
  "url": "https://www.example.com",
  "telephone": "+1-234-567-8900",
  "email": "reservations@example.com",
  "image": "https://www.example.com/images/restaurant.jpg",
  "priceRange": "$$",
  "servesCuisine": ["Italian", "Mediterranean", "Seafood"],
  "acceptsReservations": "True",
  "hasMenu": "https://www.example.com/menu",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Food Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "22:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  }
}
```

---

## 4. FoodService (Chef, Catering, Delivery)

Use on: Service pages, Chef services, Catering pages

```json
{
  "@context": "https://schema.org",
  "@type": "FoodService",
  "@id": "https://www.example.com/services/#foodservice",
  "name": "Service Name - Private Chef",
  "description": "Description of the food service offered",
  "url": "https://www.example.com/services",
  "telephone": "+1-234-567-8900",
  "email": "bookings@example.com",
  "image": "https://www.example.com/images/chef-service.jpg",
  "serviceType": ["Private Chef", "Event Catering", "Food Delivery"],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "geoRadius": "30000"
  },
  "provider": {
    "@type": "Person",
    "name": "Chef Name",
    "jobTitle": "Private Chef"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Private Chef Service",
          "description": "Personal chef for your home or event"
        },
        "price": "200",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Event Catering",
          "description": "Catering for events and celebrations"
        },
        "price": "0",
        "priceCurrency": "USD",
        "description": "Quote on request"
      }
    ]
  }
}
```

---

## 5. LodgingBusiness (Accommodation)

Use on: Hotel, Vacation rental, Apartment pages

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.example.com/accommodation/#lodging",
  "name": "Property Name",
  "description": "Description of the accommodation",
  "url": "https://www.example.com/accommodation",
  "telephone": "+1-234-567-8900",
  "email": "bookings@example.com",
  "image": "https://www.example.com/images/property.jpg",
  "priceRange": "$100-$300",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Beach Road",
    "addressLocality": "Beach City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "checkinTime": "14:00",
  "checkoutTime": "11:00",
  "petsAllowed": false,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kitchen", "value": true }
  ],
  "numberOfRooms": 2,
  "occupancy": {
    "@type": "QuantitativeValue",
    "maxValue": 4
  },
  "offers": {
    "@type": "Offer",
    "name": "Standard Rate",
    "price": "150",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  }
}
```

---

## 6. Menu with MenuItems

Use on: Restaurant menu, Food delivery pages

```json
{
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://www.example.com/menu/#menu",
  "name": "Restaurant Menu",
  "description": "Our full menu of dishes",
  "url": "https://www.example.com/menu",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Appetizers",
      "description": "Starters and small plates",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Spring Rolls",
          "description": "Crispy vegetable spring rolls with dipping sauce",
          "image": "https://www.example.com/images/spring-rolls.jpg",
          "offers": {
            "@type": "Offer",
            "price": "8.99",
            "priceCurrency": "USD"
          },
          "suitableForDiet": "https://schema.org/VegetarianDiet"
        }
      ]
    },
    {
      "@type": "MenuSection",
      "name": "Main Courses",
      "description": "Hearty main dishes",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Grilled Salmon",
          "description": "Fresh Atlantic salmon with seasonal vegetables",
          "image": "https://www.example.com/images/salmon.jpg",
          "offers": {
            "@type": "Offer",
            "price": "24.99",
            "priceCurrency": "USD"
          },
          "nutrition": {
            "@type": "NutritionInformation",
            "calories": "450 calories"
          }
        }
      ]
    }
  ]
}
```

---

## 7. Product

Use on: E-commerce product pages

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.example.com/products/item/#product",
  "name": "Product Name",
  "description": "Detailed product description",
  "image": [
    "https://www.example.com/images/product-1.jpg",
    "https://www.example.com/images/product-2.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "sku": "SKU12345",
  "mpn": "MPN12345",
  "offers": {
    "@type": "Offer",
    "url": "https://www.example.com/products/item",
    "price": "49.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Store Name"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "89"
  }
}
```

---

## 8. Article / BlogPosting

Use on: Blog posts, News articles

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://www.example.com/blog/article-slug/#article",
  "headline": "Article Title Here",
  "description": "Brief summary of the article",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.example.com/images/article-image.jpg",
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://www.example.com/about/author"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.example.com/logo.png"
    }
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-20",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.example.com/blog/article-slug"
  },
  "wordCount": "1500",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

---

## 9. FAQPage

Use on: FAQ pages, Support pages

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.example.com/faq/#faqpage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a 30-day return policy for all unused items in original packaging. Contact our support team to initiate a return."
      }
    },
    {
      "@type": "Question",
      "name": "How long does shipping take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer international shipping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we ship to over 50 countries worldwide. International shipping typically takes 10-14 business days."
      }
    }
  ]
}
```

---

## 10. Event

Use on: Event pages, Concerts, Workshops

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://www.example.com/events/event-name/#event",
  "name": "Event Name",
  "description": "Description of the event",
  "image": "https://www.example.com/images/event.jpg",
  "startDate": "2026-03-15T19:00:00-05:00",
  "endDate": "2026-03-15T22:00:00-05:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Venue Name",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Event Street",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Organizer Name",
    "url": "https://www.example.com"
  },
  "performer": {
    "@type": "Person",
    "name": "Performer Name"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.example.com/events/event-name/tickets",
    "price": "50",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-01-01T00:00:00-05:00"
  }
}
```

---

## 11. Service

Use on: Professional service pages

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.example.com/services/service-name/#service",
  "name": "Service Name",
  "description": "Detailed description of the service",
  "image": "https://www.example.com/images/service.jpg",
  "provider": {
    "@type": "Organization",
    "name": "Company Name",
    "url": "https://www.example.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "City Name"
  },
  "serviceType": "Consulting",
  "offers": {
    "@type": "Offer",
    "price": "100",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "100",
      "priceCurrency": "USD",
      "unitText": "per hour"
    }
  }
}
```

---

## 12. Person (About Page)

Use on: About pages, Team member pages

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.example.com/about/#person",
  "name": "Person Name",
  "jobTitle": "Founder & CEO",
  "description": "Brief bio of the person",
  "image": "https://www.example.com/images/person.jpg",
  "url": "https://www.example.com/about",
  "email": "person@example.com",
  "telephone": "+1-234-567-8900",
  "sameAs": [
    "https://www.linkedin.com/in/person",
    "https://twitter.com/person",
    "https://www.instagram.com/person"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Company Name"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University Name"
  },
  "knowsAbout": ["Skill 1", "Skill 2", "Skill 3"]
}
```

---

## Implementation Notes

### How to Add to Page

**HTML**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  ...
}
</script>
```

**React/Next.js**:
```jsx
const jsonLd = { "@context": "https://schema.org", ... }

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

### Multiple Schemas

You can include multiple schemas on one page:

```html
<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    ...
  }
]
</script>
```

### Testing

Always validate your schema:
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)
3. Check Google Search Console for structured data errors
