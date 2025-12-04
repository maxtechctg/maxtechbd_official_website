"use client";
import React from "react";

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

function IconLink({
  href,
  iconClass,
  ariaLabel,
}: {
  href: string;
  iconClass: string;
  ariaLabel?: string;
}) {
  const defaultColor = "#404135";
  const hoverColor = "#CC181F";
  const iconSize = 18; // px

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{
        color: defaultColor,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 9999,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = defaultColor;
      }}
    >
      <i
        className={iconClass}
        aria-hidden="true"
        style={{ fontSize: iconSize, lineHeight: 1 }}
      />
    </a>
  );
}

export default function TeamSection({
  members,
  subtitle = "Our team",
  heading = "We're a group of IT passionate",
}: TeamSectionProps) {
  return (
    <section style={{ paddingTop: 30, paddingBottom: 40 }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 12,
                color: "#6c757d",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              {subtitle}
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#222",
              }}
            >
              {heading}
            </h2>
          </div>
        </div>

        <div className="row" style={{ marginTop: 24 }}>
          {members.map((member) => (
            <div
              key={member.id}
              className="col-lg-3 col-md-6 text-center mb-sm-20"
              style={{ marginBottom: 20 }}
            >
              <div
                style={{
                  width: "100%",
                  height: 360,
                  overflow: "hidden",
                  borderRadius: 30,
                  background: "#f5f5f5",
                  marginBottom: 12,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
              </div>

              <h4
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#CC181F", // 🔥 name text red
                }}
              >
                {member.name}
              </h4>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: "#6c757d",
                }}
              >
                {member.role}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                {member.facebook && (
                  <IconLink
                    href={member.facebook}
                    iconClass="fa-brands fa-facebook-f"
                    ariaLabel={`${member.name} facebook`}
                  />
                )}
                {member.twitter && (
                  <IconLink
                    href={member.twitter}
                    iconClass="fa-brands fa-twitter"
                    ariaLabel={`${member.name} twitter`}
                  />
                )}
                {member.discord && (
                  <IconLink
                    href={member.discord}
                    iconClass="fa-brands fa-discord"
                    ariaLabel={`${member.name} discord`}
                  />
                )}
                {member.instagram && (
                  <IconLink
                    href={member.instagram}
                    iconClass="fa-brands fa-instagram"
                    ariaLabel={`${member.name} instagram`}
                  />
                )}
                {member.linkedin && (
                  <IconLink
                    href={member.linkedin}
                    iconClass="fa-brands fa-linkedin"
                    ariaLabel={`${member.name} linkedin`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
