import * as React from 'react'
import { User } from '@/types/index'

type Props = {
  items: User[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      //@ts-ignore
        <li data={item} key={item.id}/>
    ))}
  </ul>
)

export default List
