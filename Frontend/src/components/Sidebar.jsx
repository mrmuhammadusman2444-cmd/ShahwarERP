import React from 'react'
import SideMenus from './SideMenus.jsx'
import Logo from '../assets/Images/logo.png'
import Copyrights from '../components/Copyrights.jsx'
import Setting from '../components/Setting.jsx'
import { useNavigate } from 'react-router-dom'
import Help from '../components/Help.jsx'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { MoreVertical, PanelLeft, Copyright, HelpCircle, LogIn, LogOut, Settings, Sun, Sunset, Moon } from 'lucide-react'

const Sidebar = () => {
  let navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const [showCopyright, setShowCopyright] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  
  

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
    <aside className="h-screen flex flex-row">

      <nav className={`h-screen flex flex-col ${collapsed ? 'w-16' : 'w-67'} bg-slate-900 border-r border-slate-100 shadow-sm transition-all duration-300`}>


        <style>{`
    .sidebar-scroll::-webkit-scrollbar { width: 4px; }
    .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
    .sidebar-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #475569; }
  `}</style>


        <div className="px-4 py-3.5 flex flex-col  border-b border-slate-900 shrink-0">
          <div className="flex items-center  justify-between ">
            <img src={Logo} className='w-9 -ml-1  flex items-center cursor-pointer ' alt="" />
            {!collapsed && <PanelLeft
              onClick={() => setCollapsed(!collapsed)}
              className=" cursor-pointer text-slate-100  transition-colors"
              size={20}
            />}
          </div>
          {collapsed && (
            <div className="relative group/tooltip flex justify-center w-full border-t border-slate-900">
              <PanelLeft
                onClick={() => setCollapsed(!collapsed)}
                className=" cursor-pointer -ml-2 text-slate-100  mt-3 transition-colors"
                size={23}
              />
              <span className="absolute ml-45 mt-2 bg-blue-500 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                Expand Sidebar
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
          <SideMenus collapsed={collapsed} style={{ overflowX: 'clip' }} />
        </div>

        <div className="px-3 py-3 border-t border-slate-900 shrink-0">
          <div className={!collapsed && `flex items-center gap-2.5 px-2.5 py-2 rounded-full   bg-slate-800 hover:bg-slate-900 cursor-pointer transition-all ${collapsed ? 'justify-center' : ''}`}>

            <span className="w-8 h-8 rounded-full  bg-blue-100 flex items-center justify-center text-[10px] font-semibold text-blue-600 cursor-pointer shrink-0">SF</span>

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
                    <div className="absolute bottom-6 right-0 w-36 bg-slate-800 border border-slate-800 rounded-xl shadow-lg py-1.5 z-50">

                      <button onClick={() => {
                        navigate('/')
                      }} className="w-full flex items-center cursor-pointer gap-2.5 px-3 py-2 text-[13px] text-slate-100 hover:bg-slate-700 transition-colors">
                        <LogIn className="w-3.5 h-3.5 text-slate-100" />
                        Add Account
                      </button>

                      <button onClick={() => {
                        toast.success('You have Logged Out', { position: 'bottom-right', autoClose: 800 })
                        setTimeout(() => (navigate('/login')), 800)
                      }} className="w-full flex items-center cursor-pointer gap-2.5 px-3 py-2 text-[13px] text-slate-100 hover:bg-slate-700 transition-colors">
                        <LogOut className="w-3.5 h-3.5 text-slate-100" />
                        Logout
                      </button>

                      <div className="border-t border-slate-900 my-1" />

                      <div className="flex items-center justify-around px-2 py-1.5">

                        <div className="relative group/tip">
                          <button
                            onClick={() => { setShowSetting(true); setMenuOpen(false); }}
                            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-600 transition-colors"
                          >
                            <Settings className="w-4 h-4 text-slate-100 transition-transform duration-500 group-hover/tip:rotate-360" />
                          </button>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[11px] text-slate-600 bg-blue-200 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">
                            Settings
                          </span>
                        </div>

                        <div className="relative group/tip">
                          <button
                            onClick={() => {
                              setShowCopyright(true)
                              setMenuOpen(false)
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-600 transition-colors"
                          >
                            <Copyright className="w-4 h-4 text-slate-100" />
                          </button>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[11px] text-slate-600 bg-blue-200 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">
                            Copyright
                          </span>
                        </div>

                        <div className="relative group/tip">
                          <button onClick={() => { setShowHelp(true); setMenuOpen(false) }}
                            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-600 transition-colors"
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

      {showCopyright ? <Copyrights setShowCopyright={setShowCopyright} /> : null}
      {showSetting ? <Setting setShowSetting={setShowSetting} /> : null}
      {showHelp ? <Help setShowHelp={setShowHelp} /> : null}

    </aside>
  )
}

export default Sidebar