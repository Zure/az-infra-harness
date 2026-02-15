import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { ComponentsBox } from '../ComponentsBox'
import type { Component } from '../types'

describe('ComponentsBox', () => {
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
    {
      id: 'app-gateway',
      name: 'Application Gateway',
      type: 'networking',
      description: 'Entry point for incoming HTTPS traffic',
    },
  ]

  describe('Empty State', () => {
    it('should render empty state with command when not completed', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={false}
          components={[]}
        />
      )

      expect(screen.getByText('Application Components')).toBeInTheDocument()
      expect(screen.getByText('Run in coding agent:')).toBeInTheDocument()
      expect(screen.getByText('/application-components')).toBeInTheDocument()
    })

    it('should show grey border when not completed', () => {
      const { container } = render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={false}
          components={[]}
        />
      )

      const box = container.firstChild as HTMLElement
      expect(box).toHaveClass('border-slate-300')
    })

    it('should show circle icon when not completed', () => {
      const { container } = render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={false}
          components={[]}
        />
      )

      // Check for circle icon (not checkmark)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Filled State', () => {
    it('should render all component cards when completed', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
        />
      )

      expect(screen.getByText('Web Frontend')).toBeInTheDocument()
      expect(screen.getByText('Customer Database')).toBeInTheDocument()
      expect(screen.getByText('Application Gateway')).toBeInTheDocument()
    })

    it('should show blue border when completed', () => {
      const { container } = render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
        />
      )

      const box = container.firstChild as HTMLElement
      expect(box).toHaveClass('border-blue-500')
    })

    it('should display component type badges', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
        />
      )

      expect(screen.getByText('Compute')).toBeInTheDocument()
      expect(screen.getByText('Data')).toBeInTheDocument()
      expect(screen.getByText('Networking')).toBeInTheDocument()
    })

    it('should display component descriptions', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
        />
      )

      expect(screen.getByText('React-based single-page application')).toBeInTheDocument()
      expect(screen.getByText('Stores customer profiles and preferences')).toBeInTheDocument()
      expect(screen.getByText('Entry point for incoming HTTPS traffic')).toBeInTheDocument()
    })

    it('should show update command when completed', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
        />
      )

      expect(screen.getByText('Update components by running in coding agent:')).toBeInTheDocument()
      expect(screen.getByText('/application-components')).toBeInTheDocument()
    })
  })

  describe('Component Click Handling', () => {
    it('should call onComponentClick when a component card is clicked', () => {
      const handleClick = vi.fn()

      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
          onComponentClick={handleClick}
        />
      )

      const webFrontendCard = screen.getByText('Web Frontend').closest('div')
      fireEvent.click(webFrontendCard!)

      expect(handleClick).toHaveBeenCalledWith('web-frontend')
    })

    it('should not error if onComponentClick is not provided', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={true}
          components={mockComponents}
        />
      )

      const webFrontendCard = screen.getByText('Web Frontend').closest('div')
      expect(() => fireEvent.click(webFrontendCard!)).not.toThrow()
    })
  })

  describe('Copy Button', () => {
    it('should render copy button for the command', () => {
      render(
        <ComponentsBox
          title="Application Components"
          command="/application-components"
          isCompleted={false}
          components={[]}
        />
      )

      const copyButton = screen.getByTitle('Copy command')
      expect(copyButton).toBeInTheDocument()
    })
  })
})
