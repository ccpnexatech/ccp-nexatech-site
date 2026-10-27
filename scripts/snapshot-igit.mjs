// Atualiza o snapshot do calendário público do GitLab da empresa (src/data/igit-calendar.json).
// O GitLab da empresa só é acessível pela rede interna: ligue a VPN, rode
// npm run snapshot:igit e faça commit do arquivo.
import { writeFileSync } from "node:fs";

const URL = "https://igit.itarget.com.br/users/caio.cp/calendar.json";
const res = await fetch(URL, { headers: { Accept: "application/json" } });
if (!res.ok) throw new Error(`iGit ${res.status}`);
const calendar = await res.json();
const sorted = Object.fromEntries(Object.entries(calendar).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync("src/data/igit-calendar.json", JSON.stringify({ source: URL, snapshotAt: new Date().toISOString(), calendar: sorted }, null, 0));
console.log(`snapshot: ${Object.keys(sorted).length} dias, ${Object.values(sorted).reduce((a, b) => a + b, 0)} contribuições`);
