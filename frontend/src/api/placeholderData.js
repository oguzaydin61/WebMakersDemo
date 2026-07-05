// 1. Markalar (Dropdown 1)
export const mockBrands = [
  { id: 220, name: 'Audi' },
  { id: 221, name: 'BMW' },
  { id: 236, name: 'Mercedes' }
];

// 2. Modeller (Dropdown 2 - Markaya Bağımlı)
export const mockModels = [
  // Audi Modelleri (parentBrandId: 220)
  { id: 10, parentBrandId: 220, name: 'A4' },
  { id: 11, parentBrandId: 220, name: 'Q7' },
  { id: 12, parentBrandId: 220, name: 'e-tron' },
  // BMW Modelleri (parentBrandId: 221)
  { id: 20, parentBrandId: 221, name: '3 Serisi' },
  { id: 21, parentBrandId: 221, name: '5 Serisi' },
  { id: 22, parentBrandId: 221, name: 'iX' },
  // Mercedes Modelleri (parentBrandId: 236)
  { id: 30, parentBrandId: 236, name: 'C Serisi' },
  { id: 31, parentBrandId: 236, name: 'E Serisi' },
  { id: 32, parentBrandId: 236, name: 'EQE' }
];

// 3. Motor Türleri (Dropdown 3)
export const mockEngines = [
  { id: 'diesel', name: 'Dizel' },
  { id: 'gasoline', name: 'Benzin' },
  { id: 'electric', name: 'Elektrik' }
];

// 4. Fiyat Aralıkları (Dropdown 4)
export const mockPriceRanges = [
  { id: 'all', name: 'Tüm Fiyatlar', min: 0, max: 999999 },
  { id: 'under-1000', name: '1000 € Altı', min: 0, max: 999 },
  { id: '1000-1500', name: '1000 € - 1500 €', min: 1000, max: 1500 },
  { id: 'over-1500', name: '1500 € Üstü', min: 1501, max: 999999 }
];

// 5. WP Panelden Eklenmiş Gibi Duran Tüm Araçlar (Büyük Havuz)
export const mockVehicles = [
  {
    id: 1,
    title: 'BMW 320d M Sport',
    brandId: 221,
    modelId: 20,
    engineId: 'diesel',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500'
  },
  {
    id: 2,
    title: 'Mercedes EQE 350',
    brandId: 236,
    modelId: 32,
    engineId: 'electric',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=500'
  },
  {
    id: 3,
    title: 'Audi A4 Avant',
    brandId: 220,
    modelId: 10,
    engineId: 'gasoline',
    price: 950,
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=500'
  },
  {
    id: 4,
    title: 'BMW iX xDrive40',
    brandId: 221,
    modelId: 22,
    engineId: 'electric',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500'
  },
  {
    id: 5,
    title: 'Mercedes C200d',
    brandId: 236,
    modelId: 30,
    engineId: 'diesel',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500'
  }
];

export const menuItems = [
  {
    title: "Fahrzeuge",
    items: [
      "Alle Fahrzeuge",
      "Mercedes Modelle",
      "Junge Sterne",
      "Mein CLA",
    ],
  },
  {
    title: "Service",
    items: [
      "PKW Service",
      "Transporter",
      "LKW Service",
    ],
  },
  {
    title: "Terminvereinbarung",
    items: [
      "Beratungstermin",
      "Werkstatttermin",
    ],
  },
  {
    title: "Fahrzeugankauf",
    items: [],
  },
  {
    title: "Unternehmen",
    items: [
      "Über uns",
      "Karriere",
      "Ausbildung",
    ],
  },
  {
    title: "Team Tomru",
    items: [],
  },
  {
    title: "Kontakt",
    items: [
      "Dorstener Straße",
    ],
  },
];

export const mockFinanceRanges = [
  { id: 1, label: "< 150 Euro", min: 0, max: 150 },
  { id: 2, label: "150 bis 300 Euro", min: 150, max: 300 },
  { id: 3, label: "300 bis 500 Euro", min: 300, max: 500 },
  { id: 4, label: "> 500 Euro", min: 500, max: 1500 },
];

export const mockAppointments = [
  {
    id: 1,
    name: "Service Mercedes-Benz",
    url: "#",
  },
  {
    id: 2,
    name: "Alle anderen Marken",
    url: "#",
  },
];

export const mockInterest = [
  { id: 1, name: "PKW andere Hersteller", url: "#" },
];
