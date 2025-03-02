import {
  ConfirmForm,
  FormActions,
  FormError,
  FormHeader,
} from '@/pages/schedule/[username]/ScheduleForm/ConfirmStep/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome precisa no mínimo de 3 caracteres'),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormSchemaData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchemaData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmStep(data: ConfirmFormSchemaData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmStep)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label htmlFor="">
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors?.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          placeholder="johndoe@example.com"
          type="email"
          {...register('email')}
        />
        {errors?.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label htmlFor="">
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
