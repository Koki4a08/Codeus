/**
 * Data types for /powerup lesson definitions.
 */

/** A single frame in a terminal animation sequence. */
export interface AnimationFrame {
  /** Terminal text content (can include chalk-style color codes when rendered) */
  content: string
  /** ms to show this frame before advancing (default: 800) */
  duration?: number
  /** If true, animate by revealing characters one-by-one at typingSpeed intervals */
  isTyping?: boolean
  /** ms per character when isTyping is true (default: 20) */
  typingSpeed?: number
}

/** A complete lesson for the /powerup command. */
export interface Lesson {
  /** Unique identifier for the lesson */
  id: string
  /** Display title */
  title: string
  /** Short one-liner shown in the lesson selection menu */
  shortDescription: string
  /** Paragraphs of explanation shown in the lesson viewer */
  explanation: string[]
  /** Ordered frames that play as a terminal animation demo */
  frames: AnimationFrame[]
}
