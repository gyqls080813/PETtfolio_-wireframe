import * as S from "effect/Schema";

// Since Lucide React Icons are technically React components, we can't strict type them purely via primitive Effect schema easily, so we use S.Any for now.
export const SupplyItemSchema = S.Struct({
    id: S.Number,
    name: S.String,
    category: S.String,
    price: S.Number,
    pet: S.String,
    petIcon: S.Any,
    url: S.String,
    lastPurchase: S.String,
    cycle: S.Number,
    daysLeft: S.optional(S.Number),
});

export type SupplyItem = S.Schema.Type<typeof SupplyItemSchema>;
