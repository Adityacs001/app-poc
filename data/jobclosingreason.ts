import { OptionsDTO } from "../lib/commontypes";

const jobclosingreason: Array<OptionsDTO> = [
  {
    id: 1,
    value: 1,
    label: "Succesfully fulfilled",
    titleae: "تم التوظيف بنجاح إلكترونيا",
    titleen: "Succesfully fulfilled",
  },
  {
    id: 2,
    value: 2,
    label: "Closed by employer",
    titleae: "تم إغلاقها من جهة العمل",
    titleen: "Closed by employer",
  },
  {
    id: 3,
    value: 3,
    label: "Posted by Mistake",
    titleae: "أرسلت عن طريق الخطأ",
    titleen: "Posted by Mistake",
  },
  {
    id: 5,
    value: 5,
    label: "Vacancy Expired",
    titleae: "انقضت فترة الإعلان عن الشاغر",
    titleen: "Vacancy Expired",
  },
  {
    id: 6,
    value: 6,
    label: "No Matched Job Seekers",
    titleae: "عدم وجود مطابقين من باحثين عن عمل",
    titleen: "No Matched Job Seekers",
  },
  {
    id: 7,
    value: 7,
    label: "Moved to Subsidiary",
    titleae: "تم إرسالها للشركات التابعة لجهة العمل",
    titleen: "Moved to Subsidiary",
  },
  {
    id: 8,
    value: 8,
    label: "Vacancy Report Generated",
    titleae: "طباعة كشف الشاغر",
    titleen: "Vacancy Report Generated",
  },
];

export default jobclosingreason;
