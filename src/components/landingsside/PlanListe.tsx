"use client";

import { Alert, BodyLong, Box, Heading } from "@navikt/ds-react";
import PlanLinkPanel from "./PlanList/PlanLinkPanel";
import { HREF_PROTO_1 } from "@/app/arbeidsgiver/[narmestelederid]/constants.ts";
import { usePrototypeStore } from "@/context/StoreProvider.tsx";

export default function PlanListe() {
  const { planer } = usePrototypeStore();

  const hasAtLeastOnePlan = planer.length > 0;
  const hasMoreThanOnePlan = planer.length > 1;
  const latestPlan = hasAtLeastOnePlan ? planer[planer.length - 1] : null;

  const latestPlanLinkPanel = latestPlan ? (
    <PlanLinkPanel
      href={`${HREF_PROTO_1}/${latestPlan.id}`}
      opprettetDato={latestPlan.opprettetDato}
      isDeltMedLege={latestPlan.isDeltMedLege}
      isDeltMedNav={latestPlan.isDeltMedNav}
    />
  ) : null;

  return (
    <>
      {hasAtLeastOnePlan && (
        <section className="mb-12">
          <Heading level="3" size="medium" spacing>
            Siste oppfølgingsplan
          </Heading>

          <Box className="mb-8">{latestPlanLinkPanel}</Box>

          {hasMoreThanOnePlan && (
            <Box className="mb-8">
              <Heading level="3" size="medium" spacing>
                Tidligere oppfølgingsplaner
              </Heading>

              <Box className="flex flex-col gap-4">
                {planer
                  .toReversed()
                  .slice(1)
                  .map((plan) => (
                    <PlanLinkPanel
                      key={plan.id}
                      href={`${HREF_PROTO_1}/${plan.id}`}
                      opprettetDato={plan.opprettetDato}
                      isDeltMedLege={plan.isDeltMedLege}
                      isDeltMedNav={plan.isDeltMedNav}
                    />
                  ))}
              </Box>
            </Box>
          )}

          <Alert variant="warning" className="mt-12 mb-8">
            <Heading level="3" size="small" spacing>
              Det er begrenset hvor lenge oppfølgingsplaner er tilgjengelige
            </Heading>
            <BodyLong>
              Oppfølgingsplaner og utkast vil ikke lenger være tilgjengelige for
              deg som arbeidsgiver når det har gått 4 måneder etter siste
              sykmeldingsdato for den ansatte. Bruk Last ned som PDF-funksjonen
              for å lagre en oppfølgingsplan i eget arkiv.
            </BodyLong>
          </Alert>
        </section>
      )}
    </>
  );
}
