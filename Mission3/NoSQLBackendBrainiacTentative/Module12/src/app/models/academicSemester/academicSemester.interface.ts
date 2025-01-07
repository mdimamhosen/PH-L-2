export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TSemesterNames = 'Autumn' | 'Spring' | 'Fall';

export type TSemesterCodes = '01' | '02' | '03';
export type TSemisterNameCodeMapper = {
  [key: string]: string;
};

export interface TAacademicSemester {
  name: TSemesterNames;
  code: TSemesterCodes;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
}
