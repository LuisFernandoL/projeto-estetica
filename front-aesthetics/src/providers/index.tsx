
import { AuthProvider } from "@/contexts/authContext";
import { ProductProvider } from "@/contexts/productContext";
import { ReactNode } from "react";


export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AuthProvider>
                <ProductProvider>
                    {children}
                </ProductProvider>
            </AuthProvider>
        </>
    )

}