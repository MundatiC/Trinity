import { useEffect, useRef } from "react"


const UploadWidget = ({onImageUpload }) => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
       widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'trinity-social',
            uploadPreset: 'faozlxxi'
        }, function(error, result){
            if (!error && result && result.event === "success") {
                // Retrieve the cloudinary link from the result
                const link = result.info.secure_url;
                // Invoke the callback function with the link
                onImageUpload(link);
              }
        })
    }, [])

    return(
        <button type="button" onClick = { () => widgetRef.current.open() }>
            Upload
        </button>
    )
 
}

export default UploadWidget
