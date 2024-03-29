import * as React from 'react'
import { User } from '@/types/index'

type ListDetailProps = {
  item: User
}

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user._id}</p>
  </div>
)

export default ListDetail
