---
description: Configure an application component by mapping it to an Azure service with SKU, region, and service-specific settings
agent: build
---

Please use the configure-component skill to configure an application component.

This skill reads the existing application components from application-components.md, lets you select a component, and guides you through mapping it to a specific Azure service with the appropriate SKU, region, and configuration settings.
Once complete, a JSON file will be generated at
`src/data/application-architecture/components/{component-id}.json`.
