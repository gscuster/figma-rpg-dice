// This is a dice widget with a button to roll the dice, an input box that accepts 
// basic dice notation, and text that displays the result of rolling the dice.
const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Input } = widget

const rollRegExp = /(\d+)(df|dF|d)(\d+)?([+-]\d+)?/

function parseRollString(rollString: string) {
  const [raw, nDice, type, faces, modifier] = rollString.match(rollRegExp) || []
  if (raw) {
    return {
      raw: raw,
      nDice: parseInt(nDice),
      type: type,
      faces: faces ? parseInt(faces) : 0,
      modifier: modifier ? parseInt(modifier) : 0
    }
  }
  return null
}

type Dice = {
  "raw": string,
  "nDice": number,
  "type": string,
  "faces": number,
  "modifier": number
}

const defaultDice = {
  "raw": "1d6",
  "nDice": 1,
  "type": "d",
  "faces": 6,
  "modifier": 0
}

function rollStandard(dice: Dice) {
  return Math.floor(Math.random() * dice.faces) + 1
}

function rollFudge(dice: Dice) {
  return rollStandard({ ...dice, faces: 3 }) - 2
}

function rollDice(dice: Dice) {
  let values: number[] = []
  if (dice.type.toLowerCase() === 'df') {
    values = Array(dice.nDice).fill(dice).map(rollFudge)
  } else if (dice.type === 'd' && dice.faces) {
    values = Array(dice.nDice).fill(dice).map(rollStandard)
  }
  const result = values.reduce((x, y) => x + y, 0) + dice.modifier
  return { result: result.toString(), values: values }
}

function Widget() {
  const [color, setColor] = useSyncedState('color', '#91a6ff')
  const [rollString, setRollString] = useSyncedState('rollString', defaultDice.raw)
  const [validRollString, setValidRollString] = useSyncedState('validRollString', true)
  const [dice, setDice] = useSyncedState('dice', defaultDice)
  const [output, setOutput] = useSyncedState('output', '')

  usePropertyMenu(
    [
      {
        itemType: 'color-selector',
        propertyName: 'colors',
        tooltip: 'Color selector',
        selectedOption: color,
        options: [{ option: "#91a6ff", tooltip: "Purple" },
        { option: "#ff88dc", tooltip: "Pink" },
        { option: "#faff7f", tooltip: "Yellow" },
        { option: "#ffffff", tooltip: "White" },
        { option: "#ff5154", tooltip: "Red" },
        { option: "#51ff54", tooltip: "Green" },
        { option: "#51ffff", tooltip: "Cyan" },],
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName == 'colors' && propertyValue) {
        setColor(propertyValue)
      }
    },
  )

  return (
    <AutoLayout
      verticalAlignItems={'center'}
      spacing={8}
      padding={16}
      cornerRadius={8}
      fill={color}
      stroke={'#E6E6E6'}
    >
      <SVG
        src={`<svg
        width="60"
        height="60"
        viewBox="0 0 30 30">
       <g>
         <path
            style="fill:#ffffff;stroke-width:0.665;stroke:#000000;stroke-opacity:1;stroke-dasharray:none;stroke-linecap:round;stroke-miterlimit:10;stroke-linejoin:round"
            d="M 23.448313,16.791205 11.549999,23.6607 -0.34831501,16.791205 l 6e-8,-13.73899 11.89831395,-6.8694948 11.898314,6.869495 z"
            transform="translate(3.4500008,5.07829)" />
         <g>
           <path
              style="color:#000000;fill:#000000;stroke-linecap:round;stroke-linejoin:round;"
              d="M 11.379098,12.700216 C 10.502158,12.763188 9.9660425,11.891192 10.015139,11.099247 9.882644,9.5779178 10.78224,8.1800477 11.952416,7.2863365 13.609134,5.9765163 16.084,5.9108317 17.886954,6.9569107 c 1.395753,0.805982 2.194322,2.4236898 2.102515,4.0180973 -0.03469,1.097221 -0.316337,2.308063 -1.261509,2.983658 -1.047675,0.801564 -2.307503,1.324055 -3.24246,2.27301 -0.570688,0.775595 -0.33817,1.781329 -0.387627,2.678412 0.03511,0.296636 0.03066,0.553718 -0.339806,0.444778 -0.296617,0.03565 -0.551831,0.0299 -0.443094,-0.339806 0.04597,-1.094508 -0.154992,-2.247085 0.293588,-3.281107 0.748982,-1.299822 2.431127,-1.686024 3.131599,-3.033737 0.65241,-1.119979 0.600632,-2.538164 0.210634,-3.7394178 -0.37511,-1.1124155 -1.502667,-1.8005753 -2.646492,-1.8249826 -1.222345,-0.1059821 -2.548228,0.2218196 -3.371669,1.1850537 -0.506544,0.4956912 -1.065377,1.4632393 -0.547421,2.0856937 0.650758,0.262019 1.195048,0.903024 1.052022,1.639198 -0.05724,0.511079 -0.625158,0.663458 -1.058136,0.654455 z m 4.795262,9.688387 c 0.06214,0.965473 -1.047397,1.658879 -1.908318,1.272212 -1.044478,-0.37229 -1.116424,-2.015719 -0.11927,-2.489377 0.878827,-0.483821 2.084102,0.181845 2.027588,1.217165 z"/>
           <path
              style="color:#000000;fill:#000000;stroke-linecap:round;stroke-linejoin:round;"
              d="m 15.097786,5.8477051 c -2.166008,-0.060471 -4.231781,1.3294527 -5.1259667,3.2769899 -0.4056699,0.976197 -0.5234466,2.14798 -0.09356,3.13394 0.5176933,0.972241 2.1281943,1.165712 2.7923413,0.265642 0.425447,-0.76458 0.0348,-1.839404 -0.723527,-2.231365 -0.565607,-0.09638 -0.361169,-1.1262092 0.09137,-1.5021267 0.653185,-0.8459231 1.702657,-1.2979825 2.761666,-1.2741075 0.988948,-0.0523 2.093282,0.2674277 2.595806,1.1897179 0.514971,1.0105708 0.569601,2.2512223 0.233219,3.3270143 -0.447021,1.266412 -1.751437,1.846829 -2.697031,2.674513 -0.751988,0.620736 -1.03218,1.607409 -1.010863,2.550879 0.01702,0.749128 -0.04023,1.506145 0.02976,2.250192 0.245226,0.391489 0.760192,0.192026 1.146795,0.241215 0.536272,-0.05378 0.366459,-0.66162 0.394292,-1.031943 0.0493,-0.767953 -0.173355,-1.642069 0.345305,-2.292702 1.050366,-1.002209 2.477129,-1.493286 3.517929,-2.502175 0.948893,-0.97433 1.100607,-2.454088 0.992571,-3.748582 C 20.185013,8.192289 18.620305,6.4888941 16.701438,6.0411719 16.178427,5.9062591 15.637371,5.8476341 15.097786,5.8477051 Z M 14.804781,20.623031 c -1.055068,-0.04884 -1.941115,0.999874 -1.747245,2.031437 0.106744,1.087514 1.350998,1.784124 2.350995,1.399108 1.168077,-0.351525 1.538409,-1.99339 0.714235,-2.859205 -0.329678,-0.370548 -0.824556,-0.574976 -1.317985,-0.57134 z" />
         </g>
       </g>
     </svg>`}
        onClick={() => {
          if (validRollString) {
            const { result, values } = rollDice(dice)
            setOutput(result)
            const user = figma.currentUser ? figma.currentUser.name : 'User'
            figma.notify(`${user} rolled ${dice.raw} for (${values}) = ${result}`)
          }
        }}
        tooltip="Roll dice"
      ></SVG>
      <Input
        value={rollString}
        placeholder="1d6"
        onTextEditEnd={(e) => {
          const newDice = parseRollString(e.characters)
          setValidRollString(Boolean(newDice))
          setRollString(e.characters);
          if (newDice) {
            setDice(newDice)
          }
        }}
        fontSize={24}
        fill="#000000"
        inputFrameProps={{
          fill: validRollString ? "#ffffff" : "#ffaaaa",
          stroke: "#000000",
          cornerRadius: 16,
          padding: 16,
        }}
        inputBehavior="wrap"
        tooltip="Dice notation"
        width={120}
      />
      <Text
        fontSize={32}
        width={42}
        horizontalAlignText={'center'}
        tooltip={`Result of rolling ${dice.raw}`}>
        {output}
      </Text>
    </AutoLayout>
  )
}

widget.register(Widget)
