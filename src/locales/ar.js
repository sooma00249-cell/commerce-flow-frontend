/**
 * Arabic dictionary (RTL).
 * Mirrors the key structure of `en.js`. Keep both files in sync whenever a key
 * is added or renamed.
 */
const ar = {
  common: {
    appName: "كوميرس فلو",
    appTagline: "تجارة الإلكترونيات وإدارة المخزون",
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    designPreview: "معاينة التصميم",
    designPreviewNote:
      "محتوى واجهة تجريبي لأغراض مراجعة التصميم فقط — غير متصل بالخادم.",
    viewDesignSystem: "عرض نظام التصميم",
    openAppShell: "فتح هيكل التطبيق",
    backHome: "العودة إلى الرئيسية",
    close: "إغلاق",
  },
  nav: {
    home: "الرئيسية",
    designSystem: "نظام التصميم",
    appShell: "هيكل التطبيق",
    dashboard: "لوحة التحكم",
    products: "المنتجات",
    categories: "الفئات",
    inventory: "المخزون",
    orders: "الطلبات",
    purchases: "أوامر الشراء",
    suppliers: "الموردون",
    customers: "العملاء",
    reports: "التقارير",
    settings: "الإعدادات",
  },
  home: {
    hero: {
      eyebrow: "أساس الواجهة الأمامية",
      title: "قاعدة نظيفة واحترافية لتجارة الإلكترونيات",
      subtitle:
        "نظام واجهة عصري لبيع الإلكترونيات وإدارة المخزون — مصمم ليتوسع بالعربية والإنجليزية.",
      primaryCta: "استكشف نظام التصميم",
      secondaryCta: "معاينة هيكل التطبيق",
    },
    stats: {
      title: "نظام التصميم بنظرة سريعة",
      components: "مكونات قابلة لإعادة الاستخدام",
      languages: "اللغات المدعومة",
      directions: "اتجاهات التصميم",
      tokens: "رموز التصميم",
    },
    features: {
      title: "مصمم لعمليات حقيقية",
      subtitle: "يركز الأساس على الوضوح والاتساق والجاهزية للغتين.",
      inventoryTitle: "واعٍ بالمخزون",
      inventoryText:
        "مصمم حول المخزون والحجوزات وحالات الطلبات ليبقى العرض مطابقًا للبيانات الحقيقية.",
      bilingualTitle: "العربية والإنجليزية",
      bilingualText:
        "دعم كامل للاتجاه من اليمين لليسار والعكس مع خط ملائم لكل لغة.",
      commerceTitle: "جاهز للتجارة",
      commerceText:
        "أنماط الكتالوج والسلة والدفع مهيأة للمنتجات القادمة.",
      systemTitle: "نظام متسق",
      systemText:
        "رموز مشتركة للألوان والمسافات والخطوط تحفظ تناسق كل الشاشات.",
    },
    showcase: {
      title: "معاينة الواجهة",
      subtitle: "لمحة سريعة على المكونات القابلة لإعادة الاستخدام في هذا الأساس.",
    },
  },
  design: {
    title: "نظام التصميم",
    subtitle: "مكونات ورموز قابلة لإعادة الاستخدام تُبنى منها كل شاشات كوميرس فلو.",
    colors: "رموز الألوان",
    typography: "الخطوط",
    buttons: "الأزرار",
    badges: "الشارات",
    form: "عناصر النماذج",
    cards: "البطاقات",
    table: "الجداول",
    dialog: "النوافذ المنبثقة",
    dialogTrigger: "فتح النافذة",
    dialogTitle: "تأكيد الإجراء",
    dialogDescription:
      "هذه نافذة معاينة. تحبس التركيز وتُغلق بمفتاح Escape.",
    dialogConfirm: "تأكيد",
    dialogCancel: "إلغاء",
    sampleTableTitle: "أحدث الطلبات",
    sampleFormTitle: "إضافة منتج",
    colorPrimary: "الأساسي",
    colorSecondary: "الثانوي",
    colorMuted: "الهادئ",
    colorAccent: "التمييز",
    colorDestructive: "الخطر",
    colorSuccess: "النجاح",
    colorWarning: "التحذير",
    colorSurface: "السطح",
    colorBorder: "الحدود",
  },
  form: {
    name: "اسم المنتج",
    namePlaceholder: "مثال: سماعات لاسلكية",
    sku: "رمز المنتج",
    skuPlaceholder: "مثال: AUD-1001",
    price: "السعر",
    pricePlaceholder: "0.00",
    emailHint: "نحن لا نشارك بريدك الإلكتروني أبدًا.",
    submit: "حفظ المنتج",
    reset: "إعادة تعيين",
  },
  buttonsDemo: {
    primary: "أساسي",
    secondary: "ثانوي",
    outline: "محدد",
    ghost: "شفاف",
    destructive: "خطر",
    link: "رابط",
    sizes: "الأحجام",
    small: "صغير",
    medium: "متوسط",
    large: "كبير",
    withIcon: "مع أيقونة",
    disabled: "معطّل",
  },
  badgesDemo: {
    default: "افتراضي",
    secondary: "ثانوي",
    success: "نجاح",
    warning: "تحذير",
    destructive: "خطر",
    outline: "محدد",
  },
  appShell: {
    title: "هيكل التطبيق",
    subtitle:
      "هيكل متجاوب مع ترويسة وتنقل وحاوية صفحة — معروض بمحتوى تجريبي.",
    welcome: "مرحبًا بعودتك",
    welcomeText:
      "هذه معاينة تخطيط. البطاقات والأرقام أدناه عناصر ثابتة وليست بيانات حقيقية.",
    panelTitle: "حاوية الصفحة",
    panelText:
      "كل صفحة ميزة تعيد استخدام هذه الحاوية لمسافات وتدرج متسقين.",
    secondaryPanelTitle: "حالة فارغة جاهزة",
    secondaryPanelText:
      "المساحة محجوزة لمحتوى الميزات في المراحل القادمة.",
    hint: "غيّر حجم النافذة وبدّل اللغة لرؤية تكيّف التخطيط.",
  },
  table: {
    order: "الطلب",
    customer: "العميل",
    status: "الحالة",
    total: "الإجمالي",
    date: "التاريخ",
  },
  status: {
    pending: "قيد الانتظار",
    paid: "مدفوع",
    shipped: "تم الشحن",
    delivered: "تم التوصيل",
    cancelled: "ملغى",
  },
  footer: {
    note: "المرحلة الثانية — أساس الواجهة الأمامية. لا توجد بيانات حقيقية.",
    rights: "جميع الحقوق محفوظة.",
  },
  notFound: {
    title: "الصفحة غير موجودة",
    text: "الصفحة التي تبحث عنها غير موجودة.",
    cta: "العودة إلى الرئيسية",
  },
  preferences: {
    theme: "المظهر",
    light: "فاتح",
  },
};

export default ar;
