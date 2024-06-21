import React from 'react';
import ReactDOM from 'react-dom';
import { createClient } from '@supabase/supabase-js';
import Eye from './Eye';
import EmployeeResignation from './EmployeeResignation.js';

const supabaseUrl = 'https://fyefjljzdnikugpeuayy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZWZqbGp6ZG5pa3VncGV1YXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NTg1NDEsImV4cCI6MjAzNDUzNDU0MX0.TilMTp-wl4PW2yExP_kjYc9f7a3Drwm_JrbVakTnLTc'; // Make sure this is the anon key, not the service role key.
const supabase = createClient(supabaseUrl, supabaseKey);

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const eye = new Eye(supabase);
        await eye.run();
    }

    render() {
        return (
            <div className="main-container">
                <EmployeeResignation supabase={supabase} />
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react-app')
);


// u.4NhGqqJj@RayN