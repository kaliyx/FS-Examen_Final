import React, { useState, useEffect } from 'react'
import { Table, Tag, Empty, Button } from 'antd'
import { MainLayout } from '@/components/templates'
import { Loader } from '@/components/atoms'
import { useAuthStore } from '@/store/auth.store'
import { orderService } from '@/services'
import { useNavigate } from 'react-router-dom'
import type { TableColumnsType } from 'antd'
import type { Order } from '@/types'

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    const load = async () => {
      try {
        setLoading(true)
        const data = await orderService.getAll()
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [isAuthenticated, navigate])

  const getStatusColor = (status: Order['status']) => {
    const colors: Record<Order['status'], string> = {
      pending: 'orange',
      confirmed: 'blue',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
    }
    return colors[status] || 'default'
  }

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      shipped: 'Enviada',
      delivered: 'Entregada',
      cancelled: 'Cancelada',
    }
    return labels[status] || status
  }

  const columns: TableColumnsType<Order> = [
    {
      title: 'ID Orden',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('es-ES'),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items?.length || 0,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: Order['status']) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: () => (
        <Button type="link" size="small">
          Ver Detalles
        </Button>
      ),
    },
  ]

  return (
    <MainLayout>
      <h1>Mis Órdenes</h1>

      {loading && <Loader loading={true} />}

      {!loading && orders.length === 0 && (
        <Empty description="No tienes órdenes" style={{ marginTop: '60px' }} />
      )}

      {!loading && orders.length > 0 && (
        <Table columns={columns} dataSource={orders} rowKey="id" pagination={{ pageSize: 10 }} />
      )}
    </MainLayout>
  )
}
