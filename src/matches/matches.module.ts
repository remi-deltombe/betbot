import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { DatabaseModule } from 'src/database.module';
import { matchesProviders } from 'src/schemas/matches/matches.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MatchesController],
  providers: [MatchesService, ...matchesProviders],
})
export class MatchesModule { }
