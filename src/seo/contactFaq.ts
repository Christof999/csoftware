/** FAQ für Kontaktseite — gleicher Inhalt für UI und JSON-LD (FAQPage). */
export const CONTACT_FAQ_ITEMS = [
  {
    q: 'Was kostet eine Website?',
    a: 'Die Kosten richten sich nach Umfang, Funktionen und Pflege: eine schlanke Landingpage mit klarem Auftritt und Kontaktfokus liegt in einer anderen Preisklasse als eine mehrsprachige Unternehmenswebsite mit Schnittstellen oder Buchungslogik. Als Orientierung: einfache, professionell umgesetzte Auftritte starten typischerweise im unteren vierstelligen Bereich; komplexere Projekte skalieren entsprechend. Im unverbindlichen Erstgespräch klären wir Ziele, Seitenstruktur und technische Anforderungen — danach erhalten Sie eine nachvollziehbare Einschätzung ohne versteckte Posten.',
  },
  {
    q: 'Wie lange dauert die Umsetzung?',
    a: 'Für eine klar abgegrenzte Website mit abgestimmtem Content rechnen wir häufig mit etwa zwei bis vier Wochen bis zum Go-live, sofern Texte und Bilder zeitnah liegen. Größere Sites, individuelle Web-Apps oder Schnittstellen zu Drittsystemen brauchen mehr Iterationen, Tests und Abnahmen — dann sind mehrere Monate realistisch. Nach dem Kick-off legen wir Meilensteine fest (Wireframes, Designfreigabe, technische Integration), damit Sie jederzeit wissen, was als Nächstes ansteht und wann Sie mit Feedback eingebunden werden.',
  },
  {
    q: 'Ich habe nur eine vage Idee — ist das okay?',
    a: 'Ja, das ist sogar häufig der beste Ausgangspunkt. Viele Auftraggeber kommen mit einer groben Richtung, einem Problem („Wir werden online kaum gefunden“) oder einem Wunschbild — aus genau daraus entstehen gemeinsam Zielgruppe, Seitenstruktur und Tonality. Wir übersetzen Ihre Intention in ein konkretes Konzept: welche Seiten braucht es, welche Botschaft steht oben, welche Aktion sollen Besucher ausführen. Sie müssen keine fertige Spezifikation mitbringen; Klarheit entsteht Schritt für Schritt im Dialog.',
  },
  {
    q: 'Ich brauche nur eine Kleinigkeit — lohnt sich das Schreiben?',
    a: 'Auf jeden Fall. Kleinere Aufgaben — ein neuer Abschnitt auf der Website, Optimierung der Meta-Daten, ein druckfertiges Update, eine technische Korrektur — sind genau der Alltag, den wir gerne übernehmen, statt nur Großprojekte zu machen. Schreiben Sie kurz, was Sie brauchen; wir sagen ehrlich, ob sich der Aufwand lohnt oder ob eine einmalige Schulung die bessere Lösung ist. So vermeiden Sie teure Pakete für Probleme, die sich mit wenigen gezielten Stunden lösen lassen.',
  },
] as const

export type ContactFaqItem = (typeof CONTACT_FAQ_ITEMS)[number]
