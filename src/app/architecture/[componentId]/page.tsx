import { notFound } from 'next/navigation'
import { loadComponents } from '@/lib/application-architecture-loader'
import { ComponentDetail } from '@/components/application-architecture'
import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ componentId: string }>
}) {
  const { componentId } = await params
  const components = await loadComponents()
  
  // Find the component by ID
  const component = components.find((c) => c.id === componentId)
  
  if (!component) {
    notFound()
  }

  return (
    <WorkflowLayout>
      <ComponentDetail component={component} />
    </WorkflowLayout>
  )
}

// Generate static params for all components
export async function generateStaticParams() {
  const components = await loadComponents()
  
  return components.map((component) => ({
    componentId: component.id,
  }))
}
