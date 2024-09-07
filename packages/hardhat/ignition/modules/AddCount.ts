import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const AddCountModule = buildModule('AddCountModule', (m) => {
  const AddCount = m.contract('AddCount')

  return { AddCount }
})

export default AddCountModule
