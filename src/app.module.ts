import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchesModule } from './matches/matches.module';
import { UsersModule } from './users/users.module';
import { databaseProviders } from './database.providers';
import { BetsModule } from './bets/bets.module';

@Module({
  imports: [MatchesModule, BetsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders]
})
export class AppModule { }
