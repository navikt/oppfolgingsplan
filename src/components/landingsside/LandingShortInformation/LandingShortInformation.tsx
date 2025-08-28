import { BodyLong, Button, Heading } from "@navikt/ds-react";
import HjelpListItem from "@/app/prototype-1/hjelp/HjelpListItem";
import NextLink from "next/link";
import { HREF_HJELP } from "@/app/prototype-1/constants";

const infoListItemContents = [
  {
    illustrationSrc: "/illustrations/clipboard.svg",
    illustrationAlt: "Clipboard",
    title: "Opprett oppfølgingsplaner",
    content: (
      <BodyLong size="medium">
        Opprett oppfølgingsplaner gjennom en enkel stegvis prosess.
      </BodyLong>
    ),
  },
  // {
  //   illustrationSrc: "/illustrations/pencil.svg",
  //   illustrationAlt: "Pencil",
  //   title: "Foreslå tilpasninger og bli enige om oppfølging",
  //   content: (
  //     <BodyLong size="medium">
  //       Selv om en arbeidstaker ikke kan gjøre sin vanlige jobb, er det ofte
  //       mulig å gjøre andre oppgaver en periode eller gjøre tilpasninger i
  //       arbeidstid eller mengde for at det skal gå an å jobbe. Finn ut sammen
  //       hva dere har lyst til å prøve ut, og bli enige om hvor lenge dere skal
  //       teste tilpasningene.
  //     </BodyLong>
  //   ),
  // },
  {
    illustrationSrc: "/illustrations/letter-opened.svg",
    illustrationAlt: "Share",
    title: "Del oppfølgingsplanen med fastlegen og Nav",
    content: (
      <BodyLong size="medium">
        Det er enkelt å oppfylle pliktene dine og dele en oppfølgingsplan med
        den ansattes fastlege og med Nav etter at den er opprettet.
      </BodyLong>
    ),
  },
  {
    illustrationSrc: "/illustrations/stepper.svg",
    illustrationAlt: "Handshake",
    title: "Revider og oppdater planen",
    content: (
      <BodyLong size="medium">
        Lag enkelt en ny plan med utgangspunkt i forrige plan. Du kan be om å få
        en påminnelse når det er tid for å revidere planen.
      </BodyLong>
    ),
  },
  {
    illustrationSrc: "/illustrations/clipboard.svg",
    illustrationAlt: "Pencil",
    title: "Last ned planen som PDF",
    content: (
      <>
        <BodyLong>
          Du kan laste ned en PDF-versjon av planen og arkivere den i eget
          system.
        </BodyLong>
      </>
    ),
  },
];

export default function LandingShortInformation() {
  return (
    <section className="mt-16">
      <Heading level="3" size="medium" className="mb-8">
        Hvordan fungerer løsningen?
      </Heading>

      {infoListItemContents.map((item, index) => (
        <HjelpListItem
          key={index}
          illustrationSrc={item.illustrationSrc}
          illustrationAlt={item.illustrationAlt}
          title={item.title}
        >
          {item.content}
        </HjelpListItem>
      ))}

      <Button variant="secondary" as={NextLink} href={HREF_HJELP}>
        Mer hjelp og informasjon
      </Button>
    </section>
  );
}
