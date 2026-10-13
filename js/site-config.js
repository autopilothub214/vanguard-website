// =====================================================
// SITE SETTINGS: THE ONE FILE YOU EDIT FOR BUSINESS INFO
// Change a value here and it updates everywhere on the site.
// Keep the quotes " " around each value.
// =====================================================

const SITE = {
  name: "Vanguard Logistics Solutions",  // Business name
  tagline: "Sell to pool pros without opening a warehouse.",
  phone: "(305) 989-8042",               // Shown on the site
  phoneLink: "+13059898042",             // Digits only, used for tap-to-call
  email: "",                             // TODO: add the real email. Leave "" to hide it.
  address: "11201 49th St N, Unit B1, Clearwater, FL 33762",
  hours: "Mon-Sat, 7:00 AM - 4:00 PM",   // Shown on the site (English)
  hoursEs: "Lun-Sáb, 7:00 AM - 4:00 PM", // Shown on the site (Spanish)

  // Show the "DRAFT MOCKUP" ribbon at the top? Set to false before launch.
  mockup: true,

  // Menu links. Each one scrolls to a section of the page.
  // label = English, es = Spanish
  nav: [
    { label: "Manufacturers", es: "Fabricantes", href: "#manufacturers" },
    { label: "What We Do",    es: "Qué hacemos", href: "#services" },
    { label: "Markets",       es: "Mercados",    href: "#markets" },
    { label: "Territory",     es: "Territorio",  href: "#territory" },
    { label: "Brands",        es: "Marcas",      href: "#brands" },
    { label: "About",         es: "Nosotros",    href: "#about" }
  ],
  navButton: { label: "Contact", es: "Contacto", href: "#contact" },  // The orange button in the menu

  // Social links: leave "" to hide one
  social: {
    facebook: "",
    instagram: ""
  }
};
