export interface Student {
  _id?: string;
  registrationId: string;
  fullName: string;
  mobile: string;
  email: string;
  collegeName: string;
  currentStatus: 'Student' | 'Graduate' | 'Working Professional' | 'Job Seeker' | 'Other';
  city: string;
  course: string;
  amount: number;
  paymentStatus: 'PAYMENT_PENDING' | 'PAYMENT_VERIFIED' | 'PAYMENT_FAILED';
  paymentId?: string;
  registrationStatus: 'REGISTERED' | 'CONFIRMED' | 'CANCELLED';
  courseStartDate?: string;
  createdAt?: string;
}

export interface Settings {
  courseFee: number;
  courseStartDate: string;
  registrationDeadline: string;
  courseDuration: string;
  upiId: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  galleryImages: Array<{
    id: string;
    url: string;
    caption: string;
    category: string;
  }>;
}