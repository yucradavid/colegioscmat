import { Calendar, BookOpen, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function StudentDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const assignments = {
    today: [
      { id: '1', course: 'Matemática', title: 'Ejercicios de álgebra', dueTime: '23:59', submitted: false },
    ],
    thisWeek: [
      { id: '2', course: 'Comunicación', title: 'Ensayo sobre literatura peruana', dueDate: 'Mañana', submitted: false },
      { id: '3', course: 'Historia', title: 'Línea de tiempo del Tahuantinsuyo', dueDate: '2 días', submitted: false },
    ],
    overdue: [
      { id: '4', course: 'Ciencia', title: 'Informe de laboratorio', dueDate: 'Hace 2 días', submitted: false },
    ],
  };

  const recentGrades = [
    { course: 'Matemática', competency: 'Resuelve problemas de cantidad', grade: 'A', date: 'Hace 2 días' },
    { course: 'Comunicación', competency: 'Lee diversos tipos de textos', grade: 'AD', date: 'Hace 5 días' },
    { course: 'Ciencia', competency: 'Indaga mediante métodos científicos', grade: 'A', date: 'Hace 1 semana' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Mi portal académico</h1>
        <p className="text-[#334155]">Bienvenido, estudiante</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card variant="elevated" className="border-t-4 border-[#C81E1E]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">{assignments.overdue.length}</span>
              <AlertCircle className="w-8 h-8 text-[#C81E1E]" />
            </div>
            <p className="text-sm text-[#334155]">Tareas atrasadas</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-[#D97706]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">{assignments.today.length}</span>
              <Clock className="w-8 h-8 text-[#D97706]" />
            </div>
            <p className="text-sm text-[#334155]">Para hoy</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-[#1D4ED8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">{assignments.thisWeek.length}</span>
              <Calendar className="w-8 h-8 text-[#1D4ED8]" />
            </div>
            <p className="text-sm text-[#334155]">Esta semana</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-[#0F172A]">A</span>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-[#334155]">Promedio actual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Mis tareas</h3>
              <BookOpen className="w-5 h-5 text-[#334155]" />
            </div>
          </CardHeader>
          <CardContent>
            {assignments.overdue.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-[#C81E1E]" />
                  <p className="text-sm font-semibold text-[#C81E1E]">Atrasadas</p>
                </div>
                <div className="space-y-3">
                  {assignments.overdue.map((task) => (
                    <div key={task.id} className="p-4 bg-red-50 border-2 border-[#C81E1E] rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-[#0F172A]">{task.title}</p>
                          <p className="text-sm text-[#334155]">{task.course}</p>
                        </div>
                        <Badge variant="error">{task.dueDate}</Badge>
                      </div>
                      <Button size="sm" fullWidth className="mt-2">
                        Entregar ahora
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {assignments.today.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#D97706]" />
                  <p className="text-sm font-semibold text-[#D97706]">Hoy</p>
                </div>
                <div className="space-y-3">
                  {assignments.today.map((task) => (
                    <div key={task.id} className="p-4 bg-[#F1F5F9] rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-[#0F172A]">{task.title}</p>
                          <p className="text-sm text-[#334155]">{task.course} • Vence a las {task.dueTime}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" fullWidth className="mt-2">
                        Ver detalles
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#1D4ED8]" />
                <p className="text-sm font-semibold text-[#1D4ED8]">Esta semana</p>
              </div>
              <div className="space-y-3">
                {assignments.thisWeek.map((task) => (
                  <div key={task.id} className="p-4 bg-[#F1F5F9] rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-[#0F172A]">{task.title}</p>
                        <p className="text-sm text-[#334155]">{task.course} • {task.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              fullWidth
              className="mt-4"
              onClick={() => onNavigate('/academic/assignments')}
            >
              Ver todas las tareas
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#0F172A]">Calificaciones recientes</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="p-4 bg-[#F1F5F9] rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-[#0F172A]">{grade.course}</p>
                        <p className="text-sm text-[#334155]">{grade.competency}</p>
                      </div>
                      <Badge variant={grade.grade === 'AD' ? 'success' : 'info'} className="text-lg">
                        {grade.grade}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#334155]">{grade.date}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                fullWidth
                className="mt-4"
                onClick={() => onNavigate('/academic/evaluations')}
              >
                Ver todas las notas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-[#0F172A]">Mi asistencia</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-[#0E3A8A] mb-1">94%</p>
                <p className="text-sm text-[#334155]">Asistencia del bimestre</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">45</p>
                  <p className="text-xs text-[#334155]">Presentes</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">2</p>
                  <p className="text-xs text-[#334155]">Tardanzas</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">1</p>
                  <p className="text-xs text-[#334155]">Faltas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
