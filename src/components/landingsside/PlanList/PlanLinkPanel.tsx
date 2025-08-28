"use client";

import { BodyShort, LinkCard } from "@navikt/ds-react";
import NextLink from "next/link";
import PlanShareTags from "../PlanShareTags";
import {
  getDatoString,
  getPlanDatoHeading,
} from "@/app/arbeidsgiver/[narmestelederid]/utils.ts";

interface Props {
  href: string;
  opprettetDato: Date;
  isDeltMedLege: boolean;
  isDeltMedNav: boolean;
  lastUpdated?: Date;
}

export default function PlanLinkPanel({
  href,
  opprettetDato,
  isDeltMedLege,
  isDeltMedNav,
}: Props) {
  return (
    <LinkCard>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <NextLink href={href}>{getPlanDatoHeading(opprettetDato)}</NextLink>
        </LinkCard.Anchor>
      </LinkCard.Title>

      <LinkCard.Description>
        <BodyShort size="small" spacing>
          <strong>Opprettet:</strong> {getDatoString(opprettetDato)}
        </BodyShort>
      </LinkCard.Description>

      <LinkCard.Footer>
        <PlanShareTags
          isDeltMedLege={isDeltMedLege}
          isDeltMedNav={isDeltMedNav}
        />
      </LinkCard.Footer>
    </LinkCard>
  );
}
