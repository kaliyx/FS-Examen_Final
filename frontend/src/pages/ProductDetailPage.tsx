import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, InputNumber, Button, message, Spin } from 'antd'
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { MainLayout } from '@/components/templates'
import { Card } from '@/components/atoms'
import { useCart } from '@/hooks'
import { productService } from '@/services'
import type { Product } from '@/types'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    productService
      .getById(parseInt(id))
      .then((data) => setProduct(data))
      .catch(() => message.error('Producto no encontrado'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    if (!product || quantity < 1) {
      message.warning('Cantidad inválida')
      return
    }

    setAdding(true)
    try {
      addToCart(product, quantity)
      message.success(`${product.nombre} agregado al carrito`)
      setQuantity(1)
    } catch {
      message.error('Error al agregar al carrito')
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <Spin />
        </div>
      </MainLayout>
    )
  }

  if (!product) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <h2>Producto no encontrado</h2>
          <Button onClick={() => navigate('/products')}>Volver a Productos</Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/products')}
        style={{ marginBottom: '24px' }}
      >
        Volver
      </Button>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          {product.imagen ? (
            <Image src={product.imagen} alt={product.nombre} style={{ width: '100%' }} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
              }}
            >
              Sin imagen
            </div>
          )}
        </Col>

        <Col xs={24} lg={12}>
          <h1>{product.nombre}</h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>{product.descripcion}</p>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#999', fontSize: '12px' }}>Precio</p>
              <h2 style={{ margin: '8px 0', color: '#2ecc71', fontSize: '32px' }}>
                ${product.precio.toFixed(2)}
              </h2>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}>Disponibilidad: {product.stock} unidades</p>
              {product.stock === 0 && (
                <p style={{ color: 'red' }}>Producto agotado</p>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Cantidad:</label>
              <InputNumber
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(val) => setQuantity(val || 1)}
                style={{ width: '100%' }}
              />
            </div>

            <Button
              type="primary"
              size="large"
              block
              icon={<ShoppingCartOutlined />}
              loading={adding}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </Button>
          </Card>

          <Card>
            <h3>Información del Producto</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Categoría: {product.categoria}</li>
              <li>Stock disponible: {product.stock} unidades</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  )
}
