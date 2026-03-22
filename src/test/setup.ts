import '@testing-library/jest-dom'

// Mock IntersectionObserver — not available in jsdom
// Use plain functions (not vi.fn()) so this file type-checks without vitest globals
class MockIntersectionObserver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  observe(_target: Element) {}
  disconnect() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unobserve(_target: Element) {}
}

// @ts-expect-error — IntersectionObserver not in jsdom; assigning mock for tests
globalThis.IntersectionObserver = MockIntersectionObserver
