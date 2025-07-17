const envText = await Bun.file("./.example.env").text();

let publicENV = "";
let privateENV = "";

for (const line of envText.split("\n")) {
  const entries = line.split("=");
  const key = entries[0]?.trim();
  // const value = entries[1]?.trim();
  if (!key) continue;
  if (key.startsWith("NEXT_PUBLIC")) {
    publicENV = publicENV.concat(`\n      ${key}: string;`);
  }

  privateENV = privateENV.concat(`\n  ${key}: string;`);
}

await Bun.write(
  "./enviroment.d.ts",
  `export type PUBLIC_ENV =
  | (Record<string, string> & {
      NEXT_PUBLIC_APP_ENV: "prod" | "local";${publicENV}
    })
  | undefined;

export type PRIVATE_ENV = {
  NEXT_PUBLIC_APP_ENV: "prod" | "local";
  NODE_ENV: "development" | "production";${privateENV}
};
`,
);
