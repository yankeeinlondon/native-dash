/**
 * Tests whether the passed in string is a valid GUID. Valid GUID's
 * must be of the format. This is typically expressed in a **RegExp** as:
 *
 * ```ts
 * /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/
 * ```
 *
 * However, the dashes are not a strict requirement, so you may choose to validate
 * using both the above format and the non-dasherized version. Default behavior is _not_
 * to allow the non-dasherized form.
 */
export function isGuid(candidate: string, allowNonDashedForm?: boolean) {
  const dasherizedGuid = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
  const plainGuid = /^(\{{0,1}([0-9a-fA-F]){32}\}{0,1})$/;

  return allowNonDashedForm === true
    ? plainGuid.test(candidate) || dasherizedGuid.test(candidate)
    : dasherizedGuid.test(candidate);
}
