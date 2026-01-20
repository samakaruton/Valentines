import { useEffect, useState } from 'react'

interface Flower {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
}

function App() {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    // Create flowers scattered throughout
    const newFlowers: Flower[] = []
    for (let i = 0; i < 30; i++) {
      newFlowers.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 40 + Math.random() * 40,
        delay: Math.random() * 3,
      })
    }
    setFlowers(newFlowers)

    // Create falling petals
    const newPetals: Petal[] = []
    for (let i = 0; i < 20; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
      })
    }
    setPetals(newPetals)
  }, [])

  const RealisticFlower = ({ flower }: { flower: Flower }) => {
    const petalCount = 8
    
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${flower.x}%`,
          top: `${flower.y}%`,
          width: `${flower.size}px`,
          height: `${flower.size}px`,
          animation: `floatAround ${15 + Math.random() * 10}s ease-in-out infinite`,
          animationDelay: `${flower.delay}s`,
          zIndex: 1,
        }}
      >
        {/* Petals in circular arrangement */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (i * 360) / petalCount
          const radian = (angle * Math.PI) / 180
          const distance = flower.size * 0.35
          const x = Math.cos(radian) * distance
          const y = Math.sin(radian) * distance

          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: `${flower.size * 0.45}px`,
                height: `${flower.size * 0.55}px`,
                left: '50%',
                top: '50%',
                background: 'linear-gradient(to bottom, #e9d5ff 0%, #d8b4fe 40%, #c084fc 100%)',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: 'inset 0 -4px 8px rgba(168, 85, 247, 0.4), 0 2px 8px rgba(168, 85, 247, 0.3)',
                animation: `petalBloom 1.5s ease-out ${i * 0.08}s both`,
              }}
            >
              {/* Petal vein detail */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 opacity-30"
                style={{
                  height: '80%',
                  background: 'linear-gradient(to bottom, transparent, #a855f7, transparent)',
                }}
              />
            </div>
          )
        })}

        {/* Flower center with stamens */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${flower.size * 0.28}px`,
            height: `${flower.size * 0.28}px`,
            background: 'radial-gradient(circle at 30% 30%, #fde047 0%, #facc15 50%, #eab308 100%)',
            boxShadow: 'inset 0 2px 6px rgba(234, 179, 8, 0.6), 0 0 12px rgba(253, 224, 71, 0.4)',
          }}
        >
          {/* Stamens dots */}
          {Array.from({ length: 12 }).map((_, i) => {
            const stamenAngle = (i * 360) / 12
            const stamenRad = (stamenAngle * Math.PI) / 180
            const stamenDist = flower.size * 0.1
            const stamenX = Math.cos(stamenRad) * stamenDist
            const stamenY = Math.sin(stamenRad) * stamenDist
            
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '3px',
                  height: '3px',
                  background: '#ca8a04',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${stamenX}px, ${stamenY}px)`,
                  boxShadow: '0 0 2px #fde047',
                }}
              />
            )
          })}
        </div>

        {/* Sparkles around flower */}
        {[0, 1, 2].map((sparkleIndex) => {
          const sparkleAngle = (sparkleIndex * 120 + flower.id * 37) % 360
          const sparkleRad = (sparkleAngle * Math.PI) / 180
          const sparkleDist = flower.size * 0.6
          const sparkleX = Math.cos(sparkleRad) * sparkleDist
          const sparkleY = Math.sin(sparkleRad) * sparkleDist
          
          return (
            <div
              key={`sparkle-${sparkleIndex}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${sparkleX}px, ${sparkleY}px)`,
                animation: `sparkle ${2 + sparkleIndex * 0.3}s ease-in-out infinite`,
                animationDelay: `${sparkleIndex * 0.5}s`,
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full bg-yellow-300"
                style={{
                  boxShadow: '0 0 6px #fde047, 0 0 12px #fde047',
                }}
              />
            </div>
          )
        })}

        {/* Stem */}
        <div
          className="absolute rounded-full"
          style={{
            width: '4px',
            height: `${flower.size * 1.2}px`,
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, #84cc16 0%, #65a30d 100%)',
            boxShadow: '2px 0 4px rgba(101, 163, 13, 0.3)',
            zIndex: -1,
          }}
        />
      </div>
    )
  }

  const ModernCharacter = ({ position, type }: { position: 'left' | 'right', type: 'male' | 'female' }) => {
    const isMale = type === 'male'
    const baseX = position === 'left' ? '35%' : '65%'
    const height = isMale ? 240 : 200
    
    return (
      <div className="absolute" style={{ 
        left: baseX, 
        bottom: '12%', 
        transform: 'translateX(-50%)',
        height: `${height}px`,
      }}>
        {/* Head */}
        <div className="relative mx-auto" style={{ width: '70px', height: '70px' }}>
          <div 
            className="w-full h-full rounded-full relative z-10"
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset -3px -3px 8px rgba(0,0,0,0.08)',
            }}
          >
            {/* Hair */}
            <div 
              className="absolute"
              style={{
                top: isMale ? '-5px' : '-8px',
                left: isMale ? '8px' : '-8px',
                width: isMale ? '54px' : '86px',
                height: isMale ? '45px' : '60px',
                background: isMale 
                  ? 'linear-gradient(135deg, #78350f 0%, #92400e 100%)'
                  : 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
                borderRadius: isMale ? '50% 50% 35% 35%' : '50% 50% 40% 40%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: -1,
              }}
            />
            
            {/* Eyes */}
            <div className="absolute w-2.5 h-2.5 bg-gray-800 rounded-full" style={{ left: '18px', top: '26px' }} />
            <div className="absolute w-2.5 h-2.5 bg-gray-800 rounded-full" style={{ right: '18px', top: '26px' }} />
            
            {/* Eye shine */}
            <div className="absolute w-1 h-1 bg-white rounded-full" style={{ left: '20px', top: '27px' }} />
            <div className="absolute w-1 h-1 bg-white rounded-full" style={{ right: '20px', top: '27px' }} />
            
            {/* Nose */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
              style={{ 
                top: '38px',
                background: 'rgba(251, 191, 36, 0.3)',
              }}
            />
            
            {/* Smile */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 border-2 border-gray-700 border-t-0 rounded-b-full"
              style={{ top: '48px', width: '28px', height: '14px' }}
            />
          </div>
        </div>

        {/* Neck */}
        <div 
          className="mx-auto rounded-b-lg"
          style={{
            width: '32px',
            height: '18px',
            background: 'linear-gradient(to bottom, #fde68a 0%, #fcd34d 100%)',
            marginTop: '-2px',
          }}
        />

        {/* Body */}
        <div className="relative mx-auto" style={{ width: '90px', marginTop: '2px' }}>
          {/* Torso */}
          <div 
            className="mx-auto relative"
            style={{
              width: isMale ? '85px' : '75px',
              height: isMale ? '95px' : '85px',
              background: isMale 
                ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                : 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              borderRadius: isMale ? '12px 12px 8px 8px' : '12px 12px 6px 6px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            }}
          >
            {/* Collar detail */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg"
              style={{
                width: isMale ? '35px' : '40px',
                height: isMale ? '8px' : '10px',
                background: 'rgba(255, 255, 255, 0.25)',
              }}
            />

            {/* Buttons for male / necklace for female */}
            {isMale ? (
              <>
                <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" style={{ top: '25px' }} />
                <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" style={{ top: '45px' }} />
                <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" style={{ top: '65px' }} />
              </>
            ) : (
              <div 
                className="absolute left-1/2 -translate-x-1/2 border-2 border-white/50 rounded-full"
                style={{ top: '15px', width: '24px', height: '24px' }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
              </div>
            )}
          </div>

          {/* Arms */}
          <div 
            className="absolute rounded-full"
            style={{
              top: '18px',
              left: '-10px',
              width: '18px',
              height: isMale ? '70px' : '65px',
              background: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
              transform: 'rotate(-30deg)',
              transformOrigin: 'top center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            }}
          />
          <div 
            className="absolute rounded-full"
            style={{
              top: '18px',
              right: '-10px',
              width: '18px',
              height: isMale ? '70px' : '65px',
              background: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
              transform: 'rotate(30deg)',
              transformOrigin: 'top center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            }}
          />

          {/* Lower body - Legs for both */}
          {isMale ? (
            // Male - Pants with separate legs
            <>
              <div 
                className="absolute rounded-b-full"
                style={{
                  bottom: isMale ? '-95px' : '-75px',
                  left: '18px',
                  width: '24px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                }}
              />
              <div 
                className="absolute rounded-b-full"
                style={{
                  bottom: isMale ? '-95px' : '-75px',
                  right: '18px',
                  width: '24px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                }}
              />
              {/* Shoes */}
              <div 
                className="absolute rounded-full"
                style={{
                  bottom: '-100px',
                  left: '15px',
                  width: '30px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  bottom: '-100px',
                  right: '15px',
                  width: '30px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </>
          ) : (
            // Female - Skirt top with visible legs
            <>
              {/* Skirt */}
              <div 
                className="mx-auto rounded-b-full"
                style={{
                  width: '88px',
                  height: '55px',
                  marginTop: '-4px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
                }}
              />
              
              {/* Legs */}
              <div 
                className="absolute rounded-b-full"
                style={{
                  bottom: '-60px',
                  left: '24px',
                  width: '18px',
                  height: '65px',
                  background: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                }}
              />
              <div 
                className="absolute rounded-b-full"
                style={{
                  bottom: '-60px',
                  right: '24px',
                  width: '18px',
                  height: '65px',
                  background: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                }}
              />
              
              {/* Shoes */}
              <div 
                className="absolute rounded-full"
                style={{
                  bottom: '-66px',
                  left: '21px',
                  width: '24px',
                  height: '10px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  bottom: '-66px',
                  right: '21px',
                  width: '24px',
                  height: '10px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                }}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 25%, #ddd6fe 50%, #c4b5fd 75%, #a78bfa 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Falling petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="fixed pointer-events-none"
          style={{
            left: `${petal.x}%`,
            width: `${10 + Math.random() * 8}px`,
            height: `${12 + Math.random() * 10}px`,
            background: 'linear-gradient(to bottom, #e9d5ff 0%, #d8b4fe 70%, #c084fc 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            animation: `petalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            boxShadow: '0 2px 4px rgba(168, 85, 247, 0.3)',
            zIndex: 50,
          }}
        />
      ))}

      {/* Realistic flowers background */}
      {flowers.map((flower) => (
        <RealisticFlower key={flower.id} flower={flower} />
      ))}

      {/* Main content grid */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 gap-8 p-8 lg:p-16 items-center max-w-7xl mx-auto">
        
        {/* Left side - Poem */}
        <div className="flex items-center justify-center">
          <div 
            className="rounded-3xl p-8 md:p-12 max-w-xl w-full backdrop-blur-xl border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
            }}
          >
            <h1 
              className="text-5xl md:text-7xl mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent font-bold"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              For You
            </h1>

            <p className="text-2xl md:text-3xl text-purple-700 mb-8 italic opacity-90">
              A garden of lavender dreams
            </p>

            <div className="space-y-4 text-purple-900 text-lg md:text-xl leading-relaxed">
              <p className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Like lavender fields in bloom,
              </p>
              <p className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Your presence fills the air with beauty and grace.
              </p>
              <p className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                Every moment with you is a petal in the wind,
              </p>
              <p className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                Dancing gracefully through time and space.
              </p>
            </div>

            <div className="my-8 flex items-center justify-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1" />
              <div className="text-purple-500 text-2xl animate-spin" style={{ animationDuration: '8s' }}>🌸</div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1" />
            </div>

            <div className="text-center">
              <p className="text-purple-800 text-xl italic mb-4">
                "In a field of lavender, I found my heart"
              </p>
              <div className="flex justify-center gap-2 text-2xl">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>💜</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💜</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Characters */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md h-96">
            {/* Heart above characters */}
            <div 
              className="absolute left-1/2 top-4 -translate-x-1/2 text-6xl z-20 animate-pulse"
              style={{ animationDuration: '2s' }}
            >
              💜
            </div>

            {/* Sparkles around heart */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 text-2xl animate-ping" style={{ animationDuration: '3s' }}>✨</div>
            <div className="absolute left-1/2 top-8 translate-x-12 text-xl animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>✨</div>
            <div className="absolute left-1/2 top-8 -translate-x-12 text-xl animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>✨</div>

            {/* Male character (taller) */}
            <ModernCharacter position="left" type="male" />

            {/* Female character (shorter) */}
            <ModernCharacter position="right" type="female" />

            {/* Ground/shadow */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-3 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(ellipse, #6b21a8 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes petalFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatAround {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(15px, -20px) rotate(3deg);
          }
          50% {
            transform: translate(-10px, -35px) rotate(-3deg);
          }
          75% {
            transform: translate(20px, -15px) rotate(2deg);
          }
        }

        @keyframes petalBloom {
          from {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App