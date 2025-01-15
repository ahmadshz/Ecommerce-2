import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { PaginatedItems } from '../Pagination/Pagination'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { baseUrl } from '../../../Api/Api'
import Cookies from 'cookie-universal'
import { useEffect, useState } from 'react'
import TransformDate from '../../../Helpers/TransformDate'

const TableShow = (props) => {
  const currentUser = props.currentUser || {
    email: ''
  };
  //  State
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')
  const [filterSearch, setFilterSearch] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  // Filter Search by Date
  const filterSearchByDate = filterSearch.filter((item) => TransformDate(item.created_at) === date)
  const filterDatabyDate = props.data.filter((item) => TransformDate(item.created_at) === date)

  const ShowFilterData = date.length !== 0 ?
    search.length > 0 ? filterSearchByDate : filterDatabyDate
    : search.length > 0 ? filterSearch : props.data
  // Get Cookie && Token 
  const cookie = new Cookies();
  const token = cookie.get('e-commerce')

  // Handle Search
  const getSearchData = async (e) => {
    try {
      const res = await axios.post(`${baseUrl}/${props.searshLink}/search?title=${search}`,
        {}, {
        headers: {
          Authorization: `Bearer ` + token,
        }
      })
      setFilterSearch(res.data)
    }
    catch (err) {
      console.log(err)
    } finally {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false)
    }, 500)
    return () => clearTimeout(debounce)
  }, [search])


  // Header Show
  const headerShow = props.header.map((item, key) => <th className='p-3' key={key}>{item.name}</th>)

  // Body Show
  const dataShow = ShowFilterData.map((item, key) => (
    <tr key={key}>
      <td className='p-3'>{key + 1}</td>
      {props.header.map((item2, key2) => (
        <td className='p-3' key={key2}>{
          item2.key === 'image' ? (
            <img src={'https://backend2-production-f688.up.railway.app' + item[item2.key]} alt='' height='40px' />
          )
            : item2.key === 'images' ? (
              <div className='d-flex align-items-center  gap-2 flex-wrap'>
                {
                  item[item2.key].map((img, idx) => (
                    <img key={idx} width='60px' height='40px' src={'https://backend2-production-f688.up.railway.app' + img.image} alt='' />
                  ))}
              </div>
            ) : item2.key === 'created_at' || item2.key === 'updated_at' ? (TransformDate(item[item2.key])) :
              item[item2.key] === '1995' ? 'Admin'
                : item[item2.key] === '2001' ? 'User'
                  : item[item2.key] === '1999' ? 'Product Manger '
                    : item[item2.key]}
          {currentUser && item[item2.key] === currentUser.email && <span style={{ color: 'gray' }}> (You)</span>}
        </td>
      ))}
      <td className='p-3' >
        <div className='d-flex align-items-center gap-2 '>
          <Link to={`${item.id}`}>
            <FontAwesomeIcon color='blue' icon={faPenToSquare} />
          </Link>
          {currentUser.email !== item.email && (
            <FontAwesomeIcon onClick={() => props.delete(item.id)} cursor={'pointer'} color='red' icon={faTrash} />
          )}
        </div>
      </td>
    </tr>
  ))
  return (

    <div className='w-100  '>
      <div className=' row justify-content-center gap-2'>
        <div className='col-12 col-md-5'>
          <Form.Control type="search"
            placeholder="Search"

            onChange={(e) => {
              setSearch(e.target.value)
              setSearchLoading(true)
            }} /></div>
        <div className='col-12 col-md-5'>
          <Form.Control type="date"
            onChange={(e) => {
              setDate(e.target.value)
            }} /></div>
      </div>
      <div className='table-responsive  '>
        <table className='table table-striped shadow  m-auto my-4' style={{ width: '90%' }}>
          <thead >
            <tr    >
              <th className='p-3'>id</th>
              {headerShow}
              <th className='p-3' >Action</th>
            </tr>
          </thead>
          <tbody >
            {props.data.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center p-3'>Loading...</td>
              </tr>) : searchLoading ? (
                <tr>
                  <td colSpan={12} className='text-center p-3'>Searching...</td>
                </tr>) : dataShow}
          </tbody>
        </table></div>
      <div className='d-flex align-itmes-center justify-content-between flex-wrap my-4 '>
      <div className='d-none d-md-block col-8'/>
        <div className='col-3 col-md-1  '>
          <Form.Select onChange={(e) => props.setlimit(e.target.value)} aria-label="Default select example">
            <option value='3'>3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          itemsPerPage={props.limit}
          data={props.data}
          setPage={props.pages}
          total={props.total}
        />
      </div>


    </div>
  )
}

export default TableShow
