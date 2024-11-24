import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { createFeedbackDto, updateFeedbackDto } from './dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    @Get()
    async getFeedbacks() {
        return this.feedbackService.getFeedbacks();
    }

    @Get(':feedbackId')
    async getFeedbackById(@Param('feedbackId') feedbackId: number) {
        return this.feedbackService.getFeedbackById(feedbackId);
    }

    @Post('create')
    async createFeedback(createFeedbackDto: createFeedbackDto) {
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @Patch('update/:feedbackId')
    async updateFeedback(@Param('feedbackId') feedbackId: number, updateFeedbackDto: updateFeedbackDto) {
        return this.feedbackService.updateFeedback(feedbackId, updateFeedbackDto);
    }

    @Delete('delete/:feedbackId')
    async deleteFeedback(@Param('feedbackId') feedbackId: number) {
        return this.feedbackService.deleteFeedback(feedbackId);
    }
}
