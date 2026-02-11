import data from '@/../product/sections/context/data.json'
import { Context } from './components/Context'

export default function ContextPreview() {
  return (
    <Context
      planningBoxes={data.planningBoxes}
      contextDefinition={data.contextDefinition}
      onBoxClick={(boxId) => console.log('Box clicked:', boxId)}
      onNext={() => console.log('Continue to Application Architecture')}
    />
  )
}
