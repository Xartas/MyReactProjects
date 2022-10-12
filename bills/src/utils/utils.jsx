export const months = [
  {
    id: "01",
    name: "Styczeń",
  },
  {
    id: "02",
    name: "Luty",
  },
  {
    id: "03",
    name: "Marzec",
  },
  {
    id: "04",
    name: "Kwiecień",
  },
  {
    id: "05",
    name: "Maj",
  },
  {
    id: "06",
    name: "Czerwiec",
  },
  {
    id: "07",
    name: "Lipiec",
  },
  {
    id: "08",
    name: "Sierpień",
  },
  {
    id: "09",
    name: "Wrzesień",
  },
  {
    id: "10",
    name: "Październik",
  },
  {
    id: "11",
    name: "Listopad",
  },
  {
    id: "12",
    name: "Grudzień",
  },
];

//------------------------- STAŁE DLA RACHUNKÓW -----------------------------
export const billsConstants = {
  tableHeaders: [
    { name: "Nazwa", key: "name" },
    { name: "Kontrahent", key: "contractor" },
    { name: "Kwota", key: "amount" },
    { name: "Opłacony", key: "isPaid" },
    { name: "Akcje", key: "actions" },
  ],
  addBillActions: [
    {
      label: "Dodaj płatność",
      key: "addItem",
      editModeStatus: false,
    },
    {
      label: "Zapisz",
      key: "saveItem",
      editModeStatus: true,
    },
    {
      label: "Anuluj",
      key: "cancel",
      editModeStatus: true,
    },
  ],
  newBillPlaceholders: {
    name: "Nazwa płatności",
    contractor: "Kontrahent",
    amount: "Kwota",
  },
};

//------------------------- STAŁE DLA KREDYTÓW  -----------------------------
export const creditsConstants = {
  tableHeaders: [
    { name: "Tytuł", key: "title" },
    { name: "Akcje", key: "actions" },
  ],
};

//------------------------- STAŁE DLA RAT -----------------------------
export const installmentsConstants = {
  tableHeaders: [
    { name: "Numer raty", key: "number" },
    { name: "Data wymagalności", key: "paymentDeadline" },
    { name: "Kwota raty", key: "value" },
    { name: "Data ostatniej płatności", key: "payDate" },
    { name: "Kwota opłacona", key: "paidValue" },
    { name: "Pozostało do spłaty", key: "unpaidValue" },
    { name: "W pełni opłacona?", key: "fullyPaid" },
    { name: "Akcje", key: "actions" },
  ],
};

//------------------ STAŁE DLA OKRESÓW ROZLICZENIOWYCH ---------------------
export const periodsConstants = {
  tableHeaders: [
    { name: "ID Okresu", key: "billingPeriod" },
    { name: "Rok", key: "year" },
    { name: "Miesiąc", key: "month" },
    { name: "Nazwa", key: "name" },
    { name: "Akcje", key: "actions" },
  ],
};

//------------------ STAŁE DLA SZABLONÓW ---------------------
export const templatesConstants = {
  tableHeaders: [
    { name: "Nazwa", key: "name" },
    { name: "Kontrahent", key: "contractor" },
    { name: "Kwota", key: "amount" },
    { name: "Akcje", key: "actions" },
  ],
  actions: [
    {
      label: "Dodaj szablon",
      key: "addItem",
      editModeStatus: false,
    },
    {
      label: "Zapisz",
      key: "saveItem",
      editModeStatus: true,
    },
    {
      label: "Anuluj",
      key: "cancel",
      editModeStatus: true,
    },
  ],
  newTemplatePlaceholders: {
    name: "Nazwa szablonu",
    contractor: "Kontrahent",
    amount: "Kwota",
  },
};
