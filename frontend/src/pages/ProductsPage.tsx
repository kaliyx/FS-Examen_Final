import React from 'react'
import { Row, Col, message, Empty } from 'antd'
import { MainLayout } from '@/components/templates'
import { ProductFilters } from '@/components/organisms'
import { ProductCard } from '@/components/molecules'
import { Loader } from '@/components/atoms'
import { useProducts, useCart } from '@/hooks'

export const ProductsPage: React.FC = () => {
  const { products, loading, error, searchProducts, getByCategory } = useProducts()
  const { addToCart } = useCart()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchProducts(query)
    }
  }

  const handleCategoryChange = (category: string) => {
    if (category) {
      getByCategory(category)
    }
  }

  const handleAddToCart = (product: any) => {
    addToCart(product, 1)
    message.success(`${product.nombre} agregado al carrito`)
  }

  if (error) {
    return (
      <MainLayout>
        <div style={{ color: 'red', textAlign: 'center', padding: '60px' }}>
          Error: {error}
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <h1>Nuestros Productos</h1>
      
      <ProductFilters 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      <div style={{ position: 'relative', minHeight: '400px' }}>
        {loading && <Loader loading={true} />}
        
        {!loading && products.length === 0 && (
          <Empty description="No hay productos disponibles" />
        )}

        {!loading && products.length > 0 && (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product.id} xs={24} sm={12} lg={8}>
                <ProductCard 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </MainLayout>
  )
}
