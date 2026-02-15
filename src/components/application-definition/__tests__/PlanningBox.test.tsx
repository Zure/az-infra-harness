import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PlanningBox } from '../PlanningBox'
import type { PlanningBox as PlanningBoxType } from '../types'

describe('PlanningBox', () => {
  const mockBox: PlanningBoxType = {
    id: 'test-box',
    title: 'Test Planning Box',
    command: '/test-command',
    isCompleted: false,
    content: null,
  }

  it('renders the box title', () => {
    render(<PlanningBox box={mockBox} />)
    expect(screen.getByText('Test Planning Box')).toBeInTheDocument()
  })

  it('shows command prompt when box is not completed', () => {
    render(<PlanningBox box={mockBox} />)
    expect(screen.getByText('Run in coding agent:')).toBeInTheDocument()
    expect(screen.getByText('/test-command')).toBeInTheDocument()
  })

  it('renders markdown content when box is completed', () => {
    const completedBox: PlanningBoxType = {
      ...mockBox,
      isCompleted: true,
      content: '# Test Content\n\nThis is a test.',
    }
    render(<PlanningBox box={completedBox} />)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('This is a test.')).toBeInTheDocument()
  })

  it('shows grey border when not completed', () => {
    const { container } = render(<PlanningBox box={mockBox} />)
    const boxElement = container.querySelector('.border-slate-300')
    expect(boxElement).toBeInTheDocument()
  })

  it('shows blue border when completed', () => {
    const completedBox: PlanningBoxType = {
      ...mockBox,
      isCompleted: true,
      content: '# Test',
    }
    const { container } = render(<PlanningBox box={completedBox} />)
    const boxElement = container.querySelector('.border-blue-500')
    expect(boxElement).toBeInTheDocument()
  })

  it('displays update command even when completed', () => {
    const completedBox: PlanningBoxType = {
      ...mockBox,
      isCompleted: true,
      content: '# Test',
    }
    render(<PlanningBox box={completedBox} />)
    expect(screen.getByText('Update this section by running in coding agent:')).toBeInTheDocument()
  })

  it('calls onClick when box is clicked', () => {
    const handleClick = vi.fn()
    const { container } = render(<PlanningBox box={mockBox} onClick={handleClick} />)
    const boxElement = container.querySelector('.cursor-pointer')
    boxElement?.click()
    expect(handleClick).toHaveBeenCalledWith('test-box')
  })
})
