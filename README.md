# Itämeri tasapainoon

Paikallisesti toimiva strateginen selainpelin beta. Pelaaja valitsee Saaristomeren, Suomenlahden tai Perämeren, käy läpi 18 aluekohtaista lajisto- ja ekologiahavaintoa ja valitsee lopuksi kaksi suojelutoimea. Alueiden lajikortit, lähtötilanteet, merimaisemat ja suojelutoimien vaikutukset eroavat toisistaan.

## Käynnistys ja build

Tarvitset projektin Vite-versiota tukevan Node.js-version.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Peli ei tarvitse API-avaimia tai taustapalvelinta. Pelattavuus toimii myös ilman verkkoyhteyttä; verkkoyhteydellä lajikorteille ladataan Wikimedia Commons -valokuvia, ja niiden epäonnistuessa kortissa näytetään emoji-kuvitus.

Käyttöliittymän kielen voi vaihtaa yläpalkista suomen ja englannin välillä. Valinta tallennetaan selaimeen.

## Pelaaminen

- Valitse alue kartalta tai aluekortista. Kartan pisteet ovat alueiden suuntaa-antavia sijaintipisteitä, eivät mittausasemia.
- Alueen kolmella kierroksella on kuusi tehtävää kullakin: kasvit ja levät, kalat sekä muut eliöt ja ympäristötekijät.
- Oikea vastaus lisää 10 tunnistuspistettä ja vahvistaa pelillisiä ekosysteemimittareita. Väärä vastaus ei poista lajeja merestä: se vähentää kaksi tunnistuspistettä ja jättää palautumisen tapahtumatta kyseisessä tehtävässä.
- Oikein tunnistetut lajit tulevat näkyviin valitun alueen merimaisemaan.
- Loppuhaasteessa valitaan 40 pisteen budjetilla kaksi neljästä suojelutoimesta. Toimien vaikutukset riippuvat alueesta ja näkyvät ennen–jälkeen-vertailussa.
- Ravinnepaineessa pienempi arvo on parempi. Elinympäristöjen, monimuotoisuuden ja happitilanteen mittareissa suurempi on parempi.
- Tulos ja paras pistemäärä tallennetaan selaimen `localStorage`-muistiin erikseen kullekin merialueelle.

Alueiden aloitusmittarit, tehtävien aikaiset mittarimuutokset, suojelutoimien vaikutukset ja niistä laskettava ekosysteemi-indeksi ovat pelillisiä skenaarioita, eivät mitattuja ympäristöarvoja tai ennusteita.

## Projektin rakenne

- `src/App.jsx` — näkymien vaihto, pelitilan, pisteiden ja aluekohtaisten ennätysten hallinta.
- `src/game/gameLogic.js` — aluekohtaisten tehtävien tarkistus, pelimittarien päivitys ja loppuhaasteen laskenta.
- `src/data/regions.js` — alueet, karttapisteet, pelilliset lähtötilanteet, lajivalinnat ja aluekohtaiset suojeluvaikutukset.
- `src/data/species.js` — laji- ja ympäristöilmiökortit, alueellinen saatavuus, faktat, vaihtoehdot ja lähdeviitteet.
- `src/data/actions.js` — loppuhaasteen toimet, kustannukset ja kuvaukset.
- `src/data/localization.js` — englanninkieliset käyttöliittymä-, alue-, suojelutoimi- ja lajikorttitekstit.
- `src/data/stories.js` — kierrosten nimet.
- `src/components/RegionMap.jsx` ja `RegionSelector.jsx` — pohjoinen ylöspäin piirretty SVG-kartta, jossa näkyvät Suomi, Ruotsi ja Viro sekä aluevalinta.
- `src/components/SeaScene.jsx` — aluekohtainen vedenalainen maisema ja havaittujen eliöiden esitys.
- `src/components/SpeciesRound.jsx` ja `StatusPanel.jsx` — tehtävät ja neljä ekosysteemimittaria.
- `src/components/FinalChallenge.jsx` — budjetoitu suojelutoimien valinta.
- `src/components/ResultsScreen.jsx` — aluekohtainen tulos, perustelut ja ennen–jälkeen-vertailu.
- `src/components/IntroScreen.jsx`, `Header.jsx` ja `SourcesModal.jsx` — aloitus, yläpalkki ja lähteet.
- `src/App.css` ja `src/index.css` — käyttöliittymän tyylit, responsiivisuus ja animaatiot.

## Lähteet ja kuvitus

Lajitiedot ovat paikallista valikoitua opetusaineistoa; peli ei lataa reaaliaikaista dataa. Lajikorteissa on lähteen nimi ja linkki:

- [Suomen Lajitietokeskus](https://laji.fi/) — lajien nimet ja Suomessa esiintyvät lajit.
- [HELCOM: Biodiversity](https://helcom.fi/baltic-sea-trends/biodiversity/) — Itämeren monimuotoisuus ja vieraslajit.
- [HELCOM: State of the Baltic Sea](https://stateofthebalticsea.helcom.fi/) — Itämeren tila ja rehevöityminen.
- [EMODnet Biology](https://emodnet.ec.europa.eu/en/biology) — Euroopan meriluonnon monimuotoisuuden aineistot.

Alueiden yleiskuvaukset perustuvat Itämeren alueellisiin ominaispiirteisiin; pelin kartan pisteet ilmaisevat karkeaa sijaintia, eivät avoimesta mittausaineistosta poimittuja koordinaatteja. Paikallinen lajisto on valikoitu esimerkkiaineisto eikä kattava alueellinen lajiluettelo.

Osa lajikorteista näyttää oikean valokuvan Wikimedia Commonsista. Kuvat vaativat verkkoyhteyden; jos kuva ei lataudu, kortissa näytetään emoji-kuvitus. Kuvaajien ja lisenssien tiedot näkyvät kuvakorteissa ja lähdeikkunassa.

- Silakka: Aleksey Kusnetsov, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Measurement_the_Baltic_herring_(Clupea_harengus_membras_L.).jpg).
- Rakkohauru: gailhampshire, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Seaweed_-_Bladderwrack_Fucus_vesiculosus_(25465284648).jpg).
- Harmaahylje: Arild Vågen, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Halichoerus_grypus_June_2014_01.jpg).
- Merikotka: Christoph Müller, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:White_tailed_eagle_raftsund_square_crop.jpg).

Muu vedenalainen kartta- ja merimaisemakuvitus on toteutettu projektin omalla SVG- ja CSS-kuvituksella.
