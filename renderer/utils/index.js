import { usePathname } from "next/navigation";

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

export function goBack(router, page) {
  if (page) {
    router.push(page);
    window.ipc.send("navigate-home");
  } else {
    router.back();
  }
}

export function setLayoutSelected(layout) {
  if (typeof window !== "undefined") {
    localStorage.setItem("layout_selected", JSON.stringify(layout));
  }
}

export function getLayoutSelected(defaultValue = null) {
  if (typeof window === "undefined") return defaultValue;
  const item = localStorage.getItem("layout_selected");
  try {
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function getPathname() {
  const pathname = usePathname();
  const splitPathName = pathname.split("/").filter(Boolean);
  return splitPathName;
}
