import React from 'react'
import { Link } from 'react-router-dom';

const AdminUser = () => {
    return admin ? (
        <div className="admin">
            Users
        </div>
    ): (
        <div>
            Sorry, you are not an admin.
        </div>
    )
}

export default AdminUser
