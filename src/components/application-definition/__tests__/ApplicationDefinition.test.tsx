import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ApplicationDefinition } from '../ApplicationDefinition'
import type { PlanningBox, ApplicationDefinition as AppDefType, Component } from '../types'

describe('ApplicationDefinition', () => {
  const mockPlanningBoxes: PlanningBox[] = [
    {
      id: 'app-overview',
      title: 'Application Overview',
      command: '/application-overview',
      isCompleted: false,
      content: null,
    },
    {
      id: 'non-functional-reqs',
      title: 'Non-Functional Requirements',
      command: '/non-functional-requirements',
      isCompleted: false,
      content: null,
    },
    {
      id: 'application-components',
      title: 'Application Components',
      command: '/application-components',
      isCompleted: false,
      content: null,
    },
  ]

  const mockComponents: Component[] = [
    {
      id: 'web-frontend',
      name: 'Web Frontend',
      type: 'compute',
      description: 'React-based single-page application',
    },
    {
      id: 'customer-db',
      name: 'Customer Database',
      type: 'data',
      description: 'Stores customer profiles and preferences',
    },
  ]

  const mockApplicationDefinition: AppDefType = {
    completionPercentage: 0,
    completedBoxes: 0,
    totalBoxes: 3,
    lastUpdated: '2026-02-15T10:00:00Z',
  }

  it('renders the section title', () => {
    render(
      <ApplicationDefinition
        planningBoxes={mockPlanningBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    expect(screen.getByText('Application Definition')).toBeInTheDocument()
  })

  it('renders all three planning boxes', () => {
    render(
      <ApplicationDefinition
        planningBoxes={mockPlanningBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    expect(screen.getByText('Application Overview')).toBeInTheDocument()
    expect(screen.getByText('Non-Functional Requirements')).toBeInTheDocument()
    expect(screen.getByText('Application Components')).toBeInTheDocument()
  })

  it('disables Continue button when boxes are not completed', () => {
    render(
      <ApplicationDefinition
        planningBoxes={mockPlanningBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    const continueButton = screen.getByRole('button', { name: /continue to context/i })
    expect(continueButton).toBeDisabled()
  })

  it('shows helper text when boxes are incomplete', () => {
    render(
      <ApplicationDefinition
        planningBoxes={mockPlanningBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    expect(screen.getByText('Complete all three planning boxes to continue')).toBeInTheDocument()
  })

  it('enables Continue button when all boxes are completed', () => {
    const completedBoxes: PlanningBox[] = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test content',
    }))

    render(
      <ApplicationDefinition
        planningBoxes={completedBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    const continueButton = screen.getByRole('button', { name: /continue to context/i })
    expect(continueButton).not.toBeDisabled()
  })

  it('does not show helper text when all boxes are completed', () => {
    const completedBoxes: PlanningBox[] = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test content',
    }))

    render(
      <ApplicationDefinition
        planningBoxes={completedBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    expect(screen.queryByText('Complete all three planning boxes to continue')).not.toBeInTheDocument()
  })

  it('applies disabled styling when button is disabled', () => {
    render(
      <ApplicationDefinition
        planningBoxes={mockPlanningBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    const continueButton = screen.getByRole('button', { name: /continue to context/i })
    expect(continueButton.className).toContain('bg-slate-200')
    expect(continueButton.className).toContain('cursor-not-allowed')
  })

  it('applies enabled styling when button is enabled', () => {
    const completedBoxes: PlanningBox[] = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test content',
    }))

    render(
      <ApplicationDefinition
        planningBoxes={completedBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    const continueButton = screen.getByRole('button', { name: /continue to context/i })
    expect(continueButton.className).toContain('bg-blue-600')
    expect(continueButton.className).toContain('cursor-pointer')
  })

  it('renders ComponentsBox for application-components box', () => {
    const completedBoxes: PlanningBox[] = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test content',
    }))

    render(
      <ApplicationDefinition
        planningBoxes={completedBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
      />
    )
    
    // Components should be rendered as cards (not markdown)
    expect(screen.getByText('Web Frontend')).toBeInTheDocument()
    expect(screen.getByText('Customer Database')).toBeInTheDocument()
    expect(screen.getByText('Compute')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
  })

  it('calls onNext when Continue button is clicked', () => {
    const handleNext = vi.fn()
    const completedBoxes: PlanningBox[] = mockPlanningBoxes.map(box => ({
      ...box,
      isCompleted: true,
      content: '# Test content',
    }))

    render(
      <ApplicationDefinition
        planningBoxes={completedBoxes}
        applicationDefinition={mockApplicationDefinition}
        components={mockComponents}
        onNext={handleNext}
      />
    )

    const continueButton = screen.getByRole('button', { name: /continue to context/i })
    fireEvent.click(continueButton)

    expect(handleNext).toHaveBeenCalledTimes(1)
  })
})
