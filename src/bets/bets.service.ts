import { Inject, Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { Match } from 'src/schemas/matches/match.schema';
import { Model } from 'mongoose';
import { Bet } from 'src/schemas/bets/bet.schema';

@Injectable()
export class BetsService {
  constructor(
    @Inject('BET_MODEL')
    private betModel: Model<Bet>,
    @Inject('MATCH_MODEL')
    private matchModel: Model<Match>,
  ) { }

  async create({ matchId, userId, winner }: CreateBetDto) {
    const match = await this.matchModel.findOne({ _id: matchId }).exec();
    if (!match) {
      return { error: "can't find matching entity" };
    }
    if (match.teamA !== winner && match.teamB !== winner) {
      return { error: "teams does not match winner", match };
    }

    const existing = await this.betModel.findOne({ matchId, userId }).exec();
    if (existing) {
      existing.winner = winner;
      return existing.save();
    }
    const createdBet = new this.betModel({ matchId, userId, winner });
    return createdBet.save();
  }
}
