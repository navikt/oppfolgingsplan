"use client";

import {
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
} from "@navikt/ds-react";
import NextLink from "next/link";
import { HREF_ARBEIDSOPPGAVER } from "./constants";

import { useEffect } from "react";
import PlanListe from "@/components/landingsside/PlanListe.tsx";
import TextContentBox from "@/components/TextContentBox.tsx";
import {
  SykmeldtTilstand,
  usePrototypeStore,
} from "@/context/StoreProvider.tsx";
import HjelpContent from "@/components/hjelp/HjelpContent.tsx";

export default function Prototype1Landing() {
  const { sykmeldtTilstand, resetPlanBleNettoppOpprettet } =
    usePrototypeStore();

  useEffect(() => {
    resetPlanBleNettoppOpprettet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Heading level="2" size="large" spacing>
        Oppfølgingsplaner
      </Heading>

      <TextContentBox>
        <BodyLong size="large" spacing>
          Oppfølgingsplanen er et verktøy for å støtte god kommunikasjon og
          felles forståelse av oppfølging på arbeidsplassen når den ansatte er
          sykmeldt. I planen kan du i samarbeid med den ansatte dokumentere
          tilpasninger og oppfølging på arbeidsplassen. Den kan deles med Nav og
          med fastlegen ved behov.
        </BodyLong>
      </TextContentBox>

      {sykmeldtTilstand === SykmeldtTilstand.SYKMELDT ? (
        <Box className="mb-12">
          <Button variant="primary" as={NextLink} href={HREF_ARBEIDSOPPGAVER}>
            Lag ny oppfølgingsplan
          </Button>
        </Box>
      ) : (
        <Box className="">
          <Alert variant="info" size="small" className="mb-12">
            <Heading level="3" size="small" spacing>
              Den ansatte er ikke sykmeldt
            </Heading>
            <Box>
              {/* <Box className="max-w-[620]"> */}
              <BodyShort>
                Du kan ikke opprette en oppfølgingsplan for den ansatte nå. Du
                kan kun opprette nye oppfølgingsplaner når den ansatte har en
                sykmelding, eller det er mindre enn 16 dager siden siste
                sykmeldingsdato.
              </BodyShort>
            </Box>
          </Alert>
        </Box>
      )}

      <PlanListe />

      <Heading level="3" size="medium" className="mb-8">
        Hjelp til å lage og bruke oppfølgingsplaner
      </Heading>

      <HjelpContent />
    </main>
  );
}
