export type LocalFaq = { q: string; a: string }

export type WebdesignLocalPage = {
  path: `/${string}`
  place: string
  breadcrumb: string
  h1: string
  h1Muted: string
  metaTitle: string
  metaDescription: string
  lead: string
  areaServedType: 'City' | 'AdministrativeArea'
  areaServedName: string
  sections: { heading: string; paragraphs: string[] }[]
  pointsHeading: string
  points: string[]
  faqs: LocalFaq[]
}

export const WEBDESIGN_LOCAL_PAGES: WebdesignLocalPage[] = [
  {
    path: '/webdesign-ansbach',
    place: 'Ansbach',
    breadcrumb: 'Webdesign Ansbach',
    h1: 'Webdesign in Ansbach',
    h1Muted: 'gefunden werden, nicht nur eine Seite haben.',
    metaTitle: `Webdesign Ansbach | Website & lokale SEO | SØRGEL-design`,
    metaDescription:
      'Webdesign in Ansbach: Websites für Handwerk und Betriebe, die in der Stadt und im Landkreis gefunden werden sollen. Aus Merkendorf, mit Referenzen in der Region.',
    lead:
      'Wer in Ansbach eine Glaserei, eine Kanzlei oder einen Handwerksbetrieb googelt, klickt selten die dritte Seite. Die Website muss das abbilden, was der Betrieb wirklich tut — und so benannt sein, dass Google sie einer Suche in Ansbach zuordnen kann. Kein Raster aus einem Baukasten, das in jeder Stadt gleich aussieht.',
    areaServedType: 'City',
    areaServedName: 'Ansbach',
    sections: [
      {
        heading: 'Was „Webdesign Ansbach“ konkret heißen muss',
        paragraphs: [
          'Nicht das Wort Ansbach zehnmal auf die Startseite. Sondern: Leistungen in der Sprache der Suche, Ort im Impressum und auf der Kontaktseite, ein Google-Unternehmensprofil, das denselben Namen, dieselbe Adresse, dieselbe Telefonnummer trägt. Wer „Maler Ansbach“ sucht, soll einen Betrieb finden — nicht eine Agentur-Floskel.',
          'Wir sitzen in Merkendorf, knapp außerhalb. Das Erstgespräch kann in Ansbach, bei Ihnen oder online stattfinden. Die Umsetzung läuft nicht über eine anonyme Projektmanager-Kette. Sie sprechen mit dem, der die Seite baut.',
        ],
      },
      {
        heading: 'Für wen sich eine eigene Seite lohnt',
        paragraphs: [
          'Für Betriebe, die Anfragen aus der Stadt und dem Landkreis wollen: Handwerk, Praxis, Büro, Handel. Eine Visitenkarte mit drei Kacheln reicht nicht, wenn das Angebot spezialisiert ist — Duschkabinen sind nicht „Glasarbeiten aller Art“, Holzernte ist nicht „Garten und Landschaft“.',
          'Wenn der Betrieb schon eine Seite hat, die niemand findet, liegt es selten am Logo. Es liegt an fehlender Struktur, veralteten Texten oder einem Profil, das eine andere Adresse zeigt als das Impressum.',
        ],
      },
      {
        heading: 'Was wir in Ansbach und Umgebung gebaut haben',
        paragraphs: [
          'Zwei Auftritte sitzen in Merkendorf, im selben Landkreis: die Glaserei der-glasermeister.de und der Forstbetrieb weiss-forst.de. All In Handwerk ist ein Verzeichnis mit mehreren Gewerken, bundesweit — gebaut als Web-App, nicht als Broschüre. Die Adressen funktionieren; sie stehen unter den Referenzen.',
          'Für Ansbach heißt das: dieselbe Arbeitsweise. Keine Vorlage, die wir umfärben. Eine Seite, die zum Betrieb passt und auf dem Handy denselben Weg zur Anfrage hat wie am Schreibtisch.',
        ],
      },
    ],
    pointsHeading: 'Was auf der Seite stehen sollte',
    points: [
      'Leistungen so benannt, wie Kundinnen sie suchen — nicht als Agentur-Slogan',
      'Ort, Telefon und Anfrage ohne Umweg, auch von Google Maps',
      'Technik, die lädt und indexierbar ist: feste URLs, Impressum, keine leere Hülle',
    ],
    faqs: [
      {
        q: 'Was kostet Webdesign in Ansbach?',
        a: 'Eine klar abgegrenzte Unternehmenswebsite liegt typischerweise im unteren bis mittleren vierstelligen Bereich. Landingpages darunter, Verzeichnisse und Web-Apps darüber. Den Preis macht der Umfang, nicht die Postleitzahl. Im Erstgespräch teilen wir das in Launch und spätere Erweiterungen — ohne Paket, in dem drei Dinge stecken, die Sie nicht brauchen.',
      },
      {
        q: 'Reist jemand für das Gespräch nach Ansbach?',
        a: 'Ja, wenn es sinnvoll ist. Merkendorf ist nah. Viele Dinge gehen per Bildschirm: Struktur, Texte, Korrekturen. Der erste Termin kann vor Ort sein, muss es aber nicht.',
      },
      {
        q: 'Reicht ein Baukasten für einen Betrieb in Ansbach?',
        a: 'Für eine einmalige Ankündigung oft ja. Sobald Google die Seite einer Stadt und einem Gewerk zuordnen soll, werden Vorlagen eng: dieselben Überschriften, dieselben Ladezeiten, keine eigenen URLs für Leistungen. Dann trägt eine eigene Seite — nicht weil sie „schöner“ ist, sondern weil sie sich unterscheiden lässt.',
      },
    ],
  },
  {
    path: '/webdesign-merkendorf',
    place: 'Merkendorf',
    breadcrumb: 'Webdesign Merkendorf',
    h1: 'Webdesign in Merkendorf',
    h1Muted: 'der Auftritt sitzt dort, wo der Betrieb sitzt.',
    metaTitle: `Webdesign Merkendorf | Websites aus dem Ort | SØRGEL-design`,
    metaDescription:
      'Webdesign in Merkendorf: Websites für Betriebe vor Ort — Glaserei, Forst, Handwerk. Gebaut in Merkendorf, ohne Agentur aus der Großstadt dazwischen.',
    lead:
      'Merkendorf ist klein genug, dass man sich kennt — und groß genug, dass ein Betrieb online auffindbar sein muss, wenn jemand aus Wolframs-Eschenbach, Ornbau oder Ansbach sucht. Eine Website aus dem Ort heißt: kurze Wege, Texte, die zum Betrieb passen, und Referenzen, die man tatsächlich aufrufen kann.',
    areaServedType: 'City',
    areaServedName: 'Merkendorf',
    sections: [
      {
        heading: 'Aus Merkendorf, nicht irgendwo remote',
        paragraphs: [
          'SØRGEL-design sitzt in Heglau, Merkendorf. Das Impressum ist dieselbe Adresse. Wer anruft, erreicht den, der die Seite kennt. Für einen Meisterbetrieb in Merkendorf ist das oft der Unterschied zu einer Agentur, die den Auftrag in ein Ticket-System legt.',
          'Zwei der umgesetzten Sites gehören in den Ort: Patrick Stettner (Glaserei) und die Weiß Forst GbR. Die Seiten stehen, die Telefonnummern gelten. Das ist die Referenz — nicht eine Moodboard-Folie.',
        ],
      },
      {
        heading: 'Was ein Betrieb in Merkendorf auf der Seite braucht',
        paragraphs: [
          'Nicht „wir sind regional verwurzelt“. Sondern: welches Gewerk, welches Einsatzgebiet, wie die Anfrage läuft. Ein Forstbetrieb wird anders gesucht als eine Glaserei. Die Seite muss das benennen, sonst ordnet Google sie keiner Anfrage zu.',
          'Mobil zählt hier mehr als in einer Broschüre: Anrufe kommen vom Acker, von der Baustelle, aus dem Auto. Der Button muss oben liegen, nicht hinter einem Hamburger, der erst lädt.',
        ],
      },
      {
        heading: 'Merkendorf, Ansbach, Landkreis',
        paragraphs: [
          'Viele Aufträge kommen nicht nur aus dem Ort, sondern aus dem Landkreis Ansbach und Mittelfranken. Deshalb gehört der Ort ins Impressum und in die lokalen Angaben — und die Leistungen so, dass eine Suche aus Ansbach den Betrieb trotzdem findet.',
          'Wer eine Seite für Merkendorf braucht und später Ads oder ein Verzeichnis anschließt, kann das auf derselben Technik aufsetzen. Erst die Seite, die trägt. Dann das, was Extra-Traffic kauft.',
        ],
      },
    ],
    pointsHeading: 'Warum lokal bauen',
    points: [
      'Ansprechpartner im Ort, nicht eine Hotline in einer anderen Zeitzone',
      'Referenzen aus Merkendorf, die sich im Browser öffnen lassen',
      'Texte und Struktur für Handwerk und Familienbetriebe, nicht für Start-ups',
    ],
    faqs: [
      {
        q: 'Sitzt SØRGEL-design wirklich in Merkendorf?',
        a: 'Ja. Heglau 32, 91732 Merkendorf — wie im Impressum. Christof Sörgel ist der Ansprechpartner, nicht ein Account-Team.',
      },
      {
        q: 'Gibt es Websites aus Merkendorf zum Ansehen?',
        a: 'Ja. der-glasermeister.de und weiss-forst.de. Beide Betriebe sitzen hier. All In Handwerk ist die dritte Referenz, als Vermittlung über die Region hinaus.',
      },
      {
        q: 'Lohnt sich eine eigene Website für einen kleinen Betrieb im Ort?',
        a: 'Wenn Anfragen über Google oder Maps kommen sollen: ja. Wenn die Seite nur existiert, „weil man eine braucht“, und niemand sie pflegt, bringt sie nichts. Dann ist ein sauberes Google-Profil oft der erste Schritt — und die Website die Stelle, auf die das Profil zeigt.',
      },
    ],
  },
  {
    path: '/webdesign-mittelfranken',
    place: 'Mittelfranken',
    breadcrumb: 'Webdesign Mittelfranken',
    h1: 'Website erstellen lassen in Mittelfranken',
    h1Muted: 'für Betriebe zwischen Ansbach, Rothenburg und Weißenburg.',
    metaTitle: `Website erstellen lassen Mittelfranken | Webdesign | SØRGEL-design`,
    metaDescription:
      'Website erstellen lassen in Mittelfranken: Webdesign und lokale Sichtbarkeit für Handwerk und KMU — Ansbach, Rothenburg, Gunzenhausen, Weißenburg und Umgebung.',
    lead:
      'Mittelfranken ist kein Marketing-Wort. Es ist das Gebiet, in dem gesucht wird: Ansbach, Gunzenhausen, Weißenburg, Rothenburg ob der Tauber, Dinkelsbühl, Treuchtlingen. Eine Website muss zur Region passen — kurze Wege, klare Leistungen — und technisch so gebaut sein, dass Google den Betrieb einem Ort zuordnen kann, nicht einer Vorlage aus einem anderen Bundesland.',
    areaServedType: 'AdministrativeArea',
    areaServedName: 'Mittelfranken',
    sections: [
      {
        heading: 'Region statt Großstadt-Agentur',
        paragraphs: [
          'Viele Betriebe in Mittelfranken wollen keine Münchner Folie und kein Nürnberger Pitch-Deck. Sie wollen eine Seite, die der Meister erklären kann, und einen Ansprechpartner, der am nächsten Werktag antwortet. Sitz in Merkendorf, Landkreis Ansbach — die Fahrten nach Rothenburg oder Weißenburg sind Alltag, kein Projektzuschlag.',
          'Lokale SEO in der Fläche heißt: konsistente NAP-Daten, Leistungsseiten, die echte Orte nennen, wo der Betrieb tätig ist, und ein Google-Unternehmensprofil, das nicht auf einer alten Hofadresse hängt.',
        ],
      },
      {
        heading: 'Was „Website erstellen lassen Mittelfranken“ einschließt',
        paragraphs: [
          'Struktur und Texte, Impressum und Datenschutz, Mobil, Hosting, Weiterleitung der Domain. Optional: Google-Unternehmensprofil, Anzeigen, eine kleine App statt der Excel, die niemand mehr anfasst. Nicht alles am ersten Tag. Zuerst die Seite, auf der jemand anrufen kann.',
          'Für Betriebe mit mehreren Gewerken oder mehreren Orten reicht eine Startseite mit vier Kacheln oft nicht. Dann braucht es eigene URLs — Dach, Sanitär, Einsatzgebiet — damit die Suche landet. All In Handwerk ist so gebaut; eine einzelne Unternehmensseite kann denselben Gedanken in kleinerem Maßstab nutzen.',
        ],
      },
      {
        heading: 'Beispiele aus der Region',
        paragraphs: [
          'Glaserei und Forstbetrieb in Merkendorf, Vermittlung mit Gewerken darüber hinaus. Das sind keine Mockups. Wer eine Seite für Mittelfranken anfragt, sieht dort, wie der Ton und die Technik aussehen — und kann sagen, was davon passt und was nicht.',
        ],
      },
    ],
    pointsHeading: 'Worauf die Seite ausgelegt ist',
    points: [
      'Auffindbar für Suchen mit Ort und Gewerk, nicht nur für den Markennamen',
      'Anfrageweg, der auf dem Handy in zwei Tipps endet',
      'Eine Technik, die später Ads, Profil und kleine Apps tragen kann',
    ],
    faqs: [
      {
        q: 'Website erstellen lassen in Mittelfranken — von wo aus arbeiten Sie?',
        a: 'Aus Merkendorf im Landkreis Ansbach. Gespräche in der Region oder online. Die Seite hosten wir so, dass sie schnell lädt — nicht auf einem Baukasten, den niemand mehr einloggen kann.',
      },
      {
        q: 'Kommen Sie auch nach Rothenburg, Gunzenhausen oder Weißenburg?',
        a: 'Ja, wenn ein Termin vor Ort hilft. Viele Korrekturen gehen schneller über Bildschirm. Den Betrieb sehen wir uns an, bevor wir Texte erfinden.',
      },
      {
        q: 'Ist lokale SEO außerhalb von Nürnberg überhaupt möglich?',
        a: 'Ja. Die Suchen sind kleiner, die Absicht oft klarer („Forstbetrieb Gunzenhausen“, „Glaserei Ansbach“). Genau dafür braucht es keine nationale Kampagne, sondern korrekte Daten, klare Leistungsseiten und ein gepflegtes Profil.',
      },
    ],
  },
]

const BY_PATH = new Map<string, WebdesignLocalPage>(
  WEBDESIGN_LOCAL_PAGES.map((page) => [page.path, page]),
)

export function getWebdesignLocalByPath(
  pathname: string,
): WebdesignLocalPage | undefined {
  return BY_PATH.get(pathname)
}

export const WEBDESIGN_LOCAL_PATHS = WEBDESIGN_LOCAL_PAGES.map(
  (page) => page.path,
) as [string, ...string[]]
