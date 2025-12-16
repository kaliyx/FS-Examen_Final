import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import { MainLayout } from '@/components/templates'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <MainLayout>
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>🥗 Bienvenido a HuertoHogar</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
          Los mejores productos frescos de la huerta directamente a tu puerta
        </p>

        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/products')}
            >
              Ver Productos
            </Button>
          </Col>
          <Col>
            <Button 
              size="large"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </Button>
          </Col>
        </Row>

        <div style={{ marginTop: '60px', padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h2>¿Por qué elegirnos?</h2>
          <Row gutter={[32, 32]} style={{ marginTop: '24px' }}>
            <Col xs={24} sm={12} lg={8}>
              <h3>🌱 Productos Frescos</h3>
              <p>Verduras recogidas en el momento para mayor frescura</p>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <h3>🚚 Entrega Rápida</h3>
              <p>Recibe tu pedido en 24 horas en tu domicilio</p>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <h3>💚 Eco-Amigable</h3>
              <p>Productos cultivados de forma orgánica y sostenible</p>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  )
}
