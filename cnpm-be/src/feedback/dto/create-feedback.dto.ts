export class createFeedbackDto {
    customerId: number;
    spsomemberId: number;
    createdAt: Date;
    rating: number;
    contentByCustomer?: string;
    contentBySPSO?: string;
}