import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';
import { ChatRoom } from './components/ChatRoom';
import { SignIn } from './components/SignIn';
import { LogOut, Loader2 } from 'lucide-react';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <div className="h-screen flex flex-col">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-900">{user.displayName}</span>
              </div>
              <button
                onClick={() => auth.signOut()}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">
            <ChatRoom />
          </main>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;