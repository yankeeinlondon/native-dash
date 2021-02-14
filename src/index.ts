//#autoindex

// #region autoindexed files

// index last changed at: 2nd Feb, 2021, 02:57 PM ( GMT-8 )
// export: named; exclusions: index, private.
// files: IDictionary, atRandom, between, camelize, capitalize, dasherize, deserialize, first, firstKey, flatten, get, guid, hash, isLeapYear, isUuid, last, lastKey, pascalize, pathJoin, pluralize, randomString, serialize, set, snakerize, unique, uuid.
// directories: formatting.

// local file exports
export * from "./IDictionary";
export * from "./atRandom";
export * from "./between";
export * from "./camelize";
export * from "./capitalize";
export * from "./dasherize";
export * from "./deserialize";
export * from "./first";
export * from "./firstKey";
export * from "./flatten";
export * from "./get";
export * from "./guid";
export * from "./hash";
export * from "./isLeapYear";
export * from "./isUuid";
export * from "./last";
export * from "./lastKey";
export * from "./pascalize";
export * from "./pathJoin";
export * from "./pluralize";
export * from "./randomString";
export * from "./serialize";
export * from "./set";
export * from "./snakerize";
export * from "./unique";
export * from "./uuid";

// directory exports
export * from "./formatting/index";

// Note:
// -----
// This file was created by running: "do devops autoindex"; it assumes you have
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
