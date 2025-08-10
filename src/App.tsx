import './app.css';

import { Router } from './Router';
import { ThemeProvider } from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
