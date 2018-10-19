import * as React from 'react'
import { css } from 'emotion'
import { hydrate, injectGlobal } from 'react-emotion'
import { map, max, pick, startCase } from 'lodash'
import { PlusCircle } from 'react-feather'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

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

injectGlobal([], {
  'html, body': {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial,sans-serif",
  },
})

export default class IndexPage extends React.Component {
  state = {
    layout: Layout.IPhone6S,
    orientation: Orientation.Vertical,
    pages: {
      1: {
        id: 1,
        name: '1',
      },
    },
    selectedPageId: 1,
    contextMenu: null,
  }

  showContextMenu = ({ x, y }) => {
    this.setState({ contextMenu: { x, y } })
  }

  hideContextMenu = () => {
    if (this.state.contextMenu) {
      this.setState({ contextMenu: null })
    }
  }

  render() {
    return (
      <>
        <div
          className={css({
            display: 'grid',
            height: '100vh',
            width: '100%',
            gridTemplateColumns: '256px 2fr',
          })}
        >
          <section className={css({ padding: 16 })}>
            <h2>Layout</h2>
            <h3>Size</h3>
            <select
              value={this.state.layout.id}
              onChange={event => {
                this.setState({ layout: Layout[event.target.value] })
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
              value={this.state.orientation}
              onChange={event => {
                this.setState({ orientation: event.target.value })
              }}
            >
              {Object.values(Orientation).map(value => (
                <option key={value} value={value}>
                  {startCase(value)}
                </option>
              ))}
            </select>
          </section>
          <main
            className={css({
              backgroundColor: 'lightgray',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            })}
          >
            <div
              className={css({
                background: 'white',
                minHeight: 64,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <ToolbarButton
                onClick={() => {
                  let newPageId = determineNextPageId(this.state.pages)
                  this.setState({
                    pages: {
                      ...this.state.pages,
                      [newPageId]: {
                        id: newPageId,
                        name: `${newPageId}`,
                      },
                    },
                  })
                }}
              >
                <PlusCircle />
                Add Page
              </ToolbarButton>
            </div>
            <LayoutEditor {...pick(this.state.layout, ['width', 'height'])}>
              <LayoutEditorHeader
                onContextMenu={e => {
                  e.preventDefault()
                  this.showContextMenu({ x: e.pageX, y: e.pageY })
                }}
              >
                {Object.values(this.state.pages).map(({ id }) => (
                  <PageTab
                    key={id}
                    onClick={() => {
                      this.setState({ selectedPageId: id })
                    }}
                    selected={this.state.selectedPageId === id}
                  />
                ))}
              </LayoutEditorHeader>
            </LayoutEditor>
            {this.state.contextMenu && (
              <ContextMenu
                {...this.state.contextMenu}
                onClose={this.hideContextMenu}
              >
                <li>one</li>
                <li>two</li>
                <li>three</li>
              </ContextMenu>
            )}
          </main>
        </div>
      </>
    )
  }
}

function determineNextPageId(pages) {
  let ids = map(pages, 'id')
  let maxValue = max(ids)
  return maxValue + 1
}

function ContextMenu({ x, y, onClose, children }) {
  return (
    <div
      className={css({
        position: 'absolute',
        display: 'block',
        left: x,
        top: y,
        border: '1px solid black',
        backgroundColor: 'white',
      })}
    >
      <button onClick={onClose}>Close</button>
      <ul
        className={css({
          listStyleType: 'none',
        })}
      >
        {children}
      </ul>
    </div>
  )
}

function ToolbarButton(props) {
  return (
    <button
      className={css({
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'none',
        background: 'none',
        verticalAlign: 'middle',
      })}
      {...props}
    />
  )
}

function LayoutEditor({ width, height, children }) {
  return (
    <div
      className={css({
        width,
        height,
        backgroundColor: 'black',
      })}
    >
      {children}
    </div>
  )
}

function LayoutEditorHeader(props) {
  return (
    <div
      className={css({
        display: 'flex',
        flexFlow: 'row',
        height: 40,
        width: '100%',
      })}
      {...props}
    />
  )
}

function PageTab({ selected, ...props }) {
  return (
    <div
      className={css({
        height: '100%',
        width: 'inherit',
        backgroundColor: selected ? '#333' : '#1c1c1c',
        borderRadius: 8,
        margin: '0 1px',
      })}
      {...props}
    />
  )
}
