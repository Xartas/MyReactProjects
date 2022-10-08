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
export const billsConstant = {
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
