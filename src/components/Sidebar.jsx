import React from 'react'
import SideMenus from './SideMenus.jsx'
import Logo from '../assets/Images/logo.png'
import Copyrights from '../components/Copyrights.jsx'
import Setting from '../components/Setting.jsx'
import { useNavigate } from 'react-router-dom'
import Help from '../components/Help.jsx'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { MoreVertical, PanelLeft, Copyright, HelpCircle, LogIn, LogOut, Settings, Menu } from 'lucide-react'

const Sidebar = () => {
  let navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const [showCopyright, setShowCopyright] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarColor, setSidebarColor] = useState(localStorage.getItem("sidebarColorHex") || "#0f172a")

  useEffect(() => {
    function handleColorChange() {
      setSidebarColor(localStorage.getItem("sidebarColorHex") || "#0f172a")
    }
    window.addEventListener("sidebar-color-changed", handleColorChange)
    return () => window.removeEventListener("sidebar-color-changed", handleColorChange)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{ backgroundColor: sidebarColor }}
        className="md:hidden fixed top-3 left-3 z-40 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside className="h-screen flex flex-row">
        <nav
          onMouseEnter={() => { if (window.innerWidth >= 768) setCollapsed(false) }}
          onMouseLeave={() => { if (window.innerWidth >= 768) setCollapsed(true) }}
          style={{ backgroundColor: sidebarColor }}
          className={`h-screen flex flex-col border-r border-slate-100 shadow-sm transition-all duration-300 fixed md:relative z-50 w-67 ${collapsed ? 'md:w-16' : 'md:w-67'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <style>{`
    .sidebar-scroll::-webkit-scrollbar { width: 4px; }
    .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
    .sidebar-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #475569; }
  `}</style>

          <div className="px-4 py-3.5 flex flex-col border-b border-slate-900 shrink-0">
            <div className="flex items-center justify-between">
              <img src={Logo} className='w-9 -ml-1 flex items-center cursor-pointer' alt="" />
              {!collapsed && <PanelLeft
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:block cursor-pointer text-slate-100 transition-colors"
                size={20}
              />}
              <PanelLeft
                onClick={() => setMobileOpen(false)}
                className="md:hidden cursor-pointer text-slate-100 transition-colors"
                size={20}
              />
            </div>
            {collapsed && (
              <div className="hidden md:flex relative group/tooltip justify-center w-full border-t border-slate-900">
                <PanelLeft
                  onClick={() => setCollapsed(!collapsed)}
                  className="cursor-pointer -ml-2 text-slate-100 mt-3 transition-colors"
                  size={23}
                />
                <span className="absolute ml-45 mt-2 bg-emerald-500 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                  Expand Sidebar
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
            <SideMenus collapsed={collapsed} closeMobile={() => setMobileOpen(false)} style={{ overflowX: 'clip' }} />
          </div>

          <div className="px-3 py-3 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div
              style={!collapsed ? { backgroundColor: 'rgba(255,255,255,0.06)' } : undefined}
              className={!collapsed ? `flex items-center gap-2.5 px-2.5 py-2 rounded-full cursor-pointer transition-all ${collapsed ? 'justify-center' : ''}` : ''}
              onMouseEnter={(e) => { if (!collapsed) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)' }}
              onMouseLeave={(e) => { if (!collapsed) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)' }}
            >
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-semibold text-blue-600 cursor-pointer shrink-0">SF</span>

              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-100 truncate">Shahwar Foods</p>
                    <p className="text-[11px] text-slate-400 truncate">info@shahwarfoods.com</p>
                  </div>
                  <div className="relative" ref={menuRef}>
                    <MoreVertical
                      className="text-slate-100 w-4 h-4 shrink-0 cursor-pointer hover:text-slate-100 transition-colors"
                      onClick={() => setMenuOpen(!menuOpen)}
                    />

                    {menuOpen ? (
                      <div
                        style={{ backgroundColor: '#1e2530', borderColor: 'rgba(255,255,255,0.10)' }}
                        className="absolute bottom-6 right-0 w-36 border rounded-xl shadow-lg py-1.5 z-50"
                      >
                        <button
                          onClick={() => { navigate('/') }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          className="w-full flex items-center cursor-pointer gap-2.5 px-3 py-2 text-[13px] text-slate-100 transition-colors"
                        >
                          <LogIn className="w-3.5 h-3.5 text-slate-100" />
                          Add Account
                        </button>

                        <button
                          onClick={() => {
                            toast.success('You have Logged Out', { position: 'bottom-right', autoClose: 800 })
                            setTimeout(() => (navigate('/login')), 800)
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          className="w-full flex items-center cursor-pointer gap-2.5 px-3 py-2 text-[13px] text-slate-100 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5 text-slate-100" />
                          Logout
                        </button>

                        <div className="my-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

                        <div className="flex items-center justify-around px-2 py-1.5">
                          <div className="relative group/tip">
                            <button
                              onClick={() => { setShowSetting(true); setMenuOpen(false); }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors"
                            >
                              <Settings className="w-4 h-4 text-slate-100 transition-transform duration-500 group-hover/tip:rotate-360" />
                            </button>
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[11px] text-slate-600 bg-blue-200 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">
                              Settings
                            </span>
                          </div>

                          <div className="relative group/tip">
                            <button
                              onClick={() => { setShowCopyright(true); setMenuOpen(false) }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors"
                            >
                              <Copyright className="w-4 h-4 text-slate-100" />
                            </button>
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[11px] text-slate-600 bg-blue-200 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">
                              Copyright
                            </span>
                          </div>

                          <div className="relative group/tip">
                            <button
                              onClick={() => { setShowHelp(true); setMenuOpen(false) }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors"
                            >
                              <HelpCircle className="w-4 h-4 text-slate-100" />
                            </button>
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[11px] text-slate-600 bg-blue-200 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">
                              Help & Support
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>

        </nav>
      </aside>

      {showCopyright ? <Copyrights setShowCopyright={setShowCopyright} /> : null}
      {showSetting ? <Setting setShowSetting={setShowSetting} /> : null}
      {showHelp ? <Help setShowHelp={setShowHelp} /> : null}
    </>
  )
}

export default Sidebar