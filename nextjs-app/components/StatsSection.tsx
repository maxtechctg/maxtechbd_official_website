interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section>
      <div className="container">
        <div className="row">
          {stats.map((stat) => (
            <div key={stat.id} className="col-lg-3 col-md-6 mb-sm-20 position-relative">
              <div className="de_count wow fadeInUp">
                <h3>
                  <span className="timer" data-to={stat.value} data-speed="3000"></span>{stat.suffix}
                </h3>
                <h4>{stat.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
