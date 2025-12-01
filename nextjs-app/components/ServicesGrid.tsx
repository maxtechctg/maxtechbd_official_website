interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4 mt-100 sm-mt-0 z-1000">
          <div className="spacer-single d-lg-none d-sm-block"></div>
          {services.map((service) => (
            <div key={service.id} className="col-lg-3 col-md-6">
              <div>
                {service.image && (
                  <img 
                    src={service.image} 
                    className="img-fullwidth rounded-20 mb20" 
                    alt={service.title} 
                  />
                )}
                <h4>{service.title}</h4>
                <hr className="s2" />
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
