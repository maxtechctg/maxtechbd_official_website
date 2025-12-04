interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  discord: string | null;
  linkedin: string | null;
}

interface TeamSectionProps {
  members: TeamMember[];
  subtitle?: string;
  heading?: string;
}

export default function TeamSection({
  members,
  subtitle = "Our team",
  heading = "We're a group of IT passionate",
}: TeamSectionProps) {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="subtitle s2 wow fadeInUp mb-3">{subtitle}</div>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">
              {heading}
            </h2>
          </div>
        </div>

        <div className="row">
          {members.map((member) => (
            <div
              key={member.id}
              className="col-lg-3 col-md-6 text-center mb-sm-20"
            >
              <div
                className="bg-color-2 rounded-30 mb20"
                style={{
                  width: "100%",
                  height: "360px",
                  overflow: "hidden",
                  borderRadius: "30px",
                  background: "#f5f5f5",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top", // 👈 IMAGE CROPS FROM TOP
                  }}
                />
              </div>

              <h4 className="mb-0">{member.name}</h4>
              <div>{member.role}</div>

              <div className="social-icons s2">
                {member.facebook && (
                  <a href={member.facebook}>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter}>
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                )}
                {member.discord && (
                  <a href={member.discord}>
                    <i className="fa-brands fa-discord"></i>
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram}>
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin}>
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
