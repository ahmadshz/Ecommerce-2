import React from "react";

const RequestPasswordReset = () => {
   

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
            <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}>
                <h3 className="text-center mb-4" style={{ color: "#007bff" }}>Request Password Reset</h3>
                <form > {/* Use regular form */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default RequestPasswordReset;
