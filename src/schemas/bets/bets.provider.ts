import { Connection } from 'mongoose';
import { BetSchema } from './bet.schema';

export const betsProviders = [
    {
        provide: 'BET_MODEL',
        useFactory: (connection: Connection) => connection.model('bets', BetSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];