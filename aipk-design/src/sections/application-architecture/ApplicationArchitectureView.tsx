import data from '@/../product/sections/application-architecture/data.json'
import { ApplicationArchitecture } from './components/ApplicationArchitecture'
import type { Component } from '@/../product/sections/application-architecture/types'

export default function ApplicationArchitecturePreview() {
  return (
    <ApplicationArchitecture
      components={data.components as Component[]}
      deployment={data.deployment}
      architectureDiagram={data.architectureDiagram}
      onComponentClick={(componentId) => console.log('Component clicked:', componentId)}
      onDeploymentClick={() => console.log('Deployment clicked')}
      onDiagramClick={() => console.log('Diagram clicked')}
      onNext={() => console.log('Continue to Architecture Decisions')}
    />
  )
}
