
function Header() {
    return (
        <header className="bg-black border-b  px-8 py-4 flex justify-between items-center shadow-sm backdrop-blur-md" style={{backgroundColor: '#111111'}}>
            <div className="flex items-center gap-2   ">

                <img src="public\Gemini_Generated_Image_gfd14egfd14egfd1-removebg-preview.png" alt="S3Vault Logo" className="logo w-12 h-12" />
                <h1 class="text-[1.5rem] font-bold text-transparent bg-gradient-to-tr from-accent-primary to-violet-500 bg-clip-text">
                    S3Vault
                </h1>
            </div>
            <div className="login-settings">

            </div>
        </header>
    )
}

export default Header