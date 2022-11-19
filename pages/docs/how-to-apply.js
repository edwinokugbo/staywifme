import React from 'react'

function HowToApply() {
  return (
    <div className='flex flex-col md:flex-row gap-2 w-screen h-screen bg-slate-100 px-4 lg:px-16 pt-8'>
      <div className='container flex-1 flex flex-col h-fit mt-4 py-4 bg-white border-1 border-slate-200 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-2'>How to Apply</h1>
        <hr className='mb-8' />
        <p>
          <p className='text-lg italic mb-3'>To apply for the show, follow the following steps:</p>
            <ol className='text-lg'>
                <li className='mb-2'>Register as a user on this site</li>
                <li className='mb-2'>fill out your full profile. Be sure to answer correctly and any false information will result in disqualification, even if we discover after you have</li>
                <li className='mb-2'>Go to the payment page and pay the registration fee. Make sure to complete the payment process</li>
                <li className='mb-2'>Successful applicants will be contacted via their details entered. They will get an email and then a call from us</li>
                <li className='mb-2'>Applicans wil then be invited to start the journey to the house</li>
            </ol>

            <p>Good luck on a successful application!</p>
        </p>
        </div>
        <div className='container flex-1 flex justify-center w-full h-fit mt-4 py-12 bg-white border-1 border-slate-200 rounded-lg shadow-lg'>
          <img src="/img/apply-now.jpg" className='w-auto h-fit mt-8' />
        </div>
    </div>
  )
}

export default HowToApply;