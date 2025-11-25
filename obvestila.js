// obvestila.js
// Splošna obvestila (daljše obdobje) – prikazana POD mašami.
// Če dodaš polje `pdf`, se prikaže gumb "Odpri oznanila (PDF)".

window.OBVESTILA = [
  {
    tag: "34. nedelja med letom",
    date: "24. 11. 2025",
    title: "Miklavževanje za otroke",
    text: "V soboto, 6. decembra, ob 17. uri bo v kapelski cerkvi srečanje s sv. Miklavžem. Starše prosimo, da otroke prijavijo po maši v zakristiji.",
    pdf: "pdf/Oznanila-48.pdf"   // <- pot do PDF-ja (relativno glede na index.html)
  },
  {
    tag: "Župnijsko obvestilo",
    date: "25. 11. 2025",
    title: "Srečanje ŽPS",
    text: "Srečanje župnijskega pastoralnega sveta bo v torek po večerni maši v župnišču v Remšniku. Vabljeni vsi člani in sodelavci.",
    pdf: "pdf/Oznanila-48.pdf"
  },
  {
    tag: "1. adventna nedelja",
    date: "30. 11. 2025",
    title: "Blagoslov adventnih venčkov",
    text: "Pri nedeljskih mašah bomo blagoslovili adventne venčke. Vabljeni, da jih prinesete k blagoslovu.",
    pdf: "" // brez PDF – polje lahko tudi izbrišeš
  }
  // dodajaš nove objekte {...} po istem vzorcu
];
