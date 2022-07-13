import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewEntity } from 'src/reviews/review.entity';
import { ReviewService } from 'src/reviews/review.service';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';

@Resolver('Review')
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query()
  async reviews(): Promise<ReviewEntity[]> {
    return this.reviewService.all();
  }

  @Mutation()
  async createReview(
    @Args('input') createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    return await this.reviewService.create(createReviewDto);
  }
}
