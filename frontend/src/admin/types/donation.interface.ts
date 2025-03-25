export interface Donations{
  fullName: string;
    email: string;
    amount: number;
    stripeSessionId: string;
    stripePaymentIntentId: string;
    status: string;
    createdAt: Date;
    completedAt:Date
}