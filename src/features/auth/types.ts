// auth 도메인 타입 정의 (Effect Schema)
import * as S from "effect/Schema";

export const LoginSchema = S.Struct({
    email: S.String,
    password: S.String,
});

export const UserSchema = S.Struct({
    id: S.String,
    name: S.String,
    email: S.String,
});

export type LoginInput = S.Schema.Type<typeof LoginSchema>;
export type User = S.Schema.Type<typeof UserSchema>;
