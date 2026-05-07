import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import './styles/PremiumLeaderboard.css'

const weeklyData = [
  { rank: 1, name: 'User6', college: 'Delhi University', xp: 17054, reviews: 154, badge: 'Legend', streak: 23 },
  { rank: 2, name: 'User19', college: 'BITS Pilani', xp: 15080, reviews: 68, badge: 'Rookie', streak: 7 },
  { rank: 3, name: 'User20', college: 'NIT Trichy', xp: 13136, reviews: 143, badge: 'Rookie', streak: 25 },
  { rank: 4, name: 'User5', college: 'NIT Trichy', xp: 13029, reviews: 143, badge: 'Legend', streak: 15 },
  { rank: 5, name: 'User11', college: 'IIT Bombay', xp: 12450, reviews: 112, badge: 'Pro', streak: 18 },
  { rank: 6, name: 'User33', college: 'IIM Ahmedabad', xp: 11870, reviews: 98, badge: 'Pro', streak: 9 },
  { rank: 7, name: 'User8', college: 'Delhi University', xp: 11200, reviews: 87, badge: 'Rookie', streak: 31 },
  { rank: 8, name: 'User44', college: 'VIT Vellore', xp: 10780, reviews: 76, badge: 'Rookie', streak: 5 },
  { rank: 9, name: 'User2', college: 'IIT Delhi', xp: 10340, reviews: 134, badge: 'Legend', streak: 22 },
  { rank: 10, name: 'User77', college: 'BITS Pilani', xp: 9980, reviews: 61, badge: 'Rookie', streak: 38 },
  { rank: 11, name: 'User14', college: 'IIT Madras', xp: 9650, reviews: 89, badge: 'Pro', streak: 12 },
  { rank: 12, name: 'User23', college: 'Jadavpur Univ', xp: 9200, reviews: 105, badge: 'Pro', streak: 42 },
  { rank: 13, name: 'User55', college: 'NIT Surathkal', xp: 8750, reviews: 72, badge: 'Rookie', streak: 8 },
  { rank: 14, name: 'User31', college: 'IIIT Hyderabad', xp: 8400, reviews: 58, badge: 'Rookie', streak: 3 },
  { rank: 15, name: 'User88', college: 'Manipal Univ', xp: 8100, reviews: 91, badge: 'Pro', streak: 20 },
]

const monthlyData = [
  { rank: 1, name: 'User2', college: 'IIT Delhi', xp: 18620, reviews: 210, badge: 'Legend', streak: 28 },
  { rank: 2, name: 'User6', college: 'Delhi University', xp: 17240, reviews: 198, badge: 'Legend', streak: 21 },
  { rank: 3, name: 'User77', college: 'BITS Pilani', xp: 16470, reviews: 186, badge: 'Pro', streak: 34 },
  { rank: 4, name: 'User11', college: 'IIT Bombay', xp: 15340, reviews: 139, badge: 'Legend', streak: 19 },
  { rank: 5, name: 'User23', college: 'Jadavpur Univ', xp: 14910, reviews: 165, badge: 'Pro', streak: 41 },
  { rank: 6, name: 'User19', college: 'BITS Pilani', xp: 14630, reviews: 120, badge: 'Rookie', streak: 13 },
  { rank: 7, name: 'User31', college: 'IIIT Hyderabad', xp: 13250, reviews: 106, badge: 'Rookie', streak: 9 },
  { rank: 8, name: 'User44', college: 'VIT Vellore', xp: 12740, reviews: 95, badge: 'Rookie', streak: 8 },
  { rank: 9, name: 'User14', college: 'IIT Madras', xp: 12470, reviews: 118, badge: 'Pro', streak: 14 },
  { rank: 10, name: 'User33', college: 'IIM Ahmedabad', xp: 12080, reviews: 101, badge: 'Pro', streak: 12 },
  { rank: 11, name: 'User20', college: 'NIT Trichy', xp: 11840, reviews: 130, badge: 'Rookie', streak: 22 },
  { rank: 12, name: 'User5', college: 'NIT Trichy', xp: 11590, reviews: 117, badge: 'Legend', streak: 16 },
  { rank: 13, name: 'User8', college: 'Delhi University', xp: 11050, reviews: 103, badge: 'Rookie', streak: 27 },
  { rank: 14, name: 'User55', college: 'NIT Surathkal', xp: 10430, reviews: 88, badge: 'Rookie', streak: 11 },
  { rank: 15, name: 'User88', college: 'Manipal Univ', xp: 9900, reviews: 96, badge: 'Pro', streak: 17 },
]

const allTimeData = [
  { rank: 1, name: 'User11', college: 'IIT Bombay', xp: 345960, reviews: 4230, badge: 'Legend', streak: 58 },
  { rank: 2, name: 'User2', college: 'IIT Delhi', xp: 332100, reviews: 4112, badge: 'Legend', streak: 60 },
  { rank: 3, name: 'User6', college: 'Delhi University', xp: 319420, reviews: 3988, badge: 'Legend', streak: 55 },
  { rank: 4, name: 'User23', college: 'Jadavpur Univ', xp: 292180, reviews: 3745, badge: 'Legend', streak: 49 },
  { rank: 5, name: 'User20', college: 'NIT Trichy', xp: 281040, reviews: 3580, badge: 'Pro', streak: 45 },
  { rank: 6, name: 'User5', college: 'NIT Trichy', xp: 258340, reviews: 3330, badge: 'Pro', streak: 40 },
  { rank: 7, name: 'User77', college: 'BITS Pilani', xp: 242860, reviews: 3210, badge: 'Pro', streak: 47 },
  { rank: 8, name: 'User8', college: 'Delhi University', xp: 231500, reviews: 2988, badge: 'Rookie', streak: 33 },
  { rank: 9, name: 'User14', college: 'IIT Madras', xp: 224700, reviews: 2895, badge: 'Pro', streak: 37 },
  { rank: 10, name: 'User33', college: 'IIM Ahmedabad', xp: 213900, reviews: 2742, badge: 'Pro', streak: 29 },
  { rank: 11, name: 'User19', college: 'BITS Pilani', xp: 206480, reviews: 2680, badge: 'Rookie', streak: 28 },
  { rank: 12, name: 'User31', college: 'IIIT Hyderabad', xp: 198700, reviews: 2500, badge: 'Rookie', streak: 24 },
  { rank: 13, name: 'User44', college: 'VIT Vellore', xp: 191420, reviews: 2315, badge: 'Rookie', streak: 21 },
  { rank: 14, name: 'User55', college: 'NIT Surathkal', xp: 186100, reviews: 2201, badge: 'Rookie', streak: 19 },
  { rank: 15, name: 'User88', college: 'Manipal Univ', xp: 179800, reviews: 2084, badge: 'Pro', streak: 20 },
]

const badgeClass = (badge) => {
  if (badge === 'Legend') return 'badge-legend'
  if (badge === 'Pro') return 'badge-pro'
  return 'badge-rookie'
}

const getInitials = (name) =>
  name
    .split(' ')
    .map((segment) => segment[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const PremiumLeaderboard = () => {
  const { theme } = useTheme()
  const [selectedTab, setSelectedTab] = useState('weekly')
  const [selectedRank, setSelectedRank] = useState(1)
  const [showTable, setShowTable] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const currentUser = useMemo(
    () => ({
      id: 248,
      name: 'You',
      college: 'Delhi University',
      xp: 2450,
      rank: 248,
      streak: 14,
      level: 5,
    }),
    [],
  )

  const leaderboardData = useMemo(() => {
    if (selectedTab === 'monthly') return monthlyData
    if (selectedTab === 'all-time') return allTimeData
    return weeklyData
  }, [selectedTab])

  const top3 = leaderboardData.slice(0, 3)
  const top100 = leaderboardData.slice(0, 100)

  const handleTabSelect = (tab) => {
    if (tab !== selectedTab) {
      setShowTable(false)
      setSelectedTab(tab)
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowTable(true)
    }, 120)
    return () => window.clearTimeout(timeout)
  }, [selectedTab])

  const containerStyle = {
    marginLeft: isSidebarOpen ? '220px' : '90px',
  }

  return (
    <>
      <Navbar
        onNotificationsToggle={() => {}}
        userData={{
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        }}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        userData={{
          name: 'user',
          college: 'Delhi University',
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        }}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      <main className={`premium-leaderboard page-${theme}`} style={containerStyle}>
        <section className="leaderboard-hero">
          <div className="hero-copy">
            <div className="hero-title">Campus Food Legends</div>
            <div className="hero-subtitle">Compete with top food explorers across campuses in premium leaderboard style.</div>
            <div className="leaderboard-tabs">
              {['weekly', 'monthly', 'all-time'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`leaderboard-tab ${selectedTab === tab ? 'active' : ''}`}
                  onClick={() => handleTabSelect(tab)}
                >
                  {tab.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-stats-card">
            <div className="hero-stats-label">Your Rank</div>
            <div className="hero-stats-rank">#{currentUser.rank}</div>
            <div className="hero-stats-xp">{currentUser.xp.toLocaleString()} XP</div>
            <div className="hero-stats-row">🔥 {currentUser.streak}-Day Streak</div>
            <div className="hero-stats-row">Level {currentUser.level} Food Explorer</div>
          </div>
        </section>

        <section className="leaderboard-grid">
          <div className="podium-card-wrapper">
            <div className="podium-section">
              <div className="podium-label">Top Podium</div>
              <div className="podium-stage">
                {top3.map((player) => {
                  const isSelected = selectedRank === player.rank
                  const barHeight = Math.max(72, Math.round((player.xp / top3[0].xp) * 158))
                  return (
                    <button
                      key={player.rank}
                      type="button"
                      className={`podium-col rank-${player.rank} ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedRank(player.rank)}
                    >
                      <div className={`podium-info ${isSelected ? 'visible' : ''}`}>
                        <div className="rank-badge">{player.rank === 1 ? '👑' : player.rank}</div>
                        <div className="avatar">{getInitials(player.name)}</div>
                        <div className="pname">{player.name}</div>
                        <div className="pcollege">{player.college}</div>
                        <div className="pxp">{player.xp.toLocaleString()} XP</div>
                      </div>
                      <div className="podium-bar" style={{ height: `${barHeight}px` }}>
                        <div className="podium-rank-num">{player.rank}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <aside className="leaderboard-sidebar">
            <div className="info-card">
              <div className="info-heading">Your Highlights</div>
              <div className="info-row">Longest streak: <strong>42 days</strong></div>
              <div className="info-row">Most active: <strong>User23</strong></div>
              <div className="info-row">Rising challenger: <strong>User77</strong></div>
            </div>
            <div className="info-card">
              <div className="info-heading">Daily Challenges</div>
              <div className="challenge-item">Review 1 stall</div>
              <div className="challenge-item">Try a new cuisine</div>
              <div className="challenge-item">Claim 50 XP</div>
            </div>
          </aside>
        </section>

        <section className="leaderboard-table-section">
          <div className="table-header">
            <div>
              <div className="table-title">Top 100 Leaderboard</div>
              <div className="table-subtitle">Current {selectedTab.replace('-', ' ')} rankings</div>
            </div>
          </div>
          <div className="table-shell">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>College</th>
                  <th>XP</th>
                  <th>Reviews</th>
                  <th>Badge</th>
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {top100.map((player, index) => (
                  <tr key={player.rank} className={showTable ? 'visible' : ''} style={{ transitionDelay: `${index * 20}ms` }}>
                    <td className={`rank-cell ${player.rank === 1 ? 'top1' : player.rank <= 3 ? 'top3' : ''}`}>#{player.rank}</td>
                    <td>
                      <div className="user-cell">
                        <div className="user-icon">{getInitials(player.name)}</div>
                        <div>
                          <div className="user-name">{player.name}</div>
                          <div className="college-cell">{player.college}</div>
                        </div>
                      </div>
                    </td>
                    <td>{player.college}</td>
                    <td>{player.xp.toLocaleString()} XP</td>
                    <td>{player.reviews}</td>
                    <td><span className={`badge-pill ${badgeClass(player.badge)}`}>{player.badge}</span></td>
                    <td>{player.streak} 🔥</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Footer variant="leaderboard" />
      </main>
    </>
  )
}

export default PremiumLeaderboard
