/**
 * English dictionary (LTR).
 * All user-facing text lives here so components never hardcode copy.
 * Keys are grouped by feature area. Access them with dot paths, e.g. `t("nav.home")`.
 */
const en = {
  common: {
    appName: "CommerceFlow",
    appTagline: "Electronics commerce & inventory",
    language: "Language",
    english: "English",
    arabic: "العربية",
    designPreview: "Design preview",
    designPreviewNote:
      "Sample interface content for design review only — not connected to the backend.",
    viewDesignSystem: "View design system",
    openAppShell: "Open app shell",
    backHome: "Back to home",
    close: "Close",
  },
  nav: {
    home: "Home",
    designSystem: "Design system",
    appShell: "App shell",
    dashboard: "Dashboard",
    products: "Products",
    categories: "Categories",
    inventory: "Inventory",
    orders: "Orders",
    purchases: "Purchase orders",
    suppliers: "Suppliers",
    customers: "Customers",
    reports: "Reports",
    settings: "Settings",
  },
  home: {
    hero: {
      eyebrow: "Frontend foundation",
      title: "A clean, professional base for electronics commerce",
      subtitle:
        "A modern interface system for selling electronics and managing inventory — built to scale across Arabic and English.",
      primaryCta: "Explore the design system",
      secondaryCta: "Preview the app shell",
    },
    stats: {
      title: "Design system at a glance",
      components: "Reusable components",
      languages: "Languages supported",
      directions: "Layout directions",
      tokens: "Design tokens",
    },
    features: {
      title: "Built for real operations",
      subtitle:
        "The foundation focuses on clarity, consistency, and bilingual readiness.",
      inventoryTitle: "Inventory aware",
      inventoryText:
        "Designed around stock, reservations, and order status so the interface stays truthful to real data.",
      bilingualTitle: "Arabic and English",
      bilingualText:
        "Full RTL and LTR support with a typeface tuned for each language.",
      commerceTitle: "Commerce ready",
      commerceText:
        "Catalog, cart, and checkout patterns prepared for the products that come next.",
      systemTitle: "Consistent system",
      systemText:
        "Shared tokens for color, spacing, and typography keep every screen aligned.",
    },
    showcase: {
      title: "Interface preview",
      subtitle:
        "A quick look at the reusable building blocks included in this foundation.",
    },
  },
  design: {
    title: "Design system",
    subtitle:
      "Reusable components and tokens that every CommerceFlow screen is built from.",
    colors: "Color tokens",
    typography: "Typography",
    buttons: "Buttons",
    badges: "Badges",
    form: "Form controls",
    cards: "Cards",
    table: "Tables",
    dialog: "Dialogs",
    dialogTrigger: "Open dialog",
    dialogTitle: "Confirm action",
    dialogDescription:
      "This is a preview dialog. It traps focus and closes with the Escape key.",
    dialogConfirm: "Confirm",
    dialogCancel: "Cancel",
    sampleTableTitle: "Recent orders",
    sampleFormTitle: "Add a product",
    colorPrimary: "Primary",
    colorSecondary: "Secondary",
    colorMuted: "Muted",
    colorAccent: "Accent",
    colorDestructive: "Destructive",
    colorSuccess: "Success",
    colorWarning: "Warning",
    colorSurface: "Surface",
    colorBorder: "Border",
  },
  form: {
    name: "Product name",
    namePlaceholder: "e.g. Wireless headphones",
    sku: "SKU",
    skuPlaceholder: "e.g. AUD-1001",
    price: "Price",
    pricePlaceholder: "0.00",
    emailHint: "We never share your email.",
    submit: "Save product",
    reset: "Reset",
  },
  buttonsDemo: {
    primary: "Primary",
    secondary: "Secondary",
    outline: "Outline",
    ghost: "Ghost",
    destructive: "Destructive",
    link: "Link",
    sizes: "Sizes",
    small: "Small",
    medium: "Medium",
    large: "Large",
    withIcon: "With icon",
    disabled: "Disabled",
  },
  badgesDemo: {
    default: "Default",
    secondary: "Secondary",
    success: "Success",
    warning: "Warning",
    destructive: "Destructive",
    outline: "Outline",
  },
  appShell: {
    title: "Application shell",
    subtitle:
      "A responsive shell with a header, navigation, and page container — shown with sample content.",
    welcome: "Welcome back",
    welcomeText:
      "This is a layout preview. Cards and figures below are static placeholders, not live data.",
    panelTitle: "Page container",
    panelText:
      "Every feature page reuses this container for consistent spacing and hierarchy.",
    secondaryPanelTitle: "Empty state ready",
    secondaryPanelText:
      "Space is reserved for feature content that arrives in later phases.",
    hint: "Resize the window and switch language to see the layout adapt.",
  },
  table: {
    order: "Order",
    customer: "Customer",
    status: "Status",
    total: "Total",
    date: "Date",
  },
  status: {
    pending: "Pending",
    paid: "Paid",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  },
  footer: {
    note: "Phase 2 — frontend foundation. No live data.",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist.",
    cta: "Return home",
  },
  preferences: {
    theme: "Appearance",
    light: "Light",
  },
};

export default en;
