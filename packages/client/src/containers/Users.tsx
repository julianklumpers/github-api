import React from 'react'
import { gql } from 'apollo-boost'
import Container from './../components/Container'
import SearchTitle from './../components/SearchTitle'
import Input from './../components/Input'
import Table from '../components/Table'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { User } from '@generated/graphql-types'

const GET_USERS = gql`
  query getUsersByName($username: String!) {
    getUsersByName(username: $username) {
      id
      login
      url
      avatar_url
      score
    }
  }
`

const Users: React.SFC = () => {
  const [username, setUSername] = React.useState<string>(window.sessionStorage.getItem('@username') || '')
  const { loading, error, data, refetch, variables } = useQuery(GET_USERS, { variables: { username }, skip: !username })

  React.useEffect(() => {
    if (username) {
      refetch({
        ...variables,
        username,
      })
    }
  }, [username])

  function handleSearch(value: string): void {
    // set to state for observer to trigger useEffect
    setUSername(value)
    window.sessionStorage.setItem('@username', value)
  }

  return (
    <>
      <Container>
        <div className="column is-four-fifths">
          <SearchTitle text="Type a username and hit enter" />
          <Input onEnter={handleSearch} defaultValue={username} />
        </div>
      </Container>
      <Container>
        <div className="column is-four-fifths">
          <Table tableHeads={['', 'Username', 'Score']} data={data} error={error} loading={loading}>
            {({ getUsersByName: users }: { getUsersByName: User[] }) =>
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.avatar_url && <img style={{ width: 64, borderRadius: '50%' }} src={user.avatar_url} />}</td>
                  <td>
                    <Link to={`/users/${user.login}`}>{user.login}</Link>
                  </td>
                  <td>{user.score}</td>
                </tr>
              ))
            }
          </Table>
        </div>
      </Container>
    </>
  )
}

export default Users
