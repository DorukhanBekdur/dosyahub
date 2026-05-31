import {
  Router,
  Routes,
  Route,
  Navigate,
  Navbar,
  Footer,
} from "./config/imports";
import { APP_ROUTES } from "./config/routes";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-black font-sans text-zinc-900 dark:text-zinc-100 transition-colors">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {APP_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
