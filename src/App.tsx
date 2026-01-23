import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

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

interface Firework {
  id: number
  x: number
  y: number
  particles: FireworkParticle[]
}

interface FireworkParticle {
  id: number
  angle: number
  distance: number
  color: string
}

function App() {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [petals, setPetals] = useState<Petal[]>([])
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [emailSent, setEmailSent] = useState<boolean>(false)

  useEffect(() => {
    // Initialize EmailJS
    // To set up EmailJS:
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your Public Key from Account → General
    // 5. Replace 'YOUR_PUBLIC_KEY' below with your actual public key
    // See EMAILJS_SETUP.md for detailed instructions
    emailjs.init({
      publicKey: 'F-tOMdPwla5f-nzDy', // Replace with your EmailJS public key
    })

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

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

  const triggerFireworks = async () => {
    // Send notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('💜 Valentine\'s Day! 💜', {
        body: 'You are the most amazing girl in the worls, thank you for saying yes. I truly do not deserve you',
        icon: '💜',
        badge: '💜',
        tag: 'valentine',
      })
    } else if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('💜 Valentine\'s Day! 💜', {
            body: 'You are the most amazing girl in the world, thank you for saying yes. I truly do not deserve you',
            icon: '💜',
            badge: '💜',
            tag: 'valentine',
          })
        }
      })
    }

    // Send email to recipient
    const recipientEmail = 'carlbucknor2021@gmail.com'
    try {
      // EmailJS configuration
      // Replace these with your actual EmailJS credentials from your dashboard:
      // - Service ID: Found in Email Services section
      // - Template ID: Found in Email Templates section
      // See EMAILJS_SETUP.md for detailed setup instructions
      const serviceId = 'service_l8l96bs' // Replace with your EmailJS service ID
      const templateId = 'template_v8qnytl' // Replace with your EmailJS template ID
      
      // Validate email format before sending
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const cleanEmail = recipientEmail.trim()
      if (!emailRegex.test(cleanEmail)) {
        throw new Error('Invalid email address format')
      }

      // EmailJS template parameters
      // IMPORTANT: Make sure your EmailJS template uses {{to_email}} in the "To" field
      // Also ensure your EmailJS service allows dynamic recipients in the service settings
      // Common parameter names: to_email, to_name, message, subject, user_email, etc.
      const templateParams = {
        to_email: cleanEmail,
        user_email: cleanEmail, // Some templates use this instead
        to_name: 'Valentine',
        message: 'She said yes!!!!!! Yaaaaayyyyy 💕',
        subject: '💜 Valentine\'s Day! 💜',
        reply_to: cleanEmail,
      }

      await emailjs.send(serviceId, templateId, templateParams)
      setEmailSent(true)
      setTimeout(() => setEmailSent(false), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      // Fallback: Open mailto link if EmailJS fails
      const subject = encodeURIComponent('💜 Valentine\'s Day! 💜')
      const body = encodeURIComponent('She said yes!!!!!! Yaaaaayyyyy 💕')
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
    }

    // Create multiple fireworks
    const colors = [
      '#ec4899', '#db2777', '#be185d', // Pink/Red
      '#a855f7', '#9333ea', '#7e22ce', // Purple
      '#f59e0b', '#f97316', '#ea580c', // Orange
      '#10b981', '#059669', '#047857', // Green
      '#3b82f6', '#2563eb', '#1d4ed8', // Blue
    ]

    const newFireworks: Firework[] = []
    const fireworkCount = 8

    for (let i = 0; i < fireworkCount; i++) {
      const particles: FireworkParticle[] = []
      const particleCount = 30
      const fireworkColors = [
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)],
      ]

      for (let j = 0; j < particleCount; j++) {
        particles.push({
          id: j,
          angle: (j * 360) / particleCount,
          distance: 80 + Math.random() * 40,
          color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
        })
      }

      newFireworks.push({
        id: Date.now() + i,
        x: 20 + Math.random() * 60, // Random position across screen
        y: 20 + Math.random() * 60,
        particles,
      })
    }

    setFireworks(newFireworks)

    // Remove fireworks after animation completes
    setTimeout(() => {
      setFireworks([])
    }, 3000)
  }

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
            {isMale ? (
              <div 
                className="absolute"
                style={{
                  top: '-5px',
                  left: '8px',
                  width: '54px',
                  height: '45px',
                  background: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
                  borderRadius: '50% 50% 35% 35%',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  zIndex: -1,
                }}
              />
            ) : (
              <>
                {/* Top hair part/base with center part */}
                <div 
                  className="absolute hair-base"
                  style={{
                    top: '-8px',
                    left: '0px',
                    width: '70px',
                    height: '38px',
                    background: 'linear-gradient(135deg, #451a03 0%, #5a2a0a 30%, #78350f 60%, #92400e 100%)',
                    borderRadius: '50% 50% 30% 30%',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.25), inset 0 -2px 4px rgba(0,0,0,0.15), inset 2px 0 6px rgba(120, 53, 15, 0.3)',
                    zIndex: -1,
                  }}
                />
                {/* Hair part line */}
                <div 
                  className="absolute"
                  style={{
                    top: '-5px',
                    left: '50%',
                    width: '2px',
                    height: '25px',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    transform: 'translateX(-50%)',
                    zIndex: 0,
                  }}
                />
                {/* Hair highlights */}
                <div 
                  className="absolute"
                  style={{
                    top: '-6px',
                    left: '8px',
                    width: '25px',
                    height: '20px',
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(146, 64, 14, 0.6) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                  }}
                />
                <div 
                  className="absolute"
                  style={{
                    top: '-6px',
                    right: '8px',
                    width: '25px',
                    height: '20px',
                    background: 'radial-gradient(ellipse at 70% 30%, rgba(146, 64, 14, 0.6) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                  }}
                />
                
                {/* Left pigtail - main strand */}
                <div 
                  className="absolute hair-pigtail hair-pigtail-left"
                  style={{
                    top: '10px',
                    left: '-20px',
                    width: '24px',
                    height: '58px',
                    background: 'linear-gradient(135deg, #451a03 0%, #5a2a0a 20%, #78350f 50%, #92400e 80%, #78350f 100%)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(-25deg)',
                    zIndex: -2,
                    boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset -2px 0 4px rgba(0,0,0,0.2), inset 2px 0 4px rgba(146, 64, 14, 0.3)',
                  }}
                />
                {/* Left pigtail - inner layer for depth */}
                <div 
                  className="absolute hair-pigtail-left-inner"
                  style={{
                    top: '12px',
                    left: '-18px',
                    width: '18px',
                    height: '54px',
                    background: 'linear-gradient(135deg, #451a03 0%, #78350f 60%, #92400e 100%)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(-23deg)',
                    zIndex: -3,
                    boxShadow: 'inset 1px 0 3px rgba(146, 64, 14, 0.4)',
                  }}
                />
                {/* Left pigtail - outer highlight */}
                <div 
                  className="absolute"
                  style={{
                    top: '15px',
                    left: '-19px',
                    width: '8px',
                    height: '45px',
                    background: 'linear-gradient(135deg, rgba(146, 64, 14, 0.5) 0%, transparent 100%)',
                    borderRadius: '50%',
                    transform: 'rotate(-25deg)',
                    zIndex: -1,
                  }}
                />
                {/* Left pigtail curl - main */}
                <div 
                  className="absolute pigtail-curl-left"
                  style={{
                    top: '60px',
                    left: '-26px',
                    width: '22px',
                    height: '24px',
                    background: 'radial-gradient(ellipse at 40% 40%, #92400e 0%, #78350f 50%, #5a2a0a 100%)',
                    borderRadius: '50%',
                    transform: 'rotate(-15deg)',
                    zIndex: -2,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.25), inset -2px -2px 4px rgba(0,0,0,0.2), inset 2px 2px 4px rgba(146, 64, 14, 0.3)',
                  }}
                />
                {/* Left pigtail curl - highlight */}
                <div 
                  className="absolute"
                  style={{
                    top: '62px',
                    left: '-24px',
                    width: '8px',
                    height: '10px',
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(146, 64, 14, 0.6) 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'rotate(-15deg)',
                    zIndex: -1,
                  }}
                />
                
                {/* Right pigtail - main strand */}
                <div 
                  className="absolute hair-pigtail hair-pigtail-right"
                  style={{
                    top: '10px',
                    right: '-20px',
                    width: '24px',
                    height: '58px',
                    background: 'linear-gradient(225deg, #451a03 0%, #5a2a0a 20%, #78350f 50%, #92400e 80%, #78350f 100%)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(25deg)',
                    zIndex: -2,
                    boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset 2px 0 4px rgba(0,0,0,0.2), inset -2px 0 4px rgba(146, 64, 14, 0.3)',
                  }}
                />
                {/* Right pigtail - inner layer for depth */}
                <div 
                  className="absolute hair-pigtail-right-inner"
                  style={{
                    top: '12px',
                    right: '-18px',
                    width: '18px',
                    height: '54px',
                    background: 'linear-gradient(225deg, #451a03 0%, #78350f 60%, #92400e 100%)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(23deg)',
                    zIndex: -3,
                    boxShadow: 'inset -1px 0 3px rgba(146, 64, 14, 0.4)',
                  }}
                />
                {/* Right pigtail - outer highlight */}
                <div 
                  className="absolute"
                  style={{
                    top: '15px',
                    right: '-19px',
                    width: '8px',
                    height: '45px',
                    background: 'linear-gradient(225deg, rgba(146, 64, 14, 0.5) 0%, transparent 100%)',
                    borderRadius: '50%',
                    transform: 'rotate(25deg)',
                    zIndex: -1,
                  }}
                />
                {/* Right pigtail curl - main */}
                <div 
                  className="absolute pigtail-curl-right"
                  style={{
                    top: '60px',
                    right: '-26px',
                    width: '22px',
                    height: '24px',
                    background: 'radial-gradient(ellipse at 60% 40%, #92400e 0%, #78350f 50%, #5a2a0a 100%)',
                    borderRadius: '50%',
                    transform: 'rotate(15deg)',
                    zIndex: -2,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.25), inset 2px -2px 4px rgba(0,0,0,0.2), inset -2px 2px 4px rgba(146, 64, 14, 0.3)',
                  }}
                />
                {/* Right pigtail curl - highlight */}
                <div 
                  className="absolute"
                  style={{
                    top: '62px',
                    right: '-24px',
                    width: '8px',
                    height: '10px',
                    background: 'radial-gradient(ellipse at 70% 30%, rgba(146, 64, 14, 0.6) 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'rotate(15deg)',
                    zIndex: -1,
                  }}
                />
              </>
            )}
            
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

      {/* Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="fixed pointer-events-none"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
          }}
        >
          {firework.particles.map((particle) => {
            const radian = (particle.angle * Math.PI) / 180
            const x = Math.cos(radian) * particle.distance
            const y = Math.sin(radian) * particle.distance
            
            return (
              <div
                key={particle.id}
                className="absolute rounded-full firework-particle"
                style={{
                  width: '6px',
                  height: '6px',
                  background: particle.color,
                  boxShadow: `0 0 8px ${particle.color}, 0 0 16px ${particle.color}`,
                  left: '50%',
                  top: '50%',
                  '--end-x': `${x}px`,
                  '--end-y': `${y}px`,
                } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
              />
            )
          })}
        </div>
      ))}

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
              <div className="flex justify-center gap-2 text-2xl mb-8">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>💜</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💜</span>
              </div>
              
              {/* Valentine Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={triggerFireworks}
                  className="px-8 py-4 text-xl font-semibold text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(236, 72, 153, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(236, 72, 153, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
                  }}
                >
                  Will you be my Valentine
                </button>
                {emailSent && (
                  <p className="mt-4 text-green-600 text-sm animate-fadeIn">
                    ✉️ Email sent successfully!
                  </p>
                )}
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

        @keyframes fireworkExplode {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(var(--end-x, 0), var(--end-y, 0)) scale(0);
          }
        }

        .firework-particle {
          animation: fireworkExplode 1s ease-out forwards;
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

        @keyframes pigtailSwingLeft {
          0%, 100% {
            transform: rotate(-25deg) translateX(0px);
          }
          25% {
            transform: rotate(-30deg) translateX(-3px);
          }
          50% {
            transform: rotate(-20deg) translateX(2px);
          }
          75% {
            transform: rotate(-28deg) translateX(-1px);
          }
        }

        @keyframes pigtailSwingRight {
          0%, 100% {
            transform: rotate(25deg) translateX(0px);
          }
          25% {
            transform: rotate(30deg) translateX(3px);
          }
          50% {
            transform: rotate(20deg) translateX(-2px);
          }
          75% {
            transform: rotate(28deg) translateX(1px);
          }
        }

        @keyframes pigtailCurlLeft {
          0%, 100% {
            transform: rotate(-15deg) translateX(0px) translateY(0px);
          }
          50% {
            transform: rotate(-18deg) translateX(-2px) translateY(2px);
          }
        }

        @keyframes pigtailCurlRight {
          0%, 100% {
            transform: rotate(15deg) translateX(0px) translateY(0px);
          }
          50% {
            transform: rotate(18deg) translateX(2px) translateY(2px);
          }
        }

        @keyframes hairBaseFlow {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(-1px) translateY(0.5px);
          }
          50% {
            transform: translateX(1px) translateY(-0.5px);
          }
          75% {
            transform: translateX(-0.5px) translateY(0.3px);
          }
        }

        .hair-base {
          animation: hairBaseFlow 3s ease-in-out infinite;
        }

        .hair-pigtail-left {
          animation: pigtailSwingLeft 2s ease-in-out infinite;
          transform-origin: top center;
        }

        .hair-pigtail-left-inner {
          animation: pigtailSwingLeft 2s ease-in-out infinite;
          transform-origin: top center;
        }

        .hair-pigtail-right {
          animation: pigtailSwingRight 2s ease-in-out infinite;
          transform-origin: top center;
          animation-delay: 0.1s;
        }

        .hair-pigtail-right-inner {
          animation: pigtailSwingRight 2s ease-in-out infinite;
          transform-origin: top center;
          animation-delay: 0.1s;
        }

        .pigtail-curl-left {
          animation: pigtailCurlLeft 1.8s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .pigtail-curl-right {
          animation: pigtailCurlRight 1.8s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App