import React from 'react'

interface Props {
  children: React.ReactNode
}

const Container: React.SFC<Props> = ({ children }) => {
  return <div className="columns is-centered">{children}</div>
}

export default Container
