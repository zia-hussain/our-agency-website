// Single source of truth for resolving an article's plain-text `author`
// field (e.g. "Zia Hussain" or "Zia Hussain & Omer Gillani") to a real
// founder identity — schema @id, founder-page URL, job title. Replaces a
// ternary that matched only the literal string "Zia Hussain" and silently
// resolved every other name (including a plain "Omer Gillani" string, by
// accident of being the `else` branch) to Omer's identity. An author not
// in this table now resolves to `null` instead of being guessed.
export interface AuthorIdentity {
  displayName: string;
  jobTitle: string;
  founderUrl: string;
  personId: string;
}

export const AUTHORS: Record<string, AuthorIdentity> = {
  "Zia Hussain": {
    displayName: "Zia Hussain",
    jobTitle: "Co-Founder & CEO",
    founderUrl: "/founders/zia-hussain",
    personId: "https://zumetrix.com/founders/zia-hussain#person",
  },
  "Omer Gillani": {
    displayName: "Omer Gillani",
    jobTitle: "Co-Founder & CTO",
    founderUrl: "/founders/omer-gillani",
    personId: "https://zumetrix.com/founders/omer-gillani#person",
  },
};

export const getAuthorIdentity = (name: string): AuthorIdentity | null => AUTHORS[name.trim()] ?? null;
