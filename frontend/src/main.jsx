import { StrictMode } from 'react'
import { useEffect } from 'react'
import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import './globals.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'
import ExpFood from './Exp-Food.jsx'
import Chat from './components/sections/chat'
import Reward from './Reward.jsx'
import Features from './Features.jsx'
import Work from './Work.jsx'
import Contact from './Contact.jsx'
import Events from './Events.jsx'
import Community from './Community.jsx'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PremiumLeaderboard from './PremiumLeaderboard.jsx'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute.jsx'
import AdminRoute from './AdminRoute.jsx'
import PendingVerification from './PendingVerification.jsx'
import AdminVerifications from './AdminVerifications.jsx'
import AddReview from './AddReview.jsx'
import AddStall from './AddStall.jsx'

const { createRoot } = ReactDOMClient

// Leaderboard Page Component
// eslint-disable-next-line react-refresh/only-export-components
function LeaderboardPage() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('weekly');
  const [users, setUsers] = React.useState([]);
  const sidebarUserData = React.useMemo(
    () => ({
      name: 'user',
      college: 'Delhi University',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    }),
    [],
  );
  const currentUser = React.useMemo(()=>({
    id: 248,
    name: 'You',
    college: 'Delhi University',
    xp: 2450,
    rank: 248,
    streak: 14,
    level: 5,
  }),[]);

  // Theme-aware styles
  const themeStyles = React.useMemo(() => ({
    isDark: theme === 'dark',
    bgGradient: theme === 'dark' ? 'linear-gradient(180deg,#020617 0%, #030922 60%)' : 'linear-gradient(180deg,#f5f5f7 0%, #f2eee7 60%)',
    textColor: theme === 'dark' ? '#F8FAFC' : '#1f2937',
    textSecondary: theme === 'dark' ? '#94A3B8' : '#5a5550',
    cardBg: theme === 'dark' ? 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' : 'linear-gradient(180deg, rgba(65,54,45,0.03), rgba(65,54,45,0.01))',
    cardBorder: theme === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(65, 54, 45, 0.15)',
    tableHeaderBg: theme === 'dark' ? '#64748B' : '#8a6b4f',
  }), [theme]);

  React.useEffect(()=>{
    setLoading(true);
    const t = setTimeout(()=>{
      const mockUsers = [];
      for (let i = 0; i < 120; i++) {
        const xp = Math.max(50, Math.round((120 - i) * (Math.random()*120 + 30)));
        mockUsers.push({
          id: i+1,
          name: `User${i+1}`,
          college: ['Delhi University','IIT Bombay','AIIMS Delhi','BITS Pilani','NIT Trichy'][i%5],
          xp,
          reviews: Math.round(Math.random()*250),
          badge: ['Rookie','Explorer','Scout','Critic','Legend'][Math.floor(Math.random()*5)],
          streak: Math.floor(Math.random()*30),
          level: Math.min(12, Math.max(1, Math.floor(xp/800))),
          movement: (Math.floor(Math.random()*11)-5),
        });
      }
      mockUsers.sort((a,b)=> b.xp - a.xp);
      setUsers(mockUsers.map((u, idx) => ({...u, rank: idx+1})));
      setLoading(false);
    }, 700);
    return ()=>clearTimeout(t);
  },[]);

  const top100 = users.slice(0,100);
  const top3 = users.slice(0,3);

  return (
    <>
      <Navbar 
        onNotificationsToggle={() => {}} 
        userData={{ 
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
        }} 
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        userData={sidebarUserData}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      <div
        style={{
          marginLeft: isSidebarOpen ? '220px' : '90px',
          transition: 'margin-left 0.38s ease-in-out',
          padding: '28px',
          minHeight: '100vh',
          background: themeStyles.bgGradient,
          color: themeStyles.textColor,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        }}
      >
      <div style={{display:'flex', gap:'18px', alignItems:'stretch', marginBottom:'22px'}}>
        <div style={{flex:1, padding:'20px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)', borderRadius:'12px'}}>
          <div style={{fontSize:'24px', fontWeight:700}}>🏆 Campus Food Legends</div>
          <div style={{color:'#64748B', marginTop:'6px'}}>Compete with top food explorers across campuses</div>
          <div style={{marginTop:'12px', display:'flex', gap:'8px'}}>
            <button style={{background:filter==='weekly'? 'linear-gradient(90deg, #7C3AED, #06B6D4)':'transparent', border:filter==='weekly'? '0':'1px solid rgba(255,255,255,0.04)', color: filter==='weekly'?'#020617':'#94A3B8', padding:'6px 10px', borderRadius:'8px', cursor:'pointer'}} onClick={()=>setFilter('weekly')}>Weekly</button>
            <button style={{background:filter==='monthly'? 'linear-gradient(90deg, #7C3AED, #06B6D4)':'transparent', border:filter==='monthly'? '0':'1px solid rgba(255,255,255,0.04)', color: filter==='monthly'?'#020617':'#94A3B8', padding:'6px 10px', borderRadius:'8px', cursor:'pointer'}} onClick={()=>setFilter('monthly')}>Monthly</button>
            <button style={{background:filter==='all-time'? 'linear-gradient(90deg, #7C3AED, #06B6D4)':'transparent', border:filter==='all-time'? '0':'1px solid rgba(255,255,255,0.04)', color: filter==='all-time'?'#020617':'#94A3B8', padding:'6px 10px', borderRadius:'8px', cursor:'pointer'}} onClick={()=>setFilter('all-time')}>All-Time</button>
          </div>
        </div>
        <div style={{width:'260px', padding:'18px', display:'flex', flexDirection:'column', gap:'8px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)', borderRadius:'12px', boxShadow: '0 6px 20px rgba(6,182,212,0.06)'}}>
          <div style={{fontSize:'18px', fontWeight:700, color:'#FACC15'}}>#{currentUser.rank}</div>
          <div style={{fontSize:'13px', fontWeight:500}}>{currentUser.xp} XP</div>
          <div style={{fontSize:'13px', fontWeight:500}}>{currentUser.streak}-Day Streak 🔥</div>
          <div style={{fontSize:'13px', fontWeight:500}}>Level {currentUser.level} Food Explorer</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns: '1fr 320px', gap:'18px'}}>
        <div>
          <h3 style={{margin:0, marginBottom:'12px', fontWeight:700, fontSize:'18px'}}>Top Podium</h3>
          <div style={{display:'flex', gap:'18px', alignItems:'flex-end', justifyContent:'center', padding:'12px'}}>
            {!loading && top3.length > 1 && (
              <div style={{width:'140px', height:'220px', display:'flex', flexDirection:'column', alignItems:'center', padding:'12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', borderRadius:'12px'}}>
                <div style={{fontWeight:700, marginBottom:'6px', fontSize:'16px'}}>2</div>
                <div style={{width:'64px',height:'64px',borderRadius:'999px',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'22px',marginTop:'6px'}}>{top3[1].name[0]}</div>
                <div style={{fontWeight:700, marginTop:'6px', fontSize:'13px'}}>{top3[1].name}</div>
                <div style={{fontSize:'11px', color:'#94A3B8', fontWeight:500}}>{top3[1].college}</div>
                <div>{top3[1].xp} XP</div>
              </div>
            )}
            {!loading && top3[0] && (
              <div style={{width:'180px', height:'260px', display:'flex', flexDirection:'column', alignItems:'center', padding:'12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(250,204,21,0.12)', borderRadius:'12px', transform:'translateY(-14px) scale(1.06)', boxShadow: '0 12px 40px rgba(250,204,21,0.06)'}}>
                <div style={{fontSize:'20px', marginBottom:'6px'}}>👑</div>
                <div style={{fontWeight:700, marginBottom:'6px', fontSize:'16px'}}>1</div>
                <div style={{width:'64px',height:'64px',borderRadius:'999px',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'22px',marginTop:'6px'}}>{top3[0].name[0]}</div>
                <div style={{fontWeight:700, marginTop:'6px', fontSize:'13px'}}>{top3[0].name}</div>
                <div style={{fontSize:'11px', color:'#94A3B8', fontWeight:500}}>{top3[0].college}</div>
                <div>{top3[0].xp} XP</div>
              </div>
            )}
            {!loading && top3.length > 2 && (
              <div style={{width:'140px', height:'220px', display:'flex', flexDirection:'column', alignItems:'center', padding:'12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', borderRadius:'12px'}}>
                <div style={{fontWeight:700, marginBottom:'6px', fontSize:'16px'}}>3</div>
                <div style={{width:'64px',height:'64px',borderRadius:'999px',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'22px',marginTop:'6px'}}>{top3[2].name[0]}</div>
                <div style={{fontWeight:700, marginTop:'6px', fontSize:'13px'}}>{top3[2].name}</div>
                <div style={{fontSize:'11px', color:'#94A3B8', fontWeight:500}}>{top3[2].college}</div>
                <div>{top3[2].xp} XP</div>
              </div>
            )}
          </div>

          <h3 style={{margin:'20px 0 12px', fontWeight:700, fontSize:'18px'}}>Top 100 Leaderboard</h3>
          <div style={{padding:'12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', borderRadius:'12px'}}>
            {loading ? <div>Loading leaderboard...</div> : (
              <table style={{width:'100%', borderCollapse:'collapse', color:'#F8FAFC', fontSize:'13px', fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
                <thead>
                  <tr>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>Rank</th>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>User</th>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>College</th>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>XP</th>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>Reviews</th>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>Badge</th>
                    <th style={{textAlign:'left', padding:'10px 8px', color:'#64748B', fontWeight:600, fontSize:'12px'}}>Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {top100.map(u=>(
                    <tr key={u.id} style={{borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                      <td style={{padding:'12px 8px', fontWeight:700, fontSize:'13px'}}>#{ u.rank}</td>
                      <td style={{padding:'12px 8px', display:'flex', alignItems:'center', gap:'10px'}}>
                        <div style={{width:'40px',height:'40px',borderRadius:'8px',background:'linear-gradient(135deg,#7C3AED,#06B6D4)', display:'flex',alignItems:'center',justifyContent:'center', color:'#fff', fontWeight:700}}>{u.name[0]}</div>
                        {u.name}
                      </td>
                      <td style={{padding:'12px 8px', fontSize:'13px', fontWeight:500}}>{u.college}</td>
                      <td style={{padding:'12px 8px', fontSize:'13px', fontWeight:500}}>{u.xp} XP</td>
                      <td style={{padding:'12px 8px', fontSize:'13px', fontWeight:500}}>{u.reviews}</td>
                      <td style={{padding:'12px 8px'}}><span style={{background:'rgba(124,58,237,0.1)', padding:'2px 6px', borderRadius:'4px', fontSize:'12px', fontWeight:500}}>{u.badge}</span></td>
                      <td style={{padding:'12px 8px', fontSize:'13px', fontWeight:500}}>{u.streak} 🔥</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <aside>
          <div style={{padding:'12px', marginBottom:'12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', borderRadius:'12px', boxShadow: '0 6px 20px rgba(6,182,212,0.06)'}}>
            <h5 style={{margin:0, marginBottom:'8px', fontWeight:700, fontSize:'14px'}}>Achievements</h5>
            <ul style={{margin:0, paddingLeft:'20px', fontSize:'13px', fontWeight:500}}>
              <li>Longest streak: 42 days</li>
              <li>Most active: User23</li>
              <li>Rising: User77 (+38)</li>
            </ul>
          </div>
          <div style={{padding:'12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)', borderRadius:'12px'}}>
            <h5 style={{margin:0, marginBottom:'8px', fontWeight:700, fontSize:'14px'}}>Daily Challenges</h5>
            <ol style={{margin:0, paddingLeft:'20px', fontSize:'13px', fontWeight:500}}>
              <li>Review 1 stall</li>
              <li>Try cuisine</li>
              <li>Claim 50 XP</li>
            </ol>
          </div>
        </aside>
      </div>
      <Footer variant="leaderboard" />
      </div>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function ButtonClickFeedback() {
  useEffect(() => {
    const timers = new Map()

    const handleButtonClick = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }

      const button = event.target.closest('button')
      if (!button || button.disabled) {
        return
      }

      const existingTimer = timers.get(button)
      if (existingTimer) {
        window.clearTimeout(existingTimer)
      }

      button.classList.remove('button-click-loading')
      void button.offsetWidth
      button.classList.add('button-click-loading')

      const timeoutId = window.setTimeout(() => {
        button.classList.remove('button-click-loading')
        timers.delete(button)
      }, 550)

      timers.set(button, timeoutId)
    }

    document.addEventListener('click', handleButtonClick, true)

    return () => {
      document.removeEventListener('click', handleButtonClick, true)
      timers.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [])

  return null
}

function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: '#f8fafc',
        fontSize: '1.1rem',
        fontWeight: 600,
      }}>
        Loading BiteVerse...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ButtonClickFeedback />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/features" element={<Features />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pending-verification" element={<ProtectedRoute><PendingVerification /></ProtectedRoute>} />
        <Route path="/admin/verifications" element={<AdminRoute><AdminVerifications /></AdminRoute>} />
        <Route path="/reviews/new" element={<ProtectedRoute><AddReview /></ProtectedRoute>} />
        <Route path="/stalls/new" element={<ProtectedRoute><AddStall /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard userRole="student" /></ProtectedRoute>} />
        <Route path="/explore-food" element={<ProtectedRoute><ExpFood /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><Reward /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><PremiumLeaderboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
