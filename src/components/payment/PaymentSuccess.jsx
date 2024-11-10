import React from 'react'

const PaymentSuccess = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card" style={{ width: '22rem' }}>
            <div className="card-body text-center">
                <div className="d-flex justify-content-center">
                    <i className="bi bi-check2-circle" style={{ fontSize: "40px", color: "green" }}></i>
                </div>
                <h6 className="card-title text-center mt-3">Payment Successful</h6>
                <p className="text-center">Thank you for your purchase!</p>
                <button className="btn btn-primary w-100 mt-2" onClick={() => window.location.href = "/"}>Go to courses</button>
            </div>
        </div>
    </div>

  )
}

export default PaymentSuccess