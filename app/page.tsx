import { BadgeTracker, type Badge } from "@/components/badge-tracker"

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQALxUiQ-2PXu7oNnLEF1RheNmiUbd_AHq3lKi93dfau4u7jA2xMcDgXzimVUGJTa6J6SEG5_VPu75p/pub?gid=1355428506&single=true&output=csv"

function parseCsv(csv: string) {
  return csv.trim().split(/\r?\n/).map((line) => {
    const values: string[] = []
    let value = ""
    let quoted = false

    for (let index = 0; index < line.length; index += 1) {
      const character = line[index]
      if (character === '"' && line[index + 1] === '"') {
        value += '"'
        index += 1
      } else if (character === '"') {
        quoted = !quoted
      } else if (character === "," && !quoted) {
        values.push(value.trim())
        value = ""
      } else {
        value += character
      }
    }

    values.push(value.trim())
    return values
  })
}

async function getBadges(): Promise<Badge[]> {
  try {
    const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } })
    if (!response.ok) throw new Error(`Google Sheets respondió ${response.status}`)

    const rows = parseCsv(await response.text())
    const [headers, ...data] = rows
    const records = data.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])))

    return records.filter((record) => record.badge_name).map((record, index) => {
      const isWatch = record.type === "watch"
      return {
        id: record.slug || `${record.badge_name}-${index}`,
        slug: record.slug || record.badge_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: record.badge_name,
        image: record.badge_image,
        type: isWatch ? "Tiempo visto" : "Suscripción",
        status: record.status === "active" || record.status === "upcoming" ? record.status : "inactive",
        startsAt: record.startsAt || undefined,
        endsAt: record.endsAt || "",
        claim: record.claimMethod || "Consulta los requisitos de esta insignia.",
        category: record.category || "Twitch",
        isNew: record.isNew.toLowerCase() === "true",
        notes: record.notes || undefined,
      }
    })
  } catch (error) {
    console.error("[v0] No se pudo leer Google Sheets:", error)
    return []
  }
}

export default async function Page() {
  const badges = await getBadges()
  return <BadgeTracker initialBadges={badges.length ? badges : undefined} />
}
