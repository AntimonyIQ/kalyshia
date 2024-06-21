import React, { useState } from 'react';

const EmployeeResignation = ({ supabase }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [isResigning, setIsResigning] = useState(false);
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            fullname,
            email,
            is_resigning: isResigning,
            reason: isResigning ? reason : null
        };

        const { data: insertData, error } = await supabase
            .from('employee_resignations')
            .insert([data]);

        if (error) {
            console.error('Error inserting data into Supabase:', error);
        } else {
            console.log('Data successfully inserted into Supabase:', insertData);
        }
    };

    return (
        <div className="form-container">
            <img src="./logo.jpg" alt="Kalyshia Confectionary Logo" className="logo" />
            <h2>Employee Resignation Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        value={fullname} 
                        onChange={(e) => setFullname(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Are you resigning?</label>
                    <select 
                        value={isResigning} 
                        onChange={(e) => setIsResigning(e.target.value === 'true')}
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                {isResigning && (
                    <div className="form-group">
                        <label>Reason for resignation</label>
                        <textarea 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                            required
                        />
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeResignation;