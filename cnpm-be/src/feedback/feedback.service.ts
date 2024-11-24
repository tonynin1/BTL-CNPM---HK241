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
            status: 200,
            message: 'Feedback found',
        }
    }

    async createFeedback(createFeedbackDto: createFeedbackDto) {
        
        try{
            const feedback = await this.prismaService.feedback.create({
                data: {
                    feedTime: new Date(),
                    rating: createFeedbackDto.rating,
                    contentByCustomer: "",
                    contentBySPSO: "",
                    customer: {
                        connect: {
                            customerId: createFeedbackDto.customerId,
                        },
                    },
                    spsomember: {
                        connect: {
                            sosoMemberId: createFeedbackDto.sosomemberId,
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
                message: 'Internal server error',
            }
        }

    }

    async updateFeedback(feedbackId: number, updateFeedbackDto: updateFeedbackDto) {
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
            await this.prismaService.feedback.update({
                where: {
                    feedbackId: feedbackId,
                },
                data: {
                    rating: updateFeedbackDto.rating,
                    contentByCustomer: updateFeedbackDto.contentByCustomer,
                    contentBySPSO: updateFeedbackDto.contentBySPSO,
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
                message: 'Internal server error',
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
