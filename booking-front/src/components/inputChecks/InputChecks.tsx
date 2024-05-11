//InputChecks.tsx

const InputChecks = () => {
  return (
    <>
      <div className='input-checks'>
        <input
          type='checkbox'
          id='room-entire'
          name='type-of-room'
          value='entire'
        />

        <label htmlFor='room-entire'>
          I'm looking for an entire home or apartment
        </label>

        <input
          type='checkbox'
          id='travel-work'
          name='type-of-travel'
          value='work'
        />
        <label htmlFor='travel-work'>I'm traveling for work</label>
      </div>
    </>
  )
}

export default InputChecks
