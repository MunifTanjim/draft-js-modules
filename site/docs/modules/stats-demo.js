import { getStatsModule } from '@draft-js-modules/stats'
import React from 'react'
import BaseEditor from '../../src/components/BaseEditor'

const { Stats, ...StatsModule } = getStatsModule()

const modules = [StatsModule]

const Bottom = () => <Stats />

const StatsDemo = () => (
  <BaseEditor
    Bottom={Bottom}
    modules={modules}
    placeholder="Draft.js Stats Module"
  />
)

export default StatsDemo
