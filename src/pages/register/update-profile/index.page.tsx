import { api } from '@/lib/axios'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { Container, Header } from '@/pages/register/styles'
import {
  FormAnnotation,
  ProfileBox,
} from '@/pages/register/update-profile/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from '@phosphor-icons/react'
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
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })
    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label htmlFor="">
            <Text>Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
              referrerPolicy="no-referrer"
            />
          </label>
          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
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
    </>
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
