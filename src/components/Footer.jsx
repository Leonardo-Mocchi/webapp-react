export default function Footer() {
  return (
    <footer className="text-paragraph-light py-3">
      <div className="container text-center">
        <p className="m-0">© {new Date().getFullYear()} IMDBoo;. All rights reserved.</p>
      </div>
    </footer>
  )
}