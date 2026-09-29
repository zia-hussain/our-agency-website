// The opaque reference used by /product-rescue/confirmed. Not a sequential
// ID, not an Airtable record ID (Section 12: don't expose either) — a
// standalone random value that exists only to look a record up, generated
// once at application time and never derivable from anything else about the
// applicant.
import { randomBytes } from "node:crypto";

// 18 random bytes, base64url-encoded -> 24 characters, no padding, URL-safe
// as-is. ~144 bits of entropy: not guessable by trying values.
export const generateReferenceToken = () => randomBytes(18).toString("base64url");

// Every caller that interpolates a token into an Airtable filterByFormula
// string (api/_lib/airtable.js's airtableFindByField) MUST run it through
// this first. base64url's alphabet (A-Z a-z 0-9 - _) contains no quote or
// formula-control characters, so a token that matches this shape can never
// break out of the `{Field}="<token>"` formula it gets embedded into.
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{20,40}$/;
export const isValidReferenceToken = (value) => typeof value === "string" && TOKEN_PATTERN.test(value);
