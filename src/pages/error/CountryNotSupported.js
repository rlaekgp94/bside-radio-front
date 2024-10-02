import NotFoundIMG from 'assets/Icon/notFound-2.svg'

export default function CountryNotSupported() {
  return (
    <div className="error-wrapper">
      <div className="pageNotFound-wrapper">
        <div className="pageNotFound-inner">
          <img src={NotFoundIMG} alt="not found img" />
          <p>Country Not Supported</p>
          <span>ACE CASINO is not available in your country/region.</span>
        </div>
      </div>
    </div>
  )
}