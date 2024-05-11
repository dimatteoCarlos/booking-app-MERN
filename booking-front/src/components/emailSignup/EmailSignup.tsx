import './emailSignup.css';

const EmailSignup = () => {
  const serviceItems: string[] = [
    'Mobile version',
    'Your account',
    'Make changes online to your booking',
    'Cutomer Service Help',
    'Become an affiliate',
    'Booking.com for Business',
  ];

  return (
    <div className='emailSuscribe-listProperty-container'>
      <div className='emailSuscribe-zone'>
        <h2 className='title-emailSuscribe'>Save time, save money!</h2>
        <span className='subtitle-emailSuscribe'>
          "Sign up and we'll send the best deals to you"
        </span>
        <div className='email-input'>
          <input
            type='email'
            id='email'
            pattern='.+@example\.com'
            required
            size={30}
            placeholder='Your email address'
          />
          <button className='suscribe-btn'>Subscribe</button>
        </div>
      </div>
      <div className='listProperty-zone'>
        <div className='text-listProperty'>List your property</div>
        <div className='services-list'>
          {serviceItems.map((item, indx) => (
            <span className='service-item' key={indx}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;
