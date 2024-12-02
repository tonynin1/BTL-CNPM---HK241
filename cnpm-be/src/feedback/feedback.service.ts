import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createFeedbackDto, updateFeedbackDto } from './dto';

@Injectable()
export class FeedbackService {
    constructor(private prismaService: PrismaService) {}

    async getFeedbacks() {
        return this.prismaService.feedback.findMany();
    }

    async getFeedbackById(feedbackId: number) {
        const feedback = await this.prismaService.feedback.findUnique({
            where: {
                feedbackId: feedbackId,
            },
        });
        if (!feedback) {
            return {
                status: 404,
                message: 'Feedback not found',
            }
        }

        return {
            data: feedback,
            status: 200,
            message: 'Feedback found',
        }
    }

    async createFeedback(createFeedbackDto: createFeedbackDto) {
        
        try{
            // Check if customer exists
            const findFirst = await this.prismaService.feedback.findFirst({
                where: {
                    customerId: createFeedbackDto.customerId,
                },
            });
            if (findFirst && findFirst.customerId === createFeedbackDto.customerId) {
                return {
                    status: 404,
                    message: 'You already have a feedback',
                }
            }
            const feedback = await this.prismaService.feedback.create({
                data: {
                    feedTime: new Date(),
                    rating: createFeedbackDto.rating? createFeedbackDto.rating : 0,
                    contentByCustomer: createFeedbackDto.contentBySPSO? createFeedbackDto.contentBySPSO : 'Null feedback',
                    customer: {
                        connect: {
                            customerId: createFeedbackDto.customerId,
                        },
                    },
                }
            });

            return {
                status: 200,
                message: 'Feedback created',
            }
        }
        catch(error){
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }

    }
    async updateFeedBackByCustomerId(customerId: number, updateFeedbackDto: updateFeedbackDto) {
        try{
            const feedback = await this.prismaService.feedback.findFirst({
                where: {
                    customerId: customerId,
                },
            });
            
            if (feedback.customerId !== customerId) {
                return {
                    status: 404,
                    message: 'Feedback not found',
                }
            }
            console.log(customerId);
        
            const response = await this.prismaService.feedback.update({
                where: {
                    feedbackId: feedback.feedbackId,
                },
                data: {
                    rating: updateFeedbackDto.rating? updateFeedbackDto.rating : feedback.rating,
                    contentByCustomer: updateFeedbackDto.contentBySPSO? updateFeedbackDto.contentBySPSO : feedback.contentByCustomer,
                },
            });

            return {
                status: 200,
                message: 'Feedback updated',
                data: response,
            }
        }
        catch(error){
            return {
                status: 500,
                message: 'Internal server error ' + error.message,
            }
        }
    }
    async updateFeedback(feedbackId: number, updateFeedbackDto: updateFeedbackDto) {
        try{
            const feedback = await this.getFeedbackById(feedbackId)

            if (feedback.status !== 200) {
                return {
                    status: 404,
                    message: 'Feedback not found',
                }
            }
        
            const response = await this.prismaService.feedback.update({
                where: {
                    feedbackId: feedbackId,
                },
                data: {
                    rating: updateFeedbackDto.rating? updateFeedbackDto.rating : feedback.data.rating,
                    contentByCustomer: updateFeedbackDto.contentByCustomer? updateFeedbackDto.contentByCustomer : feedback.data.contentByCustomer,
                },
            });

            return {
                status: 200,
                message: 'Feedback updated',
            }
        }
        catch(error){
            return {
                status: 500,
                message: 'Internal server error ' + error.message,
            }
        }
    }

    async deleteFeedback(feedbackId: number) {
        const feedback = await this.prismaService.feedback.findUnique({
            where: {
                feedbackId: feedbackId,
            },
        });
        if (!feedback) {
            return {
                status: 404,
                message: 'Feedback not found',
            }
        }

        try{
            await this.prismaService.feedback.delete({
                where: {
                    feedbackId: feedbackId,
                },
            });

            return {
                status: 200,
                message: 'Feedback deleted',
            }
        }
        catch(error){
            return {
                status: 500,
                message: 'Internal server error',
            }
        }
    }
}
