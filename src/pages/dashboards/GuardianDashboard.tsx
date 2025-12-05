import { User, BookOpen, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function GuardianDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const students = [
    {
      id: '1',
      name: 'María García López',
      grade: '5to Primaria A',
      photo: null,
      attendance: 95,
      averageGrade: 'A',
      pendingPayment: 350,
      recentGrades: [
        { course: 'Matemática', grade: 'A' },
        { course: 'Comunicación', grade: 'AD' },
        { course: 'Ciencia', grade: 'A' },
      ],
      assignments: 2,
    },
    {
      id: '2',
      name: 'Carlos García López',
      grade: '2do Secundaria B',
      photo: null,
      attendance: 88,
      averageGrade: 'B',
      pendingPayment: 350,
      recentGrades: [
        { course: 'Álgebra', grade: 'B' },
        { course: 'Historia', grade: 'A' },
        { course: 'Inglés', grade: 'B' },
      ],
      assignments: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Mis hijos</h1>
        <p className="text-[#334155]">Monitorea el progreso académico y financiero</p>
      </div>

      <div className="space-y-6">
        {students.map((student) => (
          <Card key={student.id} variant="elevated">
            <CardHeader className="bg-gradient-to-r from-[#F1F5F9] to-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0E3A8A] to-[#C81E1E] flex items-center justify-center text-white text-2xl font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A]">{student.name}</h3>
                    <p className="text-[#334155]">{student.grade}</p>
                  </div>
                </div>
                <Badge variant={student.pendingPayment > 0 ? 'warning' : 'success'}>
                  {student.pendingPayment > 0 ? 'Pago pendiente' : 'Al día'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">{student.attendance}%</p>
                    <p className="text-sm text-[#334155]">Asistencia</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">{student.averageGrade}</p>
                    <p className="text-sm text-[#334155]">Promedio</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <BookOpen className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">{student.assignments}</p>
                    <p className="text-sm text-[#334155]">Tareas activas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">S/ {student.pendingPayment}</p>
                    <p className="text-sm text-[#334155]">Por pagar</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-3">Calificaciones recientes</h4>
                  <div className="space-y-2">
                    {student.recentGrades.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F1F5F9] rounded-lg">
                        <span className="text-sm text-[#334155]">{grade.course}</span>
                        <Badge variant={grade.grade === 'AD' ? 'success' : grade.grade === 'A' ? 'info' : 'default'}>
                          {grade.grade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="mt-3"
                    onClick={() => onNavigate('/academic/evaluations')}
                  >
                    Ver todas las notas
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-3">Acciones rápidas</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      fullWidth
                      icon={<BookOpen />}
                      onClick={() => onNavigate('/academic/evaluations')}
                    >
                      Ver calificaciones
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      icon={<Calendar />}
                      onClick={() => onNavigate('/academic/attendance')}
                    >
                      Ver asistencias
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      icon={<DollarSign />}
                      onClick={() => onNavigate('/finance/account')}
                    >
                      Estado de cuenta
                    </Button>
                    {student.pendingPayment > 0 && (
                      <Button
                        fullWidth
                        icon={<DollarSign />}
                        onClick={() => onNavigate('/finance/account')}
                      >
                        Pagar ahora
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#0F172A]">Comunicados recientes</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: 'Reunión de padres - Viernes 15', date: 'Hace 2 días', priority: 'high' },
              { title: 'Entrega de libretas - Próxima semana', date: 'Hace 5 días', priority: 'normal' },
              { title: 'Recordatorio: Pago de pensión', date: 'Hace 1 semana', priority: 'normal' },
            ].map((announcement, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-[#F1F5F9] rounded-lg">
                <div className={`p-2 rounded-lg ${announcement.priority === 'high' ? 'bg-[#C81E1E]' : 'bg-[#0E3A8A]'}`}>
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#0F172A]">{announcement.title}</p>
                  <p className="text-sm text-[#334155]">{announcement.date}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" fullWidth className="mt-4" onClick={() => onNavigate('/academic/announcements')}>
            Ver todos los comunicados
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
