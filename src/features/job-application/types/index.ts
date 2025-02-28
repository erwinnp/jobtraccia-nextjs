export type TNewApplication = {
  position: string;
  applicationStatus:
    | 'Applied'
    | 'Interview Scheduled'
    | 'Offer Received'
    | 'Rejected'
    | 'Withdrawn';
  companyName: string;
  companyLocation: string;
  applicationDate: Date;
  applicationSource: string;
};
