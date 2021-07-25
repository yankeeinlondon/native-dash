import {
  DataType,
  IDataDescriptor,
  IDictionaryDescriptor,
  isNonNullObject,
} from "~/types";

/**
 * Describes the types of the run-time data structure.
 */
export function describe(data: unknown): IDataDescriptor {
  if (!isNonNullObject(data)) {
    return data === null ? DataType.null : DataType[typeof data as keyof typeof DataType];
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return DataType.array;
    }
    // TODO: look into something more sophisticated
    const SAMPLE_SIZE = 5;
    const partial = data.slice(0, SAMPLE_SIZE);
    const elements = partial.map((p) => describe(p));
    return elements;
    // const allTheSame = elements.length === 1 || elements.slice(1).every((i) => equal());
  }

  if (Object.keys(data).length === 0) {
    return DataType.object;
  }

  const dictionary: Record<string, any> = data;
  const dataStruct: IDataDescriptor = Object.keys(dictionary).reduce((agg, key) => {
    return {
      ...agg,
      ...(isNonNullObject(dictionary[key])
        ? { [key]: describe(dictionary[key]) }
        : { [key]: typeof dictionary[key] as DataType }),
    };
  }, {} as IDictionaryDescriptor);

  return dataStruct;
}
