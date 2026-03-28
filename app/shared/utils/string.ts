const ARABIC_DIACRITICS_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const ARABIC_TATWEEL_REGEX = /\u0640/g;
const SEARCH_PUNCTUATION_REGEX = /[^\p{L}\p{N}\s]/gu;
const SEARCH_WHITESPACE_REGEX = /\s+/g;

export function normalizeArabic(text: string): string {
  if (!text) {
    return "";
  }

  return text
    .normalize("NFKC")
    .replace(ARABIC_DIACRITICS_REGEX, "")
    .replace(ARABIC_TATWEEL_REGEX, "")
    .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627")
    .replace(/\u0624/g, "\u0648")
    .replace(/\u0626/g, "\u064A")
    .replace(/[\u0629\u0647]/g, "\u0647")
    .replace(/[\u0649\u064A]/g, "\u064A")
    .replace(/\u0621/g, "");
}

export function normalizeArabicSearchText(text: string): string {
  return normalizeArabic(text.toLowerCase())
    .replace(SEARCH_PUNCTUATION_REGEX, " ")
    .replace(SEARCH_WHITESPACE_REGEX, " ")
    .trim();
}

export function compactArabicSearchText(text: string): string {
  return normalizeArabicSearchText(text).replace(/\s/g, "");
}

const isSubsequence = (source: string, query: string) => {
  if (!query) {
    return true;
  }

  let sourceIndex = 0;
  let queryIndex = 0;

  while (sourceIndex < source.length && queryIndex < query.length) {
    if (source[sourceIndex] === query[queryIndex]) {
      queryIndex += 1;
    }

    sourceIndex += 1;
  }

  return queryIndex === query.length;
};

export function getArabicSearchScore(sourceText: string, queryText: string): number {
  const normalizedSource = normalizeArabicSearchText(sourceText);
  const normalizedQuery = normalizeArabicSearchText(queryText);

  if (!normalizedSource || !normalizedQuery) {
    return 0;
  }

  const compactSource = compactArabicSearchText(normalizedSource);
  const compactQuery = compactArabicSearchText(normalizedQuery);

  if (normalizedSource === normalizedQuery || compactSource === compactQuery) {
    return 1200;
  }

  if (normalizedSource.startsWith(normalizedQuery)) {
    return 1000 - Math.max(0, normalizedSource.length - normalizedQuery.length);
  }

  const sourceTokens = normalizedSource.split(" ");
  const queryTokens = normalizedQuery.split(" ").filter(Boolean);

  const exactTokenMatch = sourceTokens.some((token) => token === normalizedQuery);
  if (exactTokenMatch) {
    return 930;
  }

  const prefixTokenMatch = sourceTokens.some((token) => token.startsWith(normalizedQuery));
  if (prefixTokenMatch) {
    return 860;
  }

  const allTokensFound = queryTokens.length > 1
    && queryTokens.every((token) => sourceTokens.some((sourceToken) => sourceToken.includes(token)));

  if (allTokensFound) {
    return 760 + queryTokens.length * 10;
  }

  if (normalizedSource.includes(normalizedQuery)) {
    return 720 - Math.max(0, normalizedSource.indexOf(normalizedQuery));
  }

  if (compactQuery.length >= 2 && compactSource.includes(compactQuery)) {
    return 640 - Math.max(0, compactSource.indexOf(compactQuery));
  }

  if (compactQuery.length >= 3 && isSubsequence(compactSource, compactQuery)) {
    return 420;
  }

  return 0;
}

export function toDomSafeId(value: string, prefix: string = "id"): string {
  const normalized = value.trim();
  if (!normalized) return prefix;

  const safeBody = Array.from(normalized)
    .map((char) => {
      if (/[a-z0-9]/i.test(char)) {
        return char.toLowerCase();
      }

      if (/\s/.test(char)) {
        return "-";
      }

      return char.codePointAt(0)?.toString(16) ?? "";
    })
    .join("")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${prefix}-${safeBody || "section"}`;
}
