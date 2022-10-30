import { ReviewAnswerEntity } from "src/reviews/review-answers/review-answer.entity";
import { REVIEW_ANSWEAR } from "src/reviews/review.enum";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateReviewAnswersSeed implements Seeder {
    private reviewAnswers = [
        {
            id: REVIEW_ANSWEAR.AGAIN,
            name: "Again",
        },
        {
            id: REVIEW_ANSWEAR.EASY,
            name: "Easy",
        },
        {
            id: REVIEW_ANSWEAR.GOOD,
            name: "Good",
        },
        {
            id: REVIEW_ANSWEAR.HARD,
            name: "Hard",
        },
    ] as ReviewAnswerEntity[];

    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.createQueryBuilder()
            .insert()
            .into(ReviewAnswerEntity)
            .values(this.reviewAnswers)
            .execute();
    }
}