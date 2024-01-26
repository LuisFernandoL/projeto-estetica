"use client"

import UploadImageForm from "./uploadImageForm"

const UploadFormContainer = () => {

    const pageDisplay = () => {
      
            return <UploadImageForm />
    
    }
    return (
        <div>
            {pageDisplay()}
        </div>
    )
}

export default UploadFormContainer