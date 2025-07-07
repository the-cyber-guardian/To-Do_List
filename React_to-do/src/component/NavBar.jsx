

export default function NavBar() {
    return(
        <>
         <nav style={navStyle}>
        <div>
            <a href="/add" style={linkStyle}>Add a new to-do</a>
            <a href="/" style={linkStyle}>All</a>
            <a href="/to-do" style={linkStyle}>To-do</a>
            <a href="/completed" style={linkStyle}>Completed</a>
        </div>
    </nav>
        </>
    )
   
};
const navStyle = {
    
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 20px',
    padding: '15px 50px',
    borderRadius: '20px',
    backgroundColor: 'rgba(4, 4, 4, 0.32)',
};