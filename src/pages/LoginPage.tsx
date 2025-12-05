import { useState } from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { Loading } from '../components/ui/Loading';

export function LoginPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Enviando login', email, password);
      const { error } = await signIn(email, password);
      console.log('Resultado login', error);
      if (error) {
        setError('Credenciales incorrectas. Por favor, verifica tus datos.');
      } else {
        console.log('Login exitoso, navegando a dashboard');
        onNavigate('/dashboard');
      }
    } catch (err) {
      console.error('Error inesperado en login', err);
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-[#334155] hover:text-[#0E3A8A] mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-[#0E3A8A] to-[#C81E1E] rounded-xl">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Bienvenido</h1>
            <p className="text-[#334155]">Ingresa a tu portal académico</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-2 border-[#C81E1E] rounded-xl">
                <p className="text-sm text-[#C81E1E]">{error}</p>
              </div>
            )}

            <Input
              type="email"
              label="Correo electrónico"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#CBD5E1]" />
                <span className="text-[#334155]">Recordarme</span>
              </label>
              <button type="button" className="text-[#1D4ED8] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? <Loading size="sm" /> : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-[#F1F5F9] rounded-xl">
            <p className="text-sm text-[#334155] text-center">
              ¿Necesitas ayuda para acceder?<br />
              Contacta a la secretaría: <strong>+51 951 234 567</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0E3A8A] via-[#1D4ED8] to-[#C81E1E] items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">
            Educación clara, gestión simple y pagos al día
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Plataforma integral que conecta a toda la comunidad educativa de Cermat School.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <p className="text-blue-100">Acceso a calificaciones y asistencia en tiempo real</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <p className="text-blue-100">Gestión de tareas y comunicados escolares</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <p className="text-blue-100">Pagos en línea simples y seguros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
