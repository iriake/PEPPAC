import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { EvaluacionProvider } from './context/EvaluacionContext'
import EvaluacionJuego1 from './pages/EvaluacionJuego1'
import EvaluacionJuego2 from './pages/EvaluacionJuego2'
import PantallaGracias  from './pages/PantallaGracias'

// ── Páginas temporales (se reemplazarán por implementaciones reales) ──────────

function PaginaTemporal({ titulo, siguiente }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-6">
      <h1 className="text-3xl font-bold text-gray-700">{titulo}</h1>
      <p className="text-gray-400 text-sm">Página en construcción</p>
      {siguiente && (
        <button
          onClick={() => navigate(siguiente)}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold
                     hover:bg-blue-600 transition-colors"
        >
          Continuar →
        </button>
      )}
    </div>
  )
}

// ── App principal ─────────────────────────────────────────────────────────────
function App() {
  return (
    <EvaluacionProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirigir raíz (temporal: directo a juego1 para pruebas) */}
          <Route path="/"                   element={<Navigate to="/juego1" replace />} />

          {/* Páginas en construcción */}
          <Route path="/login"              element={<PaginaTemporal titulo="Login"              siguiente="/participante" />} />
          <Route path="/participante"       element={<PaginaTemporal titulo="Registro"            siguiente="/instrucciones-j1" />} />
          <Route path="/instrucciones-j1"   element={<PaginaTemporal titulo="Instrucciones Juego 1" siguiente="/juego1" />} />

          {/* Juego 1 ✅ */}
          <Route path="/juego1"             element={<EvaluacionJuego1 />} />

          {/* Pantalla de transición (en construcción) */}
          <Route path="/transicion"         element={<PaginaTemporal titulo="Transición / Reemplazos" siguiente="/juego2" />} />

          {/* Juego 2 ✅ */}
          <Route path="/juego2"             element={<EvaluacionJuego2 />} />

          {/* Pantalla ¡Gracias! ✅ */}
          <Route path="/gracias"            element={<PantallaGracias />} />

          {/* Páginas en construcción */}
          <Route path="/resultados/:id"     element={<PaginaTemporal titulo="Resultados" />} />
          <Route path="/historial"          element={<PaginaTemporal titulo="Historial"  />} />
        </Routes>
      </BrowserRouter>
    </EvaluacionProvider>
  )
}

export default App
