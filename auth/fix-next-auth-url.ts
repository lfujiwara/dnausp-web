const url = process.env.VERCEL_URL + "";
if (!process.env.NEXTAUTH_URL && url && !url.startsWith("http")) {
  process.env.NEXTAUTH_URL = "https://" + process.env.VERCEL_URL;
}

export {};
