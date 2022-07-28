import { createError } from "brilliant-errors";

export const [KnownError, isKnownError] = createError("KnownError", "NativeDash")("cardinality","network","invalid-type", "missing-resource", "not-allowed")()()();

export const [UnknownError, isUnknownError] = createError("KnownError", "NativeDash")()()()();