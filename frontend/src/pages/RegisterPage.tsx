import React from 'react'
import { Form, message, Input as AntInputPassword } from 'antd'
import { MainLayout } from '@/components/templates'
import { Input, Button } from '@/components/atoms'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (_values: any) => {
    try {
      setLoading(true)
      await authService.register({ 
        nombre: _values.nombre, 
        email: _values.email, 
        password: _values.password,
        telefono: _values.telefono,
        direccion: _values.direccion
      })
      message.success('Registro exitoso. Por favor inicia sesión.')
      navigate('/login')
    } catch (error) {
      message.error('Error en el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: '400px', margin: '60px auto', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>🥗 HuertoHogar</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Crear Cuenta</h2>
        
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="nombre"
            label="Nombre completo"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
          >
            <Input placeholder="Juan Pérez" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              { required: true, message: 'Por favor ingresa tu correo' },
              { type: 'email', message: 'Correo inválido' }
            ]}
          >
            <Input type="email" placeholder="tu@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: 'Por favor ingresa una contraseña' },
              { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
            ]}
          >
            <AntInputPassword placeholder="••••••" />
          </Form.Item>

          <Form.Item
            name="telefono"
            label="Teléfono (opcional)"
          >
            <Input placeholder="+1234567890" />
          </Form.Item>

          <Form.Item
            name="direccion"
            label="Dirección (opcional)"
          >
            <Input placeholder="Calle 123, Ciudad" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmar contraseña"
            rules={[
              { required: true, message: 'Por favor confirma tu contraseña' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Las contraseñas no coinciden'))
                },
              }),
            ]}
          >
            <AntInputPassword placeholder="••••••" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </Button>
        </Form>

        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </MainLayout>
  )
}
