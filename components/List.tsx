import * as React from 'react'
import { User } from '@/interfaces/index'

type Props = {
  items: User[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
        <li data={item} key={item.id}/>
    ))}
  </ul>
)

export default List
