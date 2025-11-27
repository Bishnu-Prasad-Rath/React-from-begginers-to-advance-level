import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/theme'
import ThemeBtn from './components/themeBtn'
import Card from './components/Card'
import DotGrid from './components/DotGrid';
import SplitText from "./components/SplitText";

function App() {
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => setThemeMode("light")
  const darkTheme = () => setThemeMode("dark")

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        {/* Dot Grid in full-page background */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: 0
          }}
        >
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#5227FF"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Foreground content */}
        <div
          className="flex flex-col items-center justify-center min-h-screen gap-6"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Heading */}
          <SplitText
            text="Powered by Coffee & Code"
            className="text-7xl font-bold text-center text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          {/* Theme Button */}
          <div className="w-full max-w-sm mx-auto flex justify-end">
            <ThemeBtn />
          </div>

          {/* Card */}
          <div className="w-full max-w-sm mx-auto">
            <Card darkMode={themeMode === "dark"} />
   
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
