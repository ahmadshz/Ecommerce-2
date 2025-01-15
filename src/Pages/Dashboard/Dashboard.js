import React from 'react'
import TopBar from '../../Components/1-Dashboard/Bar/TopBar'
import SideBar from '../../Components/1-Dashboard/Bar/SideBar'
import './Dashboard.css'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className=' dashboard'>
            <TopBar />
            <div className='d-flex  gap-1 ' style={{ marginTop: '70px' }} >
                <SideBar />
                <div className='outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
