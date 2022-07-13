import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/card.entity';
import { CardResolver } from 'src/cards/card.resolver';
import { CardService } from 'src/cards/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [CardService, CardResolver],
})
export class CardModule {}
