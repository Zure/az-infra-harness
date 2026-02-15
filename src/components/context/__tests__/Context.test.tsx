import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Context } from '../Context'
import type { PlanningBox, ContextDefinition } from '../types'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Check: () => <div data-testid="check-icon" />,
  CheckCircle2: () => <div data-testid="check-circle-icon" />,
  Circle: () => <div data-testid="circle-icon" />,
  Copy: () => <div data-testid="copy-icon" />,
  Terminal: () => <div data-testid="terminal-icon" />,
}))

describe('Context', () => {
  const mockContextDefinition: ContextDefinition = {
    completionPercentage: 67,
    completedBoxes: 2,
    totalBoxes: 3,
    lastUpdated: '2026-02-10T15:45:00Z',
  }

  const mockPlanningBoxes: PlanningBox[] = [
    {
      id: 'infrastructure-context',
      title: 'Infrastructure Context',
      command: '/infrastructure-context',
      isCompleted: true,
      content: '# Infrastructure Context\n\nTest content',
    },
    {
      id: 'platform-context',
      title: 'Platform Context',
      command: '/platform-context',
      isCompleted: true,
      content: '# Platform Context\n\nTest content',
    },
    {
      id: 'development-context',
      title: 'Development Context',
      command: '/development-context',
      isCompleted: false,
      content: null,
    },
  ]

  it('renders the section header', () => {
    render(
      <Context
        planningBoxes={mockPlanningBoxes}
        contextDefinition={mockContextDefinition}
      />
    )
    
    expect(screen.getByText('Context')).toBeInTheDocument()
    expect(screen.getByText(/Define the landscape your application will be deployed into/i)).toBeInTheDocument()
  })

  it('renders all three planning boxes', () => {
    render(
      <Context
        planningBoxes={mockPlanningBoxes}
        contextDefinition={mockContextDefinition}
      />
    )
    
    // Use getAllByText since titles appear in both the box header and markdown content
    expect(screen.getAllByText('Infrastructure Context').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Platform Context').length).toBeGreaterThan(0)
    expect(screen.getByText('Development Context')).toBeInTheDocument()
  })

  it('renders the continue button', () => {
    render(
      <Context
        planningBoxes={mockPlanningBoxes}
        contextDefinition={mockContextDefinition}
      />
    )
    
    expect(screen.getByRole('button', { name: /Continue to Application Architecture/i })).toBeInTheDocument()
  })

  it('disables continue button when not all boxes are completed', () => {
    render(
      <Context
        planningBoxes={mockPlanningBoxes}
        contextDefinition={mockContextDefinition}
      />
    )
    
    const button = screen.getByRole('button', { name: /Continue to Application Architecture/i })
    expect(button).toBeDisabled()
  })

  it('shows helper text when continue button is disabled', () => {
    render(
      <Context
        planningBoxes={mockPlanningBoxes}
        contextDefinition={mockContextDefinition}
      />
    )
    
    expect(screen.getByText(/Complete all context boxes to continue/i)).toBeInTheDocument()
  })

  it('enables continue button when all boxes are completed', () => {
    const allCompletedBoxes = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test\n\nContent',
    }))
    
    render(
      <Context
        planningBoxes={allCompletedBoxes}
        contextDefinition={{ ...mockContextDefinition, completedBoxes: 3, completionPercentage: 100 }}
      />
    )
    
    const button = screen.getByRole('button', { name: /Continue to Application Architecture/i })
    expect(button).not.toBeDisabled()
  })

  it('does not show helper text when continue button is enabled', () => {
    const allCompletedBoxes = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test\n\nContent',
    }))
    
    render(
      <Context
        planningBoxes={allCompletedBoxes}
        contextDefinition={{ ...mockContextDefinition, completedBoxes: 3, completionPercentage: 100 }}
      />
    )
    
    expect(screen.queryByText(/Complete all context boxes to continue/i)).not.toBeInTheDocument()
  })

  it('calls onNext when continue button is clicked and all boxes are complete', () => {
    const mockOnNext = vi.fn()
    
    const allCompletedBoxes = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test\n\nContent',
    }))
    
    render(
      <Context
        planningBoxes={allCompletedBoxes}
        contextDefinition={{ ...mockContextDefinition, completedBoxes: 3, completionPercentage: 100 }}
        onNext={mockOnNext}
      />
    )
    
    const button = screen.getByRole('button', { name: /Continue to Application Architecture/i })
    fireEvent.click(button)
    
    expect(mockOnNext).toHaveBeenCalledTimes(1)
  })

  it('renders with empty planning boxes', () => {
    const emptyBoxes = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: false,
      content: null,
    }))
    
    render(
      <Context
        planningBoxes={emptyBoxes}
        contextDefinition={{ ...mockContextDefinition, completedBoxes: 0, completionPercentage: 0 }}
      />
    )
    
    // Should still render all box titles
    expect(screen.getByText('Infrastructure Context')).toBeInTheDocument()
    expect(screen.getByText('Platform Context')).toBeInTheDocument()
    expect(screen.getByText('Development Context')).toBeInTheDocument()
  })
})
