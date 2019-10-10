import React from 'react'
import Container from './../components/Container'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useParams, useHistory } from 'react-router'
import Table from '../components/Table'
import Button from '../components/Button'
import { Repo } from '@generated/graphql-types'

const GET_USER_REPOS = gql`
  query getUserRepos($username: String!) {
    getUserRepos(username: $username) {
      id
      name
      stargazers_count
      html_url
      fork
      owner {
        avatar_url
      }
    }
  }
`

const User: React.SFC = () => {
  const { username } = useParams()
  const { push } = useHistory()
  const { loading, data, error } = useQuery(GET_USER_REPOS, { variables: { username }, skip: !username })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.graphQLErrors[0].message}</div>
  if (!data) return <div>No user found</div>

  return (
    <>
      <Container>
        <div className="column is-four-fifths">
          <Button text="< Search" onClick={() => push('/users')} />
        </div>
      </Container>
      <Container>
        <div className="column is-four-fifths">
          <Table tableHeads={['Name', 'URL', 'Stars', 'Forked']} data={data} loading={loading} error={error}>
            {({ getUserRepos: userRepos }: { getUserRepos: Repo[] }) =>
              userRepos.map((repo) => (
                <tr key={repo.id}>
                  <td>{repo.name}</td>
                  <td>
                    <a href={repo.html_url} target="_NEW">
                      Go to repo
                    </a>
                  </td>
                  <td>{repo.stargazers_count}</td>
                  <td>{repo.fork ? 'Forked' : 'Owner'}</td>
                </tr>
              ))
            }
          </Table>
        </div>
      </Container>
    </>
  )
}

export default User
