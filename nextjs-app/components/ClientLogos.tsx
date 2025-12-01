interface ClientLogo {
  id: number;
  image: string;
  name: string | null;
  url: string | null;
}

interface ClientLogosProps {
  logos: ClientLogo[];
}

export default function ClientLogos({ logos }: ClientLogosProps) {
  return (
    <section className="pt60 pb60">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-12">
            <div id="owl-logo" className="logo-carousel no-alpha owl-carousel owl-theme">
              {logos.map((logo) => (
                logo.url ? (
                  <a key={logo.id} href={logo.url}>
                    <img src={logo.image} className="img-fluid" alt={logo.name || 'Client'} />
                  </a>
                ) : (
                  <img key={logo.id} src={logo.image} className="img-fluid" alt={logo.name || 'Client'} />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
