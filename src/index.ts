//#autoindex

// #region autoindexed files

// index last changed at: 7th Jul, 2021, 03:52 PM ( GMT-7 )
// export: named; exclusions: index, private.
// files: IDictionary, atRandom, base64, between, camelize, capitalize, dasherize, describe, deserialize, equal, first, firstKey, flatten, get, guid, hash, isEven, isLeapYear, isOdd, isUuid, keys, last, lastKey, omit, pascalize, pathJoin, pluralize, randomString, retain, serialize, set, snakerize, unique, uuid.
// directories: formatting, types.

// local file exports
export * from "./IDictionary";
export * from "./atRandom";
export * from "./base64";
export * from "./between";
export * from "./camelize";
export * from "./capitalize";
export * from "./dasherize";
export * from "./describe";
export * from "./deserialize";
export * from "./equal";
export * from "./first";
export * from "./firstKey";
export * from "./flatten";
export * from "./get";
export * from "./guid";
export * from "./hash";
export * from "./isEven";
export * from "./isLeapYear";
export * from "./isOdd";
export * from "./isUuid";
export * from "./keys";
export * from "./last";
export * from "./lastKey";
export * from "./omit";
export * from "./pascalize";
export * from "./pathJoin";
export * from "./pluralize";
export * from "./randomString";
export * from "./retain";
export * from "./serialize";
export * from "./set";
export * from "./snakerize";
export * from "./unique";
export * from "./uuid";

// directory exports
export * from "./formatting/index";
export * from "./types/index";

// Note:
// -----
// This file was created by running: "dd devops autoindex"; it assumes you have
// the 'do-devops' pkg installed as a dev dep.
//
// By default it assumes that exports are named exports but this can be changed by
// adding a modifier to the '// #autoindex' syntax:
//
//    - autoindex:named     same as default, exports "named symbols"
//    - autoindex:default   assumes each file is exporting a default export
//                          and converts the default export to the name of the
//                          file
//    - autoindex:offset    assumes files export "named symbols" but that each
//                          file's symbols should be offset by the file's name
//                          (useful for files which might symbols which collide
//                          or where the namespacing helps consumers)
//
// You may also exclude certain files or directories by adding it to the
// autoindex command. As an example:
//
//    - autoindex:named, exclude: foo,bar,baz
//
// Also be aware that all of your content outside the defined region in this file
// will be preserved in situations where you need to do something paricularly awesome.
// Keep on being awesome.

// #endregion
