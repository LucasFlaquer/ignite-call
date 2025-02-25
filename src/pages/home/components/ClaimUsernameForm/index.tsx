import { Form } from '@/pages/home/components/ClaimUsernameForm/styles'
import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'


export function ClaimUsernameForm() {
  const { register } = useForm()
  return (
    <Form as="form">
      <TextInput size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
