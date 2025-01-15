import { faUsers , faUserPlus,  faCartShopping, faCartPlus,  faTruckFast, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'

export const links = [
    {
        name: 'Users',
        path: 'users',
        icons: faUsers,
        role: '1995'
    },
    {
        name: 'Add User',
        path: 'user/add',
        icons:  faUserPlus,
        role: '1995'
    },
  
    
     {
        name: 'Categories',
        path: '/dashboard/Categories',
        icons:  faCartShopping,
        role: ['1995', '1999'],
    },
     {
        name: 'Add Category',
        path: '/dashboard/Category/add',
        icons:  faCartPlus,
        role: ['1995', '1999'],
    },
     {
        name: 'Products',
        path: '/dashboard/product',
        icons:  faTruckFast,
        role: ['1995', '1999'],
    },
    {
        name: 'Add Product',
        path: '/dashboard/products/add',
        icons:  faPuzzlePiece ,
        role: ['1995', '1999'],
    },
   
    
]