export type Referenz = {
  id: string
  n: string
  name: string
  url: string
  host: string
  location: string
  tags: string[]
  image: string
  imageAlt: string
  claim: string
  /** Kurzbeschreibung für die strukturierten Daten (schema.org). */
  description: string
  lead: string
  done: string[]
}

export const REFERENZEN: Referenz[] = [
  {
    id: 'glasermeister',
    n: '01',
    name: 'der-glasermeister',
    url: 'https://www.der-glasermeister.de',
    host: 'der-glasermeister.de',
    location: 'Glaserei, Merkendorf',
    tags: ['Website', 'Lokale Sichtbarkeit', 'Handwerk'],
    image: '/referenzen/glasermeister.jpg',
    imageAlt: 'Startseite der Glaserei Patrick Stettner auf der-glasermeister.de',
    claim: 'Glaserei aus Merkendorf, die online so klar auftritt wie in der Werkstatt.',
    description:
      'Website der Glaserei Patrick Stettner in Merkendorf: Duschkabinen, Glastüren, Vordächer, Treppengeländer und Restaurierung.',
    lead:
      'Patrick Stettner fertigt Duschkabinen, Glastüren, Vordächer und Treppengeländer und restauriert antike Fenster. Die Website muss das abbilden, ohne dass der Meister nebenbei eine Agentur füttert: Leistungen, Beispiele, Anfrage — in Merkendorf und der Umgebung auffindbar.',
    done: [
      'Auftritt mit klarem Leistungsangebot statt generischer Handwerker-Floskeln',
      'Struktur, die Google einer Glaserei in Merkendorf zuordnen kann',
      'Anfrageweg, der auf dem Handy genauso kurz ist wie am Schreibtisch',
    ],
  },
  {
    id: 'weiss-forst',
    n: '02',
    name: 'Weiß Forst',
    url: 'https://weiss-forst.de',
    host: 'weiss-forst.de',
    location: 'Forstdienstleistungen, Merkendorf & Mittelfranken',
    tags: ['Website', 'Lokale SEO', 'Familienbetrieb'],
    image: '/referenzen/weiss-forst.jpg',
    imageAlt: 'Startseite der Weiß Forst GbR auf weiss-forst.de',
    claim: 'Familienbetrieb für den Wald — gefunden werden, wenn jemand Holzernte googelt.',
    description:
      'Website der Weiß Forst GbR: Forstdienstleistungen in Merkendorf und Mittelfranken — Holzernte, Waldpflege, Brennholz.',
    lead:
      'Die Weiß Forst GbR übernimmt Holzernte, Durchforstung, Waldpflege, Pflanzung und Forstzaunbau, liefert Brennholz und Hackschnitzel und arbeitet mit RAL-Gütezeichen. Ein Forstbetrieb braucht keine Start-up-Ästhetik. Er braucht eine Seite, die Leistungen, Region und Qualität trägt — und auf der ein Waldbesitzer anrufen kann.',
    done: [
      'Leistungen und Region so benannt, wie sie gesucht werden (Mittelfranken, Merkendorf)',
      'Gütezeichen und Familienbetrieb sichtbar, ohne Broschüren-Pathos',
      'Kontakt und Angebotsweg ohne Umwege',
    ],
  },
  {
    id: 'allinhandwerk',
    n: '03',
    name: 'All In Handwerk',
    url: 'https://www.allinhandwerk.de',
    host: 'allinhandwerk.de',
    location: 'Handwerkervermittlung, bundesweit',
    tags: ['Web-App', 'Verzeichnis', 'Mehrere Gewerke'],
    image: '/referenzen/allinhandwerk.jpg',
    imageAlt: 'Startseite von All In Handwerk auf allinhandwerk.de',
    claim: 'Eine Anfrage für mehrere Gewerke — Verzeichnis statt Visitenkarte.',
    description:
      'Web-App zur Vermittlung geprüfter Handwerksbetriebe für Bau, Sanierung und Außenanlage.',
    lead:
      'All In Handwerk vermittelt geprüfte Betriebe vom Dach bis zum Garten. Das ist keine Unternehmenswebsite mit drei Leistungs-Kacheln, sondern ein Verzeichnis mit Gewerken, Regionen und einer Anfrage, die das ganze Vorhaben abdeckt. Gebaut als Web-App: auffindbare Gewerke-Seiten, klare Organisation, Anfrage ohne Agentur-Baukasten.',
    done: [
      'Gewerke als eigene, suchbare Seiten (Dach, Zimmerer, Sanitär, Elektro, …)',
      'Eine Anfrage statt neun Formulare',
      'Technik, die ein Portal trägt — nicht nur eine Landingpage',
    ],
  },
  {
    id: 'werkbank',
    n: '04',
    name: 'Werkbank',
    url: 'https://werkbank.info',
    host: 'werkbank.info',
    location: 'Handwerkersoftware, Produkt-Landingpage',
    tags: ['Landingpage', 'Software-Produkt', 'Interaktive Demo'],
    image: '/referenzen/werkbank.jpg',
    imageAlt: 'Startseite der Handwerkersoftware Werkbank auf werkbank.info',
    claim: 'Landingpage für eine Handwerkersoftware — mit Beispiel zum Ausprobieren statt Feature-Liste.',
    description:
      'Landingpage der Handwerkersoftware Werkbank: Zeiterfassung per App, Angebote und Rechnungen, Posteingang und KI-Assistent für Handwerk und Bau.',
    lead:
      'Werkbank bündelt Zeiterfassung auf dem Handy, Angebote und Rechnungen im Büro und einen KI-Assistenten für Handwerk und Bau. Die Landingpage muss ein Programm erklären, das man erst versteht, wenn man es benutzt. Deshalb zeigt sie die Programme als bedienbare Beispiele, nennt Preise offen und beantwortet die typischen Fragen direkt auf der Seite.',
    done: [
      'Interaktive Beispiele der Programme statt Screenshots mit Pfeilen',
      'Vorgerendert: Texte, Preise und FAQ auch ohne JavaScript für Google lesbar',
      'Preise und Demo-Anfrage ohne Umweg über ein Verkaufsgespräch',
    ],
  },
]
