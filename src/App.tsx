import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Explore from '@/pages/Explore';
import Teams from '@/pages/Teams';
import Tasks from '@/pages/Tasks';
import Schedule from '@/pages/Schedule';
import Events from '@/pages/Events';
import AITools from '@/pages/AITools';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { HackathonProvider } from './context/HackathonContext';
import { Toaster } from '@/components/ui/toaster';
import { AIAssistant } from '@/components/AI';
import './App.css';
import AdminPage from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <HackathonProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
            <Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/ai-tools" element={<ProtectedRoute><AITools /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <AIAssistant />
        </Router>
      </HackathonProvider>
    </AuthProvider>
  );
}

export default App;
