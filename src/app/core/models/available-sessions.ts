export interface AvailableSessions { //This model is misleading. This is typical data table returned by CORE. Used for available and sessions that your signedup for.
  category: string;
  name: string;
  date: string;
  openSeats: string;
  firstName: string;
  lastName: string;
  weekStart: string;
  weekEnd: string;
  startTime: string;
  endTime: string;
  classroom: string;
}
