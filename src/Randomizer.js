import { Button, InputNumber } from 'antd'
import { DownloadOutlined, RocketOutlined } from '@ant-design/icons'
import './Randomizer.css'
import { useRef, useState } from 'react'
import { Table } from 'antd'

const columns = [
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
    width: 500,
    title: 'Name',
    dataIndex: 'name',
  },
  {
    width: 100,
    title: 'Star',
    dataIndex: 'stars',
    render: (s) => Math.floor(s * 100) / 100,
  },
  {
    width: 100,
    title: 'Download',
    dataIndex: 'set_id',
    render: (s) => (
      <a href={`osu://dl/${s}`}>
        <DownloadOutlined style={{ fontSize: '20px' }} />
      </a>
    ),
  },
]

function Randomizer({ maps }) {
  const [mapHistory, setMapHistory] = useState([])
  const minRef = useRef(null)
  const maxRef = useRef(null)

  const random = () => {
    const min = Number.parseFloat(minRef.current.value)
    const max = Number.parseFloat(maxRef.current.value)
    const m = maps.filter((m) => m.stars >= min && m.stars <= max)
    const map = m[Math.floor(Math.random() * m.length)]
    setMapHistory((mh) => [map, ...mh])
  }

  return (
    <div>
      <div className="input-container">
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
      </div>

      <Button
        type="primary"
        shape="round"
        icon={<RocketOutlined />}
        size="large"
        onClick={random}
      >
        Random
      </Button>

      <Table
        className="result-table"
        columns={columns}
        dataSource={mapHistory}
      />
    </div>
  )
}

export default Randomizer
