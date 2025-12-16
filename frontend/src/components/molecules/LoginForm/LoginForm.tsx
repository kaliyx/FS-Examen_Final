import React from 'react'
import { Form, FormProps } from 'antd'
import { Input as AntInputPassword } from 'antd'
import { Button, Input } from '@/components/atoms'

interface LoginFormProps extends Omit<FormProps, 'children'> {
  onSubmit: (values: { username: string; password: string }) => void
  loading?: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  loading = false,
  ...props 
}) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: { username: string; password: string }) => {
    onSubmit(values)
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      {...props}
    >
      <Form.Item
        name="username"
        label="Nombre de usuario"
        rules={[
          { required: true, message: 'Por favor ingresa tu nombre de usuario' },
          { min: 3, message: 'El nombre de usuario debe tener al menos 3 caracteres' }
        ]}
      >
        <Input placeholder="tu_usuario" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          { required: true, message: 'Por favor ingresa tu contraseña' },
          { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
        ]}
      >
        <AntInputPassword placeholder="••••••" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </Form>
  )
}
