import { Button } from '@nextui-org/react'
import { CursorClick } from '@phosphor-icons/react/dist/ssr'



export default function Home() {
  return (
    <Button startContent={ <CursorClick/> }>Say: Hello, world!</Button>
  )
}
