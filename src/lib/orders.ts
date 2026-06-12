/**
 * A deliberately tiny order store.
 *
 * Real apps persist orders to a database. For a local integration test we just
 * need somewhere the webhook can record "this reference paid" and the success
 * page can read it back. We use a JSON file under `.data/` (git-ignored), with
 * an in-memory cache so repeated reads in the same process are cheap.
 *
 * This is intentionally NOT production-grade persistence — swap it for your DB.
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'

export interface RecordedOrder {
  /** The opaque reference we minted at checkout and matched from the webhook. */
  reference: string
  /** Lemon Squeezy event name, e.g. "order_created" or "subscription_created". */
  event: string
  status: string
  productName: string
  customerEmail: string
  /** Total in the order's currency, formatted for display (e.g. "$29.00"). */
  total: string
  /** ISO timestamp recorded when the webhook arrived. */
  receivedAt: string
}

const DATA_DIR = path.join(process.cwd(), '.data')
const STORE_FILE = path.join(DATA_DIR, 'orders.json')

type Store = Record<string, RecordedOrder>

let cache: Store | null = null

async function readStore(): Promise<Store> {
  if (cache) return cache
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf8')
    cache = JSON.parse(raw) as Store
  } catch {
    cache = {}
  }
  return cache
}

async function writeStore(store: Store): Promise<void> {
  cache = store
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2), 'utf8')
}

/** Record (or overwrite) an order keyed by its reference. */
export async function saveOrder(order: RecordedOrder): Promise<void> {
  const store = await readStore()
  store[order.reference] = order
  await writeStore(store)
}

/** Look up an order by the reference we issued at checkout. */
export async function getOrder(reference: string): Promise<RecordedOrder | null> {
  const store = await readStore()
  return store[reference] ?? null
}
