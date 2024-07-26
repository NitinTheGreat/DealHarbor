import React from 'react'
import ProtectedRoute from '../../components/Protectedcomp';
const AfterSellProductPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      AfterSellProductPage
    </div>
  )
}

export default ProtectedRoute(AfterSellProductPage);
