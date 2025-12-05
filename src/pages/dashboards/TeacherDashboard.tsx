import { Calendar, Users, ClipboardCheck, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function TeacherDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const todayClasses = [
    { time: '08:00', course: 'Matemática', section: '5to A', room: 'Aula 12' },
    { time: '10:00', course: 'Álgebra', section: '5to B', room: 'Aula 12' },
    { time: '14:00', course: 'Geometría', section: '4to A', room: 'Aula 15' },
  ];

  const pendingTasks = [
    { task: 'Publicar notas del bimestre I', section: '5to A', urgent: true },
    { task: 'Revisar 12 tareas entregadas', section: '5to B', urgent: false },
    { task: 'Registrar asistencia de hoy', section: '4to A', urgent: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Bienvenido, Docente</h1>
        <p className="text-[#334155]">Aquí está tu resumen de hoy</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card variant="elevated" className="border-t-4 border-[#0E3A8A]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">3</span>
              <Calendar className="w-8 h-8 text-[#0E3A8A]" />
            </div>
            <p className="text-sm text-[#334155]">Clases hoy</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-[#1D4ED8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">87</span>
              <Users className="w-8 h-8 text-[#1D4ED8]" />
            </div>
            <p className="text-sm text-[#334155]">Estudiantes</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-[#C81E1E]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">5</span>
              <AlertCircle className="w-8 h-8 text-[#C81E1E]" />
            </div>
            <p className="text-sm text-[#334155]">Tareas pendientes</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">92%</span>
              <ClipboardCheck className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-[#334155]">Asistencia promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Clases de hoy</h3>
              <Calendar className="w-5 h-5 text-[#334155]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((clase, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#F1F5F9] rounded-lg">
                  <div className="text-center min-w-[60px]">
                    <p className="text-lg font-bold text-[#0E3A8A]">{clase.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A]">{clase.course}</p>
                    <p className="text-sm text-[#334155]">{clase.section} • {clase.room}</p>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Tareas pendientes</h3>
              <AlertCircle className="w-5 h-5 text-[#C81E1E]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#F1F5F9] rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A]">{item.task}</p>
                    <p className="text-sm text-[#334155]">{item.section}</p>
                  </div>
                  {item.urgent && <Badge variant="error">Urgente</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#0F172A]">Acceso rápido</h3>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              fullWidth
              icon={<ClipboardCheck />}
              onClick={() => onNavigate('/academic/attendance')}
            >
              Tomar asistencia
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<BookOpen />}
              onClick={() => onNavigate('/academic/evaluations')}
            >
              Registrar notas
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<Calendar />}
              onClick={() => onNavigate('/academic/assignments')}
            >
              Crear tarea
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<Users />}
              onClick={() => onNavigate('/academic/announcements')}
            >
              Comunicado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
