import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedNavigationTabs } from './components/ui/animated-navigation-tabs';
import Home from './pages/Home';
import { Foooter } from './components/Foooter';


const navigationItems = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Dashboard', path: '/dashboard' },
];

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AnimatedNavigationTabs items={navigationItems} />
        <main className="flex-1">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Foooter />
    </Router>
  );
}

export default App;