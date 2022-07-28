import {  Keys, Length } from "inferred-types";
import { KnownError } from "./errors";
import { find, FindResult, NotFound } from "./find";

export type FindAllExpression<P extends string, N extends readonly string[]> = (
  content: string
)=> Length<N> extends 0 ? string[][] : FindResult<P, N>[]

export type FindAllResult<N extends readonly string[]> = {
  all: string
} & Record<Keys<N>, string>

function reduceToFindAllResult<P extends string,N extends readonly string[]>(result: FindResult<P,N>) {
  const blob = {...result} as any;
  delete blob.found;
  delete blob.next;
  return blob as FindAllResult<N>;
}

function isNamedFind<P extends string, N extends readonly string[]>(result: unknown): result is FindResult<P,N> | NotFound {
  return typeof result === "object" && !Array.isArray(result)
}

function isUnnamedFind<P extends string, N extends readonly string[]>(result: unknown): result is string[] | false {
  return !isNamedFind(result);
}

export const findAll = <
  P extends string, 
  N extends readonly string[]
>(
  pattern: P,
  ...names: N
): FindAllExpression<P, N> => (content: string) => {
  let re: RegExp;
  try {
    re = new RegExp(pattern);
  } catch {
    throw new KnownError(`Invalid RegExp pattern passed into findAll(): ${pattern}`, "invalid-type/RegExp");
  }
    let result = find<P,N>(pattern, ...names)(content) as FindResult<P,N> | NotFound | false | string[];

    let output: FindAllResult<N>[] | string[][] = [];

    if(isNamedFind<P,N>(result)) {
      const results: FindAllResult<N>[] = [];
      while (result.found) {
        results.push(reduceToFindAllResult(result));
        result = result.next() as FindResult<P,N> | NotFound;
      }
      output = results;
    } 
    
    if(isUnnamedFind<P,N>(result)) {
      const results: string[][] = [];
      while(result) {
        results.push(result);
        const newContent = content.replace(result[0], "");
        result = find(pattern, ...names)(newContent) as string[] | false;
      }
      output = results;
    }
  
    return output as Length<N> extends 0 ? string[][] : FindResult<P, N>[]
}