import { Routes, Route, Navigate } from "react-router-dom";
import { hasCompletedOnboarding } from "@/data/preferences";
import Onboarding from "@/pages/Onboarding";
import Settings from "@/pages/Settings";
import Home from "@/pages/Home";
import StoryDetail from "@/pages/StoryDetail";

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  if (!hasCompletedOnboarding()) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route
        path="/home"
        element={
          <RequireOnboarding>
            <Home />
          </RequireOnboarding>
        }
      />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/story/:id"
        element={
          <RequireOnboarding>
            <StoryDetail />
          </RequireOnboarding>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireOnboarding>
            <Settings />
          </RequireOnboarding>
        }
      />
    </Routes>
  );
}
