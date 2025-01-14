import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { betsProviders } from 'src/schemas/bets/bets.provider';
import { matchesProviders } from 'src/schemas/matches/matches.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...betsProviders, ...matchesProviders],
})
export class UsersModule { }
