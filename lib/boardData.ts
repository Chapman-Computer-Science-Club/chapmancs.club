import * as p from "./people";
import type { Person } from "./people";

export interface BoardMember extends Person {
  role: string;
}

const m = (person: Person, role: string): BoardMember => ({ ...person, role });

// newest year first
export const boardYears: { year: string; tiers: { label: string; members: BoardMember[] }[] }[] = [
  {
    year: "'27",
    tiers: [
      {
        label: "Leadership",
        members: [m(p.dylan_ravel, "Co-President"), m(p.daniel_tsivkovski, "Co-President (Fall)")],
      },
      {
        label: "Internal Team",
        members: [
          m(p.thaw_han, "Internal Vice President"),
          m(p.brent_ortizo, "Treasurer"),
          m(p.maya_federico, "General Events Coordinator"),
          m(p.andy_nguyen, "General Events Coordinator"),
          m(p.jerry_salas, "General Events Coordinator"),
          m(p.kyla_cabrera, "Special Events Coordinator"),
        ],
      },
      {
        label: "External Team",
        members: [
          m(p.benjamin_chan, "External Vice President (Fall)"),
          m(p.tom_moore, "Hackathon Coordinator (Fall), External Vice President (Spring)"),
          m(p.ethan_yoo, "Secretary"),
          m(p.joshua_dowd, "Hackathon Coordinator"),
          m(p.lydia_moore, "Marketing Chair"),
          m(p.chandrika_bakshi, "Marketing Chair"),
          m(p.divi_newton, "Marketing Chair"),
        ],
      },
    ],
  },
  {
    year: "'26",
    tiers: [
      {
        label: "Executive Leadership",
        members: [m(p.nataniel_farzan, "Co-President"), m(p.jeffrey_bok, "Co-President")],
      },
      {
        label: "Vice Presidents",
        members: [
          m(p.dylan_ravel, "Internal Vice President"),
          m(p.daniel_tsivkovski, "Operations Vice President"),
          m(p.tom_moore, "External Vice President"),
        ],
      },
      { label: "Operations", members: [m(p.connor_zermeno, "Secretary"), m(p.daniel_min, "Treasurer")] },
      {
        label: "Events",
        members: [
          m(p.maya_federico, "General Events Coordinator"),
          m(p.benjamin_chan, "General Events Coordinator"),
          m(p.thaw_han, "Special Events Coordinator"),
        ],
      },
      {
        label: "Hackathon & Conference",
        members: [m(p.joel_escobar, "Hackathon Coordinator"), m(p.hemi_shah, "Conference Coordinator")],
      },
      {
        label: "Marketing",
        members: [
          m(p.kalin_richardson, "Marketing Director"),
          m(p.lydia_moore, "Marketing Chair"),
          m(p.lynis_pierre_louis, "Marketing Chair"),
        ],
      },
    ],
  },
  {
    year: "'25",
    tiers: [
      { label: "Leadership", members: [m(p.nataniel_farzan, "President")] },
      {
        label: "Internal Team",
        members: [
          m(p.jeffrey_bok, "Internal Vice President (Fall)"),
          m(p.mason_pennell, "General Events Coordinator (Fall), Internal Vice President (Spring)"),
          m(p.halle_broadnax, "General Events Coordinator (Fall), General & Social Events Coordinator (Spring)"),
          m(p.tom_moore, "Special Events Coordinator (Fall), General & Special Events Coordinator (Spring)"),
          m(p.savana_chou, "Design Chair"),
        ],
      },
      {
        label: "Operations",
        members: [
          m(p.joel_escobar, "Operations Vice President"),
          m(p.daniel_min, "Treasurer"),
          m(p.daniel_tsivkovski, "Secretary"),
          m(p.owen_agbayani, "Public Relations Manager"),
        ],
      },
      {
        label: "External Team",
        members: [
          m(p.kalin_richardson, "External Vice President"),
          m(p.jacob_zamore, "Hackathon Coordinator"),
          m(p.dylan_ravel, "Hackathon Coordinator"),
          m(p.lauren_chen, "Social Events Coordinator (Fall)"),
          m(p.margo_burbank, "Social Media Chair"),
        ],
      },
    ],
  },
];
