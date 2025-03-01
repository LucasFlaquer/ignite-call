import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { Container, Header } from '@/pages/register/styles'
import {
  FormAnnotation,
  ProfileBox,
} from '@/pages/register/update-profile/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {},
  })
  const session = useSession()
  console.log(session)
  async function handleUpdateProfile(data: UpdateProfileFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label htmlFor="">
          <Text>Foto de perfil</Text>
        </label>
        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea placeholder="seu nome" {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>
        <Button disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}
