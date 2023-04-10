import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AlertComp = ({ alertObj }) => {
    const [alertData, setAlertData] = useState({ status: 'success', msg: '', isOpen: false });


    useEffect(() => {
        setAlertData(alertObj)
    }, [alertObj])


    return (
        <div>
            <Snackbar
                open={alertData?.isOpen}
                autoHideDuration={3000}
                onClose={() => setAlertData({ ...alertData, isOpen: false })}
            >
                <Alert severity={alertData?.status}>{alertData?.msg}</Alert>
            </Snackbar>
        </div>
    )
}

export default AlertComp