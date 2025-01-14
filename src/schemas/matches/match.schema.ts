


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {
    @Prop()
    serverId: string;

    @Prop()
    teamA: string;

    @Prop()
    teamB: string;

    @Prop()
    datetime: string;

    @Prop()
    winner: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);