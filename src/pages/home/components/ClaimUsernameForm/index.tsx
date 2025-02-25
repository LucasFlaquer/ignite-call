import { Form } from '@/pages/home/components/ClaimUsernameForm/styles'
import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
