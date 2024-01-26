import UploadFormContainer from "@/components/uploadFormContainer"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const dynamic = "force-dynamic"

const verifyToken = () => {
    const token = getCookie("aesthetics.token", { cookies })

    if (!token) {
        redirect("/login")
    }
    return token
}

const Upload = () => {
    verifyToken()
    return (
        <main className="body min-h-screen flex items-center justify-center">
            <form className="flex w-4/5 mt-12 mb-12 md:m-1.5 flex-row items-center justify-center" >
                <UploadFormContainer />
            </form>
        </main>
    )
}

export default Upload