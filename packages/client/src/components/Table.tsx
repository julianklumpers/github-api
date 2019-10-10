import React from 'react'
import { ApolloQueryResult } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

interface Props {
  data: ApolloQueryResult<any>
  loading: boolean
  error: any
  tableHeads: string[]
  children(data: any): React.ReactNode
}

const Table: React.SFC<Props> = ({ data, loading, error, tableHeads, children }) => {
  if (loading) return <div>Loading....</div>
  // always show the first message
  if (error) return <div>{error.graphQLErrors[0].message}</div>
  if (!data) return <div>Nothing to display</div>

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          {tableHeads.map((head: string, index: number) => (
            // because the first "head" is a empty string we concatenate the array index
            <th key={`${head}-${index}`}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children(data)}</tbody>
    </table>
  )
}

export default Table
