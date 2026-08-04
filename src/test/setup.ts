import '@testing-library/jest-dom'
import { vi } from 'vitest'

beforeAll(() => {
  // Radix/Base UI Select no jsdom
  HTMLElement.prototype.hasPointerCapture = vi.fn()
  HTMLElement.prototype.setPointerCapture = vi.fn()
  HTMLElement.prototype.releasePointerCapture = vi.fn()
  HTMLElement.prototype.scrollIntoView = vi.fn()
})
