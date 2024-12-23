import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ItemCard from '../components/itemCard'

const AllItemsPage = () => {
    const [item, setItem] = useState([])
    useEffect(() => {
        // fetchAllItems()
        fetch('http://localhost:7000/allItems')
            .then(res => res.json())
            .then(data => {
                setItem(data);
            })
    })

    // const fetchAllItems = async () => {
    //     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/allItems`)
    // }
    // console.log(item)
  return (
    <div className='m-4 mx-auto'>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
            item.map( item => <ItemCard key={item._id} item={item}></ItemCard>)
        }
      </div>
    </div>
  )
}

export default AllItemsPage
