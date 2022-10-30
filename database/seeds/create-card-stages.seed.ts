import { CardStageEntity } from "src/cards/card-stages/card-stage.entity";
import { CardStageEnum } from "src/cards/card-stages/card-stage.enum";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateCardStagesSeed implements Seeder {
    private stages = [
        {
            id: CardStageEnum.LEARNING,
            name: "Learning",
        },
        {
            id: CardStageEnum.RELEARNING,
            name: "Relearning",
        },
        {
            id: CardStageEnum.GRADUATED,
            name: "Graduated",
        },
    ] as CardStageEntity[];

    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.createQueryBuilder()
            .insert()
            .into(CardStageEntity)
            .values(this.stages)
            .execute();
    }
}