export function unslugify(slug) {
  if (slug.toLowerCase() === "umkm") return "UMKM";
  if (slug.toLowerCase().startsWith("umkm-")) {
    return slug
      .replace(/^umkm/, "UMKM")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char, idx) => (idx === 0 ? char : char.toUpperCase()));
  }
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function goBack(router) {
  router.back();
}
