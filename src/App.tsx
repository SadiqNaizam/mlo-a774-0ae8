```tsx
import { Toaster } from "@/components/ui/sonner";
import ChatListPage from "@/pages/ChatListPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    // The main container for the app, ensuring it takes up the full screen.
    <main className="h-screen w-screen bg-background text-foreground">
      <Router>
        <Routes>
          <Route path="/chats" element={<ChatListPage />} />
          {/* For this demonstration, we'll redirect the root path to the chats page. */}
          <Route path="*" element={<Navigate to="/chats" />} />
        </Routes>
      </Router>
      {/* The Toaster component is added here to handle all toast notifications globally. */}
      <Toaster />
    </main>
  );
}

export default App;
```