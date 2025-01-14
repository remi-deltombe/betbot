import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { BetsService } from './bets.service';


@Controller('bets')
export class BetsController {
  constructor(
    private readonly betsService: BetsService
  ) { }

  @Get('/create')
  create(@Query('matchId') matchId, @Query('winner') winner) {
    return this.betsService.create({
      userId: 'sample user 2',
      matchId,
      winner
    });
  }
}
