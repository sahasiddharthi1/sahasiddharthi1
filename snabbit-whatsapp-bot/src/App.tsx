import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import ChatView from './components/ChatView'
import AreaPage from './components/AreaPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat/:area" element={<ChatView />} />
        <Route path="/area/:slug" element={<AreaPage />} />
      </Routes>
    </HashRouter>
  )
}
