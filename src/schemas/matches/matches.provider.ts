import { Connection } from 'mongoose';
import { MatchSchema } from './match.schema';

export const matchesProviders = [
    {
        provide: 'MATCH_MODEL',
        useFactory: (connection: Connection) => connection.model('matches', MatchSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];