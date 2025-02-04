export const calculateGradeAndgradePoints = (totalMarks: number) => {
  const result = {
    grade: 'NA',
    gradePoints: 0,
  };

  if (totalMarks >= 85) {
    result.grade = 'A';
    result.gradePoints = 4.0;
  } else if (totalMarks >= 70) {
    result.grade = 'B';
    result.gradePoints = 3.0;
  } else if (totalMarks >= 55) {
    result.grade = 'C';
    result.gradePoints = 2.0;
  } else if (totalMarks >= 40) {
    result.grade = 'D';
    result.gradePoints = 1.0;
  } else {
    result.grade = 'F';
    result.gradePoints = 0;
  }

  return result;
};
