import { Controller } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
    @post()
    paymentInfo()
}
