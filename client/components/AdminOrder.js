import React from 'react'
import { Link } from 'react-router-dom';
import AdminItem from './AdminItem';

const AdminOrder = () => {
    return admin ? (
        <div className="admin">
            Orders
        </div>
    ): (
        <div>
            Sorry, you are not an admin.
        </div>
    )
}

export default AdminOrder
