import React from 'react'

export default function (className) {
  return {
    children: (...elements) => (
      <span className={className}>
        {elements}
      </span>
    )
  }
}
