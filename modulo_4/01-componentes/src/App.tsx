// src/App.tsx

import WelcomeBanner from './components/WelcomeBanner'
import UserGreeting from './components/UserGreeting'
import UserProfileForm from './components/UserProfileForm'
import TaskManager from './components/TaskManager'
import RegistrationForm from './useReducer/RegistrationForm'


import DocumentTitle from './UseEffect/DocumentTitle'

import BasicCounter from './useReducer/BasicCounter'

const PASO = 60

export default function App() {
  const content =
    PASO === 1 ? (
      <WelcomeBanner />
    ) : PASO === 2 ? (
      <>
        <UserGreeting
          name="Carlos López Ruiz"
          occupation="Desarrollador Frontend"
        />

        <br />

        <UserGreeting
          name="Esteban Corella"
          occupation="Desarrollador Fullstack"
        />
      </>
    ) : PASO === 15 ? (
      <UserProfileForm />
    ) : PASO === 16 ? (
      <TaskManager />
    ) : PASO === 17 ? (
      <DocumentTitle />
    ) : PASO === 50 ? (
      <BasicCounter />
    ) : PASO === 51 ? (
    <RegistrationForm />
    // Hooks: useContext
    ) : PASO === 60 ? (
    <ThemeToggle/>
    ) : PASO === 61 ? (
    <UserBadge/>
    ) : PASO === 62 ? (
    <LoginForm/>
    ) : PASO === 63 ? (
    <AppHeader/>    
  ) : (
    <p style={{ color: '#e00' }}>
      Paso {PASO}: crea el componente primero
    </p>
  )

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      {PASO === 63 ? content : (
        <>
          {state.user && (
            <p style={{ marginBottom: 16, fontSize: 14, color: '#6b7280' }}>
              Sesión activa: <strong>{state.user.name}</strong>
            </p>
          )}
          {content}
        </>
      )}
    </main>
  )
}