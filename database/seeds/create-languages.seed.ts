import { LanguageEntity } from "src/languages/language.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateLanguagesSeed implements Seeder {
    private languages = [
        {
            id: "79bfdcc4-3254-41c5-b2dc-ecdcbd29fc1f",
            name: "Português",
        },
        {
            id: "d8f5fbd3-8824-4fa2-be86-a522521ed50d",
            name: "English",
        },
        {
            id: "a47e86b7-ea8c-47c8-a4d3-43040367234b",
            name: "Français",
        },
    ] as LanguageEntity[];

    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.createQueryBuilder()
            .insert()
            .into(LanguageEntity)
            .values(this.languages)
            .execute();
    }
}