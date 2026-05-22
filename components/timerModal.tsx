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
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function TimerModal({ selectedPairs, open, onClose }: TimerModalProps) {
  const [duration, setDuration] = useState(10)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [isRunning, setIsRunning] = useState(false)
  const [wasEverOpened, setWasEverOpened] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
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
    setDuration(10)
    setTimeRemaining(600)
    setIsRunning(false)
    setWasEverOpened(false)
    clearTimer()
  }, [selectedPairs, clearTimer])

  const adjustDuration = (delta: number) => {
    if (isRunning) return
    setDuration(prev => {
      const next = Math.min(99, Math.max(1, prev + delta))
      setTimeRemaining(next * 60)
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

  return (
    <>
      {open ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <div
            style={{
              background: '#111',
              border: '2px solid #333',
              borderRadius: '12px',
              padding: '24px 32px',
              minWidth: '400px',
              maxWidth: '90vw',
              animation: 'slideUp 0.35s ease',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '8px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '1.5em',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            <div style={{ fontSize: '0.85em', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Get Ready...
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {selectedPairs.map(p => (
                <div
                  key={p.dataKey}
                  style={{
                    position: 'relative',
                    width: '110px',
                    height: '90px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '2px solid #444',
                    background: '#1a1a1a',
                    animation: 'cardFadeIn 0.4s ease',
                  }}
                >
                  <img
                    src={'/' + p.map + '.png'}
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                  />
                  <img
                    src={'/' + p.vehicle + '-icon-2.png'}
                    alt=""
                    style={{ position: 'absolute', left: '4px', top: '4px', width: '38px', height: 'auto' }}
                  />
                </div>
              ))}
            </div>

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
                  fontSize: '3em',
                  fontWeight: 'bold',
                  color: finished ? '#ff4444' : isRunning ? '#44ff88' : '#fff',
                  minWidth: '160px',
                  textAlign: 'center',
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

            <div style={{ fontSize: '0.75em', color: '#666' }}>
              minutes
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
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
      ) : wasEverOpened ? (
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9997,
            background: '#222',
            border: '2px solid #44cc66',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#44cc66',
            fontSize: '1.5em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          &#9202;
        </button>
      ) : null}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}
