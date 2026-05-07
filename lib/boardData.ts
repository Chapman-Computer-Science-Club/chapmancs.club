export interface BoardMember {
  name: string;
  role: string;
  photo?: string; // path to image in /public
  linkedin?: string;
}

export const boardTiers: { label: string; members: BoardMember[] }[] = [
  {
    label: "Executive Leadership",
    members: [
      { name: "Nataniel Farzan", role: "Co-President", linkedin: "https://www.linkedin.com/in/natanielfarzan/", photo: "/board/nataniel.jpeg" },
      { name: "Jeffrey Bok", role: "Co-President", linkedin: "https://www.linkedin.com/in/jeffreybok/", photo: "/board/jeffrey.png"},
    ],
  },
  {
    label: "Vice Presidents",
    members: [
      { name: "Dylan Ravel", role: "Internal Vice President", linkedin: "https://www.linkedin.com/in/dylanravel/", photo: "/board/dylan.jpeg"},
      { name: "Daniel Tsivkovsky", role: "Operations Vice President", linkedin: "https://www.linkedin.com/in/danieltsivkovski/", photo: "/board/danielT.jpeg"},
      { name: "Tom Moore", role: "External Vice President", linkedin: "https://www.linkedin.com/in/tom-moore-17a598271/", photo: "/board/tom.jpeg"},
    ],
  },
  {
    label: "Operations",
    members: [
      { name: "Connor Zermeno", role: "Secretary", linkedin: "https://www.linkedin.com/in/connor-zermeno-ab5612329/", photo: "/board/connor.jpeg" },
      { name: "Daniel Min", role: "Treasurer", linkedin: "https://www.linkedin.com/in/daniel-min-9758812b3/", photo: "/board/danielM.jpeg" },
    ],
  },
  {
    label: "Events",
    members: [
      { name: "Maya Federico", role: "General Events Coordinator", linkedin: "https://www.linkedin.com/in/maya-federico-8a8596295/", photo: "/board/maya.JPG" },
      { name: "Benjamin Chan", role: "General Events Coordinator", linkedin: "https://www.linkedin.com/in/benjamin-k-chan/" , photo: "/board/benjamin.jpeg"},
      { name: "Thaw Han", role: "Special Events Coordinator", linkedin: "https://www.linkedin.com/in/thaw-han-467367339/" , photo: "/board/thaw.png"},
    ],
  },
  {
    label: "Hackathon & Conference",
    members: [
      { name: "Joel Escobar", role: "Hackathon Coordinator", linkedin: "https://www.linkedin.com/in/jescobar04/", photo: "/board/joel.jpeg" },
      { name: "Hemi Shah", role: "Conference Coordinator", linkedin: "https://www.linkedin.com/in/hemi-shah-86b9b92b4/", photo: "/board/hemi.jpeg" },
    ],
  },
  {
    label: "Marketing",
    members: [
      { name: "Kalin Richardson", role: "Marketing Director", linkedin: "https://www.linkedin.com/in/kalin-richardson/", photo: "/board/kalin.jpeg" },
      { name: "Lydia Moore", role: "Marketing Chair", linkedin: "https://www.linkedin.com/in/lydia-moore-bb9487384/", photo: "/board/lydia.jpeg" },
      { name: "Lynis Pierre-Louis", role: "Marketing Chair", linkedin: "https://www.linkedin.com/in/lynispierrelouis/", photo: "/board/lynis.png" },
    ],
  },
];
