import { OptionsDependentDTO, OptionsDTO } from "../lib/commontypes";

const jobeducations: Array<OptionsDTO> = [
  {
    id: 1,
    value: 1,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationInsurance Management",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةإدارة التأمين",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationInsurance Management",
  },
  {
    id: 2,
    value: 2,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationCost Accounting",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةمحاسبة التكاليف",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationCost Accounting",
  },
  {
    id: 3,
    value: 3,
    label:
      "MasterCommerce, Business Administration and Public AdministrationBook Keeping",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةمسك الدفاتر",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationBook Keeping",
  },
  {
    id: 4,
    value: 4,
    label:
      "MasterCommerce, Business Administration and Public AdministrationTax Accounting",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةمحاسبة الضرائب",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationTax Accounting",
  },
  {
    id: 5,
    value: 5,
    label:
      "MasterCommerce, Business Administration and Public AdministrationFinancing",
    titleae: "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالتمويل",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationFinancing",
  },
  {
    id: 6,
    value: 6,
    label:
      "MasterCommerce, Business Administration and Public AdministrationCommerce",
    titleae: "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةتجارة",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationCommerce",
  },
  {
    id: 7,
    value: 7,
    label:
      "MasterCommerce, Business Administration and Public AdministrationInsurance Management",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةإدارة التأمين",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationInsurance Management",
  },
  {
    id: 8,
    value: 8,
    label:
      "MasterCommerce, Business Administration and Public AdministrationAccounting",
    titleae: "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالمحاسبة",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationAccounting",
  },
  {
    id: 9,
    value: 9,
    label:
      "MasterCommerce, Business Administration and Public AdministrationAuditing",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةتدقيق الحسابات.",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationAuditing",
  },
  {
    id: 10,
    value: 10,
    label:
      "MasterCommerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالدراسات المصرفية والمالية الإسلامية",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
  },
  {
    id: 11,
    value: 11,
    label: "MasterPhysical SciencesComputer Science",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةعلوم الحاسوب",
    titleen: "MasterPhysical SciencesComputer Science",
  },
  {
    id: 12,
    value: 12,
    label: "MasterPhysical SciencesMathematics and Computer",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةرياضيات وحاسوب",
    titleen: "MasterPhysical SciencesMathematics and Computer",
  },
  {
    id: 13,
    value: 13,
    label: "MasterPhysical SciencesApplied Statistics",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةإحصاء تطبيقي.",
    titleen: "MasterPhysical SciencesApplied Statistics",
  },
  {
    id: 14,
    value: 14,
    label: "MasterPhysical SciencesOperating Systems",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةنظم التشغيل",
    titleen: "MasterPhysical SciencesOperating Systems",
  },
  {
    id: 15,
    value: 15,
    label: "MasterPhysical SciencesOperations Mathematical Research",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةبحوث العمليات الرياضية",
    titleen: "MasterPhysical SciencesOperations Mathematical Research",
  },
  {
    id: 16,
    value: 16,
    label: "MasterPhysical SciencesManagement  Information Systems (MIS)",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةنظم المعلومات الإدارية",
    titleen: "MasterPhysical SciencesManagement  Information Systems (MIS)",
  },
  {
    id: 17,
    value: 17,
    label: "MasterPhysical SciencesComputerized Information Systems",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةأنظمة المعلومات الحاسوبية",
    titleen: "MasterPhysical SciencesComputerized Information Systems",
  },
  {
    id: 18,
    value: 18,
    label: "MasterPhysical SciencesSurvey Samples",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةالعينات المسحية",
    titleen: "MasterPhysical SciencesSurvey Samples",
  },
  {
    id: 19,
    value: 19,
    label: "MasterPhysical SciencesComputer Programming",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةبرمجة الحاسوب",
    titleen: "MasterPhysical SciencesComputer Programming",
  },
  {
    id: 20,
    value: 20,
    label: "MasterPhysical SciencesMathematics and Statistics",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةالرياضيات والإحصاء",
    titleen: "MasterPhysical SciencesMathematics and Statistics",
  },
  {
    id: 21,
    value: 21,
    label: "MasterPhysical SciencesActuarial Science",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةالعلم الإكتواري",
    titleen: "MasterPhysical SciencesActuarial Science",
  },
  {
    id: 22,
    value: 22,
    label: "MasterPhysical SciencesBusiness Information Systems",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةأنظمة معلومات الأعمال",
    titleen: "MasterPhysical SciencesBusiness Information Systems",
  },
  {
    id: 23,
    value: 23,
    label: "MasterPhysical SciencesApplied Computer Science",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةعلم الحاسوب وتطبيقاته",
    titleen: "MasterPhysical SciencesApplied Computer Science",
  },
  {
    id: 24,
    value: 24,
    label: "MasterPhysical SciencesProbabilities Theory",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةنظرية الاحتمالات",
    titleen: "MasterPhysical SciencesProbabilities Theory",
  },
  {
    id: 25,
    value: 25,
    label: "MasterPhysical SciencesComputer System Design",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةتصميم نظم الحاسوب",
    titleen: "MasterPhysical SciencesComputer System Design",
  },
  {
    id: 26,
    value: 26,
    label: "MasterPhysical SciencesSoftware Engineering",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةهندسة البرمجيات",
    titleen: "MasterPhysical SciencesSoftware Engineering",
  },
  {
    id: 27,
    value: 27,
    label: "MasterPhysical SciencesStatistical Surveys Design",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةتصميم المسوح الإحصائية",
    titleen: "MasterPhysical SciencesStatistical Surveys Design",
  },
  {
    id: 28,
    value: 28,
    label: "MasterPhysical SciencesInformation Technology (IT)",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةتكنولوجيا المعلومات",
    titleen: "MasterPhysical SciencesInformation Technology (IT)",
  },
  {
    id: 29,
    value: 29,
    label: "MasterPhysical SciencesProgramming Languages",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةلغات البرمجة",
    titleen: "MasterPhysical SciencesProgramming Languages",
  },
  {
    id: 30,
    value: 30,
    label: "Applied Bachelor(Vocational)Physical SciencesSurvey Samples",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةالعينات المسحية",
    titleen: "Applied Bachelor(Vocational)Physical SciencesSurvey Samples",
  },
  {
    id: 31,
    value: 31,
    label: "Applied Bachelor(Vocational)Physical SciencesComputer Programming",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةبرمجة الحاسوب",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesComputer Programming",
  },
  {
    id: 32,
    value: 32,
    label:
      "Applied Bachelor(Vocational)Physical SciencesMathematics and Statistics",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةالرياضيات والإحصاء",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesMathematics and Statistics",
  },
  {
    id: 33,
    value: 33,
    label: "Applied Bachelor(Vocational)Physical SciencesActuarial Science",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةالعلم الإكتواري",
    titleen: "Applied Bachelor(Vocational)Physical SciencesActuarial Science",
  },
  {
    id: 34,
    value: 34,
    label:
      "Applied Bachelor(Vocational)Physical SciencesBusiness Information Systems",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةأنظمة معلومات الأعمال",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesBusiness Information Systems",
  },
  {
    id: 35,
    value: 35,
    label:
      "Applied Bachelor(Vocational)Physical SciencesApplied Computer Science",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةعلم الحاسوب وتطبيقاته",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesApplied Computer Science",
  },
  {
    id: 36,
    value: 36,
    label: "Applied Bachelor(Vocational)Physical SciencesProbabilities Theory",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةنظرية الاحتمالات",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesProbabilities Theory",
  },
  {
    id: 37,
    value: 37,
    label:
      "Applied Bachelor(Vocational)Physical SciencesComputer System Design",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةتصميم نظم الحاسوب",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesComputer System Design",
  },
  {
    id: 38,
    value: 38,
    label: "Applied Bachelor(Vocational)Physical SciencesSoftware Engineering",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةهندسة البرمجيات",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesSoftware Engineering",
  },
  {
    id: 39,
    value: 39,
    label: "MasterVeterinaryDental Hygiene",
    titleae: "الماجستير التطبيقيالبيطرةصحة الفم والأسنان",
    titleen: "MasterVeterinaryDental Hygiene",
  },
  {
    id: 40,
    value: 40,
    label: "MasterVeterinaryDental Laboratories",
    titleae: "الماجستير التطبيقيالبيطرةمختبرات الأسنان",
    titleen: "MasterVeterinaryDental Laboratories",
  },
  {
    id: 41,
    value: 41,
    label: "MasterVeterinaryManufacture of Artificial Limbs",
    titleae: "الماجستير التطبيقيالبيطرةتصنيع أطراف اصطناعية",
    titleen: "MasterVeterinaryManufacture of Artificial Limbs",
  },
  {
    id: 42,
    value: 42,
    label:
      "MasterVeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
    titleae: "الماجستير التطبيقيالبيطرةتصنيع مساعدات طبية / تأهيل",
    titleen:
      "MasterVeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
  },
  {
    id: 43,
    value: 43,
    label: "MasterVeterinaryMaternity and Childhood",
    titleae: "الماجستير التطبيقيالبيطرةأمومة والطفولة",
    titleen: "MasterVeterinaryMaternity and Childhood",
  },
  {
    id: 44,
    value: 44,
    label: "MasterVeterinaryDental Manufacturing Technology",
    titleae: "الماجستير التطبيقيالبيطرةتكنولوجيا صناعة الأسنان",
    titleen: "MasterVeterinaryDental Manufacturing Technology",
  },
  {
    id: 45,
    value: 45,
    label: "MasterVeterinarySpeech and Hearing Technology",
    titleae: "الماجستير التطبيقيالبيطرةتقنيات السمع والنطق",
    titleen: "MasterVeterinarySpeech and Hearing Technology",
  },
  {
    id: 46,
    value: 46,
    label: "MasterVeterinaryNuclear Therapy",
    titleae: "الماجستير التطبيقيالبيطرةالمعالجة بالأشعة النووية",
    titleen: "MasterVeterinaryNuclear Therapy",
  },
  {
    id: 47,
    value: 47,
    label: "MasterVeterinaryAuxiliary Pharmacy",
    titleae: "الماجستير التطبيقيالبيطرةالصيدلة المساعدة",
    titleen: "MasterVeterinaryAuxiliary Pharmacy",
  },
  {
    id: 48,
    value: 48,
    label: "MasterVeterinaryNursing/ Surgery",
    titleae: "الماجستير التطبيقيالبيطرةتمريض / جراحة.",
    titleen: "MasterVeterinaryNursing/ Surgery",
  },
  {
    id: 49,
    value: 49,
    label: "MasterVeterinaryAuxiliary Dentistry Sciences",
    titleae: "الماجستير التطبيقيالبيطرةعلوم طب الأسنان المساندة",
    titleen: "MasterVeterinaryAuxiliary Dentistry Sciences",
  },
  {
    id: 50,
    value: 50,
    label: "MasterVeterinaryX-ray Technology",
    titleae: "الماجستير التطبيقيالبيطرةالتصوير الطبي",
    titleen: "MasterVeterinaryX-ray Technology",
  },
  {
    id: 51,
    value: 51,
    label: "MasterVeterinaryPhysiotherapy",
    titleae: "الماجستير التطبيقيالبيطرةالمعالجة الفيزيائية",
    titleen: "MasterVeterinaryPhysiotherapy",
  },
  {
    id: 52,
    value: 52,
    label: "MasterVeterinaryEducation and Child Care",
    titleae: "الماجستير التطبيقيالبيطرةتربية ورعاية الطفل",
    titleen: "MasterVeterinaryEducation and Child Care",
  },
  {
    id: 53,
    value: 53,
    label: "MasterVeterinaryCare of Disabled",
    titleae: "الماجستير التطبيقيالبيطرةاية ذوي الاحتياجات الخاصة",
    titleen: "MasterVeterinaryCare of Disabled",
  },
  {
    id: 54,
    value: 54,
    label: "MasterVeterinaryIntensive Care",
    titleae: "الماجستير التطبيقيالبيطرةعناية الحثيثة",
    titleen: "MasterVeterinaryIntensive Care",
  },
  {
    id: 55,
    value: 55,
    label: "MasterVeterinaryLaboratory Analysis",
    titleae: "الماجستير التطبيقيالبيطرةالتحاليل المخبرية",
    titleen: "MasterVeterinaryLaboratory Analysis",
  },
  {
    id: 56,
    value: 56,
    label:
      "Applied Bachelor(Vocational)Physical SciencesMathematical Statistics",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةإحصاء رياضي.",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesMathematical Statistics",
  },
  {
    id: 57,
    value: 57,
    label:
      "Applied Bachelor(Vocational)Physical SciencesComputer Networks Management",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةإدارة شبكات الحاسوب",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesComputer Networks Management",
  },
  {
    id: 58,
    value: 58,
    label: "Applied Bachelor(Vocational)Physical SciencesEducational Computer",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةالحاسوب التعليمي",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesEducational Computer",
  },
  {
    id: 59,
    value: 59,
    label: "MasterPhysical SciencesMathematical Statistics",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةإحصاء رياضي.",
    titleen: "MasterPhysical SciencesMathematical Statistics",
  },
  {
    id: 60,
    value: 60,
    label: "MasterPhysical SciencesComputer Networks Management",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةإدارة شبكات الحاسوب",
    titleen: "MasterPhysical SciencesComputer Networks Management",
  },
  {
    id: 61,
    value: 61,
    label: "MasterPhysical SciencesEducational Computer",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةالحاسوب التعليمي",
    titleen: "MasterPhysical SciencesEducational Computer",
  },
  {
    id: 62,
    value: 62,
    label: "MasterPhysical SciencesComputer Systems Analysis",
    titleae: "الماجستير التطبيقيالعلوم الفيزيائيةتحليل نظم الحاسوب",
    titleen: "MasterPhysical SciencesComputer Systems Analysis",
  },
  {
    id: 63,
    value: 63,
    label: "Applied Bachelor(Vocational)Physical SciencesApplied Statistics",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةإحصاء تطبيقي.",
    titleen: "Applied Bachelor(Vocational)Physical SciencesApplied Statistics",
  },
  {
    id: 64,
    value: 64,
    label: "Applied Bachelor(Vocational)Physical SciencesOperating Systems",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةنظم التشغيل",
    titleen: "Applied Bachelor(Vocational)Physical SciencesOperating Systems",
  },
  {
    id: 65,
    value: 65,
    label:
      "Applied Bachelor(Vocational)Physical SciencesStatistical Surveys Design",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةتصميم المسوح الإحصائية",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesStatistical Surveys Design",
  },
  {
    id: 66,
    value: 66,
    label:
      "Applied Bachelor(Vocational)Physical SciencesInformation Technology (IT)",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةتكنولوجيا المعلومات",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesInformation Technology (IT)",
  },
  {
    id: 67,
    value: 67,
    label: "Applied Bachelor(Vocational)Physical SciencesProgramming Languages",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالعلوم الفيزيائيةلغات البرمجة",
    titleen:
      "Applied Bachelor(Vocational)Physical SciencesProgramming Languages",
  },
  {
    id: 68,
    value: 68,
    label: "Higher DiplomaPhysical SciencesComputer Science",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةعلوم الحاسوب",
    titleen: "Higher DiplomaPhysical SciencesComputer Science",
  },
  {
    id: 69,
    value: 69,
    label: "MasterVeterinaryMedical Analysis",
    titleae: "الماجستير التطبيقيالبيطرةالتحاليل الطبية",
    titleen: "MasterVeterinaryMedical Analysis",
  },
  {
    id: 70,
    value: 70,
    label: "MasterVeterinaryChild education",
    titleae: "الماجستير التطبيقيالبيطرة",
    titleen: "MasterVeterinaryChild education",
  },
  {
    id: 71,
    value: 71,
    label: "MasterVeterinaryDental Manufacturing",
    titleae: "الماجستير التطبيقيالبيطرةصناعة الأسنان",
    titleen: "MasterVeterinaryDental Manufacturing",
  },
  {
    id: 72,
    value: 72,
    label: "MasterVeterinaryAssistant Dentists",
    titleae: "الماجستير التطبيقيالبيطرةمساعدو طب الأسنان",
    titleen: "MasterVeterinaryAssistant Dentists",
  },
  {
    id: 73,
    value: 73,
    label: "MasterVeterinaryNutrition and Dietetics",
    titleae: "الماجستير التطبيقيالبيطرةالتغذية والحمية الغذائية",
    titleen: "MasterVeterinaryNutrition and Dietetics",
  },
  {
    id: 74,
    value: 74,
    label: "MasterVeterinaryDietician Programs",
    titleae: "الماجستير التطبيقيالبيطرةالتغذية السريرية والحميات",
    titleen: "MasterVeterinaryDietician Programs",
  },
  {
    id: 75,
    value: 75,
    label: "MasterVeterinarySplint (Broken Bones)",
    titleae: "الماجستير التطبيقيالبيطرةبير عظام",
    titleen: "MasterVeterinarySplint (Broken Bones)",
  },
  {
    id: 76,
    value: 76,
    label: "MasterVeterinaryAnesthesiology",
    titleae: "الماجستير التطبيقيالبيطرةتخدير والإنعاش",
    titleen: "MasterVeterinaryAnesthesiology",
  },
  {
    id: 77,
    value: 77,
    label: "MasterVeterinaryMedical Laboratories",
    titleae: "الماجستير التطبيقيالبيطرةالمختبرات الطبية",
    titleen: "MasterVeterinaryMedical Laboratories",
  },
  {
    id: 78,
    value: 78,
    label: "MasterVeterinaryEye Sight Test & Optical Lens Making",
    titleae: "الماجستير التطبيقيالبيطرةفحص البصر وتجهيز النظارات الطبية",
    titleen: "MasterVeterinaryEye Sight Test & Optical Lens Making",
  },
  {
    id: 79,
    value: 79,
    label: "MasterVeterinaryPractical Nursing",
    titleae: "الماجستير التطبيقيالبيطرةتمريض العملي",
    titleen: "MasterVeterinaryPractical Nursing",
  },
  {
    id: 80,
    value: 80,
    label: "MasterVeterinaryOrthodontics",
    titleae: "الماجستير التطبيقيالبيطرةطب الأسنان / تقويم",
    titleen: "MasterVeterinaryOrthodontics",
  },
  {
    id: 81,
    value: 81,
    label: "MasterVeterinaryMedical Laboratory Sciences",
    titleae: "الماجستير التطبيقيالبيطرةالعلوم الطبية المخبرية",
    titleen: "MasterVeterinaryMedical Laboratory Sciences",
  },
  {
    id: 82,
    value: 82,
    label: "MasterVeterinaryOptical Technology",
    titleae: "الماجستير التطبيقيالبيطرةتقنيات البصريات",
    titleen: "MasterVeterinaryOptical Technology",
  },
  {
    id: 83,
    value: 83,
    label: "MasterVeterinaryPhysiological Rehabilitation",
    titleae: "الماجستير التطبيقيالبيطرةالتأهيل الوظيفي",
    titleen: "MasterVeterinaryPhysiological Rehabilitation",
  },
  {
    id: 84,
    value: 84,
    label: "MasterVeterinaryPharmacy Doctor",
    titleae: "الماجستير التطبيقيالبيطرةدكتور الصيدلة",
    titleen: "MasterVeterinaryPharmacy Doctor",
  },
  {
    id: 85,
    value: 85,
    label: "Higher DiplomaVeterinaryMaternity and Childhood",
    titleae: "الدبلوم العاليالبيطرةأمومة والطفولة",
    titleen: "Higher DiplomaVeterinaryMaternity and Childhood",
  },
  {
    id: 86,
    value: 86,
    label: "Higher DiplomaVeterinaryDental Manufacturing Technology",
    titleae: "الدبلوم العاليالبيطرةتكنولوجيا صناعة الأسنان",
    titleen: "Higher DiplomaVeterinaryDental Manufacturing Technology",
  },
  {
    id: 87,
    value: 87,
    label: "BachelorEducational SciencesPedagogical Science",
    titleae: "البكالوريوس  العلوم التربويةالعلوم البيداغوجية",
    titleen: "BachelorEducational SciencesPedagogical Science",
  },
  {
    id: 88,
    value: 88,
    label: "BachelorEducational SciencesElementary Education",
    titleae: "البكالوريوس  العلوم التربويةتربية ابتدائية.",
    titleen: "BachelorEducational SciencesElementary Education",
  },
  {
    id: 89,
    value: 89,
    label: "BachelorEducational SciencesArts Education Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم مجال / تربية فنية",
    titleen: "BachelorEducational SciencesArts Education Teacher",
  },
  {
    id: 90,
    value: 90,
    label: "BachelorEducational SciencesHistory of Art",
    titleae: "البكالوريوس  العلوم التربويةتاريخ الفنون",
    titleen: "BachelorEducational SciencesHistory of Art",
  },
  {
    id: 91,
    value: 91,
    label: "BachelorEducational SciencesResearch and Educational Rectification",
    titleae: "البكالوريوس  العلوم التربويةالبحث والتقويم التربوي",
    titleen:
      "BachelorEducational SciencesResearch and Educational Rectification",
  },
  {
    id: 92,
    value: 92,
    label: "BachelorEducational SciencesChild Care",
    titleae: "البكالوريوس  العلوم التربويةتربية الطفل",
    titleen: "BachelorEducational SciencesChild Care",
  },
  {
    id: 93,
    value: 93,
    label: "BachelorEducational SciencesChild Education Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم تربية وتعليم الطفل.",
    titleen: "BachelorEducational SciencesChild Education Teacher",
  },
  {
    id: 94,
    value: 94,
    label: "BachelorEducational SciencesArabic Language Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم مجال / لغة عربية",
    titleen: "BachelorEducational SciencesArabic Language Teacher",
  },
  {
    id: 95,
    value: 95,
    label: "BachelorEducational SciencesFine Art Printing",
    titleae: "البكالوريوس  العلوم التربويةطباعة الأعمال الفنية",
    titleen: "BachelorEducational SciencesFine Art Printing",
  },
  {
    id: 96,
    value: 96,
    label: "BachelorEducational SciencesAdults Education",
    titleae: "البكالوريوس  العلوم التربويةتعليم كبار",
    titleen: "BachelorEducational SciencesAdults Education",
  },
  {
    id: 97,
    value: 97,
    label: "BachelorEducational SciencesReligion Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم مجال / تربية دينية",
    titleen: "BachelorEducational SciencesReligion Teacher",
  },
  {
    id: 98,
    value: 98,
    label: "BachelorEducational SciencesPhilosophy of Art",
    titleae: "البكالوريوس  العلوم التربويةفلسفة الفنون",
    titleen: "BachelorEducational SciencesPhilosophy of Art",
  },
  {
    id: 99,
    value: 99,
    label: "BachelorEducational SciencesSculpture and Engraving",
    titleae: "البكالوريوس  العلوم التربويةالنحت والحفر التشكيلي",
    titleen: "BachelorEducational SciencesSculpture and Engraving",
  },
  {
    id: 100,
    value: 100,
    label: "BachelorEducational SciencesEducation Supervision",
    titleae: "البكالوريوس  العلوم التربويةالإشراف التربوي",
    titleen: "BachelorEducational SciencesEducation Supervision",
  },
  {
    id: 101,
    value: 101,
    label: "BachelorEducational SciencesClass Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم صف",
    titleen: "BachelorEducational SciencesClass Teacher",
  },
  {
    id: 102,
    value: 102,
    label: "BachelorEducational SciencesMathematics and Science Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم مجال / علوم ورياضيات",
    titleen: "BachelorEducational SciencesMathematics and Science Teacher",
  },
  {
    id: 103,
    value: 103,
    label: "Higher DiplomaPhysical SciencesComputer Systems Analysis",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةتحليل نظم الحاسوب",
    titleen: "Higher DiplomaPhysical SciencesComputer Systems Analysis",
  },
  {
    id: 104,
    value: 104,
    label: "Higher DiplomaPhysical SciencesMathematics and Computer",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةرياضيات وحاسوب",
    titleen: "Higher DiplomaPhysical SciencesMathematics and Computer",
  },
  {
    id: 105,
    value: 105,
    label: "Higher DiplomaPhysical SciencesOperations Mathematical Research",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةبحوث العمليات الرياضية",
    titleen: "Higher DiplomaPhysical SciencesOperations Mathematical Research",
  },
  {
    id: 106,
    value: 106,
    label:
      "Higher DiplomaPhysical SciencesManagement  Information Systems (MIS)",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةنظم المعلومات الإدارية",
    titleen:
      "Higher DiplomaPhysical SciencesManagement  Information Systems (MIS)",
  },
  {
    id: 107,
    value: 107,
    label: "Higher DiplomaPhysical SciencesComputerized Information Systems",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةأنظمة المعلومات الحاسوبية",
    titleen: "Higher DiplomaPhysical SciencesComputerized Information Systems",
  },
  {
    id: 108,
    value: 108,
    label: "Higher DiplomaPhysical SciencesSurvey Samples",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةالعينات المسحية",
    titleen: "Higher DiplomaPhysical SciencesSurvey Samples",
  },
  {
    id: 109,
    value: 109,
    label: "Higher DiplomaPhysical SciencesComputer Programming",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةبرمجة الحاسوب",
    titleen: "Higher DiplomaPhysical SciencesComputer Programming",
  },
  {
    id: 110,
    value: 110,
    label: "Higher DiplomaPhysical SciencesMathematics and Statistics",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةالرياضيات والإحصاء",
    titleen: "Higher DiplomaPhysical SciencesMathematics and Statistics",
  },
  {
    id: 111,
    value: 111,
    label: "Higher DiplomaPhysical SciencesActuarial Science",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةالعلم الإكتواري",
    titleen: "Higher DiplomaPhysical SciencesActuarial Science",
  },
  {
    id: 112,
    value: 112,
    label: "Higher DiplomaPhysical SciencesBusiness Information Systems",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةأنظمة معلومات الأعمال",
    titleen: "Higher DiplomaPhysical SciencesBusiness Information Systems",
  },
  {
    id: 113,
    value: 113,
    label: "Higher DiplomaPhysical SciencesApplied Computer Science",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةعلم الحاسوب وتطبيقاته",
    titleen: "Higher DiplomaPhysical SciencesApplied Computer Science",
  },
  {
    id: 114,
    value: 114,
    label: "Higher DiplomaPhysical SciencesProbabilities Theory",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةنظرية الاحتمالات",
    titleen: "Higher DiplomaPhysical SciencesProbabilities Theory",
  },
  {
    id: 115,
    value: 115,
    label: "Higher DiplomaPhysical SciencesComputer System Design",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةتصميم نظم الحاسوب",
    titleen: "Higher DiplomaPhysical SciencesComputer System Design",
  },
  {
    id: 116,
    value: 116,
    label: "Higher DiplomaPhysical SciencesSoftware Engineering",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةهندسة البرمجيات",
    titleen: "Higher DiplomaPhysical SciencesSoftware Engineering",
  },
  {
    id: 117,
    value: 117,
    label:
      "MasterCommerce, Business Administration and Public AdministrationCost Accounting",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةمحاسبة التكاليف",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationCost Accounting",
  },
  {
    id: 118,
    value: 118,
    label:
      "MasterCommerce, Business Administration and Public AdministrationFinancial Markets",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالأسواق المالية",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationFinancial Markets",
  },
  {
    id: 119,
    value: 119,
    label:
      "MasterCommerce, Business Administration and Public AdministrationIslamic Banks",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالمصارف الإسلامية",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationIslamic Banks",
  },
  {
    id: 120,
    value: 120,
    label:
      "MasterCommerce, Business Administration and Public AdministrationFinancial Mediation",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالوساطة المالية",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationFinancial Mediation",
  },
  {
    id: 121,
    value: 121,
    label:
      "MasterCommerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةجمارك وتخليص جمركي",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
  },
  {
    id: 122,
    value: 122,
    label:
      "MasterCommerce, Business Administration and Public AdministrationBusiness and Finance Economics",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةاقتصاد المال والأعمال",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationBusiness and Finance Economics",
  },
  {
    id: 123,
    value: 123,
    label:
      "MasterCommerce, Business Administration and Public AdministrationFinance and Banking",
    titleae:
      "الماجستير التطبيقيالتجارة وإدارة الأعمال والإدارة العامةالعلوم المالية والمصرفية",
    titleen:
      "MasterCommerce, Business Administration and Public AdministrationFinance and Banking",
  },
  {
    id: 124,
    value: 124,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinancing",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالتمويل",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinancing",
  },
  {
    id: 125,
    value: 125,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinancial Mediation",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالوساطة المالية",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinancial Mediation",
  },
  {
    id: 126,
    value: 126,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةجمارك وتخليص جمركي",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
  },
  {
    id: 127,
    value: 127,
    label: "Higher DiplomaVeterinarySpeech and Hearing Technology",
    titleae: "الدبلوم العاليالبيطرةتقنيات السمع والنطق",
    titleen: "Higher DiplomaVeterinarySpeech and Hearing Technology",
  },
  {
    id: 128,
    value: 128,
    label: "Higher DiplomaVeterinaryNuclear Therapy",
    titleae: "الدبلوم العاليالبيطرةالمعالجة بالأشعة النووية",
    titleen: "Higher DiplomaVeterinaryNuclear Therapy",
  },
  {
    id: 129,
    value: 129,
    label: "Higher DiplomaVeterinaryAuxiliary Pharmacy",
    titleae: "الدبلوم العاليالبيطرةالصيدلة المساعدة",
    titleen: "Higher DiplomaVeterinaryAuxiliary Pharmacy",
  },
  {
    id: 130,
    value: 130,
    label: "Higher DiplomaVeterinaryNursing/ Surgery",
    titleae: "الدبلوم العاليالبيطرةتمريض / جراحة.",
    titleen: "Higher DiplomaVeterinaryNursing/ Surgery",
  },
  {
    id: 131,
    value: 131,
    label: "Higher DiplomaVeterinaryAuxiliary Dentistry Sciences",
    titleae: "الدبلوم العاليالبيطرةعلوم طب الأسنان المساندة",
    titleen: "Higher DiplomaVeterinaryAuxiliary Dentistry Sciences",
  },
  {
    id: 132,
    value: 132,
    label: "Higher DiplomaVeterinaryX-ray Technology",
    titleae: "الدبلوم العاليالبيطرةالتصوير الطبي",
    titleen: "Higher DiplomaVeterinaryX-ray Technology",
  },
  {
    id: 133,
    value: 133,
    label: "Higher DiplomaVeterinaryPhysiotherapy",
    titleae: "الدبلوم العاليالبيطرةالمعالجة الفيزيائية",
    titleen: "Higher DiplomaVeterinaryPhysiotherapy",
  },
  {
    id: 134,
    value: 134,
    label: "Higher DiplomaVeterinarySplint (Broken Bones)",
    titleae: "الدبلوم العاليالبيطرةبير عظام",
    titleen: "Higher DiplomaVeterinarySplint (Broken Bones)",
  },
  {
    id: 135,
    value: 135,
    label: "Higher DiplomaVeterinaryAnesthesiology",
    titleae: "الدبلوم العاليالبيطرةتخدير والإنعاش",
    titleen: "Higher DiplomaVeterinaryAnesthesiology",
  },
  {
    id: 136,
    value: 136,
    label: "Higher DiplomaVeterinaryMedical Laboratories",
    titleae: "الدبلوم العاليالبيطرةالمختبرات الطبية",
    titleen: "Higher DiplomaVeterinaryMedical Laboratories",
  },
  {
    id: 137,
    value: 137,
    label: "Higher DiplomaVeterinaryEye Sight Test & Optical Lens Making",
    titleae: "الدبلوم العاليالبيطرةفحص البصر وتجهيز النظارات الطبية",
    titleen: "Higher DiplomaVeterinaryEye Sight Test & Optical Lens Making",
  },
  {
    id: 138,
    value: 138,
    label: "Higher DiplomaVeterinaryMidwifery",
    titleae: "الدبلوم العاليالبيطرةقبالة",
    titleen: "Higher DiplomaVeterinaryMidwifery",
  },
  {
    id: 139,
    value: 139,
    label: "Higher DiplomaVeterinaryDentistry",
    titleae: "الدبلوم العاليالبيطرةطب الأسنان",
    titleen: "Higher DiplomaVeterinaryDentistry",
  },
  {
    id: 140,
    value: 140,
    label: "Higher DiplomaVeterinaryRoentgenology Technology",
    titleae: "الدبلوم العاليالبيطرةتقنيات الأشعة",
    titleen: "Higher DiplomaVeterinaryRoentgenology Technology",
  },
  {
    id: 141,
    value: 141,
    label: "Higher DiplomaVeterinaryAthletic Rehabilitation",
    titleae: "الدبلوم العاليالبيطرةالتأهيل الرياضي",
    titleen: "Higher DiplomaVeterinaryAthletic Rehabilitation",
  },
  {
    id: 142,
    value: 142,
    label: "Higher DiplomaVeterinaryPharmacy",
    titleae: "الدبلوم العاليالبيطرةالصيدلة",
    titleen: "Higher DiplomaVeterinaryPharmacy",
  },
  {
    id: 143,
    value: 143,
    label: "Higher DiplomaVeterinaryDental Manufacturing",
    titleae: "الدبلوم العاليالبيطرةصناعة الأسنان",
    titleen: "Higher DiplomaVeterinaryDental Manufacturing",
  },
  {
    id: 144,
    value: 144,
    label: "Higher DiplomaVeterinaryAssistant Dentists",
    titleae: "الدبلوم العاليالبيطرةمساعدو طب الأسنان",
    titleen: "Higher DiplomaVeterinaryAssistant Dentists",
  },
  {
    id: 145,
    value: 145,
    label: "BachelorEducational SciencesPainting Art",
    titleae: "البكالوريوس  العلوم التربويةالرسم التشكيلي",
    titleen: "BachelorEducational SciencesPainting Art",
  },
  {
    id: 146,
    value: 146,
    label: "BachelorEducational SciencesEducational Guidance ",
    titleae: "البكالوريوس  العلوم التربويةالإرشاد التربوي",
    titleen: "BachelorEducational SciencesEducational Guidance ",
  },
  {
    id: 147,
    value: 147,
    label: "BachelorEducational SciencesSpecial Education",
    titleae: "البكالوريوس  العلوم التربويةالتربية الخاصة",
    titleen: "BachelorEducational SciencesSpecial Education",
  },
  {
    id: 148,
    value: 148,
    label: "BachelorEducational SciencesArts/ General",
    titleae: "البكالوريوس  العلوم التربويةالفنون / عام",
    titleen: "BachelorEducational SciencesArts/ General",
  },
  {
    id: 149,
    value: 149,
    label: "BachelorEducational SciencesArts Theory",
    titleae: "البكالوريوس  العلوم التربويةنظرية الفنون",
    titleen: "BachelorEducational SciencesArts Theory",
  },
  {
    id: 150,
    value: 150,
    label: "MasterEducational SciencesPedagogical Science",
    titleae: "الماجستير التطبيقي العلوم التربويةالعلوم البيداغوجية",
    titleen: "MasterEducational SciencesPedagogical Science",
  },
  {
    id: 151,
    value: 151,
    label: "MasterEducational SciencesElementary Education",
    titleae: "الماجستير التطبيقي العلوم التربويةتربية ابتدائية.",
    titleen: "MasterEducational SciencesElementary Education",
  },
  {
    id: 152,
    value: 152,
    label: "MasterEducational SciencesArts Education Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / تربية فنية",
    titleen: "MasterEducational SciencesArts Education Teacher",
  },
  {
    id: 153,
    value: 153,
    label: "MasterEducational SciencesHistory of Art",
    titleae: "الماجستير التطبيقي العلوم التربويةتاريخ الفنون",
    titleen: "MasterEducational SciencesHistory of Art",
  },
  {
    id: 154,
    value: 154,
    label: "MasterEducational SciencesAdults Education",
    titleae: "الماجستير التطبيقي العلوم التربويةتعليم كبار",
    titleen: "MasterEducational SciencesAdults Education",
  },
  {
    id: 155,
    value: 155,
    label: "MasterEducational SciencesReligion Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / تربية دينية",
    titleen: "MasterEducational SciencesReligion Teacher",
  },
  {
    id: 156,
    value: 156,
    label: "MasterEducational SciencesPhilosophy of Art",
    titleae: "الماجستير التطبيقي العلوم التربويةفلسفة الفنون",
    titleen: "MasterEducational SciencesPhilosophy of Art",
  },
  {
    id: 157,
    value: 157,
    label: "MasterEducational SciencesSculpture and Engraving",
    titleae: "الماجستير التطبيقي العلوم التربويةالنحت والحفر التشكيلي",
    titleen: "MasterEducational SciencesSculpture and Engraving",
  },
  {
    id: 158,
    value: 158,
    label: "MasterEducational SciencesEducational Guidance ",
    titleae: "الماجستير التطبيقي العلوم التربويةالإرشاد التربوي",
    titleen: "MasterEducational SciencesEducational Guidance ",
  },
  {
    id: 159,
    value: 159,
    label: "MasterEducational SciencesSpecial Education",
    titleae: "الماجستير التطبيقي العلوم التربويةالتربية الخاصة",
    titleen: "MasterEducational SciencesSpecial Education",
  },
  {
    id: 160,
    value: 160,
    label: "MasterEducational SciencesArts/ General",
    titleae: "الماجستير التطبيقي العلوم التربويةالفنون / عام",
    titleen: "MasterEducational SciencesArts/ General",
  },
  {
    id: 161,
    value: 161,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationAccounting",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالمحاسبة",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationAccounting",
  },
  {
    id: 162,
    value: 162,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationAuditing",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةتدقيق الحسابات.",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationAuditing",
  },
  {
    id: 163,
    value: 163,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinance and Banking",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالعلوم المالية والمصرفية",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinance and Banking",
  },
  {
    id: 164,
    value: 164,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinancial Markets",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالأسواق المالية",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationFinancial Markets",
  },
  {
    id: 165,
    value: 165,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationIslamic Banks",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالمصارف الإسلامية",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationIslamic Banks",
  },
  {
    id: 166,
    value: 166,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationBusiness and Finance Economics",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةاقتصاد المال والأعمال",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationBusiness and Finance Economics",
  },
  {
    id: 167,
    value: 167,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationBusiness and Finance Economics",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةاقتصاد المال والأعمال",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationBusiness and Finance Economics",
  },
  {
    id: 168,
    value: 168,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinance and Banking",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالعلوم المالية والمصرفية",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinance and Banking",
  },
  {
    id: 169,
    value: 169,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinancing",
    titleae: "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالتمويل",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinancing",
  },
  {
    id: 170,
    value: 170,
    label: "Higher DiplomaPhysical SciencesStatistical Surveys Design",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةتصميم المسوح الإحصائية",
    titleen: "Higher DiplomaPhysical SciencesStatistical Surveys Design",
  },
  {
    id: 171,
    value: 171,
    label: "Higher DiplomaPhysical SciencesInformation Technology (IT)",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةتكنولوجيا المعلومات",
    titleen: "Higher DiplomaPhysical SciencesInformation Technology (IT)",
  },
  {
    id: 172,
    value: 172,
    label: "Higher DiplomaPhysical SciencesProgramming Languages",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةلغات البرمجة",
    titleen: "Higher DiplomaPhysical SciencesProgramming Languages",
  },
  {
    id: 173,
    value: 173,
    label: "Higher DiplomaPhysical SciencesMathematical Statistics",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةإحصاء رياضي.",
    titleen: "Higher DiplomaPhysical SciencesMathematical Statistics",
  },
  {
    id: 174,
    value: 174,
    label: "Higher DiplomaPhysical SciencesComputer Networks Management",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةإدارة شبكات الحاسوب",
    titleen: "Higher DiplomaPhysical SciencesComputer Networks Management",
  },
  {
    id: 175,
    value: 175,
    label: "Higher DiplomaPhysical SciencesEducational Computer",
    titleae: "الدبلوم العاليالعلوم الفيزيائيةالحاسوب التعليمي",
    titleen: "Higher DiplomaPhysical SciencesEducational Computer",
  },
  {
    id: 176,
    value: 176,
    label: "Post Graduate DiplomaPhysical SciencesSurvey Samples",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةالعينات المسحية",
    titleen: "Post Graduate DiplomaPhysical SciencesSurvey Samples",
  },
  {
    id: 177,
    value: 177,
    label: "Post Graduate DiplomaPhysical SciencesComputer Programming",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةبرمجة الحاسوب",
    titleen: "Post Graduate DiplomaPhysical SciencesComputer Programming",
  },
  {
    id: 178,
    value: 178,
    label: "Post Graduate DiplomaPhysical SciencesMathematics and Statistics",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةالرياضيات والإحصاء",
    titleen: "Post Graduate DiplomaPhysical SciencesMathematics and Statistics",
  },
  {
    id: 179,
    value: 179,
    label: "Post Graduate DiplomaPhysical SciencesActuarial Science",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةالعلم الإكتواري",
    titleen: "Post Graduate DiplomaPhysical SciencesActuarial Science",
  },
  {
    id: 180,
    value: 180,
    label: "Post Graduate DiplomaPhysical SciencesBusiness Information Systems",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةأنظمة معلومات الأعمال",
    titleen:
      "Post Graduate DiplomaPhysical SciencesBusiness Information Systems",
  },
  {
    id: 181,
    value: 181,
    label: "Post Graduate DiplomaPhysical SciencesApplied Computer Science",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةعلم الحاسوب وتطبيقاته",
    titleen: "Post Graduate DiplomaPhysical SciencesApplied Computer Science",
  },
  {
    id: 182,
    value: 182,
    label: "Post Graduate DiplomaPhysical SciencesMathematical Statistics",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةإحصاء رياضي.",
    titleen: "Post Graduate DiplomaPhysical SciencesMathematical Statistics",
  },
  {
    id: 183,
    value: 183,
    label: "MasterEducational SciencesArts Theory",
    titleae: "الماجستير التطبيقي العلوم التربويةنظرية الفنون",
    titleen: "MasterEducational SciencesArts Theory",
  },
  {
    id: 184,
    value: 184,
    label: "BachelorEducational SciencesDidactics",
    titleae: "البكالوريوس  العلوم التربويةعلم التعليم (التدريس)",
    titleen: "BachelorEducational SciencesDidactics",
  },
  {
    id: 185,
    value: 185,
    label: "BachelorEducational SciencesEducation Science",
    titleae: "البكالوريوس  العلوم التربويةعلم التربية",
    titleen: "BachelorEducational SciencesEducation Science",
  },
  {
    id: 186,
    value: 186,
    label: "BachelorEducational SciencesNatural Sciences Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم مجال / علوم طبيعية",
    titleen: "BachelorEducational SciencesNatural Sciences Teacher",
  },
  {
    id: 187,
    value: 187,
    label: "BachelorEducational SciencesSocial Science Teacher",
    titleae: "البكالوريوس  العلوم التربويةمعلم مجال / علوم اجتماعية",
    titleen: "BachelorEducational SciencesSocial Science Teacher",
  },
  {
    id: 188,
    value: 188,
    label: "MasterEducational SciencesDidactics",
    titleae: "الماجستير التطبيقي العلوم التربويةعلم التعليم (التدريس)",
    titleen: "MasterEducational SciencesDidactics",
  },
  {
    id: 189,
    value: 189,
    label: "MasterEducational SciencesEducation Science",
    titleae: "الماجستير التطبيقي العلوم التربويةعلم التربية",
    titleen: "MasterEducational SciencesEducation Science",
  },
  {
    id: 190,
    value: 190,
    label: "MasterEducational SciencesNatural Sciences Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / علوم طبيعية",
    titleen: "MasterEducational SciencesNatural Sciences Teacher",
  },
  {
    id: 191,
    value: 191,
    label: "MasterEducational SciencesSocial Science Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / علوم اجتماعية",
    titleen: "MasterEducational SciencesSocial Science Teacher",
  },
  {
    id: 192,
    value: 192,
    label: "MasterEducational SciencesEducation Supervision",
    titleae: "الماجستير التطبيقي العلوم التربويةالإشراف التربوي",
    titleen: "MasterEducational SciencesEducation Supervision",
  },
  {
    id: 193,
    value: 193,
    label: "MasterEducational SciencesClass Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم صف",
    titleen: "MasterEducational SciencesClass Teacher",
  },
  {
    id: 194,
    value: 194,
    label: "MasterEducational SciencesMathematics and Science Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / علوم ورياضيات",
    titleen: "MasterEducational SciencesMathematics and Science Teacher",
  },
  {
    id: 195,
    value: 195,
    label: "MasterEducational SciencesPainting Art",
    titleae: "الماجستير التطبيقي العلوم التربويةالرسم التشكيلي",
    titleen: "MasterEducational SciencesPainting Art",
  },
  {
    id: 196,
    value: 196,
    label: "MasterEducational SciencesMethods",
    titleae: "الماجستير التطبيقي العلوم التربويةالمناهج",
    titleen: "MasterEducational SciencesMethods",
  },
  {
    id: 197,
    value: 197,
    label: "MasterEducational SciencesEducation Technology",
    titleae: "الماجستير التطبيقي العلوم التربويةتكنولوجيا التعليم",
    titleen: "MasterEducational SciencesEducation Technology",
  },
  {
    id: 198,
    value: 198,
    label: "MasterEducational SciencesClass Teacher and Educational Computer",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم صف وحاسوب تعليمي",
    titleen: "MasterEducational SciencesClass Teacher and Educational Computer",
  },
  {
    id: 199,
    value: 199,
    label: "Higher DiplomaVeterinaryNutrition and Dietetics",
    titleae: "الدبلوم العاليالبيطرةالتغذية والحمية الغذائية",
    titleen: "Higher DiplomaVeterinaryNutrition and Dietetics",
  },
  {
    id: 200,
    value: 200,
    label: "Higher DiplomaVeterinaryDietician Programs",
    titleae: "الدبلوم العاليالبيطرةالتغذية السريرية والحميات",
    titleen: "Higher DiplomaVeterinaryDietician Programs",
  },
  {
    id: 201,
    value: 201,
    label: "Higher DiplomaVeterinaryCare of Disabled",
    titleae: "الدبلوم العاليالبيطرةاية ذوي الاحتياجات الخاصة",
    titleen: "Higher DiplomaVeterinaryCare of Disabled",
  },
  {
    id: 202,
    value: 202,
    label: "Higher DiplomaVeterinaryIntensive Care",
    titleae: "الدبلوم العاليالبيطرةعناية الحثيثة",
    titleen: "Higher DiplomaVeterinaryIntensive Care",
  },
  {
    id: 203,
    value: 203,
    label: "Higher DiplomaVeterinaryLaboratory Analysis",
    titleae: "الدبلوم العاليالبيطرةالتحاليل المخبرية",
    titleen: "Higher DiplomaVeterinaryLaboratory Analysis",
  },
  {
    id: 204,
    value: 204,
    label: "Higher DiplomaVeterinaryMedical Analysis",
    titleae: "الدبلوم العاليالبيطرةالتحاليل الطبية",
    titleen: "Higher DiplomaVeterinaryMedical Analysis",
  },
  {
    id: 205,
    value: 205,
    label: "Higher DiplomaVeterinaryChild education",
    titleae: "الدبلوم العاليالبيطرة",
    titleen: "Higher DiplomaVeterinaryChild education",
  },
  {
    id: 206,
    value: 206,
    label: "Higher DiplomaVeterinaryDental Hygiene",
    titleae: "الدبلوم العاليالبيطرةصحة الفم والأسنان",
    titleen: "Higher DiplomaVeterinaryDental Hygiene",
  },
  {
    id: 207,
    value: 207,
    label: "Higher DiplomaVeterinaryDental Laboratories",
    titleae: "الدبلوم العاليالبيطرةمختبرات الأسنان",
    titleen: "Higher DiplomaVeterinaryDental Laboratories",
  },
  {
    id: 208,
    value: 208,
    label: "Higher DiplomaVeterinaryManufacture of Artificial Limbs",
    titleae: "الدبلوم العاليالبيطرةتصنيع أطراف اصطناعية",
    titleen: "Higher DiplomaVeterinaryManufacture of Artificial Limbs",
  },
  {
    id: 209,
    value: 209,
    label:
      "Higher DiplomaVeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
    titleae: "الدبلوم العاليالبيطرةتصنيع مساعدات طبية / تأهيل",
    titleen:
      "Higher DiplomaVeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
  },
  {
    id: 210,
    value: 210,
    label: "Higher DiplomaVeterinaryPractical Nursing",
    titleae: "الدبلوم العاليالبيطرةتمريض العملي",
    titleen: "Higher DiplomaVeterinaryPractical Nursing",
  },
  {
    id: 211,
    value: 211,
    label: "Higher DiplomaVeterinaryOrthodontics",
    titleae: "الدبلوم العاليالبيطرةطب الأسنان / تقويم",
    titleen: "Higher DiplomaVeterinaryOrthodontics",
  },
  {
    id: 212,
    value: 212,
    label: "Higher DiplomaVeterinaryMedical Laboratory Sciences",
    titleae: "الدبلوم العاليالبيطرةالعلوم الطبية المخبرية",
    titleen: "Higher DiplomaVeterinaryMedical Laboratory Sciences",
  },
  {
    id: 213,
    value: 213,
    label: "Higher DiplomaVeterinaryOptical Technology",
    titleae: "الدبلوم العاليالبيطرةتقنيات البصريات",
    titleen: "Higher DiplomaVeterinaryOptical Technology",
  },
  {
    id: 214,
    value: 214,
    label: "Higher DiplomaVeterinaryPhysiological Rehabilitation",
    titleae: "الدبلوم العاليالبيطرةالتأهيل الوظيفي",
    titleen: "Higher DiplomaVeterinaryPhysiological Rehabilitation",
  },
  {
    id: 215,
    value: 215,
    label: "Higher DiplomaVeterinaryPharmacy Doctor",
    titleae: "الدبلوم العاليالبيطرةدكتور الصيدلة",
    titleen: "Higher DiplomaVeterinaryPharmacy Doctor",
  },
  {
    id: 216,
    value: 216,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationCommerce",
    titleae: "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةتجارة",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationCommerce",
  },
  {
    id: 217,
    value: 217,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالدراسات المصرفية والمالية الإسلامية",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
  },
  {
    id: 218,
    value: 218,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationCost Accounting",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةمحاسبة التكاليف",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationCost Accounting",
  },
  {
    id: 219,
    value: 219,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationBook Keeping",
    titleae: "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةمسك الدفاتر",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationBook Keeping",
  },
  {
    id: 220,
    value: 220,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationTax Accounting",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةمحاسبة الضرائب",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationTax Accounting",
  },
  {
    id: 221,
    value: 221,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinancial Markets",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالأسواق المالية",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinancial Markets",
  },
  {
    id: 222,
    value: 222,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationIslamic Banks",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالمصارف الإسلامية",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationIslamic Banks",
  },
  {
    id: 223,
    value: 223,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationAccounting",
    titleae: "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالمحاسبة",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationAccounting",
  },
  {
    id: 224,
    value: 224,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationAuditing",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةتدقيق الحسابات.",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationAuditing",
  },
  {
    id: 225,
    value: 225,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationFinancial Markets",
    titleae:
      "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةالأسواق المالية",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationFinancial Markets",
  },
  {
    id: 226,
    value: 226,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationIslamic Banks",
    titleae:
      "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةالمصارف الإسلامية",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationIslamic Banks",
  },
  {
    id: 227,
    value: 227,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationBook Keeping",
    titleae: "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةمسك الدفاتر",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationBook Keeping",
  },
  {
    id: 228,
    value: 228,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationTax Accounting",
    titleae: "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةمحاسبة الضرائب",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationTax Accounting",
  },
  {
    id: 229,
    value: 229,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationAccounting",
    titleae: "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةالمحاسبة",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationAccounting",
  },
  {
    id: 230,
    value: 230,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationAuditing",
    titleae:
      "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةتدقيق الحسابات.",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationAuditing",
  },
  {
    id: 231,
    value: 231,
    label:
      "BachelorCommerce, Business Administration and Public AdministrationFinancing",
    titleae: "البكالوريوس التجارة وإدارة الأعمال والإدارة العامةالتمويل",
    titleen:
      "BachelorCommerce, Business Administration and Public AdministrationFinancing",
  },
  {
    id: 232,
    value: 232,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationInsurance Management",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةإدارة التأمين",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationInsurance Management",
  },
  {
    id: 233,
    value: 233,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinancial Mediation",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةالوساطة المالية",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationFinancial Mediation",
  },
  {
    id: 234,
    value: 234,
    label:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
    titleae:
      "الدبلوم العاليالتجارة وإدارة الأعمال والإدارة العامةجمارك وتخليص جمركي",
    titleen:
      "Higher DiplomaCommerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
  },
  {
    id: 235,
    value: 235,
    label:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالدراسات المصرفية والمالية الإسلامية",
    titleen:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
  },
  {
    id: 236,
    value: 236,
    label: "Higher DiplomaVeterinaryEducation and Child Care",
    titleae: "الدبلوم العاليالبيطرةتربية ورعاية الطفل",
    titleen: "Higher DiplomaVeterinaryEducation and Child Care",
  },
  {
    id: 237,
    value: 237,
    label: "Applied Bachelor(Vocational)VeterinaryDental Hygiene",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةصحة الفم والأسنان",
    titleen: "Applied Bachelor(Vocational)VeterinaryDental Hygiene",
  },
  {
    id: 238,
    value: 238,
    label: "Applied Bachelor(Vocational)VeterinaryNursing/ Surgery",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةتمريض / جراحة.",
    titleen: "Applied Bachelor(Vocational)VeterinaryNursing/ Surgery",
  },
  {
    id: 239,
    value: 239,
    label: "Applied Bachelor(Vocational)VeterinaryDental Manufacturing",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةصناعة الأسنان",
    titleen: "Applied Bachelor(Vocational)VeterinaryDental Manufacturing",
  },
  {
    id: 240,
    value: 240,
    label: "Applied Bachelor(Vocational)VeterinaryAssistant Dentists",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةمساعدو طب الأسنان",
    titleen: "Applied Bachelor(Vocational)VeterinaryAssistant Dentists",
  },
  {
    id: 241,
    value: 241,
    label: "Applied Bachelor(Vocational)VeterinaryNutrition and Dietetics",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالتغذية والحمية الغذائية",
    titleen: "Applied Bachelor(Vocational)VeterinaryNutrition and Dietetics",
  },
  {
    id: 242,
    value: 242,
    label: "Applied Bachelor(Vocational)VeterinaryDietician Programs",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالتغذية السريرية والحميات",
    titleen: "Applied Bachelor(Vocational)VeterinaryDietician Programs",
  },
  {
    id: 243,
    value: 243,
    label: "Applied Bachelor(Vocational)VeterinaryCare of Disabled",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةاية ذوي الاحتياجات الخاصة",
    titleen: "Applied Bachelor(Vocational)VeterinaryCare of Disabled",
  },
  {
    id: 244,
    value: 244,
    label: "Applied Bachelor(Vocational)VeterinaryIntensive Care",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةعناية الحثيثة",
    titleen: "Applied Bachelor(Vocational)VeterinaryIntensive Care",
  },
  {
    id: 245,
    value: 245,
    label: "Applied Bachelor(Vocational)VeterinaryLaboratory Analysis",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالتحاليل المخبرية",
    titleen: "Applied Bachelor(Vocational)VeterinaryLaboratory Analysis",
  },
  {
    id: 246,
    value: 246,
    label: "Applied Bachelor(Vocational)VeterinaryMedical Analysis",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالتحاليل الطبية",
    titleen: "Applied Bachelor(Vocational)VeterinaryMedical Analysis",
  },
  {
    id: 247,
    value: 247,
    label: "Applied Bachelor(Vocational)VeterinaryChild education",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرة",
    titleen: "Applied Bachelor(Vocational)VeterinaryChild education",
  },
  {
    id: 248,
    value: 248,
    label: "Applied Bachelor(Vocational)VeterinaryDental Laboratories",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةمختبرات الأسنان",
    titleen: "Applied Bachelor(Vocational)VeterinaryDental Laboratories",
  },
  {
    id: 249,
    value: 249,
    label:
      "Applied Bachelor(Vocational)VeterinaryManufacture of Artificial Limbs",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةتصنيع أطراف اصطناعية",
    titleen:
      "Applied Bachelor(Vocational)VeterinaryManufacture of Artificial Limbs",
  },
  {
    id: 250,
    value: 250,
    label: "MasterEducational SciencesClass Teacher / English Language",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم صف / لغة إنجليزية",
    titleen: "MasterEducational SciencesClass Teacher / English Language",
  },
  {
    id: 251,
    value: 251,
    label: "BachelorEducational SciencesMethods",
    titleae: "البكالوريوس  العلوم التربويةالمناهج",
    titleen: "BachelorEducational SciencesMethods",
  },
  {
    id: 252,
    value: 252,
    label: "BachelorEducational SciencesEducation Technology",
    titleae: "البكالوريوس  العلوم التربويةتكنولوجيا التعليم",
    titleen: "BachelorEducational SciencesEducation Technology",
  },
  {
    id: 253,
    value: 253,
    label: "BachelorEducational SciencesClass Teacher and Educational Computer",
    titleae: "البكالوريوس  العلوم التربويةمعلم صف وحاسوب تعليمي",
    titleen:
      "BachelorEducational SciencesClass Teacher and Educational Computer",
  },
  {
    id: 254,
    value: 254,
    label: "BachelorEducational SciencesClass Teacher / English Language",
    titleae: "البكالوريوس  العلوم التربويةمعلم صف / لغة إنجليزية",
    titleen: "BachelorEducational SciencesClass Teacher / English Language",
  },
  {
    id: 255,
    value: 255,
    label: "MasterEducational SciencesTesting and Measurement",
    titleae: "الماجستير التطبيقي العلوم التربويةالقياس والاختبارات التربوية",
    titleen: "MasterEducational SciencesTesting and Measurement",
  },
  {
    id: 256,
    value: 256,
    label: "MasterEducational SciencesEarly Childhood Teaching",
    titleae: "الماجستير التطبيقي العلوم التربويةرياض الأطفال",
    titleen: "MasterEducational SciencesEarly Childhood Teaching",
  },
  {
    id: 257,
    value: 257,
    label: "MasterEducational SciencesForeign Language Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / لغة أجنبية",
    titleen: "MasterEducational SciencesForeign Language Teacher",
  },
  {
    id: 258,
    value: 258,
    label: "MasterEducational SciencesEtching",
    titleae: "الماجستير التطبيقي العلوم التربويةحفر الكليشيهات",
    titleen: "MasterEducational SciencesEtching",
  },
  {
    id: 259,
    value: 259,
    label: "Higher DiplomaEducational SciencesEducational Guidance ",
    titleae: "الدبلوم العالي العلوم التربويةالإرشاد التربوي",
    titleen: "Higher DiplomaEducational SciencesEducational Guidance ",
  },
  {
    id: 260,
    value: 260,
    label: "Higher DiplomaEducational SciencesSpecial Education",
    titleae: "الدبلوم العالي العلوم التربويةالتربية الخاصة",
    titleen: "Higher DiplomaEducational SciencesSpecial Education",
  },
  {
    id: 261,
    value: 261,
    label: "Higher DiplomaEducational SciencesArts/ General",
    titleae: "الدبلوم العالي العلوم التربويةالفنون / عام",
    titleen: "Higher DiplomaEducational SciencesArts/ General",
  },
  {
    id: 262,
    value: 262,
    label: "Higher DiplomaEducational SciencesArts Theory",
    titleae: "الدبلوم العالي العلوم التربويةنظرية الفنون",
    titleen: "Higher DiplomaEducational SciencesArts Theory",
  },
  {
    id: 263,
    value: 263,
    label: "Higher DiplomaEducational SciencesPedagogical Science",
    titleae: "الدبلوم العالي العلوم التربويةالعلوم البيداغوجية",
    titleen: "Higher DiplomaEducational SciencesPedagogical Science",
  },
  {
    id: 264,
    value: 264,
    label: "Higher DiplomaEducational SciencesElementary Education",
    titleae: "الدبلوم العالي العلوم التربويةتربية ابتدائية.",
    titleen: "Higher DiplomaEducational SciencesElementary Education",
  },
  {
    id: 265,
    value: 265,
    label:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationCost Accounting",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةمحاسبة التكاليف",
    titleen:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationCost Accounting",
  },
  {
    id: 266,
    value: 266,
    label:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
    titleae:
      "الدبلوم المتقدم -تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالدراسات المصرفية والمالية الإسلامية",
    titleen:
      "Advanced Diploma(Vocational)Commerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
  },
  {
    id: 267,
    value: 267,
    label:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationFinancial Mediation",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالوساطة المالية",
    titleen:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationFinancial Mediation",
  },
  {
    id: 268,
    value: 268,
    label:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةجمارك وتخليص جمركي",
    titleen:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationCustoms & Customary Clearance",
  },
  {
    id: 269,
    value: 269,
    label:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationFinancial Markets",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةالأسواق المالية",
    titleen:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationFinancial Markets",
  },
  {
    id: 270,
    value: 270,
    label:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationInsurance Management",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالتجارة وإدارة الأعمال والإدارة العامةإدارة التأمين",
    titleen:
      "Applied Bachelor(Vocational)Commerce, Business Administration and Public AdministrationInsurance Management",
  },
  {
    id: 271,
    value: 271,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationInsurance Management",
    titleae: "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةإدارة التأمين",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationInsurance Management",
  },
  {
    id: 272,
    value: 272,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationBook Keeping",
    titleae: "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةمسك الدفاتر",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationBook Keeping",
  },
  {
    id: 273,
    value: 273,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationTax Accounting",
    titleae: "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةمحاسبة الضرائب",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationTax Accounting",
  },
  {
    id: 274,
    value: 274,
    label:
      "Applied Bachelor(Vocational)VeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةتصنيع مساعدات طبية / تأهيل",
    titleen:
      "Applied Bachelor(Vocational)VeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
  },
  {
    id: 275,
    value: 275,
    label: "Applied Bachelor(Vocational)VeterinaryMidwifery",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةقبالة",
    titleen: "Applied Bachelor(Vocational)VeterinaryMidwifery",
  },
  {
    id: 276,
    value: 276,
    label: "Applied Bachelor(Vocational)VeterinaryDentistry",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةطب الأسنان",
    titleen: "Applied Bachelor(Vocational)VeterinaryDentistry",
  },
  {
    id: 277,
    value: 277,
    label: "Applied Bachelor(Vocational)VeterinaryRoentgenology Technology",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةتقنيات الأشعة",
    titleen: "Applied Bachelor(Vocational)VeterinaryRoentgenology Technology",
  },
  {
    id: 278,
    value: 278,
    label: "Applied Bachelor(Vocational)VeterinaryAthletic Rehabilitation",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالتأهيل الرياضي",
    titleen: "Applied Bachelor(Vocational)VeterinaryAthletic Rehabilitation",
  },
  {
    id: 279,
    value: 279,
    label: "Applied Bachelor(Vocational)VeterinaryPharmacy",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالصيدلة",
    titleen: "Applied Bachelor(Vocational)VeterinaryPharmacy",
  },
  {
    id: 280,
    value: 280,
    label: "Applied Bachelor(Vocational)VeterinarySplint (Broken Bones)",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةبير عظام",
    titleen: "Applied Bachelor(Vocational)VeterinarySplint (Broken Bones)",
  },
  {
    id: 281,
    value: 281,
    label: "Applied Bachelor(Vocational)VeterinaryAnesthesiology",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةتخدير والإنعاش",
    titleen: "Applied Bachelor(Vocational)VeterinaryAnesthesiology",
  },
  {
    id: 282,
    value: 282,
    label: "Applied Bachelor(Vocational)VeterinaryMedical Laboratories",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةالمختبرات الطبية",
    titleen: "Applied Bachelor(Vocational)VeterinaryMedical Laboratories",
  },
  {
    id: 283,
    value: 283,
    label:
      "Applied Bachelor(Vocational)VeterinaryEye Sight Test & Optical Lens Making",
    titleae:
      "البكالوريوس التطبيقي-تعليم فنيالبيطرةفحص البصر وتجهيز النظارات الطبية",
    titleen:
      "Applied Bachelor(Vocational)VeterinaryEye Sight Test & Optical Lens Making",
  },
  {
    id: 284,
    value: 284,
    label: "Applied Bachelor(Vocational)VeterinaryPractical Nursing",
    titleae: "البكالوريوس التطبيقي-تعليم فنيالبيطرةتمريض العملي",
    titleen: "Applied Bachelor(Vocational)VeterinaryPractical Nursing",
  },
  {
    id: 285,
    value: 285,
    label: "Post Graduate DiplomaVeterinaryPractical Nursing",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةتمريض العملي",
    titleen: "Post Graduate DiplomaVeterinaryPractical Nursing",
  },
  {
    id: 286,
    value: 286,
    label: "Post Graduate DiplomaVeterinaryOrthodontics",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةطب الأسنان / تقويم",
    titleen: "Post Graduate DiplomaVeterinaryOrthodontics",
  },
  {
    id: 287,
    value: 287,
    label: "Post Graduate DiplomaVeterinaryMedical Laboratory Sciences",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةالعلوم الطبية المخبرية",
    titleen: "Post Graduate DiplomaVeterinaryMedical Laboratory Sciences",
  },
  {
    id: 288,
    value: 288,
    label: "Higher DiplomaEducational SciencesArts Education Teacher",
    titleae: "الدبلوم العالي العلوم التربويةمعلم مجال / تربية فنية",
    titleen: "Higher DiplomaEducational SciencesArts Education Teacher",
  },
  {
    id: 289,
    value: 289,
    label: "Higher DiplomaEducational SciencesHistory of Art",
    titleae: "الدبلوم العالي العلوم التربويةتاريخ الفنون",
    titleen: "Higher DiplomaEducational SciencesHistory of Art",
  },
  {
    id: 290,
    value: 290,
    label:
      "Higher DiplomaEducational SciencesResearch and Educational Rectification",
    titleae: "الدبلوم العالي العلوم التربويةالبحث والتقويم التربوي",
    titleen:
      "Higher DiplomaEducational SciencesResearch and Educational Rectification",
  },
  {
    id: 291,
    value: 291,
    label: "Higher DiplomaEducational SciencesChild Care",
    titleae: "الدبلوم العالي العلوم التربويةتربية الطفل",
    titleen: "Higher DiplomaEducational SciencesChild Care",
  },
  {
    id: 292,
    value: 292,
    label: "Higher DiplomaEducational SciencesChild Education Teacher",
    titleae: "الدبلوم العالي العلوم التربويةمعلم تربية وتعليم الطفل.",
    titleen: "Higher DiplomaEducational SciencesChild Education Teacher",
  },
  {
    id: 293,
    value: 293,
    label: "Higher DiplomaEducational SciencesArabic Language Teacher",
    titleae: "الدبلوم العالي العلوم التربويةمعلم مجال / لغة عربية",
    titleen: "Higher DiplomaEducational SciencesArabic Language Teacher",
  },
  {
    id: 294,
    value: 294,
    label: "Higher DiplomaEducational SciencesFine Art Printing",
    titleae: "الدبلوم العالي العلوم التربويةطباعة الأعمال الفنية",
    titleen: "Higher DiplomaEducational SciencesFine Art Printing",
  },
  {
    id: 295,
    value: 295,
    label: "Higher DiplomaEducational SciencesDidactics",
    titleae: "الدبلوم العالي العلوم التربويةعلم التعليم (التدريس)",
    titleen: "Higher DiplomaEducational SciencesDidactics",
  },
  {
    id: 296,
    value: 296,
    label: "Higher DiplomaEducational SciencesEducation Science",
    titleae: "الدبلوم العالي العلوم التربويةعلم التربية",
    titleen: "Higher DiplomaEducational SciencesEducation Science",
  },
  {
    id: 297,
    value: 297,
    label: "Higher DiplomaEducational SciencesNatural Sciences Teacher",
    titleae: "الدبلوم العالي العلوم التربويةمعلم مجال / علوم طبيعية",
    titleen: "Higher DiplomaEducational SciencesNatural Sciences Teacher",
  },
  {
    id: 298,
    value: 298,
    label: "Higher DiplomaEducational SciencesSocial Science Teacher",
    titleae: "الدبلوم العالي العلوم التربويةمعلم مجال / علوم اجتماعية",
    titleen: "Higher DiplomaEducational SciencesSocial Science Teacher",
  },
  {
    id: 299,
    value: 299,
    label: "Higher DiplomaEducational SciencesMethods",
    titleae: "الدبلوم العالي العلوم التربويةالمناهج",
    titleen: "Higher DiplomaEducational SciencesMethods",
  },
  {
    id: 300,
    value: 300,
    label: "Higher DiplomaEducational SciencesEducation Technology",
    titleae: "الدبلوم العالي العلوم التربويةتكنولوجيا التعليم",
    titleen: "Higher DiplomaEducational SciencesEducation Technology",
  },
  {
    id: 301,
    value: 301,
    label:
      "Higher DiplomaEducational SciencesClass Teacher and Educational Computer",
    titleae: "الدبلوم العالي العلوم التربويةمعلم صف وحاسوب تعليمي",
    titleen:
      "Higher DiplomaEducational SciencesClass Teacher and Educational Computer",
  },
  {
    id: 302,
    value: 302,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationBusiness and Finance Economics",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةاقتصاد المال والأعمال",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationBusiness and Finance Economics",
  },
  {
    id: 303,
    value: 303,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationFinance and Banking",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةالعلوم المالية والمصرفية",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationFinance and Banking",
  },
  {
    id: 304,
    value: 304,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationAccounting",
    titleae: "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةالمحاسبة",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationAccounting",
  },
  {
    id: 305,
    value: 305,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationAuditing",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةتدقيق الحسابات.",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationAuditing",
  },
  {
    id: 306,
    value: 306,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationFinancing",
    titleae: "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةالتمويل",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationFinancing",
  },
  {
    id: 307,
    value: 307,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationCommerce",
    titleae: "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةتجارة",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationCommerce",
  },
  {
    id: 308,
    value: 308,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةالدراسات المصرفية والمالية الإسلامية",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationIslamic Financial and Banking Studies",
  },
  {
    id: 309,
    value: 309,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationCost Accounting",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةمحاسبة التكاليف",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationCost Accounting",
  },
  {
    id: 310,
    value: 310,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationFinancial Markets",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةالأسواق المالية",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationFinancial Markets",
  },
  {
    id: 311,
    value: 311,
    label:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationIslamic Banks",
    titleae:
      "شهادة جامعيةالتجارة وإدارة الأعمال والإدارة العامةالمصارف الإسلامية",
    titleen:
      "Diploma/Associate DegreeCommerce, Business Administration and Public AdministrationIslamic Banks",
  },
  {
    id: 312,
    value: 312,
    label: "Post Graduate DiplomaVeterinaryOptical Technology",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةتقنيات البصريات",
    titleen: "Post Graduate DiplomaVeterinaryOptical Technology",
  },
  {
    id: 313,
    value: 313,
    label: "Post Graduate DiplomaVeterinaryPhysiological Rehabilitation",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةالتأهيل الوظيفي",
    titleen: "Post Graduate DiplomaVeterinaryPhysiological Rehabilitation",
  },
  {
    id: 314,
    value: 314,
    label: "Post Graduate DiplomaVeterinaryPharmacy Doctor",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةدكتور الصيدلة",
    titleen: "Post Graduate DiplomaVeterinaryPharmacy Doctor",
  },
  {
    id: 315,
    value: 315,
    label: "Post Graduate DiplomaVeterinaryDental Hygiene",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةصحة الفم والأسنان",
    titleen: "Post Graduate DiplomaVeterinaryDental Hygiene",
  },
  {
    id: 316,
    value: 316,
    label: "Post Graduate DiplomaVeterinaryDental Laboratories",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةمختبرات الأسنان",
    titleen: "Post Graduate DiplomaVeterinaryDental Laboratories",
  },
  {
    id: 317,
    value: 317,
    label: "Post Graduate DiplomaVeterinaryManufacture of Artificial Limbs",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةتصنيع أطراف اصطناعية",
    titleen: "Post Graduate DiplomaVeterinaryManufacture of Artificial Limbs",
  },
  {
    id: 318,
    value: 318,
    label:
      "Post Graduate DiplomaVeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةتصنيع مساعدات طبية / تأهيل",
    titleen:
      "Post Graduate DiplomaVeterinaryManufacture of Medical Auxiliaries/ Rehabilitation ",
  },
  {
    id: 319,
    value: 319,
    label: "Post Graduate DiplomaVeterinaryMidwifery",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةقبالة",
    titleen: "Post Graduate DiplomaVeterinaryMidwifery",
  },
  {
    id: 320,
    value: 320,
    label: "Post Graduate DiplomaVeterinaryDentistry",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةطب الأسنان",
    titleen: "Post Graduate DiplomaVeterinaryDentistry",
  },
  {
    id: 321,
    value: 321,
    label: "Post Graduate DiplomaVeterinaryRoentgenology Technology",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةتقنيات الأشعة",
    titleen: "Post Graduate DiplomaVeterinaryRoentgenology Technology",
  },
  {
    id: 322,
    value: 322,
    label: "Post Graduate DiplomaVeterinaryAthletic Rehabilitation",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةالتأهيل الرياضي",
    titleen: "Post Graduate DiplomaVeterinaryAthletic Rehabilitation",
  },
  {
    id: 323,
    value: 323,
    label: "Post Graduate DiplomaVeterinaryPharmacy",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةالصيدلة",
    titleen: "Post Graduate DiplomaVeterinaryPharmacy",
  },
  {
    id: 324,
    value: 324,
    label: "Post Graduate DiplomaVeterinaryMaternity and Childhood",
    titleae: "الدبلوم العالي التطبيقي -ما بعد البكالورويسالبيطرةأمومة والطفولة",
    titleen: "Post Graduate DiplomaVeterinaryMaternity and Childhood",
  },
  {
    id: 325,
    value: 325,
    label: "Higher DiplomaEducational SciencesClass Teacher / English Language",
    titleae: "الدبلوم العالي العلوم التربويةمعلم صف / لغة إنجليزية",
    titleen:
      "Higher DiplomaEducational SciencesClass Teacher / English Language",
  },
  {
    id: 326,
    value: 326,
    label: "Higher DiplomaEducational SciencesAdults Education",
    titleae: "الدبلوم العالي العلوم التربويةتعليم كبار",
    titleen: "Higher DiplomaEducational SciencesAdults Education",
  },
  {
    id: 327,
    value: 327,
    label: "Higher DiplomaEducational SciencesReligion Teacher",
    titleae: "الدبلوم العالي العلوم التربويةمعلم مجال / تربية دينية",
    titleen: "Higher DiplomaEducational SciencesReligion Teacher",
  },
  {
    id: 328,
    value: 328,
    label: "Higher DiplomaEducational SciencesPhilosophy of Art",
    titleae: "الدبلوم العالي العلوم التربويةفلسفة الفنون",
    titleen: "Higher DiplomaEducational SciencesPhilosophy of Art",
  },
  {
    id: 329,
    value: 329,
    label: "Higher DiplomaEducational SciencesSculpture and Engraving",
    titleae: "الدبلوم العالي العلوم التربويةالنحت والحفر التشكيلي",
    titleen: "Higher DiplomaEducational SciencesSculpture and Engraving",
  },
  {
    id: 330,
    value: 330,
    label: "Higher DiplomaEducational SciencesTesting and Measurement",
    titleae: "الدبلوم العالي العلوم التربويةالقياس والاختبارات التربوية",
    titleen: "Higher DiplomaEducational SciencesTesting and Measurement",
  },
  {
    id: 331,
    value: 331,
    label: "Higher DiplomaEducational SciencesEarly Childhood Teaching",
    titleae: "الدبلوم العالي العلوم التربويةرياض الأطفال",
    titleen: "Higher DiplomaEducational SciencesEarly Childhood Teaching",
  },
  {
    id: 332,
    value: 332,
    label: "MasterEducational SciencesResearch and Educational Rectification",
    titleae: "الماجستير التطبيقي العلوم التربويةالبحث والتقويم التربوي",
    titleen: "MasterEducational SciencesResearch and Educational Rectification",
  },
  {
    id: 333,
    value: 333,
    label: "MasterEducational SciencesChild Care",
    titleae: "الماجستير التطبيقي العلوم التربويةتربية الطفل",
    titleen: "MasterEducational SciencesChild Care",
  },
  {
    id: 334,
    value: 334,
    label: "MasterEducational SciencesChild Education Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم تربية وتعليم الطفل.",
    titleen: "MasterEducational SciencesChild Education Teacher",
  },
  {
    id: 335,
    value: 335,
    label: "MasterEducational SciencesArabic Language Teacher",
    titleae: "الماجستير التطبيقي العلوم التربويةمعلم مجال / لغة عربية",
    titleen: "MasterEducational SciencesArabic Language Teacher",
  },
  {
    id: 336,
    value: 336,
    label: "MasterEducational SciencesFine Art Printing",
    titleae: "الماجستير التطبيقي العلوم التربويةطباعة الأعمال الفنية",
    titleen: "MasterEducational SciencesFine Art Printing",
  },
  {
    id: 337,
    value: 337,
    label:
      "Applied Master(Vocational)Educational SciencesTesting and Measurement",
    titleae:
      "درجة الماجستير -تعليم فني العلوم التربويةالقياس والاختبارات التربوية",
    titleen:
      "Applied Master(Vocational)Educational SciencesTesting and Measurement",
  },
  {
    id: 338,
    value: 338,
    label:
      "Applied Master(Vocational)Educational SciencesEarly Childhood Teaching",
    titleae: "درجة الماجستير -تعليم فني العلوم التربويةرياض الأطفال",
    titleen:
      "Applied Master(Vocational)Educational SciencesEarly Childhood Teaching",
  },
  {
    id: 339,
    value: 339,
    label: "Post Graduate DiplomaPhysical SciencesComputer Networks Management",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةإدارة شبكات الحاسوب",
    titleen:
      "Post Graduate DiplomaPhysical SciencesComputer Networks Management",
  },
  {
    id: 340,
    value: 340,
    label: "Post Graduate DiplomaPhysical SciencesEducational Computer",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةالحاسوب التعليمي",
    titleen: "Post Graduate DiplomaPhysical SciencesEducational Computer",
  },
  {
    id: 341,
    value: 341,
    label: "Post Graduate DiplomaPhysical SciencesStatistical Surveys Design",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةتصميم المسوح الإحصائية",
    titleen: "Post Graduate DiplomaPhysical SciencesStatistical Surveys Design",
  },
  {
    id: 342,
    value: 342,
    label: "Post Graduate DiplomaPhysical SciencesInformation Technology (IT)",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةتكنولوجيا المعلومات",
    titleen:
      "Post Graduate DiplomaPhysical SciencesInformation Technology (IT)",
  },
  {
    id: 343,
    value: 343,
    label: "Post Graduate DiplomaPhysical SciencesProgramming Languages",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةلغات البرمجة",
    titleen: "Post Graduate DiplomaPhysical SciencesProgramming Languages",
  },
  {
    id: 344,
    value: 344,
    label:
      "Diploma/Associate DegreePhysical SciencesMathematics and Statistics",
    titleae: "شهادة جامعيةالعلوم الفيزيائيةالرياضيات والإحصاء",
    titleen:
      "Diploma/Associate DegreePhysical SciencesMathematics and Statistics",
  },
  {
    id: 345,
    value: 345,
    label: "Diploma/Associate DegreePhysical SciencesActuarial Science",
    titleae: "شهادة جامعيةالعلوم الفيزيائيةالعلم الإكتواري",
    titleen: "Diploma/Associate DegreePhysical SciencesActuarial Science",
  },
  {
    id: 346,
    value: 346,
    label:
      "Diploma/Associate DegreePhysical SciencesBusiness Information Systems",
    titleae: "شهادة جامعيةالعلوم الفيزيائيةأنظمة معلومات الأعمال",
    titleen:
      "Diploma/Associate DegreePhysical SciencesBusiness Information Systems",
  },
  {
    id: 347,
    value: 347,
    label: "Diploma/Associate DegreePhysical SciencesApplied Computer Science",
    titleae: "شهادة جامعيةالعلوم الفيزيائيةعلم الحاسوب وتطبيقاته",
    titleen:
      "Diploma/Associate DegreePhysical SciencesApplied Computer Science",
  },
  {
    id: 348,
    value: 348,
    label: "Diploma/Associate DegreePhysical SciencesSurvey Samples",
    titleae: "شهادة جامعيةالعلوم الفيزيائيةالعينات المسحية",
    titleen: "Diploma/Associate DegreePhysical SciencesSurvey Samples",
  },
  {
    id: 349,
    value: 349,
    label: "Diploma/Associate DegreePhysical SciencesComputer Programming",
    titleae: "شهادة جامعيةالعلوم الفيزيائيةبرمجة الحاسوب",
    titleen: "Diploma/Associate DegreePhysical SciencesComputer Programming",
  },
  {
    id: 350,
    value: 350,
    label: "Post Graduate DiplomaPhysical SciencesProbabilities Theory",
    titleae:
      "الدبلوم العالي التطبيقي -ما بعد البكالورويسالعلوم الفيزيائيةنظرية الاحتمالات",
    titleen: "Post Graduate DiplomaPhysical SciencesProbabilities Theory",
  },
];

export default jobeducations;
