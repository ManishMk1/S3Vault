
function Header() {
    return (
        <header className="bg-black border-b  px-8 py-2 flex justify-between items-center shadow-sm backdrop-blur-md sticky top-0 w-full" style={{backgroundColor: '#111111'}}>
            <div className="flex items-center gap-2   ">

                <img src="/logo.png" alt="S3Vault Logo" className="logo w-12 h-12" />
                <h1 className="sm:text-4xl text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                    S3Vault
                </h1>
            </div>
            <div className="login-settings">

            </div>
        </header>
    )
}

export default Header