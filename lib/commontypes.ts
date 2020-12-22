export type OptionsDTO = {
  id: number;
  value: number;
  label: string;
  titleen: string;
  titleae: string;
};

export type OptionsDependentDTO = {
  id: number;
  value: number;
  label: string;
  titleen: string;
  titleae: string;
  parent1: number;
  parent2: number;
};

export type OptionsMultiDTO = {
  id: number;
  value: string;
  label: string;
  titleen: string;
  titleae: string;
};

export type ActiveVacancylistforjourney = {
  id: number;
  value: string;
  label: string;
  titleen: string;
  titleae: string;
  totalnomination: number;
  totalinterview: number;
  totaloffer: number;
  totalhired: number;
  totalrejected: number;
};

export type ActiveVacancylistforExpats = {
  id: number;
  value: string;
  label: string;
  titleen: string;
  titleae: string;
  totalopenings: number;
  additionallowed: number;
};

export type useridentity = {
  clientid: string;
  contactid: string;
  displayname: string;
};

export type CommonFormProps = {
  rid: string;
  //user: useridentity;
  onFormSubmit: ({
    issaved,
    message,
  }: {
    issaved: boolean;
    message: string;
  }) => void;
};

export type CloseVacancyDTO = {
  reasonid: number;
  comment: string;
};

export type MatchingDTO = {
  selectedvacancies: Array<OptionsMultiDTO>;
  selectedjobseekers: Array<string>;
};
