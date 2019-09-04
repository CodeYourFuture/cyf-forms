import React from 'react'
import Media from './media'
import Desktop from './desktop'
export default props => {
  if (window.screen.width < 990) {
    return <Media {...props} />
  }
  return <Desktop {...props} />
}
