import {
  TMonths,
  TSemesterCodes,
  TSemesterNames,
  TSemisterNameCodeMapper,
} from './academicSemester.interface';

export const academicMonths: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterNames: TSemesterNames[] = [
  'Autumn',
  'Spring',
  'Fall',
];

export const academicSemesterCodes: TSemesterCodes[] = ['01', '02', '03'];

export const SemisterCodeMapper: TSemisterNameCodeMapper = {
  '01': 'Autumn',
  '02': 'Spring',
  '03': 'Fall',
};
