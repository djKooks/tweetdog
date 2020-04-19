import React from 'react'
import { ResponsiveLine } from '@nivo/line'

import './LineChart.css'

const LineChart = ({ chartData }) => {
  return (
    <div class="line-chart">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

const tempData = [
  {
    "id": "japan",
    "color": "hsl(72, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 10
      },
      {
        "x": "helicopter",
        "y": 6
      },
      {
        "x": "boat",
        "y": 179
      },
      {
        "x": "train",
        "y": 7
      },
      {
        "x": "subway",
        "y": 299
      },
      {
        "x": "bus",
        "y": 84
      },
      {
        "x": "car",
        "y": 44
      },
      {
        "x": "moto",
        "y": 135
      },
      {
        "x": "bicycle",
        "y": 227
      },
      {
        "x": "horse",
        "y": 149
      },
      {
        "x": "skateboard",
        "y": 11
      },
      {
        "x": "others",
        "y": 103
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(65, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 139
      },
      {
        "x": "helicopter",
        "y": 161
      },
      {
        "x": "boat",
        "y": 285
      },
      {
        "x": "train",
        "y": 51
      },
      {
        "x": "subway",
        "y": 65
      },
      {
        "x": "bus",
        "y": 282
      },
      {
        "x": "car",
        "y": 156
      },
      {
        "x": "moto",
        "y": 108
      },
      {
        "x": "bicycle",
        "y": 50
      },
      {
        "x": "horse",
        "y": 147
      },
      {
        "x": "skateboard",
        "y": 232
      },
      {
        "x": "others",
        "y": 142
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(180, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 227
      },
      {
        "x": "helicopter",
        "y": 97
      },
      {
        "x": "boat",
        "y": 222
      },
      {
        "x": "train",
        "y": 65
      },
      {
        "x": "subway",
        "y": 95
      },
      {
        "x": "bus",
        "y": 200
      },
      {
        "x": "car",
        "y": 56
      },
      {
        "x": "moto",
        "y": 34
      },
      {
        "x": "bicycle",
        "y": 170
      },
      {
        "x": "horse",
        "y": 149
      },
      {
        "x": "skateboard",
        "y": 255
      },
      {
        "x": "others",
        "y": 275
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(291, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 94
      },
      {
        "x": "helicopter",
        "y": 163
      },
      {
        "x": "boat",
        "y": 123
      },
      {
        "x": "train",
        "y": 101
      },
      {
        "x": "subway",
        "y": 265
      },
      {
        "x": "bus",
        "y": 217
      },
      {
        "x": "car",
        "y": 106
      },
      {
        "x": "moto",
        "y": 279
      },
      {
        "x": "bicycle",
        "y": 275
      },
      {
        "x": "horse",
        "y": 45
      },
      {
        "x": "skateboard",
        "y": 234
      },
      {
        "x": "others",
        "y": 33
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(183, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 114
      },
      {
        "x": "helicopter",
        "y": 6
      },
      {
        "x": "boat",
        "y": 129
      },
      {
        "x": "train",
        "y": 12
      },
      {
        "x": "subway",
        "y": 27
      },
      {
        "x": "bus",
        "y": 27
      },
      {
        "x": "car",
        "y": 115
      },
      {
        "x": "moto",
        "y": 185
      },
      {
        "x": "bicycle",
        "y": 84
      },
      {
        "x": "horse",
        "y": 272
      },
      {
        "x": "skateboard",
        "y": 40
      },
      {
        "x": "others",
        "y": 129
      }
    ]
  }
]

export default LineChart
