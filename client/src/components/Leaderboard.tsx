import React, { useEffect, useState } from 'react'

interface LeaderboardItem {
  name: string
  wins: number
  losses: number
  draws: number
  gamesPlayed: number
}

export const Leaderboard = () => {
  const [items, setItems] = useState<LeaderboardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:3000/stats')
        if (!res.ok) {
          throw new Error(`Failed to load leaderboard: ${res.statusText}`)
        }
        const data = await res.json()
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="p-4 rounded-2xl border bg-white text-sm">Loading leaderboard…</div>
  }

  if (error) {
    return <div className="p-4 rounded-2xl border bg-white text-sm text-red-600">{error}</div>
  }

  return (
    <div className="w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 text-lg font-semibold">Leaderboard</div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-slate-600">No results yet.</div>
        ) : (
          items.map((item) => (
            <div key={item.name} className="rounded-lg border border-slate-200 p-3">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-slate-600">
                Wins: {item.wins} · Losses: {item.losses}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
