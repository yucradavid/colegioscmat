import { DollarSign, TrendingUp, TrendingDown, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function FinanceDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const financialSummary = {
    totalExpected: 125000,
    totalCollected: 89500,
    totalPending: 35500,
    collectionRate: 72,
  };

  const agingReport = [
    { range: '0-30 días', amount: 15200, count: 42, color: 'bg-green-500' },
    { range: '31-60 días', amount: 12800, count: 35, color: 'bg-amber-500' },
    { range: '61-90 días', amount: 5100, count: 14, color: 'bg-orange-500' },
    { range: '+90 días', amount: 2400, count: 8, color: 'bg-red-500' },
  ];

  const recentPayments = [
    { student: 'María García López', amount: 350, method: 'Transferencia', date: 'Hoy, 10:30' },
    { student: 'Juan Pérez Mamani', amount: 700, method: 'Efectivo', date: 'Hoy, 09:15' },
    { student: 'Ana Quispe Huanca', amount: 350, method: 'Yape', date: 'Ayer, 16:45' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Panel de Finanzas</h1>
        <p className="text-[#334155]">Resumen financiero del mes actual</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card variant="elevated" className="border-t-4 border-[#0E3A8A]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-[#0F172A]">S/ {financialSummary.totalExpected.toLocaleString()}</span>
              <DollarSign className="w-8 h-8 text-[#0E3A8A]" />
            </div>
            <p className="text-sm text-[#334155]">Total esperado</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-[#0F172A]">S/ {financialSummary.totalCollected.toLocaleString()}</span>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-[#334155]">Recaudado</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-[#C81E1E]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-[#0F172A]">S/ {financialSummary.totalPending.toLocaleString()}</span>
              <TrendingDown className="w-8 h-8 text-[#C81E1E]" />
            </div>
            <p className="text-sm text-[#334155]">Pendiente</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="border-t-4 border-[#1D4ED8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-[#0F172A]">{financialSummary.collectionRate}%</span>
              <CheckCircle className="w-8 h-8 text-[#1D4ED8]" />
            </div>
            <p className="text-sm text-[#334155]">Tasa de cobranza</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Antigüedad de saldos</h3>
              <AlertCircle className="w-5 h-5 text-[#334155]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agingReport.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#334155]">{item.range}</span>
                    <span className="text-sm font-bold text-[#0F172A]">S/ {item.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${(item.amount / financialSummary.totalPending) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#334155]">{item.count} casos</span>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              fullWidth
              className="mt-6"
              onClick={() => onNavigate('/finance/reports')}
            >
              Ver reporte completo
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Pagos recientes</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#F1F5F9] rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0F172A] truncate">{payment.student}</p>
                    <p className="text-sm text-[#334155]">{payment.method} • {payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">S/ {payment.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              fullWidth
              className="mt-4"
              onClick={() => onNavigate('/finance/reports')}
            >
              Ver todos los pagos
            </Button>
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
              icon={<DollarSign />}
              onClick={() => onNavigate('/finance/charges')}
            >
              Emitir cargos
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<Users />}
              onClick={() => onNavigate('/finance/reports')}
            >
              Reportes
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<CheckCircle />}
              onClick={() => onNavigate('/finance/reports')}
            >
              Conciliación
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<AlertCircle />}
              onClick={() => onNavigate('/finance/reports')}
            >
              Morosos
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h4 className="font-semibold text-[#0F172A]">Recaudación semanal</h4>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((day, index) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm text-[#334155] w-10">{day}</span>
                  <div className="flex-1 h-8 bg-[#F1F5F9] rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0E3A8A] to-[#1D4ED8]"
                      style={{ width: `${60 + index * 8}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[#0F172A]">S/ {(1200 + index * 300).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4 className="font-semibold text-[#0F172A]">Métodos de pago</h4>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { method: 'Efectivo', percentage: 45, amount: 40275 },
                { method: 'Transferencia', percentage: 30, amount: 26850 },
                { method: 'Yape/Plin', percentage: 20, amount: 17900 },
                { method: 'Tarjeta', percentage: 5, amount: 4475 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#334155]">{item.method}</span>
                    <span className="text-sm font-bold text-[#0F172A]">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0E3A8A] to-[#1D4ED8]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4 className="font-semibold text-[#0F172A]">Alertas</h4>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-[#C81E1E] rounded-lg">
                <p className="text-sm font-semibold text-[#C81E1E] mb-1">8 estudiantes con +90 días</p>
                <p className="text-xs text-[#334155]">Requiere seguimiento urgente</p>
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                <p className="text-sm font-semibold text-amber-700 mb-1">42 pensiones vencen hoy</p>
                <p className="text-xs text-[#334155]">Enviar recordatorio</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="text-sm font-semibold text-green-700 mb-1">Cobranza +10% vs mes anterior</p>
                <p className="text-xs text-[#334155]">Buen desempeño</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
