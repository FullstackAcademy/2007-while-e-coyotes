import React from 'react'
import { Link } from 'react-router-dom';

const AdminItem = () => {
    return admin ? (
        <div className="admin">

        </div>
    ): (
        <div>
            Sorry, you are not an admin.
        </div>
    )
};

export default AdminItem;
