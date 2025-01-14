import { Injectable, Inject } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { CompleteMatchDto } from './dto/complete-match.dto';
import { Model } from 'mongoose';
import { Match } from 'src/schemas/matches/match.schema';

@Injectable()
export class MatchesService {
  constructor(
    @Inject('MATCH_MODEL')
    private matchModel: Model<Match>,
  ) { }

  async create(createMatchDto: CreateMatchDto) {
    const existing = await this.matchModel.findOne(createMatchDto).exec();
    if (existing) {
      return existing;
    }

    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }


  async complete(id: string, { winner }: CompleteMatchDto) {
    const match = await this.matchModel.findOne({ _id: id }).exec();
    if (!match) {
      return { error: "can't find matching entity" };
    }
    if (match.teamA !== winner && match.teamB !== winner) {
      return { error: "teams does not match winner", match };
    }

    match.winner = winner;
    return match.save();
  }

}
