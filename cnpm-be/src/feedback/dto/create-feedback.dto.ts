export class createFeedbackDto {
    customerId: number;
    sosomemberId: number;
    createdAt: Date;
    rating: number;
    contentByCustomer?: string;
    contentBySPSO?: string;
}