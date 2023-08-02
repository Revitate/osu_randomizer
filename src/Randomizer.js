import {
  CloseOutlined,
  DownloadOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, InputNumber, Select, Space, Table } from 'antd'
import { useState } from 'react'
import './Randomizer.css'
import CatchMode from './icons/mode-ctb.svg'
import ManiaMode from './icons/mode-mania.svg'
import OsuMode from './icons/mode-osu.svg'
import TaikoMode from './icons/mode-taiko.svg'

const columns = [
  {
    width: 100,
    title: 'ID',
    dataIndex: 'map_id',
    render: (s) => (
      <a href={`https://osu.ppy.sh/b/${s}`} target="_blank" rel="noreferrer">
        {s}
      </a>
    ),
  },
  {
    width: 100,
    title: 'Set ID',
    dataIndex: 'set_id',
    key: 'set_id',
    render: (s) => (
      <a
        href={`https://osu.ppy.sh/beatmapsets/${s}`}
        target="_blank"
        rel="noreferrer"
      >
        {s}
      </a>
    ),
  },
  {
    width: 400,
    title: 'Name',
    dataIndex: 'name',
  },
  {
    width: 50,
    title: 'PP',
    dataIndex: 'pp',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 50,
    title: 'AR',
    dataIndex: 'ar',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 50,
    title: 'OD',
    dataIndex: 'od',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 50,
    title: 'CS',
    dataIndex: 'cs',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 50,
    title: 'HP',
    dataIndex: 'hp',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 50,
    title: 'BPM',
    dataIndex: 'bpm',
    render: (s) => Math.floor(s),
  },
  {
    width: 50,
    title: 'Length',
    dataIndex: 'length',
    render: (s) =>
      `${Math.floor(s / 60)}:${Math.floor(s % 60)
        .toString()
        .padStart(2, '0')}`,
  },
  {
    width: 50,
    title: 'Star',
    dataIndex: 'stars',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 50,
    title: 'Mode',
    dataIndex: 'mode',
    render: (s) => (
      <img
        src={modeMap[s].image}
        title={modeMap[s].label}
        alt={modeMap[s].label}
        width={30}
      />
    ),
  },
  {
    width: 100,
    title: 'Ranked',
    dataIndex: 'ranked',
    render: (s) => rankedMapStatus[s],
  },
  {
    width: 100,
    title: 'Download',
    dataIndex: 'set_id',
    render: (s) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Button
          href={`osu://dl/${s}`}
          block
          type="primary"
          icon={<DownloadOutlined />}
          size="small"
        >
          Direct
        </Button>
        <Button
          href={`https://api.chimu.moe/v1/download/${s}`}
          block
          type="primary"
          icon={<DownloadOutlined />}
          size="small"
        >
          Chimu
        </Button>
        <Button
          href={`https://beatconnect.io/b/${s}`}
          block
          type="primary"
          icon={<DownloadOutlined />}
          size="small"
        >
          Beatconnect
        </Button>
        {/* <a href={`osu://dl/${s}`}>
          <DownloadOutlined style={{ fontSize: '20px' }} />
        </a>
        <a href={`osu://dl/${s}`}>
          <DownloadOutlined style={{ fontSize: '20px' }} />
        </a>
        <a href={`osu://dl/${s}`}>
          <DownloadOutlined style={{ fontSize: '20px' }} />
        </a> */}
      </div>
    ),
  },
]

// rank status
// -2 = graveyard
// -1 = wip
// 0-3 = pending
// 4 = ranked
// 5 = approved
// 6 = qualified
// 7 = loved

const modeMap = {
  0: { image: OsuMode, label: 'osu!' },
  1: { image: TaikoMode, label: 'taiko' },
  2: { image: CatchMode, label: 'catch' },
  3: { image: ManiaMode, label: 'mania' },
}

const useMinMax = (d) => {
  const [min, setMin] = useState(d[0])
  const [max, setMax] = useState(d[1])

  const getMinMax = () => {
    return [min, max]
  }

  return { getMinMax, setMin, setMax }
}

const MinMaxInput = ({ label, value, min, max, step, setMin, setMax }) => {
  return (
    <div className="minmax-container">
      <div style={{ fontSize: '16px' }}>{label}</div>
      <InputNumber
        value={value[0]}
        onChange={(v) => setMin(parseFloat(v))}
        addonBefore={<div style={{ width: 25 }}>Min</div>}
        min={min}
        max={max}
        step={step}
      />
      <InputNumber
        value={value[1]}
        onChange={(v) => setMax(parseFloat(v))}
        addonBefore={<div style={{ width: 25 }}>Max</div>}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

const rankedMapStatus = {
  [-2]: 'Graveyard',
  [-1]: 'WIP',
  0: 'Pending',
  1: 'Pending',
  2: 'Pending',
  3: 'Pending',
  4: 'Ranked',
  5: 'Approved',
  6: 'Qualified',
  7: 'Loved',
}
const getRangeStatus = (list) => {
  const s = new Set()
  for (const i of list) {
    switch (i) {
      case 'Graveyard':
        s.add(-2)
        break
      case 'WIP':
        s.add(-1)
        break
      case 'Pending':
        s.add(0)
        s.add(1)
        s.add(2)
        s.add(3)
        break
      case 'Ranked':
        s.add(4)
        break
      case 'Approved':
        s.add(5)
        break
      case 'Qualified':
        s.add(6)
        break
      case 'Loved':
        s.add(7)
        break

      default:
        break
    }
  }
  return [...s]
}

const plainOptions = [
  'Graveyard',
  'WIP',
  'Pending',
  'Ranked',
  'Approved',
  'Qualified',
  'Loved',
]
const defaultCheckedList = [
  'Graveyard',
  'WIP',
  'Pending',
  'Ranked',
  'Approved',
  'Qualified',
  'Loved',
]
const useRankedStatus = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(true)

  const onChange = (list) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  return { checkedList, indeterminate, checkAll, onChange, onCheckAllChange }
}

const RankedStatus = ({
  checkedList,
  indeterminate,
  checkAll,
  onChange,
  onCheckAllChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '16px', marginRight: '10px' }}>
        Ranked Status:{' '}
      </div>
      <div
        style={{
          borderRight: '1px solid #E9E9E9',
          marginRight: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
      </div>
      <Checkbox.Group
        style={{ color: 'white' }}
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </div>
  )
}

function Randomizer({ maps }) {
  const [mapHistory, setMapHistory] = useState([])
  const ar = useMinMax([0, 10])
  const od = useMinMax([0, 10])
  const cs = useMinMax([0, 10])
  const hp = useMinMax([0, 10])
  const bpm = useMinMax([0, -1])
  const length = useMinMax([0, -1])
  const star = useMinMax([0, 10])
  const [mode, setMode] = useState('-1')
  const ranked = useRankedStatus()

  const random = () => {
    const [minAR, maxAR] = ar.getMinMax()
    const [minOD, maxOD] = od.getMinMax()
    const [minCS, maxCS] = cs.getMinMax()
    const [minHP, maxHP] = hp.getMinMax()
    const [minBPM, maxBPM] = bpm.getMinMax()
    const [minLength, maxLength] = length.getMinMax()
    const [minStar, maxStar] = star.getMinMax()
    const modeValue = Number.parseInt(mode)
    const chekcedStatus = getRangeStatus(ranked.checkedList)
    // const min = Number.parseFloat(minRef.current.value)
    // const max = Number.parseFloat(maxRef.current.value)
    const m = maps.filter((m) => {
      if (modeValue !== -1 && m.mode !== modeValue) return false
      if ((minAR !== -1 && m.ar < minAR) || (maxAR !== -1 && m.ar > maxAR))
        return false
      if ((minOD !== -1 && m.od < minOD) || (maxOD !== -1 && m.od > maxOD))
        return false
      if ((minCS !== -1 && m.cs < minCS) || (maxCS !== -1 && m.cs > maxCS))
        return false
      if ((minHP !== -1 && m.hp < minHP) || (maxHP !== -1 && m.hp > maxHP))
        return false

      if (
        (minBPM !== -1 && m.bpm < minBPM) ||
        (maxBPM !== -1 && m.bpm > maxBPM)
      )
        return false
      if (
        (minLength !== -1 && m.length < minLength) ||
        (maxLength !== -1 && m.length > maxLength)
      )
        return false
      if (
        (minStar !== -1 && m.stars < minStar) ||
        (maxStar !== -1 && m.stars > maxStar)
      )
        return false
      if (!chekcedStatus.includes(m.ranked)) return false

      return true
    })
    if (m.length === 0) return
    const map = m[Math.floor(Math.random() * m.length)]
    setMapHistory((mh) => [map, ...mh])
  }

  const reset = () => {
    ar.setMin(0)
    ar.setMax(10)
    od.setMin(0)
    od.setMax(10)
    cs.setMin(0)
    cs.setMax(10)
    hp.setMin(0)
    hp.setMax(10)
    bpm.setMin(0)
    bpm.setMax(-1)
    length.setMin(0)
    length.setMax(-1)
    star.setMin(0)
    star.setMax(10)
    setMode('-1')
    ranked.onChange(defaultCheckedList)
  }

  return (
    <div>
      <div className="input-container">
        <MinMaxInput
          label="AR"
          value={ar.getMinMax()}
          setMax={ar.setMax}
          setMin={ar.setMin}
          step="0.01"
        />
        <MinMaxInput
          label="OD"
          value={od.getMinMax()}
          setMax={od.setMax}
          setMin={od.setMin}
          step="0.01"
        />
        <MinMaxInput
          label="CS"
          value={cs.getMinMax()}
          setMax={cs.setMax}
          setMin={cs.setMin}
          step="0.01"
        />
        <MinMaxInput
          label="HP"
          value={hp.getMinMax()}
          setMax={hp.setMax}
          setMin={hp.setMin}
          step="0.01"
        />
        <MinMaxInput
          label="BPM"
          value={bpm.getMinMax()}
          setMax={bpm.setMax}
          setMin={bpm.setMin}
          step="1"
        />
        <MinMaxInput
          label="Length"
          value={length.getMinMax()}
          setMax={length.setMax}
          setMin={length.setMin}
          step="1"
        />
        <MinMaxInput
          label="Star"
          value={star.getMinMax()}
          setMax={star.setMax}
          setMin={star.setMin}
          step="0.01"
        />
        <div className="minmax-container">
          <div style={{ fontSize: '16px' }}>MODE</div>
          <Select
            value={mode}
            onChange={setMode}
            options={[
              { value: '-1', label: 'any' },
              { value: '0', label: 'osu!' },
              { value: '1', label: 'taiko' },
              { value: '2', label: 'catch' },
              { value: '3', label: 'mania' },
            ]}
          />
        </div>
      </div>
      <div>
        <RankedStatus
          checkedList={ranked.checkedList}
          onChange={ranked.onChange}
          onCheckAllChange={ranked.onCheckAllChange}
          checkAll={ranked.checkAll}
          indeterminate={ranked.indeterminate}
        ></RankedStatus>
      </div>
      {/* <div className="input-container">
        <span className="label">Min Star :</span>
        <InputNumber
          ref={minRef}
          defaultValue="4"
          min="0"
          max="10"
          step="0.01"
        />
      </div>
      <div className="input-container">
        <span className="label">Max Star :</span>
        <InputNumber
          ref={maxRef}
          defaultValue="5"
          min="0"
          max="10"
          step="0.01"
        />
      </div> */}

      <Space>
        <Button
          type="primary"
          shape="round"
          icon={<RocketOutlined />}
          size="large"
          onClick={random}
        >
          Random
        </Button>
        <Button
          type="secondary"
          shape="round"
          icon={<CloseOutlined />}
          size="large"
          onClick={reset}
        >
          Reset
        </Button>
      </Space>

      <Table
        className="result-table"
        columns={columns}
        dataSource={mapHistory}
      />
    </div>
  )
}

export default Randomizer
