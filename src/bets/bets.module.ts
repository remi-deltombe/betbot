import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { betsProviders } from 'src/schemas/bets/bets.provider';
import { matchesProviders } from 'src/schemas/matches/matches.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BetsController],
  providers: [BetsService, ...betsProviders, ...matchesProviders],
})
export class BetsModule { }
