


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BetDocument = HydratedDocument<Bet>;

@Schema()
export class Bet {
    @Prop()
    serverId: string;

    @Prop()
    matchId: string;

    @Prop()
    userId: string;

    @Prop()
    winner: string;
}

export const BetSchema = SchemaFactory.createForClass(Bet);