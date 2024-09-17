import React from 'react'
import MiniDrawer from '../components/MiniDrawer'
import HorizontalStepper from '../components/HorizontalStepper'
import ProductsTable from '../components/ProductsTable'

type Props = {}

export default function NewSale({}: Props) {
  return (
    <div>
        <MiniDrawer>
                <>
                    <HorizontalStepper />
                    <ProductsTable />
                </>
            </MiniDrawer>
    </div>
  )
}