import RestaurantCard from '@/components/RestaurantCard'
import SearchComponent from '@/components/Search'
import React from 'react'


const RestaurantsPage = () => {
  return (
    <div>
      <SearchComponent />
      <RestaurantCard />
    </div>
  )
}

export default RestaurantsPage
