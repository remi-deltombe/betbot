import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Bet } from 'src/schemas/bets/bet.schema';
import { Match } from 'src/schemas/matches/match.schema';

export interface UserScore {
  userId: string;
  correct: number;
  ongoing: number;
  wrong: number;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('BET_MODEL')
    private betModel: Model<Bet>,
    @Inject('MATCH_MODEL')
    private matchModel: Model<Match>,

  ) { }

  async findOne(userId: string) {
    const scores = await this.getUserScores();
    const index = scores.findIndex(s => s.userId === userId)
    return index >= 0 ? { position: index + 1, ...scores[index] } : { error: "can't find user" };
  }

  async top() {
    const scores = await this.getUserScores();
    return scores.slice(0, 10);
  }

  private async getUserScores(): Promise<UserScore[]> {
    const userIndexes: { [key: string]: number } = {};
    const matchIndexes: { [key: string]: number } = {};
    const scores: UserScore[] = [];

    const bets = await this.betModel.find({}).exec();
    const matches = await this.matchModel.find({}).exec();

    for (let i = 0; i < matches.length; ++i) {
      matchIndexes[matches[i].id] = i;
    }

    for (const bet of bets) {
      if (userIndexes[bet.userId] === undefined) {
        userIndexes[bet.userId] = scores.length;
        scores.push({ userId: bet.userId, correct: 0, wrong: 0, ongoing: 0 })
      }
      const score = scores[userIndexes[bet.userId]];
      const match = matches[matchIndexes[bet.matchId]];
      if (!match.winner) {
        score.ongoing++;
      } else if (match.winner === bet.winner) {
        score.correct++;
      }
      else {
        score.wrong++;
      }
    }

    return scores;

  }
}
