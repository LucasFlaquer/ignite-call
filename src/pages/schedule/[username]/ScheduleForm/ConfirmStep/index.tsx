import { api } from '@/lib/axios'
import {
  ConfirmForm,
  FormActions,
  FormError,
  FormHeader,
} from '@/pages/schedule/[username]/ScheduleForm/ConfirmStep/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome precisa no mínimo de 3 caracteres'),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormSchemaData = z.infer<typeof confirmFormSchema>

interface Props {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({ schedulingDate, onCancelConfirmation }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchemaData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmStep(data: ConfirmFormSchemaData) {
    const { email, name, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })
    onCancelConfirmation()
  }
  const describedDate = dayjs(schedulingDate).format(
    'DD [ de ] MMMM [ de ] YYYY',
  )
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmStep)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
