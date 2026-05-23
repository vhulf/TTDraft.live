'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface SelectedPair {
  map: string
  vehicle: string
  dataKey: string
}

interface TimerModalProps {
  selectedPairs: SelectedPair[]
  open: boolean
  onClose: () => void
  onReopen: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function loadDuration(): number {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('ttdraft_timerDuration')
      if (saved !== null) {
        const n = parseInt(saved, 10)
        if (!isNaN(n) && n >= 1 && n <= 99) return n
      }
    } catch {}
  }
  return 10
}

export default function TimerModal({ selectedPairs, open, onClose, onReopen }: TimerModalProps) {
  const initDur = useCallback(() => loadDuration(), [])
  const [duration, setDuration] = useState(initDur)
  const [timeRemaining, setTimeRemaining] = useState(() => loadDuration() * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [wasEverOpened, setWasEverOpened] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [openedByChevron, setOpenedByChevron] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const requestWakeLock = useCallback(async () => {
    try {
      if (wakeLockRef.current) return
      wakeLockRef.current = await navigator.wakeLock.request('screen')
      wakeLockRef.current.addEventListener('release', () => {
        wakeLockRef.current = null
      })
    } catch {
      wakeLockRef.current = null
    }
  }, [])

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release()
      wakeLockRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearTimer()
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [isRunning, clearTimer])

  useEffect(() => {
    if (open && !wasEverOpened) {
      setWasEverOpened(true)
    }
  }, [open, wasEverOpened])

  useEffect(() => {
    if (isRunning && open) {
      requestWakeLock()
    } else if (wakeLockRef.current) {
      releaseWakeLock()
    }
    return () => releaseWakeLock()
  }, [isRunning, open, requestWakeLock, releaseWakeLock])

  const handleCloseClick = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      setOpenedByChevron(false)
    }, 350)
  }

  const handleChevronClick = () => {
    setOpenedByChevron(true)
    onReopen()
  }

  const adjustDuration = (delta: number) => {
    if (isRunning) return
    setDuration(prev => {
      const next = Math.min(99, Math.max(1, prev + delta))
      setTimeRemaining(next * 60)
      try { localStorage.setItem('ttdraft_timerDuration', String(next)) } catch {}
      return next
    })
  }

  const toggleRunning = () => {
    if (timeRemaining <= 0) return
    setIsRunning(prev => !prev)
  }

  const handleReset = () => {
    clearTimer()
    setIsRunning(false)
    setTimeRemaining(duration * 60)
  }

  const finished = timeRemaining <= 0 && duration > 0
  const modalActive = open || isClosing
  const chevronActive = wasEverOpened && !open && !isClosing
  const chevronColor = finished ? '#ff4444' : isRunning ? '#44ff88' : '#fff'

  return (
    <>
      {wasEverOpened && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: modalActive ? 9998 : 1,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: modalActive ? 1 : 0,
              pointerEvents: modalActive ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
            }}
            onClick={(e) => { if (e.target === e.currentTarget && !isClosing) handleCloseClick() }}
          >
            <div
              className="timer-modal-content"
              style={{
                background: '#111',
                border: '2px solid #333',
                borderRadius: '12px',
                padding: 'clamp(6px, 1vh, 10px) clamp(16px, 4vw, 32px) clamp(16px, 2.5vh, 20px)',
                animation: isClosing ? 'slideUpOut 0.35s ease forwards' : openedByChevron ? 'slideUpFromBottom 0.35s ease' : open ? 'slideUp 0.35s ease' : 'none',
                opacity: modalActive ? 1 : 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <button
                onClick={handleCloseClick}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '3em',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                &times;
              </button>

              <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2em', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 0' }}>
                {isRunning ? "GO!!!" : "Get Ready..."}
              </div>

              <div style={{
                flex: '0 0 20%',
                display: selectedPairs.length === 1 ? 'flex' : 'grid',
                gridTemplateColumns: selectedPairs.length === 1 ? undefined : 'repeat(3, 1fr)',
                justifyContent: selectedPairs.length === 1 ? 'center' : undefined,
                gap: 'clamp(8px, 1.5vw, 16px)',
                width: '100%',
                padding: '20px 20px 0',
              }}>
                {selectedPairs.map(p => (
                  <div
                    key={p.dataKey}
                      style={{
                        position: 'relative',
                        width: selectedPairs.length === 1 ? 'clamp(100px, 28vw, 200px)' : '100%',
                        aspectRatio: '1',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: '2px solid #444',
                      background: '#1a1a1a',
                      animation: 'cardFadeIn 0.4s ease',
                    }}
                  >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 5,
                        borderRadius: '6px',
                        boxShadow: '0 0 3px 5px rgba(0, 255, 100, 0.6)',
                        border: '2px solid #00cc50',
                        pointerEvents: 'none',
                      }} />
                    <img
                      src={'/' + p.map + '.png'}
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                    />
                    <img
                      src={'/' + p.vehicle + '-icon-2.png'}
                      alt=""
                      style={{ position: 'absolute', left: '4px', top: '4px', width: '35%', maxWidth: '75px', height: 'auto' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => adjustDuration(-1)}
                    disabled={isRunning}
                    style={{
                      background: isRunning ? '#222' : '#333',
                      border: '1px solid #555',
                      borderRadius: '6px',
                      color: isRunning ? '#555' : '#fff',
                      fontSize: '1.3em',
                      cursor: isRunning ? 'default' : 'pointer',
                      padding: '4px 10px',
                    }}
                  >
                    &#9660;
                  </button>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 'clamp(2.5em, 6vw, 5em)',
                      fontWeight: 'bold',
                      color: finished ? '#ff4444' : isRunning ? '#44ff88' : '#fff',
                      minWidth: '160px',
                      textAlign: 'center',
                      padding: '0 16px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {finished ? "TIME!" : formatTime(timeRemaining)}
                  </div>
                  <button
                    onClick={() => adjustDuration(1)}
                    disabled={isRunning}
                    style={{
                      background: isRunning ? '#222' : '#333',
                      border: '1px solid #555',
                      borderRadius: '6px',
                      color: isRunning ? '#555' : '#fff',
                      fontSize: '1.3em',
                      cursor: isRunning ? 'default' : 'pointer',
                      padding: '4px 10px',
                    }}
                  >
                    &#9650;
                  </button>
                </div>
              </div>

              <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '6px 0 4px' }}>
                <button
                  onClick={toggleRunning}
                  disabled={timeRemaining <= 0 && !isRunning}
                  style={{
                    padding: '10px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1em',
                    fontWeight: 'bold',
                    cursor: (timeRemaining <= 0 && !isRunning) ? 'default' : 'pointer',
                    background: isRunning ? '#ff6644' : '#44cc66',
                    color: '#fff',
                    opacity: (timeRemaining <= 0 && !isRunning) ? 0.4 : 1,
                  }}
                >
                  {isRunning ? 'Pause' : 'GO!'}
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid #555',
                    fontSize: '1em',
                    background: '#222',
                    color: '#ccc',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: chevronActive ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(30px)',
              zIndex: chevronActive ? 9997 : 0,
              opacity: chevronActive ? 1 : 0,
              pointerEvents: chevronActive ? 'auto' : 'none',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            <button
              onClick={handleChevronClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#000',
                border: 'none',
                borderTopLeftRadius: '11px',
                borderTopRightRadius: '11px',
                padding: '25px 12px',
                cursor: 'pointer',
                color: chevronColor,
                fontSize: '2.4em',
                lineHeight: 1,
              }}
            >
              <span style={{ fontSize: '0.5em' }}>&#9650;</span>
              <span style={{ fontSize: '0.98em' }}>&#9201;</span>
              <span style={{ fontSize: '0.5em' }}>&#9650;</span>
            </button>
          </div>
        </>
      )}

      <style>{`
        .timer-modal-content {
          width: 95vw;
          max-width: 95vw;
          height: 50vh;
          max-height: 50vh;
        }
        @media (min-width: 768px) {
          .timer-modal-content {
            width: 60vw;
            max-width: 60vw;
            height: 65vh;
            max-height: 65vh;
          }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpFromBottom {
          from { opacity: 0; transform: translateY(200px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-40px); }
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}
