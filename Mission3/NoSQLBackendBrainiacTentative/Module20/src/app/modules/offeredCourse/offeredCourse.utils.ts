import { TDays } from './offeredCourse.interface';

export type TSchedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newPayloadSchedule: TSchedule,
): boolean => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`2021-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`2021-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`2021-01-01T${newPayloadSchedule.startTime}`);
    const newEndTime = new Date(`2021-01-01T${newPayloadSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
