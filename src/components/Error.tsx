import errorImage from '../assets/undraw_error.svg';

function Error({message} : {message: string}) {
  return (
    // <dialog className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500">
        // Error!

        <div className="flex flex-col items-center justify-center  gap-5" >
            <img src={errorImage} alt="error" />
            <p className='p-2 bg-red-400 text-white rounded-lg'>{message}</p>
        </div>
    // </dialog>
  )
}

export default Error