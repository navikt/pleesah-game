// Gyldig hex-fargekode, med eller uten "#" og med kort (3) eller langt (6)
// format, f.eks. "abc", "#abc", "aabbcc" eller "#aabbcc".
const HEX_FARGE_REGEX = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const erGyldigHex = (hex: string) => HEX_FARGE_REGEX.test(hex);

export const fjernHashtag = (hex: string) => hex.replace(/^#/, "");
