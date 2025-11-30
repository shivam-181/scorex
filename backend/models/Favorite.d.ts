import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        deviceId: string;
        matchId: string;
        homeTeam?: string | null;
        awayTeam?: string | null;
        date?: NativeDate | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        deviceId: string;
        matchId: string;
        homeTeam?: string | null;
        awayTeam?: string | null;
        date?: NativeDate | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    deviceId: string;
    matchId: string;
    homeTeam?: string | null;
    awayTeam?: string | null;
    date?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Favorite.d.ts.map