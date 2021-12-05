import React from 'react'


// const useStyles = makeStyles(theme => ({
//     img: {
//         display: 'flex',
//         marginLeft: 'auto',
//         width: '90%',
//         height: 'auto',
//         [theme.breakpoints.down("xs")]: {
//             display: 'none',
//           }
//     },

//     subscription_body: {
//         background: '#CAD3DB',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//     },
    
//     subscribe: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'white',
//         width: '945px',
//         height: '474px',
//         borderRadius: '10px',
//         boxShadow: '0 4px 20px rgba(61, 159, 255, 0.2)'
//     },
    
    
//     subscribe__title: {
//         fontWeight: 'bold',
//         fontSize: '26px',
//         marginBottom: '18px',
//     },
    
//     subscribe__copy: {
//         maxWidth: '450px',
//         textAlign: 'center',
//         marginBottom: '53px',
//         lineHeight: 1.5,
//     },
    
//     form: {
//         marginBottom: '25px',
//     },
    
//     form__email: {
//         padding: '20px 25px',
//         borderRadius: '5px',
//         border: '1px solid #CAD3DB',
//         width: '431px',
//         fontSize: '18px',
//         color: '#0F121F',
//     },
    
//     form__email:focus {
//         outline: '1px solid #3D9FFF',
//     },
    
//     form__button: {
//         background: '#3D9FFF',
//         padding: '10px',
//         border: 'none',
//         width: '244px',
//         height: '65px',
//         borderRadius: '5px',
//         fontSize: '18px',
//         color: 'white',
//         boxShadow: '0 4px 20px rgba(61, 159, 255, 0.7)',
//     },
    
//     form__button:hover {
//         boxShadow: '0 10px 20px rgba(61, 159, 255, 0.7)',
//     }
    
//   })),


const Newsletter = () => {
    return (
        <div className="subscription_body">
                <div className="subscribe">
                <h2 className="subscribe__title">Let's keep in touch</h2>
                <p className="subscribe__copy">Subscribe to keep up with fresh news and exciting updates. We promise not to spam you!</p>
                <div className="form">
                    <input type="email" className="form__email" placeholder="Enter your email" />
                    <button className="form__button">Send</button>
                </div>
                </div>
        </div>
    )
}

export default Newsletter
