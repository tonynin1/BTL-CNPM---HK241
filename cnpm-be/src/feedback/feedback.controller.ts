import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { createFeedbackDto, updateFeedbackDto } from './dto';
import { patch } from 'axios';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    @Get()
    async getFeedbacks() {
        return this.feedbackService.getFeedbacks();
    }

    @Get('all')
    async getAllFeedBacksWithUserInfo(){
        return this.feedbackService.getAllFeedBacksWithUserInfo();
    }
    @Get(':feedbackId')
    async getFeedbackById(@Param('feedbackId', ParseIntPipe) feedbackId: number) {
        return this.feedbackService.getFeedbackById(feedbackId);
    }

    @Post('create')
    async createFeedback(
        @Body() createFeedbackDto: createFeedbackDto ) {
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @Patch('update/:feedbackId')
    async updateFeedback(@Param('feedbackId', ParseIntPipe) feedbackId: number,@Body() updateFeedbackDto: updateFeedbackDto) {
        return this.feedbackService.updateFeedback(feedbackId, updateFeedbackDto);
    }

    @Patch('update/customer/:customerId')
    async updateFeedbackByCustomerId(@Param('customerId', ParseIntPipe) customerId: number,@Body() updateFeedbackDto: updateFeedbackDto) {
        return this.feedbackService.updateFeedBackByCustomerId(customerId, updateFeedbackDto);
    }
    @Delete('delete/:feedbackId')
    async deleteFeedback(@Param('feedbackId', ParseIntPipe) feedbackId: number) {
        return this.feedbackService.deleteFeedback(feedbackId);
    }
}
