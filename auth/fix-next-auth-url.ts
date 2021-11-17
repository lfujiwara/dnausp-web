const url = process.env.VERCEL_URL + "";
if (url && !url.startsWith("http")) {
  process.env.NEXTAUTH_URL = "https://" + process.env.VERCEL_URL;
}

export {};
