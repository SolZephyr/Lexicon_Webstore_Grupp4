### **Gruppövning: E-handelsplattform i Next.js**
-----

`https://lexicon-webstore-grupp4.vercel.app/`

-----

### **Produktbeskrivning**

Uppgiften är att bygga en **minimalistisk e-handelsplattform** för olika produkter med hjälp av **Next.js 15 App Router**. Plattformen ska visa upp ett urval av produkter från ett externt API, vara fullt responsiv och ha interaktiva inslag. Målet är att ni ska få praktisk erfarenhet av att arbeta med **Server Components**, **Client Components**, **statiska och dynamiska routes**, hantering av asynkron data och praktiskt agilt arbete i grupper.

-----

### **Ramverk & Teknologier**

  * **Next.js 15 (App Router):** Använd det senaste av Next.js för att utnyttja funktioner som Server Components och Server Actions. Se till att optimera med så mycket statiskt och server-renderat som möjligt.
  * **TypesScript:** Använd typescript i projektet
  * **DummyJSON API:** Använd API:et `https://dummyjson.com/products` eller `https://fakeapi.platzi.com/` för att hämta produktdata. Titta igenom APIerna tillsammans och se vilka för/nackdelar de har innan ni bestämmer er.
  * **React:** Arbeta med React-komponenter, både Server och Client.
  * **Valfri styling:** Använd den stylingmetod ni är bekväma med (CSS-moduler/Tailwind CSS).
  * **Git & GitHub:** Använd Git för versionskontroll och GitHub för samarbete.
  * **Projekthanteringsverktyg:** Använd GitHub Projects (agile/scrum board), Trello (kanban board) eller dylikt som alla i grupper kan komma åt och vara bekväma med att använda. Denna ska hela tiden hållas uppdaterad.
  * **WAVE:** Se till att ha fokus på och testa tillgängligheten under arbetet med WAVE eller dylikt.

-----

### **Funktionalitetskrav**

1.  **Startsida, Om oss, Kontakt:**
      * På startsidan - Visa en översikt av ett urval av produkter (kan vara ett antal som 20 st eller en/flera kategorier av produkter i grupp). Hämta och rendera produktdata på serversidan. Det ska också finnas en Hero med en CTA högst upp på sidan.
      * Om Oss - Gör en Lorem-text eller skriv ihop något bara för att ha något där samt en bild.
      * Kontakt - Formulär för få kontakt med företaget. Kravet här är rutor för e-post och meddelande till företaget och en knapp för att skicka. Vill man kan man lägga till titel (subject) och ev en drop-down för vilken typ av kontakt man önskar - Support, info, reklamation... Ingen faktiskt funktionalitet av denna krävs förutom tillgänglighet med typer, labels osv.
2.  **Produktsida:**
      * Skapa en dynamisk route (`/products/[id]`) som visar detaljerad information för en specifik produkt baserat på dess ID. Ni behöver inte ha all info som finns i API här, men titel, beskrivning, bild och pris är minsta kraven.
      * Hämta enskild produktdetalj från API:et och rendera på serversidan.
3.  **Interaktiva element (Client Components):**
      * Lägg till en **sökfunktion** och en fungerande **pagineringsfunktion** för att bläddra mellan olika sidor (sätt en fast gräns för antal/sida, om ni vill kan ni lägga till val för detta senare).
      * Inkludera en knapp för att **"Lägga till i varukorg"** (behöver inte ha en fungerande varukorg, det räcker att den visar en notifikation eller loggar en händelse).
4.  **Frivilligt:** Skapa funktionalitet för att skicka kontaktformuläret och skapa upp så att personen som skriver i får en visuell indikation på att det lyckats (ingen funktionalitet med e-post osv behövs).
5.  **Frivilligt:** Ev annan funktionalitet som ni ser kan vara intressant som visa recensioner, utvalda produkter, filtrerar på kategorier, skicka e-post via kontaktformulär eller dylikt. Tänk bara på att inte dra iväg med extra saker innan allt annat är på plats och faktiskt bra utfört.

-----

### **Design**

Vi lämnar ingen färdig design på detta, men ni behöver se till att allt som finns i krav är med. För att inte låta det gå för lång tid rekommenderar vi att ni väljer en design utifrån något av förslagen på t ex `https://www.figma.com/community/website-templates/ecommerce?resource_type=mixed&editor_type=all&price=free` eller bildgooglar "e-commerce designs" och väljer en där. Det finns också sidor som denna som ni kan få inspiration från: `https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d` Sedan gör ni ev modifieringar för att den ska passa detta syfte. Innan ni sedan börjar koda vill vi att ni skickar oss ert förslag på detta. Något liknande detta bör vara helt ok (med lite ändringar) <img width="2533" height="1092" alt="image" src="https://github.com/user-attachments/assets/5809977b-a719-4ec2-b8e7-313d3adb1ec4" />

-----

### **Arbetsflöde & Sprintplan (3-4 veckor)**

Den preliminära planen är på 3 veckor, men ev kommer det en del 2 av arbetet som kommer då vara vecka 3-4. Detta beroende på hur arbetet går i grupperna och vad vi hinner med.
Denna uppgift är därför uppdelad i 3 sprints, en för varje vecka. Varje sprint fokuserar på specifika delmål. Detta är bara förslag och ni kan själva bestämma om ni vill fördela det på annat sätt. Det finns ingen produktägare i detta projekt så det är upp till er att ha användaren i fokus i arbetet med design och funktionalitet. Det ska vara tydligt och enkelt för den som tittar på sidan att hitta det man vill och behöver (oavsett ev handikapp osv).

**Innan ni börjar att koda se till att allt är förberett i ert SCRUM board, att ni har valt design och beslutat vem som börjar med vad. Vi vill också att ni visar upp detta för oss lärare och får klartecken innan ni sätter igång med något mer.**

#### **Övergripande arbetsflöde:**

  * **Sprintplanering:** I början av varje vecka går ni igenom veckans mål och fördelar ansvar och uppdaterar löpande er scrum board. Varje person väljer själv sina ansvar, vissa kort kommer vara spärrade då PR inte är granskad/mergad ännu och då väljer ni bara ett annat.
  * **Löpande arbete:** Arbeta i era egna branches, gör regelbundna `git commit`-operationer och `git push` till er branch (en för varje feature/card/issue).
  * **Kodgranskning:** I slutet av varje vecka/dag (t.ex. fredag) presenterar ni era slutförda delmål, skapar **Pull Requests (PRs)** och granskar varandras kod (detta kan också ske löpande under veckan vid behov). När koden är godkänd mergas den in i `main`-branchen.
  * **Feedback & Justering:** Efter granskningen ger ni feedback och justerar eventuella brister innan ni påbörjar nästa sprint.

#### **Dagliga rutiner för effektivt samarbete**

För att underlätta samarbetet och säkerställa att ni hela tiden rör er framåt som en grupp, kan ni införa några enkla men effektiva dagliga rutiner. Detta hjälper er att hantera hinder i tid och hålla koll på allas framsteg.

  * **Morgonmöte (ca 10-15 minuter):** Håll ett kort dagligt möte, gärna på morgonen. Varje person delar kort vad de planerar att arbeta med under dagen. Berätta om eventuella problem eller hinder du stött på, så att gruppen kan hjälpa till att lösa dem.
  * **Dedikerad tid för Pull Requests (PR):** Att skicka in en **Pull Request** är inte slutet på en uppgift, utan början på en diskussion och ett samarbete. Bestäm en tid varje dag då ni går igenom aktiva PR:s, lämnar feedback och granskar varandras kod. Detta är helt okej att bara göra i par och i mån av behov.
  * **Arbeta i små, avgränsade delar:** Arbeta gärna med små och hanterbara uppgifter. Bryt ner stora kort som ”Bygg produktsidan” till mindre delar som ”Hämta produktdatan från API:et” eller ”Rendera produktbild och titel”. Detta undviker **merge conflicts** och ger en tydlig känsla av framsteg.

-----

### **Sprint 1: Grundläggande struktur (Vecka 1)**

**Mål:** Planera grunderna. Sätt upp Next.js-projektet och skapa meny och de statiska sidorna.

  * Välj API, UX design att utgå från, ev bibliotek som ni vill använda (t ex Tailwind). **Detta ska förmedlas till oss lärare som ska godkänna innan ni börjar kodandet.**
  * Skapa ett nytt Next.js-projekt med App Router.
  * Rensa bort templatekod (eller alternativt gör ett tomt projekt och skapa själv grundstrukturen).
  * Skapa upp menyer och grundstruktur på projektet
  * Hämta all produktdata från API endpoint för detta och rendera en lista av produkttitel, bild, pris osv på startsidan.
  * Gör grundläggande layout/design för startsidan.

-----

### **Sprint 2: Dynamisk routing & Interaktion (Vecka 2)**

**Mål:** Bygg de dynamiska sidorna och lägg till de första interaktiva elementen.

  * Skapa den dynamiska routen `app/products/[id]/page.tsx` för produktsidorna.
  * Hämta en specifik produkts data baserat på ID och rendera detaljerad information.
  * Lägg till **sökfunktion** och **paginering** där det är aktuellt. Använd client/server-components i samarbete med varandra för att lösa detta.
  * Lägg till "Lägg till i varukorg"-knappen på produktsidan (behöver inte vara fungerande utan räcker med en indikation att en vara lagts till).

-----

### **Sprint 3: Slutputs (Vecka 3)**

**Mål:** Slutför designen, optimering och förbereda presentation.

  * **Refaktorera** koden för att göra den mer läsbar, återanvändbar och effektiv.
  * Se också till att **optimera** med t ex generateStaticParams, lämplig metadata och suspense/loading.tsx.
  * Se över hela applikationens **responsivitet** och **design** för en sista puts.
  * Kontrollera **tillgängligheten** med WAVE eller dylikt
  * Ev redovisning/presentation av projektet (beroende på om det blir en del 2 eller ej)
