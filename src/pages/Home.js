import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function Home() {
  const { user } = useContext(AuthContext)

  // (1) ??? getPosts undefined not resolve
  // const { loading, data: { getPosts: posts } } = useQuery(FETCH_POST_QUERY) 
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent posts</h1>
      </Grid.Row>
      {/* (1) <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (posts && posts.map(post => (
          <Grid.Column key={post.id}>
            <PostCard post={post} />
          </Grid.Column>
        )))}
      </Grid.Row> */}
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data.getPosts && data.getPosts.map(post => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home