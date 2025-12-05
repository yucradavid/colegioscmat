import { ReactNode } from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  MessageSquare,
  DollarSign,
  BarChart3,
  Settings,
  GraduationCap,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../lib/database.types';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  roles: UserRole[];
  children?: Array<{ path: string; label: string; roles: UserRole[] }>;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Inicio',
    icon: <Home className="w-5 h-5" />,
    roles: ['admin', 'director', 'coordinator', 'secretary', 'teacher', 'student', 'guardian', 'finance', 'cashier', 'web_editor'],
  },
  {
    path: '/academic',
    label: 'Académico',
    icon: <BookOpen className="w-5 h-5" />,
    roles: ['admin', 'director', 'coordinator', 'teacher', 'student', 'guardian'],
    children: [
      { path: '/academic/attendance', label: 'Asistencia', roles: ['admin', 'director', 'coordinator', 'teacher'] },
      { path: '/academic/evaluations', label: 'Evaluación', roles: ['admin', 'director', 'coordinator', 'teacher', 'student', 'guardian'] },
      { path: '/academic/assignments', label: 'Tareas', roles: ['admin', 'director', 'coordinator', 'teacher', 'student'] },
      { path: '/academic/announcements', label: 'Comunicados', roles: ['admin', 'director', 'coordinator', 'teacher', 'student', 'guardian'] },
    ],
  },
  {
    path: '/finance',
    label: 'Finanzas',
    icon: <DollarSign className="w-5 h-5" />,
    roles: ['admin', 'director', 'finance', 'cashier', 'guardian'],
    children: [
      { path: '/finance/account', label: 'Estado de cuenta', roles: ['guardian'] },
      { path: '/finance/charges', label: 'Emisión de cargos', roles: ['admin', 'director', 'finance'] },
      { path: '/finance/cashier', label: 'Caja', roles: ['admin', 'cashier'] },
      { path: '/finance/reports', label: 'Reportes', roles: ['admin', 'director', 'finance'] },
    ],
  },
  {
    path: '/reports',
    label: 'Reportes',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['admin', 'director', 'coordinator'],
  },
  {
    path: '/settings',
    label: 'Configuración',
    icon: <Settings className="w-5 h-5" />,
    roles: ['admin', 'director'],
  },
];

export function Sidebar({ currentPath, onNavigate, isOpen, onToggle }: SidebarProps) {
  const { profile, signOut } = useAuth();

  const filteredNavItems = navItems.filter(item =>
    profile?.role && item.roles.includes(profile.role)
  );

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[#0E3A8A] text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gradient-to-b from-[#0E3A8A] to-[#0B1220] text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <GraduationCap className="w-8 h-8 text-[#0E3A8A]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Cermat School</h1>
                <p className="text-xs text-blue-200">Azángaro, Perú</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <div key={item.path} className="mb-2">
                <button
                  onClick={() => onNavigate(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${
                      currentPath === item.path
                        ? 'bg-white text-[#0E3A8A] font-medium'
                        : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>

                {item.children && currentPath.startsWith(item.path) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children
                      .filter(child => profile?.role && child.roles.includes(profile.role))
                      .map((child) => (
                        <button
                          key={child.path}
                          onClick={() => onNavigate(child.path)}
                          className={`
                            w-full text-left px-4 py-2 rounded-lg text-sm
                            transition-all duration-200
                            ${
                              currentPath === child.path
                                ? 'bg-white/20 font-medium'
                                : 'text-blue-200 hover:bg-white/10'
                            }
                          `}
                        >
                          {child.label}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="px-4 py-3 mb-2 rounded-xl bg-white/10">
              <p className="text-sm font-medium">{profile?.full_name}</p>
              <p className="text-xs text-blue-200 capitalize">{profile?.role}</p>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
        />
      )}
    </>
  );
}
