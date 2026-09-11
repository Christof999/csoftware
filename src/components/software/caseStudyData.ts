/**
 * Praxisbeispiele entlang der tatsächlich implementierten Abläufe.
 *
 * Die Betriebe dahinter sind anonymisiert: beschrieben wird, was die
 * Programme tun, nicht wer sie einsetzt. Zahlen stehen nur dort, wo sie aus
 * dem Ablauf selbst folgen — keine erfundenen Einsparungsquoten.
 */

export type CaseStudy = {
  id: string
  n: string
  scope: string
  programs: string[]
  title: string
  situation: string
  steps: { title: string; text: string }[]
  /** Die unauffälligen Details, die im Alltag den Unterschied machen. */
  safeguards: string[]
  result: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fall-01',
    n: '01',
    scope: 'Bauunternehmen, rund 25 Mitarbeiter',
    programs: ['Zeiterfassung', 'Auftrag & Rechnung'],
    title: 'Von der gestempelten Stunde zur fertigen Rechnung.',
    situation:
      'Stunden wurden auf Zetteln notiert, im Büro abgetippt und mit dem Angebot verglichen — von Hand. Was auf der Baustelle zusätzlich verbaut wurde, fiel oft erst beim Abschluss auf. Dann war es nicht mehr belegbar.',
    steps: [
      {
        title: 'Auf der Baustelle',
        text: 'Der Mitarbeiter stempelt am Handy auf das Projekt ein. Beim Ausstempeln hängt er an, was gebraucht wurde — Material mit Menge, Fotos vom Zustand, kurze Notiz. Ohne Empfang wird alles zwischengespeichert und später nachgeschoben.',
      },
      {
        title: 'Im Büro, am selben Abend',
        text: 'Der Tagesbericht steht in der Übersicht. Stimmt eine Stempelung nicht, korrigiert die Bauleitung sie — mit Pflichtfeld für den Grund, damit später nachvollziehbar bleibt, wer was geändert hat.',
      },
      {
        title: 'Bei der Abrechnung',
        text: 'Das Rechnungsprogramm holt sich die gebuchten Stunden und Mengen und stellt sie dem Angebot gegenüber: Soll gegen Ist, Zeile für Zeile. Azubi-Stunden laufen über einen eigenen Verrechnungssatz, nicht über den Facharbeitersatz.',
      },
      {
        title: 'Die Rechnung',
        text: 'Positionen werden angehakt und übernommen. Was zusätzlich verbaut wurde, steht als eigene Zeile da — mit den Baustellenfotos als Nachweis, falls der Kunde nachfragt.',
      },
    ],
    safeguards: [
      'Pausen werden nach dem Arbeitszeitgesetz gesetzt, nicht nach Gefühl',
      'Jede Zeitkorrektur trägt Zeitpunkt, Bearbeiter und Grund',
      'Vergessenes Ausstempeln fällt abends auf und wird nicht stillschweigend verschluckt',
    ],
    result:
      'Der Stundenzettel wird nirgends mehr abgetippt. Und die Frage „haben wir an dem Projekt verdient?“ ist beantwortet, bevor die Rechnung rausgeht — nicht Monate später.',
  },
  {
    id: 'fall-02',
    n: '02',
    scope: 'Handwerksbetrieb mit mehreren Postfächern',
    programs: ['Posteingang', 'Auftrag & Rechnung'],
    title: 'Vom Postfach in die Buchhaltung — ohne Zwischenstopp.',
    situation:
      'Lieferantenrechnungen kamen über vier Adressen herein. Jemand musste jede Mail öffnen, das PDF herunterladen, die Beträge abtippen und den Beleg ablegen. Skontofristen liefen ab, weil die Rechnung noch im Postfach lag.',
    steps: [
      {
        title: 'Die Mail kommt an',
        text: 'Alle Postfächer laufen in einem Posteingang zusammen. Die Zugangsdaten liegen nicht in der App, sondern verschlüsselt in einem eigenen Mail-Proxy dazwischen.',
      },
      {
        title: 'Die KI liest mit',
        text: 'Mail und angehängtes PDF gehen gemeinsam an die Auswertung. Denn bei „anbei unsere Rechnung“ steht der Betrag im Anhang und in keiner Zeile Mailtext. Heraus kommen Kategorie, Zusammenfassung und — bei Rechnungen — Lieferant, Nummer, Betrag, Rechnungs- und Fälligkeitsdatum.',
      },
      {
        title: 'Übergabe an die Buchhaltung',
        text: 'Was als Rechnung oder Mahnung einsortiert ist, landet als Eingangsrechnung im Status „Ausstehend“, Beleg inklusive. Freigabe, Kategorie und Kostenstelle setzt weiterhin ein Mensch.',
      },
      {
        title: 'Zahlung und Monatsabschluss',
        text: 'Der Kontoauszug wird eingelesen, Umsätze werden den Belegen zugeordnet. Zum Monatsende entsteht ein Bündel für das Steuerbüro — mit einer Liste der Belege, die noch fehlen.',
      },
    ],
    safeguards: [
      'Dieselbe Mail kann nicht zweimal zur Rechnung werden — die Message-ID ist die Kennung',
      'Korrigierte Werte werden nachgezogen, ohne Freigabe und Notizen zu überschreiben',
      'Eigene Ausgangsrechnungen, die intern weitergeleitet wurden, bleiben draußen — erkannt am Rechnungssteller, nicht am Absender',
      'Eine weitergeleitete Lieferantenrechnung bleibt drin, obwohl sie aus dem eigenen Postfach kommt',
    ],
    result:
      'Rechnungen werden nicht mehr abgetippt, sondern geprüft. Skontofristen stehen sichtbar in der Liste, statt in einem ungelesenen Postfach zu verfallen.',
  },
  {
    id: 'fall-03',
    n: '03',
    scope: 'Betrieb mit Lohnbuchhaltung außer Haus',
    programs: ['Zeiterfassung'],
    title: 'Der Monatsabschluss, den das Lohnbüro ohne Rückfragen annimmt.',
    situation:
      'Für die Lohnabrechnung wurden Stundenlisten, Urlaubsanträge und Krankmeldungen aus drei Quellen zusammengesucht. Rückfragen kamen jeden Monat.',
    steps: [
      {
        title: 'Laufend, nebenbei',
        text: 'Urlaub wird in der App beantragt und freigegeben, Krankmeldungen und Berufsschultage werden dort eingetragen. Regionale Feiertage sind hinterlegt.',
      },
      {
        title: 'Zum Monatsende',
        text: 'Je Mitarbeiter entsteht der Nachweis der täglichen Arbeitszeit im DATEV-Format: eine Zeile pro Kalendertag, mehrere Stempelungen eines Tages zusammengefasst.',
      },
      {
        title: 'Was in der Summe steht',
        text: 'Abwesenheitstage stehen mit ihrer Regelarbeitszeit drin. Das Blatt weist damit die bezahlten Stunden des Monats aus, nicht nur die gestempelten — und das Kürzel in der Sternspalte sagt, woher die Stunden kommen.',
      },
      {
        title: 'Raus damit',
        text: 'Der Bericht geht als PDF ans Lohnbüro. Parallel liegt der ausführliche Bericht mit Projekten und Dokumentation im Haus — den braucht das Lohnbüro nicht und bekommt ihn auch nicht.',
      },
    ],
    safeguards: [
      'Überstunden werden monatsweise geführt und können ausbezahlt oder abgefeiert werden',
      'Azubis bekommen ein eigenes Kürzel für Berufsschultage — ausdrücklicher Wunsch der Lohnbuchhaltung',
      'Was einmal abgerechnet ist, lässt sich nicht stillschweigend nachträglich ändern',
    ],
    result:
      'Der Monatsabschluss ist ein Knopfdruck statt eines Nachmittags. Und die tägliche Arbeitszeit ist dokumentiert — die Grundlage für den Nachweis nach dem Arbeitszeitgesetz.',
  },
]

