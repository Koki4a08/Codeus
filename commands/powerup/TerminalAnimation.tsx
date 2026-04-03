/**
 * TerminalAnimation — plays a sequence of animated frames in the terminal.
 * Supports typing simulation, auto-advancing frames, and reduced motion.
 */

import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, Text } from '../../ink.js'
import type { AnimationFrame } from './lessons/types.js'

interface TerminalAnimationProps {
  frames: AnimationFrame[]
  /** If true, skip animation and show the final frame immediately */
  reducedMotion: boolean
}

const SPINNERS = ['⠋', '⠙', '⠹', '⠸', '⠳', '⠯']
const BLOCK_CHAR = '█'

/**
 * A single terminal frame renderer. Handles typing animation
 * when the frame has isTyping=true.
 */
function TypingFrame({
  content,
  typingSpeed,
}: {
  content: string
  typingSpeed: number
}) {
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    setVisibleChars(0)
    if (typingSpeed <= 0) {
      setVisibleChars(content.length)
      return
    }

    const interval = setInterval(() => {
      setVisibleChars(prev => {
        if (prev >= content.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [content, typingSpeed])

  const visible = content.slice(0, visibleChars)
  const isComplete = visibleChars >= content.length

  return (
    <Text wrap="wrap">
      {visible}
      {!isComplete && <Text color="cyan">{BLOCK_CHAR}</Text>}
    </Text>
  )
}

/**
 * Static frame renderer — shows content without animation.
 */
function StaticFrame({ content }: { content: string }) {
  return <Text wrap="wrap">{content}</Text>
}

/**
 * Spinning indicator shown while animation is in progress.
 */
function Spinner() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % SPINNERS.length)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box marginTop={1}>
      <Text color="cyan">{SPINNERS[frame]}</Text>
      <Text dimColor> Playing animation...</Text>
    </Box>
  )
}

export default function TerminalAnimation({
  frames,
  reducedMotion,
}: TerminalAnimationProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  if (frames.length === 0) {
    return (
      <Box paddingX={1}>
        <Text dimColor>No animation available for this lesson.</Text>
      </Box>
    )
  }

  // Reduced motion: show all frames at once
  if (reducedMotion) {
    return (
      <Box flexDirection="column" paddingX={1}>
        {frames.map((frame, i) => (
          <StaticFrame key={i} content={frame.content} />
        ))}
      </Box>
    )
  }

  // Handle frame advancement
  useEffect(() => {
    const frame = frames[currentFrameIndex]
    if (!frame) return

    const frameHasTyping = frame.isTyping && (frame.typingSpeed ?? 20) > 0

    if (frameHasTyping) {
      // For typing frames, estimate completion time and advance after
      const chars = frame.content.length
      const speed = frame.typingSpeed ?? 20
      const duration = frame.duration ?? 800
      const totalTypingTime = chars * speed
      const timeout = setTimeout(() => {
        if (currentFrameIndex < frames.length - 1) {
          setCurrentFrameIndex(prev => prev + 1)
        } else {
          setIsComplete(true)
        }
      }, totalTypingTime + duration)
      return () => clearTimeout(timeout)
    } else {
      // Static frame: advance after duration
      const timeout = setTimeout(
        () => {
          if (currentFrameIndex < frames.length - 1) {
            setCurrentFrameIndex(prev => prev + 1)
          } else {
            setIsComplete(true)
          }
        },
        frame.duration ?? 800,
      )
      return () => clearTimeout(timeout)
    }
  }, [currentFrameIndex, frames])

  const currentFrame = frames[currentFrameIndex]

  return (
    <Box flexDirection="column" paddingX={1}>
      {currentFrame.isTyping ? (
        <TypingFrame
          content={currentFrame.content}
          typingSpeed={currentFrame.typingSpeed ?? 20}
        />
      ) : (
        <StaticFrame content={currentFrame.content} />
      )}
      {!isComplete && <Spinner />}
    </Box>
  )
}
