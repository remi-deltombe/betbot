import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { CompleteMatchDto } from './dto/complete-match.dto';
import { BetsService } from '../bets/bets.service';


/**
POST /matches
/create_match ${team A} ${teamB} ${datetime}
=> Display window in the chan with 2 buttons to bet and id for the match 

POST /matches/{match_id}/bets
/bet ${match id} ${bet} 
=> Display window in the chan with 2 buttons to bet and id for the match 

PUT /matches/{match_id}
/end_match ${match id} ${winner}
=> Set the winner of the match
 */

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    //private readonly betService: BetsService
  ) { }

  @Get('/create')
  create(@Query('teamA') teamA, @Query('teamB') teamB, @Query('datetime') datetime) {
    return this.matchesService.create({
      teamA,
      teamB,
      datetime
    });
  }

  @Get(':id/bets/create')
  createBet(@Query('matchId') matchId, @Query('winner') winner) {
    //return this.betService.createOrUpdate({ matchId, winner });
  }

  @Get(':id/complete')
  complete(@Param('id') id: string, @Query('winner') winner) {
    return this.matchesService.complete(id, { winner });
  }
}
