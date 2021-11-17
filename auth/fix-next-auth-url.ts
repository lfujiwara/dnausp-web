const url = process.env.NEXTAUTH_URL + "";
if (!url.startsWith("http")) {
  process.env.NEXTAUTH_URL = "https://" + url;
}

export {};
