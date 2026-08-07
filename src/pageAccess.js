// Pages Licensed users can already reach without any admin grant.
export const LICENSED_AUTO_PAGES = [
  "/more/register-accounts",
  "/rollovers",
  "/license",
  "/after-license-setups",
  "/videos/illustrations",
  "/videos/application",
];

// Step 3 (Presentation) and Step 4 (Follow Up) have no page-level grant of
// their own — access to the page is implied by holding a grant for any one
// of its tabs, and only the granted tab(s) are shown once inside.
export const TAB_SCOPED_PAGES = {
  "/step3": ["/step3#bop", "/step3#sop"],
  "/step4": ["/step4#fna", "/step4#fls", "/step4#business"],
  "/license": ["/license#before"],
};

export function canAccessPage(granted, pathname) {
  const tabKeys = TAB_SCOPED_PAGES[pathname];
  if (tabKeys) return tabKeys.some((key) => granted.includes(key));
  return granted.includes(pathname);
}

function currentGrantedPages() {
  try {
    return JSON.parse(localStorage.getItem("granted_pages") || "[]");
  } catch {
    return [];
  }
}

export function hasTabAccess(key) {
  const role = localStorage.getItem("role");
  if (role !== "New Member" && role !== "Licensed") return true;
  return currentGrantedPages().includes(key);
}
