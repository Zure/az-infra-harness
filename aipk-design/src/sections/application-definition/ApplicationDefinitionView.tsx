import data from '@/../product/sections/application-definition/data.json'
import { ApplicationDefinition } from './components/ApplicationDefinition'
import type { Component } from '@/../product/sections/application-definition/types'

export default function ApplicationDefinitionPreview() {
  return (
    <ApplicationDefinition
      planningBoxes={data.planningBoxes}
      components={data.components as Component[]}
      applicationDefinition={data.applicationDefinition}
      onBoxClick={(boxId) => console.log('Box clicked:', boxId)}
      onComponentClick={(componentId) => console.log('Component clicked:', componentId)}
      onRefresh={() => console.log('Refresh requested')}
    />
  )
}
