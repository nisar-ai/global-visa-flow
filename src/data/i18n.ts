export type LanguageCode = "en" | "de" | "ar" | "tr";

export interface Dictionary {
  nav_home: string;
  nav_pr: string;
  nav_how: string;
  nav_guide: string;

  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;

  hero_origin_label: string;
  hero_applying_from_label: string;
  hero_destination_label: string;

  hero_origin_placeholder: string;
  hero_applying_from_placeholder: string;
  hero_destination_placeholder: string;

  hero_form_label: string;
  hero_submit: string;
  hero_disclaimer: string;

  results_heading: string;
  data_pending_title: (destName: string) => string;
  data_pending_body: string;

  purpose_label: string;
  processing_time: string;
  fee_label: string;

  official_visa_portal: string;
  official_ministry: string;
  official_embassy: string;

  checklist_title: string;
  checklist_offer: string;
  checklist_progress: (done: number, total: number) => string;
  checklist_reset: string;

  timeline_title: string;
  timeline_note: string;

  calculator_title: string;
  calculator_visa_fee: string;
  calculator_service_fee: string;
  calculator_insurance: string;
  calculator_misc: string;
  calculator_total: string;
  calculator_note: string;

  guide_link: string;

  pr_eyebrow: string;
  pr_title: string;
  pr_body: string;
  pr_cta: string;

  how_title: string;
  how_step1_title: string;
  how_step1_body: string;
  how_step2_title: string;
  how_step2_body: string;
  how_step3_title: string;
  how_step3_body: string;
  how_step4_title: string;
  how_step4_body: string;

  footer_rights: string;

  // Passport & applying-from labels
  passport_power_label: string;
  applying_from_label: string;
}

const enBase = {
  nav_home: "Home",
  nav_pr: "PR & Citizenship",
  nav_how: "How it works",
  nav_guide: "VisaFlow Guide",

  hero_eyebrow: "VISA REQUIREMENTS, ONE SEARCH AWAY",
  hero_title: "Where do you want to go?",
  hero_subtitle:
    "Pick a destination and choose tourist, study, work, or PR/citizenship to get the exact visa type, timeline, total cost, and required documents — plus a document checklist we'll build for you.",

  hero_origin_label: "Passport country",
  hero_applying_from_label: "Applying from",
  hero_destination_label: "Destination country",

  hero_origin_placeholder: "Select your passport country",
  hero_applying_from_placeholder: "Where are you applying from? (optional)",
  hero_destination_placeholder: "Select destination",

  hero_form_label: "Visa guide search form",
  hero_submit: "Get visa requirements",
  hero_disclaimer:
    "Informational only — always confirm details on the official government site linked in your results before applying.",

  results_heading: "Visa guide results",
  data_pending_title: (destName: string) =>
    `We're still adding official data for ${destName}`,
  data_pending_body:
    "Detailed checklists for this destination aren't ready yet. In the meantime, start with your destination's foreign ministry or embassy website directly, and check the VisaFlow guide for general steps that apply almost everywhere.",

  purpose_label: "Visa purpose",
  processing_time: "Processing time",
  fee_label: "Fee",

  official_visa_portal: "Official visa portal",
  official_ministry: "Ministry / embassy site",
  official_embassy: "Find an embassy",

  checklist_title: "Document checklist",
  checklist_offer:
    "Want to track what you've gathered? Check items off below — we'll remember your progress on this device.",
  checklist_progress: (done: number, total: number) =>
    `${done} of ${total} ready`,
  checklist_reset: "Reset checklist",

  timeline_title: "Visa timeline",
  timeline_note:
    "Estimated only — actual processing time varies by embassy workload and season.",

  calculator_title: "Cost calculator",
  calculator_visa_fee: "Visa fee",
  calculator_service_fee: "Service / agent fee (optional)",
  calculator_insurance: "Travel insurance (optional)",
  calculator_misc: "Photos, courier, misc. (optional)",
  calculator_total: "Estimated total",
  calculator_note:
    "Exchange rates are approximate and for estimation only.",

  guide_link: "Read the full VisaFlow step-by-step guide",

  pr_eyebrow: "SETTLING PERMANENTLY",
  pr_title: "Thinking about PR or citizenship instead?",
  pr_body:
    "If your goal is to become a permanent resident or citizen — not just visit — select a country above and choose \"PR / Citizenship\" as the visa purpose. You'll get residency requirements, a detailed checklist, and the official immigration authority link.",
  pr_cta: "Jump to the search",

  how_title: "How GlobalVisa Flow works",
  how_step1_title: "Pick your destination",
  how_step1_body:
    "Choose the country you're planning to visit, work, study in, or settle in.",
  how_step2_title: "See what's required",
  how_step2_body:
    "Get the visa type, timeline, total cost, and a document checklist.",
  how_step3_title: "Track your checklist",
  how_step3_body:
    "Check off documents as you gather them — saved on this device.",
  how_step4_title: "Apply on the official site",
  how_step4_body:
    "Follow the official ministry and visa portal links to apply safely.",

  footer_rights: "Informational resource, not a government or legal service.",

  passport_power_label: "Passport power",
  applying_from_label: "Applying from",
} as const satisfies Record<keyof Dictionary, any>;

function buildDictionary(
  overrides: Partial<Record<keyof Dictionary, any>>
): Dictionary {
  return {
    ...enBase,
    ...overrides,
  } as Dictionary;
}

export const dictionaries: Record<LanguageCode, Dictionary> = {
  en: enBase as unknown as Dictionary,

  de: buildDictionary({
    nav_home: "Startseite",
    nav_pr: "Aufenthalt & Staatsbürgerschaft",
    nav_how: "So funktioniert's",
    nav_guide: "VisaFlow-Leitfaden",

    hero_eyebrow: "VISA-ANFORDERUNGEN, EINE SUCHE ENTFERNT",
    hero_title: "Wohin möchten Sie reisen?",
    hero_subtitle:
      "Wählen Sie ein Reiseziel und Touristen-, Studien-, Arbeits- oder Daueraufenthaltsvisum, um Visumtyp, Zeitrahmen, Gesamtkosten und erforderliche Dokumente zu erhalten — inklusive Checkliste.",

    hero_origin_label: "Reisepass-Land",
    hero_applying_from_label: "Antrag stellen in",
    hero_destination_label: "Zielland",

    hero_origin_placeholder: "Ihr Reisepass-Land auswählen",
    hero_applying_from_placeholder:
      "Wo stellen Sie den Antrag? (optional)",
    hero_destination_placeholder: "Reiseziel auswählen",

    hero_form_label: "Suchformular für Visaleitfäden",
    hero_submit: "Visa-Anforderungen anzeigen",
    hero_disclaimer:
      "Nur zur Information — bestätigen Sie Details stets auf der verlinkten offiziellen Regierungsseite, bevor Sie sich bewerben.",

    results_heading: "Ergebnisse des Visaleitfadens",
    data_pending_title: (destName: string) =>
      `Offizielle Daten für ${destName} werden noch ergänzt`,
    data_pending_body:
      "Detaillierte Checklisten für dieses Ziel sind noch nicht verfügbar. Beginnen Sie in der Zwischenzeit direkt mit der Website des Außenministeriums oder der Botschaft Ihres Ziellands und nutzen Sie den VisaFlow-Leitfaden für allgemeine Schritte.",

    purpose_label: "Zweck des Visums",
    processing_time: "Bearbeitungszeit",
    fee_label: "Gebühr",

    official_visa_portal: "Offizielles Visa-Portal",
    official_ministry: "Ministerium / Botschaft",
    official_embassy: "Botschaft finden",

    checklist_title: "Dokumenten-Checkliste",
    checklist_offer:
      "Möchten Sie den Überblick behalten? Haken Sie unten ab — Ihr Fortschritt wird auf diesem Gerät gespeichert.",
    checklist_progress: (done, total) => `${done} von ${total} bereit`,
    checklist_reset: "Checkliste zurücksetzen",

    timeline_title: "Visa-Zeitleiste",
    timeline_note:
      "Nur geschätzt — die tatsächliche Bearbeitungszeit variiert je nach Botschaft und Saison.",

    calculator_title: "Kostenrechner",
    calculator_visa_fee: "Visagebühr",
    calculator_service_fee: "Service-/Agenturgebühr (optional)",
    calculator_insurance: "Reiseversicherung (optional)",
    calculator_misc: "Fotos, Kurier, Sonstiges (optional)",
    calculator_total: "Geschätzte Gesamtsumme",
    calculator_note:
      "Wechselkurse sind ungefähr und dienen nur der Schätzung.",

    guide_link: "Vollständige Schritt-für-Schritt-Anleitung lesen",

    pr_eyebrow: "DAUERHAFT NIEDERLASSEN",
    pr_title: "Denken Sie stattdessen an Daueraufenthalt oder Staatsbürgerschaft?",
    pr_body:
      "Wenn Sie sich dauerhaft niederlassen oder einbürgern lassen möchten, wählen Sie oben ein Land und als Zweck \"Aufenthalt / Staatsbürgerschaft\". Sie erhalten Anforderungen, eine Checkliste und den offiziellen Link.",
    pr_cta: "Zur Suche springen",

    how_title: "So funktioniert GlobalVisa Flow",
    how_step1_title: "Reiseziel wählen",
    how_step1_body:
      "Wählen Sie das Land, in das Sie reisen, arbeiten, studieren oder sich niederlassen möchten.",
    how_step2_title: "Anforderungen einsehen",
    how_step2_body:
      "Erhalten Sie Visumtyp, Zeitrahmen, Gesamtkosten und eine Checkliste.",
    how_step3_title: "Checkliste verfolgen",
    how_step3_body:
      "Haken Sie Dokumente ab, sobald Sie sie besorgt haben — gespeichert auf diesem Gerät.",
    how_step4_title: "Offiziell beantragen",
    how_step4_body: "Nutzen Sie die offiziellen Links, um sicher zu beantragen.",

    footer_rights: "Informationsangebot, kein Regierungs- oder Rechtsdienst.",

    passport_power_label: "Reisepass-Stärke",
    applying_from_label: "Antrag stellen in",
  }),

  ar: buildDictionary({
    nav_home: "الرئيسية",
    nav_pr: "الإقامة الدائمة والجنسية",
    nav_how: "كيف يعمل الموقع",
    nav_guide: "دليل فيزا فلو",

    hero_eyebrow: "متطلبات التأشيرة، بحث واحد فقط",
    hero_title: "إلى أين تريد السفر؟",
    hero_subtitle:
      "اختر وجهتك، ثم اختر سياحة أو دراسة أو عمل أو إقامة دائمة لمعرفة نوع التأشيرة والمدة والتكلفة الإجمالية والمستندات المطلوبة — مع قائمة تحقق جاهزة.",

    hero_origin_label: "بلد جواز السفر",
    hero_applying_from_label: "التقديم من",
    hero_destination_label: "دولة الوجهة",

    hero_origin_placeholder: "اختر بلد جواز سفرك",
    hero_applying_from_placeholder: "من أين ستقدّم الطلب؟ (اختياري)",
    hero_destination_placeholder: "اختر الوجهة",

    hero_form_label: "نموذج البحث عن دليل التأشيرة",
    hero_submit: "عرض متطلبات التأشيرة",
    hero_disclaimer:
      "لأغراض المعلومات فقط — يرجى دائمًا التأكد من التفاصيل عبر الموقع الرسمي المرتبط قبل التقديم.",

    results_heading: "نتائج دليل التأشيرة",
    data_pending_title: (destName: string) =>
      `لا نزال نضيف البيانات الرسمية لـ ${destName}`,
    data_pending_body:
      "قوائم التحقق التفصيلية لهذه الوجهة ليست جاهزة بعد. في هذه الأثناء، ابدأ بموقع وزارة الخارجية أو السفارة لوجهتك مباشرة، وتحقق من دليل VisaFlow للخطوات العامة التي تنطبق في معظم الأماكن.",

    purpose_label: "الغرض من التأشيرة",
    processing_time: "مدة المعالجة",
    fee_label: "الرسوم",

    official_visa_portal: "بوابة التأشيرة الرسمية",
    official_ministry: "الوزارة / السفارة",
    official_embassy: "البحث عن سفارة",

    checklist_title: "قائمة تحقق المستندات",
    checklist_offer:
      "هل تريد متابعة ما جمعته؟ ضع علامة أدناه — سنحفظ تقدمك على هذا الجهاز.",
    checklist_progress: (done, total) => `${done} من ${total} جاهز`,
    checklist_reset: "إعادة تعيين القائمة",

    timeline_title: "الجدول الزمني للتأشيرة",
    timeline_note:
      "تقدير فقط — تختلف مدة المعالجة الفعلية حسب السفارة والموسم.",

    calculator_title: "حاسبة التكلفة",
    calculator_visa_fee: "رسوم التأشيرة",
    calculator_service_fee: "رسوم الخدمة / الوكيل (اختياري)",
    calculator_insurance: "تأمين السفر (اختياري)",
    calculator_misc: "صور، شحن، متفرقات (اختياري)",
    calculator_total: "الإجمالي التقديري",
    calculator_note: "أسعار الصرف تقريبية ولأغراض التقدير فقط.",

    guide_link: "قراءة الدليل التفصيلي خطوة بخطوة",

    pr_eyebrow: "الاستقرار الدائم",
    pr_title: "هل تفكر بالإقامة الدائمة أو الجنسية بدلاً من ذلك؟",
    pr_body:
      "إذا كان هدفك هو الإقامة الدائمة أو الحصول على الجنسية، اختر دولة أعلاه ثم اختر \"الإقامة الدائمة / الجنسية\" كغرض التأشيرة. ستحصل على المتطلبات وقائمة تحقق والرابط الرسمي.",
    pr_cta: "الانتقال إلى البحث",

    how_title: "كيف يعمل GlobalVisa Flow",
    how_step1_title: "اختر وجهتك",
    how_step1_body: "اختر الدولة التي تخطط لزيارتها أو العمل أو الدراسة أو الاستقرار فيها.",
    how_step2_title: "اطّلع على المتطلبات",
    how_step2_body: "احصل على نوع التأشيرة والجدول الزمني والتكلفة الإجمالية وقائمة تحقق.",
    how_step3_title: "تابع قائمتك",
    how_step3_body: "ضع علامة على المستندات كلما جمعتها — يُحفظ التقدم على هذا الجهاز.",
    how_step4_title: "قدّم عبر الموقع الرسمي",
    how_step4_body: "اتبع الروابط الرسمية للوزارة وبوابة التأشيرة للتقديم بأمان.",

    footer_rights: "مصدر معلوماتي، وليس خدمة حكومية أو قانونية.",

    passport_power_label: "قوة جواز السفر",
    applying_from_label: "التقديم من",
  }),

  tr: buildDictionary({
    nav_home: "Ana Sayfa",
    nav_pr: "Oturma ve Vatandaşlık",
    nav_how: "Nasıl çalışır",
    nav_guide: "VisaFlow Rehberi",

    hero_eyebrow: "VİZE GEREKLİLİKLERİ, TEK ARAMAYLA",
    hero_title: "Nereye gitmek istiyorsunuz?",
    hero_subtitle:
      "Bir hedef ülke seçin; turist, öğrenci, çalışma veya oturma/vatandaşlık amacını belirleyin ve tam vize türünü, süreyi, toplam maliyeti ve gerekli belgeleri görün — hazır bir kontrol listesiyle birlikte.",

    hero_origin_label: "Pasaport ülkesi",
    hero_applying_from_label: "Başvuru yeri",
    hero_destination_label: "Hedef ülke",

    hero_origin_placeholder: "Pasaport ülkenizi seçin",
    hero_applying_from_placeholder: "Nereden başvuru yapıyorsunuz? (isteğe bağlı)",
    hero_destination_placeholder: "Hedef seçin",

    hero_form_label: "Vize rehberi arama formu",
    hero_submit: "Vize gerekliliklerini gör",
    hero_disclaimer:
      "Yalnızca bilgilendirme amaçlıdır — başvurmadan önce sonuçlarınızdaki resmi hükümet sitesinden doğrulayın.",

    results_heading: "Vize rehberi sonuçları",
    data_pending_title: (destName: string) =>
      `${destName} için resmi veriler hâlâ ekleniyor`,
    data_pending_body:
      "Bu hedef için ayrıntılı kontrol listeleri henüz hazır değil. Bu arada, hedefinizin dışişleri bakanlığı veya büyükelçilik web sitesinden başlayın ve VisaFlow rehberindeki neredeyse her yerde geçerli genel adımlara göz atın.",

    purpose_label: "Vize amacı",
    processing_time: "İşlem süresi",
    fee_label: "Ücret",

    official_visa_portal: "Resmî vize portalı",
    official_ministry: "Bakanlık / büyükelçilik sitesi",
    official_embassy: "Büyükelçilik bul",

    checklist_title: "Belge kontrol listesi",
    checklist_offer:
      "Topladıklarınızı takip etmek ister misiniz? Aşağıdan işaretleyin — ilerlemeniz bu cihazda saklanır.",
    checklist_progress: (done, total) =>
      `${total} belgeden ${done} tanesi hazır`,
    checklist_reset: "Kontrol listesini sıfırla",

    timeline_title: "Vize zaman çizelgesi",
    timeline_note:
      "Yalnızca tahmini — gerçek işlem süresi büyükelçiliğe ve mevsime göre değişir.",

    calculator_title: "Maliyet hesaplayıcı",
    calculator_visa_fee: "Vize ücreti",
    calculator_service_fee: "Hizmet / danışmanlık ücreti (opsiyonel)",
    calculator_insurance: "Seyahat sigortası (opsiyonel)",
    calculator_misc: "Fotoğraf, kargo, diğer (opsiyonel)",
    calculator_total: "Tahmini toplam",
    calculator_note:
      "Döviz kurları yaklaşık değerlerdir, yalnızca tahmin amaçlıdır.",

    guide_link: "Adım adım tam rehberi oku",

    pr_eyebrow: "KALICI YERLEŞİM",
    pr_title: "Bunun yerine oturma izni veya vatandaşlık mı düşünüyorsunuz?",
    pr_body:
      "Amacınız kalıcı oturum veya vatandaşlık almaksa, yukarıdan bir ülke seçip vize amacı olarak \"Oturma / Vatandaşlık\" seçin. Gereklilikleri, ayrıntılı bir kontrol listesini ve resmi bağlantıyı görürsünüz.",
    pr_cta: "Aramaya git",

    how_title: "GlobalVisa Flow nasıl çalışır",
    how_step1_title: "Hedefinizi seçin",
    how_step1_body:
      "Ziyaret etmeyi, çalışmayı, okumayı veya yerleşmeyi planladığınız ülkeyi seçin.",
    how_step2_title: "Gereklilikleri görün",
    how_step2_body:
      "Vize türünü, zaman çizelgesini, toplam maliyeti ve kontrol listesini alın.",
    how_step3_title: "Kontrol listenizi takip edin",
    how_step3_body: "Belgeleri topladıkça işaretleyin — bu cihazda saklanır.",
    how_step4_title: "Resmi siteden başvurun",
    how_step4_body:
      "Güvenle başvurmak için resmi bakanlık ve vize portalı bağlantılarını izleyin.",

    footer_rights:
      "Bilgilendirme kaynağıdır, resmi bir devlet veya hukuki hizmet değildir.",

    passport_power_label: "Pasaport gücü",
    applying_from_label: "Başvuru yeri",
  }),
};

export const languageOptions: { code: LanguageCode; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "tr", label: "Türkçe", dir: "ltr" },
];