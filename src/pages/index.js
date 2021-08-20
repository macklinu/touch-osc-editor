/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from 'react'
import { jsx, Global } from '@emotion/react'
import { map, max, pick, startCase } from 'lodash'
import { PlusCircle } from 'react-feather'

let Layout = {
  // TODO add these in to support iPad layout sizes
  // IPad: {
  //   id: 'IPad',
  //   name: 'iPad',
  //   width: 768,
  //   height: 1024,
  // },
  // IPadPro: {
  //   id: 'IPadPro',
  //   name: 'iPad Pro',
  //   width: 1024,
  //   height: 1326,
  // },
  IPhone6S: {
    id: 'IPhone6S',
    name: 'iPhone 6/6s',
    width: 375,
    height: 667,
  },
  IPhone6SPlus: {
    id: 'IPhone6SPlus',
    name: 'iPhone 6/6s Plus',
    width: 414,
    height: 736,
  },
}

let Orientation = {
  Vertical: 'Vertical',
  Horizontal: 'Horizontal',
}

export default function HomePage() {
  const [layout, setLayout] = useState(Layout.IPhone6S)
  const [orientation, setOrientation] = useState(Orientation.Vertical)
  const [pages, setPages] = useState({ 1: { id: 1, name: '1' } })
  const [selectedPageId, setSelectedPageId] = useState(1)
  const [contextMenu, setContextMenu] = useState(null)

  const showContextMenu = ({ x, y }) => setContextMenu({ x, y })

  const hideContextMenu = () => setContextMenu(null)

  const addPage = () => {
    const newPageId = determineNextPageId(pages)
    setPages({
      ...pages,
      [newPageId]: {
        id: newPageId,
        name: `${newPageId}`,
      },
    })
  }

  return (
    <div
      css={{
        display: 'grid',
        height: '100vh',
        width: '100%',
        gridTemplateColumns: '256px 2fr',
      }}
    >
      <Global
        styles={{
          'html, body': {
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial,sans-serif",
          },
        }}
      />
      <section css={{ padding: 16 }}>
        <h2>Layout</h2>
        <h3>Size</h3>
        <select
          value={layout.id}
          onChange={(event) => {
            setLayout(Layout[event.target.value])
          }}
        >
          {Object.values(Layout).map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <h3>Orientation</h3>
        <select
          value={orientation}
          onChange={(event) => {
            setOrientation(event.target.value)
          }}
        >
          {Object.values(Orientation).map((value) => (
            <option key={value} value={value}>
              {startCase(value)}
            </option>
          ))}
        </select>
      </section>
      <main
        css={{
          backgroundColor: 'lightgray',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            background: 'white',
            minHeight: 64,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ToolbarButton onClick={addPage}>
            <PlusCircle />
            Add Page
          </ToolbarButton>
        </div>
        <LayoutEditor {...pick(layout, ['width', 'height'])}>
          <LayoutEditorHeader
            onContextMenu={(e) => {
              e.preventDefault()
              showContextMenu({ x: e.pageX, y: e.pageY })
            }}
          >
            {Object.values(pages).map(({ id }) => (
              <PageTab
                key={id}
                onClick={() => {
                  setSelectedPageId(id)
                }}
                selected={selectedPageId === id}
              />
            ))}
          </LayoutEditorHeader>
        </LayoutEditor>
        {contextMenu && (
          <ContextMenu {...contextMenu} onClose={hideContextMenu}>
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ContextMenu>
        )}
      </main>
    </div>
  )
}

function determineNextPageId(pages) {
  let ids = map(pages, 'id')
  let maxValue = max(ids)
  return maxValue + 1
}

function ContextMenu({ x, y, onClose, children }) {
  return (
    <div
      css={{
        position: 'absolute',
        display: 'block',
        left: x,
        top: y,
        border: '1px solid black',
        backgroundColor: 'white',
      }}
    >
      <button onClick={onClose}>Close</button>
      <ul
        css={{
          listStyleType: 'none',
        }}
      >
        {children}
      </ul>
    </div>
  )
}

function ToolbarButton(props) {
  return (
    <button
      css={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'none',
        background: 'none',
        verticalAlign: 'middle',
      }}
      {...props}
    />
  )
}

function LayoutEditor({ width, height, children }) {
  return (
    <div
      css={{
        width,
        height,
        backgroundColor: 'black',
      }}
    >
      {children}
    </div>
  )
}

function LayoutEditorHeader(props) {
  return (
    <div
      css={{
        display: 'flex',
        flexFlow: 'row',
        height: 40,
        width: '100%',
      }}
      {...props}
    />
  )
}

function PageTab({ selected, ...props }) {
  return (
    <div
      css={{
        height: '100%',
        width: 'inherit',
        backgroundColor: selected ? '#333' : '#1c1c1c',
        borderRadius: 8,
        margin: '0 1px',
      }}
      {...props}
    />
  )
}
