import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Stack } from '@chakra-ui/react';

import { toaster, Field, PasswordInput } from '@/components/ui';
import * as AuthService from '@/api/auth.service';
import { useAuthContext } from '@/context/Auth';
import { Title } from '@/components/ui/title';

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const auth = useAuthContext();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await AuthService.register(data);
      auth.login(res.token);
      navigate('/');
    } catch (error: any) {
      toaster.create({ description: error.message, type: 'error' });
    }
  });

  return (
    <Card.Root maxW='sm' m='auto' w='full' border='0' boxShadow='sm' as='form' onSubmit={onSubmit}>
      <Card.Header>
        <Card.Title as={Title}>Sign up</Card.Title>
        <Card.Description>Fill in the form below to create account</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap='4' w='full'>
          <Field label='Username' invalid={!!errors.username} errorText={errors.username?.message}>
            <Input
              {...register('username', {
                required: 'Username is required',
                setValueAs: (value: string) => value.trim()
              })}
            />
          </Field>
          <Field label='Password' invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              {...register('password', {
                minLength: 6,
                required: 'Password is required'
              })}
            />
          </Field>
          <Field label='Confirm Password' invalid={!!errors.confirmPassword} errorText={errors.confirmPassword?.message}>
            <PasswordInput
              {...register('confirmPassword', {
                required: 'Password confirmation is required',
                validate: (value) => value === watch('password') || 'Passwords do not match'
              })}
            />
          </Field>
        </Stack>
      </Card.Body>
      <Card.Footer flexDirection='column' gap='4'>
        <Button variant='solid' w='full' type='submit'>
          Sign up
        </Button>
        <Card.Description>
          Already have an account? <Link to='/login'>Sign in</Link>.
        </Card.Description>
      </Card.Footer>
    </Card.Root>
  );
};

export default Register;
