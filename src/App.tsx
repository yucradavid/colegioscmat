import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { Loading } from './components/ui/Loading';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { TeacherDashboard } from './pages/dashboards/TeacherDashboard';
import { GuardianDashboard } from './pages/dashboards/GuardianDashboard';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { FinanceDashboard } from './pages/dashboards/FinanceDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import type { UserRole } from './lib/database.types';

function AppRouter() {
  const [currentPath, setCurrentPath] = useState('/');
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (user && currentPath === '/login') {
      setCurrentPath('/dashboard');
    }
  }, [user]);

  function navigate(path: string) {
    setCurrentPath(path);
  }

  if (loading) {
    return <Loading fullScreen text="Cargando..." />;
  }

  if (!user && currentPath !== '/' && currentPath !== '/login') {
    setCurrentPath('/login');
  }

  if (currentPath === '/') {
    return <LandingPage onNavigate={navigate} />;
  }

  if (currentPath === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  if (!user || !profile) {
    console.log('Estado de user:', user);
    console.log('Estado de profile:', profile);
    return <LoginPage onNavigate={navigate} />;
  }

  function renderDashboard() {
    const role = profile?.role as UserRole;

    switch (role) {
      case 'teacher':
        return <TeacherDashboard onNavigate={navigate} />;
      case 'guardian':
        return <GuardianDashboard onNavigate={navigate} />;
      case 'student':
        return <StudentDashboard onNavigate={navigate} />;
      case 'finance':
      case 'cashier':
        return <FinanceDashboard onNavigate={navigate} />;
      case 'admin':
      case 'director':
      case 'coordinator':
        return <AdminDashboard onNavigate={navigate} />;
      default:
        return <AdminDashboard onNavigate={navigate} />;
    }
  }

  function renderPage() {
    if (currentPath === '/dashboard') {
      return renderDashboard();
    }

    if (currentPath.startsWith('/academic')) {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Módulo Académico</h1>
            <p className="text-[#334155]">Gestión de asistencia, evaluaciones, tareas y comunicados</p>
          </div>
          <div className="p-12 bg-white rounded-xl shadow-lg text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0E3A8A] to-[#1D4ED8] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Módulo en construcción</h3>
              <p className="text-[#334155] mb-6">
                Las funcionalidades de {currentPath.split('/').pop()} estarán disponibles próximamente.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentPath.startsWith('/finance')) {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Módulo Financiero</h1>
            <p className="text-[#334155]">Gestión de pagos, cargos y caja</p>
          </div>
          <div className="p-12 bg-white rounded-xl shadow-lg text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0E3A8A] to-[#C81E1E] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Módulo en construcción</h3>
              <p className="text-[#334155] mb-6">
                Las funcionalidades de {currentPath.split('/').pop()} estarán disponibles próximamente.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentPath.startsWith('/reports')) {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Reportes y SIAGIE</h1>
            <p className="text-[#334155]">Reportes consolidados y exportación SIAGIE</p>
          </div>
          <div className="p-12 bg-white rounded-xl shadow-lg text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-[#1D4ED8] to-[#C81E1E] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Módulo en construcción</h3>
              <p className="text-[#334155] mb-6">
                Los reportes y exportaciones estarán disponibles próximamente.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentPath.startsWith('/settings')) {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Configuración</h1>
            <p className="text-[#334155]">Años académicos, cursos, usuarios y sistema</p>
          </div>
          <div className="p-12 bg-white rounded-xl shadow-lg text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-[#334155] to-[#0E3A8A] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Módulo en construcción</h3>
              <p className="text-[#334155] mb-6">
                Las opciones de configuración estarán disponibles próximamente.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return renderDashboard();
  }

  return (
    <AppLayout currentPath={currentPath} onNavigate={navigate}>
      {renderPage()}
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
