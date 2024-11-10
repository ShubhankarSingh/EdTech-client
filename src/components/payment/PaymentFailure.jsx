import React from 'react'

const PaymentFailure = () => {
  
    
    
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card" style={{ width: '22rem' }}>
            <div className="card-body">
                <h3 className="card-title text-center mb-3">Whoops!</h3>
                <h6 className="card-title text-center">Payment Failed <i class="bi bi-x-circle-fill" style={{fontSize: "18px", color: "red" }}></i></h6>
                <button className="btn btn-primary w-100 mt-2">Try again</button>    
            </div>
        </div>
    </div>
  )
}

export default PaymentFailure