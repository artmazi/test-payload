// Admin top-bar action: open the public site (home page) in a new tab
export default function ViewSiteLink() {
  return (
    <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }}>
      View site ↗
    </a>
  )
}
