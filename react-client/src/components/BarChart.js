
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

import './BarChart.css'

const BarChart = ({ barKey, barData }) => {
  return (
    <div class="bar-chart">
      <ResponsiveBar
        data={barData}
        keys={barKey}
        indexBy="user"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}

        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'user',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'tweets',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  )
}

const tempData = [
  {
    "country": "AD",
    "hot dog": 176,
    "hot dogColor": "hsl(207, 70%, 50%)",
    "burger": 163,
    "burgerColor": "hsl(34, 70%, 50%)",
    "sandwich": 8,
    "sandwichColor": "hsl(312, 70%, 50%)",
    "kebab": 61,
    "kebabColor": "hsl(205, 70%, 50%)",
    "fries": 113,
    "friesColor": "hsl(238, 70%, 50%)",
    "donut": 56,
    "donutColor": "hsl(194, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 21,
    "hot dogColor": "hsl(194, 70%, 50%)",
    "burger": 184,
    "burgerColor": "hsl(251, 70%, 50%)",
    "sandwich": 61,
    "sandwichColor": "hsl(340, 70%, 50%)",
    "kebab": 104,
    "kebabColor": "hsl(324, 70%, 50%)",
    "fries": 98,
    "friesColor": "hsl(256, 70%, 50%)",
    "donut": 99,
    "donutColor": "hsl(243, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 61,
    "hot dogColor": "hsl(201, 70%, 50%)",
    "burger": 184,
    "burgerColor": "hsl(90, 70%, 50%)",
    "sandwich": 121,
    "sandwichColor": "hsl(51, 70%, 50%)",
    "kebab": 111,
    "kebabColor": "hsl(49, 70%, 50%)",
    "fries": 179,
    "friesColor": "hsl(14, 70%, 50%)",
    "donut": 148,
    "donutColor": "hsl(200, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 58,
    "hot dogColor": "hsl(147, 70%, 50%)",
    "burger": 100,
    "burgerColor": "hsl(54, 70%, 50%)",
    "sandwich": 61,
    "sandwichColor": "hsl(120, 70%, 50%)",
    "kebab": 67,
    "kebabColor": "hsl(216, 70%, 50%)",
    "fries": 44,
    "friesColor": "hsl(52, 70%, 50%)",
    "donut": 79,
    "donutColor": "hsl(269, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 72,
    "hot dogColor": "hsl(157, 70%, 50%)",
    "burger": 88,
    "burgerColor": "hsl(10, 70%, 50%)",
    "sandwich": 195,
    "sandwichColor": "hsl(307, 70%, 50%)",
    "kebab": 117,
    "kebabColor": "hsl(257, 70%, 50%)",
    "fries": 62,
    "friesColor": "hsl(310, 70%, 50%)",
    "donut": 64,
    "donutColor": "hsl(183, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 176,
    "hot dogColor": "hsl(151, 70%, 50%)",
    "burger": 18,
    "burgerColor": "hsl(190, 70%, 50%)",
    "sandwich": 180,
    "sandwichColor": "hsl(343, 70%, 50%)",
    "kebab": 168,
    "kebabColor": "hsl(350, 70%, 50%)",
    "fries": 72,
    "friesColor": "hsl(232, 70%, 50%)",
    "donut": 115,
    "donutColor": "hsl(1, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 181,
    "hot dogColor": "hsl(295, 70%, 50%)",
    "burger": 74,
    "burgerColor": "hsl(57, 70%, 50%)",
    "sandwich": 141,
    "sandwichColor": "hsl(273, 70%, 50%)",
    "kebab": 68,
    "kebabColor": "hsl(135, 70%, 50%)",
    "fries": 117,
    "friesColor": "hsl(154, 70%, 50%)",
    "donut": 147,
    "donutColor": "hsl(23, 70%, 50%)"
  }
]

export default BarChart
